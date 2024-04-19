import express, { NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import createHttpError from 'http-errors';

const app = express();

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  const error = createHttpError(404, 'This is not');
  throw error;
  // res.send('hello world');
});

app.use(globalErrorHandler);

export default app;
