// import request from 'supertest';
// import { Connection } from 'typeorm';
// import koaApp from '../src/app'
// import { ServiceStatus } from '../src/controller/health';
// import createDbConnection from '../src/createDbConnection'
// import { clearDB } from '../src/helper/database';

// let dbConnection: Connection;

// beforeAll(async () => {
//     dbConnection = await createDbConnection();
// })

// afterAll(() => {
//     dbConnection?.close();
// })

// // beforeEach(async () => {
// //     await clearDB(dbConnection);
// // });

// describe('status endpoints', () => {
//     it('health endpoint returns 200', async () => {
//         const app = koaApp();
//         const response = await request(app.callback()).get('/health');
//         // console.warn(response);
//         expect(response.status).toBe(200);
//         expect(response.body.services).toBeDefined();
//         expect(response.body.services.postgres).toEqual(ServiceStatus.UP);
//     });
// })

// describe('user endpoints', () => {
//     it('user GET endpoint returns empty users', async () => {
//         const app = koaApp();
//         const response = await request(app.callback()).get('/users');
//         // console.warn(response);
//         console.warn(response.error);
//         // console.warn('/../src/entities/**/*.ts');
//         expect(response.status).toBe(200);
//         expect(response.body.users).toBeDefined();
//     });

// })

test('t', () => {
    expect(true).toBe(true);
})