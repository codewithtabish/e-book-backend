import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello world');
});

export default app;
