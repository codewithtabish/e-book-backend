import express from 'express';
import userCtr from '../controller/userController';
import { authenticate } from '../middlewares/authenicate';

const userRouter = express.Router();

userRouter.post('/create', userCtr.createUser);

userRouter.post('/login', userCtr.loginUser);

userRouter.route('/:id').patch(authenticate, userCtr.updateUser);

export default userRouter;
