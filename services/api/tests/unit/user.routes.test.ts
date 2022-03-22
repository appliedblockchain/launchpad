import supertest from 'supertest';
import app from '../../src/app';

jest.setTimeout(10 * 1000);

describe('api request tests', () => {
    const request = supertest.agent(app);
    
    it('gets users',async () => {
        const response = await request
            .get('/users')
            .expect(200)
        console.warn(response);
    });
});
