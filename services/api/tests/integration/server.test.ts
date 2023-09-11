import { Server } from 'http';
import request from 'supertest';
import { Connection } from 'typeorm';

import app from '../../src/app';
import createDbConnection from '../../src/createDbConnection'
import { UserEntity } from '../../src/entity/user';
import jwtHelper from '../../src/helper/jwt';
import { BCRYPT_MOCK_PASSWORD, mock } from '../mock'
import { getSampleData, SampleDataFormat } from '../sample';

let api: request.SuperTest<request.Test>;
let connection: Connection;
let sampleData: SampleDataFormat;
let server: Server

beforeAll(async () => {
    server = app();
    api = request(server);
    connection = await createDbConnection({
        port: process.env.TEST_DATABASE_PORT
    })
    sampleData = getSampleData();
    mock().bcrypt();

})

afterEach(async () => {
    if (connection) {
        const entities = connection.entityMetadatas;
        for (const entity of entities) {
          const repository = await connection.getRepository(entity.name);
          await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
        }
    }
});

afterAll(() => {
    server.close();
    // connection.close();
})

describe('users', () => {
    it('gets users', async () => {
        const response = await api
            .get('/users')
            .set('Authorization', 'Bearer ' + jwtHelper.getAccessToken(sampleData.userToSave))
            .expect(200)
        expect(response.body).toStrictEqual([])
    });
    // it('get user',async () => {
    //     const userRepo = connection.getRepository(UserEntity);
    //     await userRepo.save(sampleData.userToSave);

    //     const response = await api
    //         .get('/users/1')
    //         .set('Authorization', 'Bearer ' + jwtHelper.getAccessToken(sampleData.userToSave))
    //         .expect(200)
    //     expect(response.body).toStrictEqual({
    //         ...sampleData.userToSave,

    //     })
    // })
    // it('creates user', async () => {
    //     const response = await api
    //         .post('/users')
    //         .set('Authorization', 'Bearer ' + jwtHelper.getAccessToken(sampleData.userToSave))
    //         .type('form')
    //         .send(sampleData.userToSave)
    //         .set('Accept', '/application\/json/')
    //         .expect(201);
    //     expect(response.body).toStrictEqual({
    //         ...sampleData.userToSave,
    //         id: 1,
    //         password: BCRYPT_MOCK_PASSWORD,
    //     });
    // });
    // it('updates user', async () => {
    //     const userRepo = connection.getRepository(UserEntity);
    //     await userRepo.save(sampleData.userToSave);

    //     const response = await api
    //         .put('/users/1')
    //         .set('Authorization', 'Bearer ' + jwtHelper.getAccessToken(sampleData.userToSave))
    //         .type('form')
    //         .send(sampleData.userToUpdate)
    //         .expect(201);

    //     expect(response.body).toStrictEqual({
    //         ...sampleData.userToUpdate,
    //         id: 1,
    //         password: BCRYPT_MOCK_PASSWORD,
    //     })
    // })

    // it('deletes user', async () => {
    //     const userRepo = connection.getRepository(UserEntity);
    //     await userRepo.save(sampleData.userToSave);

    //     await api
    //         .delete('/users/1')
    //         .set('Authorization', 'Bearer ' + jwtHelper.getAccessToken(sampleData.userToSave))
    //         .expect(204);
    // })
})

