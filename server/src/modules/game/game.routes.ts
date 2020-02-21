import { Router } from 'express';
import Controller from './game.controller';
import passport = require('passport');

const authRouter = Router();

authRouter.post('/single/start', Controller.startNewGame);



export default authRouter;
