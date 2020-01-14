import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter = Router();

authRouter.get('/signup', AuthController.signup);


export default authRouter;
