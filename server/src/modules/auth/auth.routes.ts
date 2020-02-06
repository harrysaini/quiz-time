import { Router } from 'express';
import AuthController from './auth.controller';
import passport = require('passport');

const authRouter = Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/login', AuthController.login);
authRouter.get('/me', passport.authenticate('jwt', {session: false}),  AuthController.getCurrentUser);
authRouter.get('/user/:userId', AuthController.getUser);


export default authRouter;
