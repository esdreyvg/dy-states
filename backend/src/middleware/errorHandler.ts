import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export class CustomError extends Error implements AppError {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;

  constructor(message: string, statusCode = 500, isOperational = true, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Predefined error classes
export class ValidationError extends CustomError {
  constructor(message: string, code?: string) {
    super(message, 400, true, code || 'VALIDATION_ERROR');
  }
}

export class AuthenticationError extends CustomError {
  constructor(message = 'Authentication failed', code?: string) {
    super(message, 401, true, code || 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends CustomError {
  constructor(message = 'Insufficient permissions', code?: string) {
    super(message, 403, true, code || 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Resource not found', code?: string) {
    super(message, 404, true, code || 'NOT_FOUND_ERROR');
  }
}

export class ConflictError extends CustomError {
  constructor(message = 'Resource already exists', code?: string) {
    super(message, 409, true, code || 'CONFLICT_ERROR');
  }
}

export class DatabaseError extends CustomError {
  constructor(message = 'Database operation failed', code?: string) {
    super(message, 500, true, code || 'DATABASE_ERROR');
  }
}

// Error handling middleware
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { statusCode = 500, message, isOperational = false, code, stack } = error;

  // Log error
  if (isOperational) {
    logger.warn(`Operational Error: ${message}`, {
      statusCode,
      code,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  } else {
    logger.error(`System Error: ${message}`, {
      statusCode,
      code,
      stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  }

  // Send error response
  const errorResponse = {
    success: false,
    message: isOperational ? message : 'Internal server error',
    code: code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack }),
  };

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

export default errorHandler;