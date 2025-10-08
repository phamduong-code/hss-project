import express from 'express';
import cors from 'cors';
import { unkwnownEndpoint, errorHandler } from './ultis/middleware.js';
import helper from './ultis/helper.js';
import defectRouter from './routers/defectRouter.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(helper.reqLogger);

app.use('/api/defects', defectRouter);

app.use(unkwnownEndpoint);
app.use(errorHandler);
export default app;
