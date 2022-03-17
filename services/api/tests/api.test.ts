import request from 'supertest';
import koaApp from '../src/app'
import typeorm from 'typeorm';
import createDbConnection from '../src/createDbConnection'

// jest.spyOn(typeorm, 'getConnection')
//     .mockReturnValue(() => {

//     })

beforeAll(async () => {
    await createDbConnection();
})

test('health endpoint', async () => {
    const app = koaApp();
    const response = await request(app.callback()).get('/health');
    // console.warn(response);
    expect(response.status).toBe(200);
    expect(response.body.services).toBeDefined();
});