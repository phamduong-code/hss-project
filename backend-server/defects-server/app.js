import express from 'express';
import cors from 'cors';
import { unkwnownEndpoint, errorHandler } from './ultis/middleware.js';
import helper from './ultis/helper.js';
import userRouter from './routers/api/v0/userRouter.js';
import defectRouter from './routers/api/v0/defectRouter.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(helper.reqLogger);

app.use('/api/users', userRouter);
app.use('/api/defects', defectRouter);
app.use('/', express.static('dist'));

app.use(unkwnownEndpoint);
app.use(errorHandler);
export default app;
