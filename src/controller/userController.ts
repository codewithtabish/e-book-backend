import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/userModel';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(
        createHttpError(400, 'Please provide name, email and password'),
      );
    }
    const user = await new UserModel({ name, email, password });
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {}
};

export default { createUser, loginUser };
