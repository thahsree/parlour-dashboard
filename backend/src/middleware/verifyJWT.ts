import { parse } from 'cookie';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  role: number;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: number;
  };
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    console.log(decoded.role , "ROLE")

    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
};
