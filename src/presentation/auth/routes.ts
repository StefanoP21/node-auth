import { Router } from 'express';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('/login', (req, res) => {
      res.json('Login');
    });

    return router;
  }
}
