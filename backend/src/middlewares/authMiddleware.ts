import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Logic kiểm tra phân quyền sẽ được thêm sau
  next();
};