import mongoose from 'mongoose';
import { UserSchemaTypes } from '../types/userTypes';
import bcrypt from 'bcrypt';
import createHttpError, { HttpError } from 'http-errors';

const UserSchema = new mongoose.Schema<UserSchemaTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  console.log('java');
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(
      this.password as string,
      saltRounds,
    );
    console.log(hashedPassword);
    this.password = hashedPassword;
    next();
  } catch (error: HttpError | any) {
    return next(createHttpError(error));
  }
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const isTrue = await bcrypt.compare(password, this.password);

  return isTrue;
};

const UserModel = mongoose.model<UserSchemaTypes>('User', UserSchema);

export default UserModel;
