import { IApiData } from '@/interfaces/secret.interface';
import SecretService from '@services/secret.service';
import { NextFunction, Request, Response } from 'express';

const secretService = new SecretService();

class SecretController {
  async new(req: Request, res: Response, next: NextFunction) {
    try {
      // get user id from req.user
      const userId: number = parseInt(req.params.id, 10);
      const secret: IApiData = await secretService.new(userId);
      res.sendStatus(201).json({ secret });
    } catch (error) {
      next(error);
    }
  }

  async regenerate(req: Request, res: Response, next: NextFunction) {
    try {
      // get user id from req.user
      const userId: number = parseInt(req.params.id, 10);
      const secret: IApiData = await secretService.regenerate(userId);
      res.sendStatus(200).json({ secret });
    } catch (error) {
      next(error);
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      // get user id from req.user
      const userId: number = parseInt(req.params.id, 10);
      const isValid: boolean = await secretService.check(userId);

      res.sendStatus(200).json({ isValid });
    } catch (error) {
      next(error);
    }
  }
}

export default SecretController;
