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
    const lastUser = await user.save();
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

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id);
    console.log('here ');
    console.log(req.params.id);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    if ((req as any)?.user.id?.toString() !== user._id.toString()) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const name = req.body.name || user.name;
    const email = req.body.email || user.email;
    const password = req.body.password || user.password;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
      },
      { new: true },
    );
    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: HttpError | any) {
    return next(createHttpError(500, error));
  }
};

export default { createUser, loginUser, updateUser };
