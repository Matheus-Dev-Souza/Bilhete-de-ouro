// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  
  const statusCodeMap: Record<string, number> = {
    ValidationError: 400,
    AuthError: 401,
    InsufficientFundsError: 402,
    NotFoundError: 404
  };

  const status = statusCodeMap[err.name] || 500;
  res.status(status).json({ 
    success: false,
    error: err.message 
  });
};

