import { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import UserModel from '../models/userModel';
import authUtils from '../utils/authUtils';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(
        createHttpError(400, 'Please provide name, email and password'),
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(createHttpError(409, 'User already exists'));
    }
    const user = await new UserModel({ name, email, password });
    await user.save();
    const token = authUtils.generateToken(user);
    return res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, 'Please provide email and password'));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(createHttpError(401, 'Invalid credentials'));
    }
    const token = authUtils.generateToken(user);
    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error: HttpError | any) {
    return next(createHttpError(500, 'server error'));
  }
};

export default { createUser, loginUser };
