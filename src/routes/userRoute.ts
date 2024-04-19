import express from 'express';
import userCtr from '../controller/userController';

const userRouter = express.Router();

userRouter.post('/create', userCtr.createUser);

userRouter.post('/login', userCtr.loginUser);

export default userRouter;
