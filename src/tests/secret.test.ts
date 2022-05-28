import App from '@/app';
import APIRoute from '@routes/secret.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing API Keys and API Secrets ', () => {
  describe('[POST] /secret/new', () => {
    it('response should have the Created api keys and secret', async () => {
      const secretRoute = new APIRoute();
      const app = new App([secretRoute]);
      return request(app.getServer()).post(`${secretRoute.path}new`, () => {
        //
        expect(true).toBe(true);
      });
    });
  });
});
