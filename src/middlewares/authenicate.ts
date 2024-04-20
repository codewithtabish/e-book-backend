import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const authenticate = (req: any, res: any, next: any) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    console.log('token', token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const parsedToken = jwt.verify(token, config.JWT_SECRET as string);
    if (!parsedToken) {
      return res.status(401).json({ message: 'Unauthorized ' });
    }
    console.log(parsedToken);
    (req as any).user = parsedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized ' });
  }
};
