import {Router, Request, Response} from 'express';
//import authRouter from './modules/auth/auth.routes';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    res.send('server started');
});

const apiRouter = Router();

//apiRouter.use('/auth', authRouter);

router.use('/api', apiRouter);


export default router;