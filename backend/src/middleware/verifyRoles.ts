import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: number;
  };
}

export const verifyRoles = (...allowedRoles: number[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;

    if (userRole === undefined) {
      res.status(403).json({ message: 'Forbidden: No role found' });
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      res.status(401).json({ message: 'Unauthorized: Role not allowed' });
      return;
    }

    next(); // ✅ only returns void
  };
};
