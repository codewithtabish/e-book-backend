import jwt from 'jsonwebtoken';
import { UserSchemaTypes } from '../types/userTypes';
import { config } from '../config/config';

function generateToken(user: any): string {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, config.JWT_SECRET as string);
  return token;
}

export default {
  generateToken,
};
