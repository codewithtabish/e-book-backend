import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './routes/userRoute';
import bookRouter from './routes/bookRoutes';
import cors from 'cors';
import { config } from './config/config';

const app = express();

app.use(
  cors({
    origin: config.Frontend_Domain,
  }),
);
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/book', bookRouter);

app.use(globalErrorHandler);

export default app;
