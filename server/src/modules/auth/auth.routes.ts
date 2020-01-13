import { Router } from 'express';
import AuthController from './auth.controller';

export default (apiRouter: Router) => {
  const authRouter = Router();
  authRouter.get('/signup', AuthController.signup);

  apiRouter.use('/auth', authRouter);
}


