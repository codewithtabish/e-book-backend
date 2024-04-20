import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import userRouter from './routes/userRoute';
import bookRouter from './routes/bookRoutes';
import cors from 'cors';
import { config } from './config/config';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    users: [
      {
        id: 1,
        name: 'John',
        age: 25,
      },
      {
        id: 2,
        name: 'Alice',
        age: 30,
      },
      {
        id: 3,
        name: 'Bob',
        age: 28,
      },
    ],
  });
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/book', bookRouter);

app.use(globalErrorHandler);

export default app;
