import express, { NextFunction, Request, Response, Router } from 'express';
import cors from 'cors';

import router from '../router';

const app: express.Application = express();

app.use(cors());

const port: string | number  = process.env.PORT || '3002';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);


// serve static files from here
// app.use(express.static(path.join(__dirname, '../../../client/build/')));
// app.get('*', ((req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../../../client/build/'));
// }));

export default app;
