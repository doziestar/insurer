import SecretController from '@controllers/secret.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { Router } from 'express';

class APIRoute implements Routes {
  public path = '/secret/';
  public router = Router();
  public secretController = new SecretController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}new`, authMiddleware, this.secretController.new);
    this.router.post(`${this.path}regenerate`, authMiddleware, this.secretController.regenerate);
    this.router.post(`${this.path}check`, authMiddleware, this.secretController.check);
  }
}

export default APIRoute;
