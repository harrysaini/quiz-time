import express from 'express';
import cors from 'cors';
import './passport-jwt';

import router from '../router';

const app: express.Application = express();

app.use(cors());

const port: string | number  = process.env.PORT || '3000';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(router);


export default app;
