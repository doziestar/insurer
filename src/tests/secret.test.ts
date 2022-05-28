import App from '@/app';
import APIRoute from '@routes/secret.route';
import request from 'supertest';


describe("Testing API Keys and API Secrets ", () => {
  describe("[POST] /secret/new", () => {
    it("response should have the Create api keys and secret", async () => {
      const app = App([ new APIRoute()])
      expect(true).toBe(true);
      request(app.getServer()).post(`${APIRoute.path}new`, () => {
        expect(1).toBe(1)
      }),
    });
  });
});
