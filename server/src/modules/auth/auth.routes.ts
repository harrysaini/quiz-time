import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);
authRouter.get('/user/:userId', AuthController.getUser)


export default authRouter;
