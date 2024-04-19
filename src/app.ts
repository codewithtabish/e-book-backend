import express, { NextFunction, Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import createHttpError from 'http-errors';
import userRouter from './routes/userRoute';

const app = express();

app.use(express.json());

// app.use('/', (req: Request, res: Response, next: NextFunction) => {
//   const error = createHttpError(404, 'This is not');
//   next(error);
//   // res.send('hello world');
// });

app.use('/api/v1/user', userRouter);

app.use(globalErrorHandler);

export default app;
