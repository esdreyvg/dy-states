import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '@/services/AuthService';
import { ValidationError } from '@/middleware/errorHandler';
import { asyncHandler } from '@/middleware/errorHandler';
import { ApiResponse } from '@/types';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @swagger
   * /api/v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *               - firstName
   *               - lastName
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 minLength: 8
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               phone:
   *                 type: string
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Validation error
   *       409:
   *         description: User already exists
   */
  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(validation.error.issues[0]?.message || 'Validation failed');
    }

    const result = await this.authService.register(validation.data);

    const response: ApiResponse = {
      success: true,
      message: 'User registered successfully',
      data: result.data,
    };

    res.status(201).json(response);
  });

  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Invalid credentials
   */
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(validation.error.issues[0]?.message || 'Validation failed');
    }

    const result = await this.authService.login(validation.data);

    const response: ApiResponse = {
      success: true,
      message: 'Login successful',
      data: result.data,
    };

    res.status(200).json(response);
  });

  /**
   * @swagger
   * /api/v1/auth/refresh:
   *   post:
   *     summary: Refresh access token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   *       401:
   *         description: Invalid refresh token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new ValidationError('Refresh token is required');
    }

    const result = await this.authService.refreshToken(refreshToken);

    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed successfully',
      data: result.data,
    };

    res.status(200).json(response);
  });

  /**
   * @swagger
   * /api/v1/auth/logout:
   *   post:
   *     summary: Logout user
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - refreshToken
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Logout successful
   */
  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new ValidationError('Refresh token is required');
    }

    await this.authService.logout(refreshToken);

    const response: ApiResponse = {
      success: true,
      message: 'Logout successful',
    };

    res.status(200).json(response);
  });

  /**
   * @swagger
   * /api/v1/auth/change-password:
   *   post:
   *     summary: Change user password
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - currentPassword
   *               - newPassword
   *             properties:
   *               currentPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *                 minLength: 8
   *     responses:
   *       200:
   *         description: Password changed successfully
   *       400:
   *         description: Invalid current password
   */
  changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validation = changePasswordSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(validation.error.issues[0]?.message || 'Validation failed');
    }

    if (!req.user) {
      throw new ValidationError('User not authenticated');
    }

    await this.authService.changePassword(
      req.user.userId,
      validation.data.currentPassword,
      validation.data.newPassword
    );

    const response: ApiResponse = {
      success: true,
      message: 'Password changed successfully',
    };

    res.status(200).json(response);
  });

  /**
   * @swagger
   * /api/v1/auth/me:
   *   get:
   *     summary: Get current user profile
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *       401:
   *         description: Unauthorized
   */
  getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new ValidationError('User not authenticated');
    }

    const response: ApiResponse = {
      success: true,
      message: 'User profile retrieved successfully',
      data: req.user,
    };

    res.status(200).json(response);
  });
}

export default AuthController;