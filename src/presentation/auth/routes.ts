import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraestructure';
import { BcryptAdapter } from '../../config';
import { AuthMidldleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatasourceImpl(
      BcryptAdapter.hash,
      BcryptAdapter.compare
    );
    const repository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(repository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/', AuthMidldleware.validateJwt, controller.getUsers);

    return router;
  }
}
