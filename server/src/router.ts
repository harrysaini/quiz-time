import { Router, Request, Response } from 'express'
import authRouter from './modules/auth/auth.routes'
import gameRouter from './modules/game/game.routes';
//import questionRouter from './modules/question/question.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('server started')
})

// setup api router
const apiRouter = Router()

//apiRouter.use('/question', questionRouter)
apiRouter.use('/auth', authRouter);
apiRouter.use('/game', gameRouter);

router.use('/api', apiRouter)

export default router
