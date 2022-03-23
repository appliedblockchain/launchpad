import Koa from 'koa'
import { protectedRouter } from '../../src/protectedRoutes'
import request from 'supertest';
import createDbConnection from '../../src/createDbConnection'
import { getSampleData, SampleDataFormat } from '../sample';
import { UserEntity } from '../../src/entity/user';
import bodyParser from 'koa-bodyparser'
import { BCRYPT_MOCK_PASSWORD, mock } from '../mock'
import { Connection } from 'typeorm';
import { unprotectedRouter } from '../../src/unprotectedRoutes';

let server: any;
let api: request.SuperTest<request.Test>;
let connection: Connection;
let sampleData: SampleDataFormat;

beforeAll(async () => {
    // mock koa app
    const app = new Koa();
    app
        .use(bodyParser())
        .use(protectedRouter.middleware())
    
    server = app.listen(process.env.TEST_APP_PORT);
    api = request(server);    
    connection = await createDbConnection({
        port: process.env.TEST_DATABASE_PORT
    })
    sampleData = getSampleData();
    mock().bcrypt();
})

afterEach(async () => {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    }
});

afterAll(() => {
    server.close();
    connection.close();
})

describe('users', () => {
    it('gets users', async () => {
        const response = await api
            .get('/users')
            .expect(200)
        expect(response.body).toStrictEqual([])
    });
    it('get user',async () => {
        const userRepo = connection.getRepository(UserEntity);
        await userRepo.save(sampleData.userToSave);

        const response = await api
            .get('/users/1')
            .expect(200)
        expect(response.body).toStrictEqual({
            ...sampleData.userToSave,

        })
    })
    it('creates user', async () => {
        const response = await api
            .post('/users')
            .type('form')
            .send(sampleData.userToSave)
            .set('Accept', '/application\/json/')
            .expect(201);
        expect(response.body).toStrictEqual({
            ...sampleData.userToSave,
            id: 1,
            password: BCRYPT_MOCK_PASSWORD,
        });
    });
    it('updates user', async () => {
        const userRepo = connection.getRepository(UserEntity);
        await userRepo.save(sampleData.userToSave);

        const response = await api
            .put('/users/1')
            .type('form')
            .send(sampleData.userToUpdate)
            .expect(201);
        
        expect(response.body).toStrictEqual({
            ...sampleData.userToUpdate,
            id: 1,
            password: BCRYPT_MOCK_PASSWORD,
        })
    })

    it('deletes user', async () => {
        const userRepo = connection.getRepository(UserEntity);
        await userRepo.save(sampleData.userToSave);

        await api
            .delete('/users/1')
            .expect(204);
    })
})

