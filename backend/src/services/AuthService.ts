import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/middleware/auth';
import {
  ValidationError,
  AuthenticationError,
  ConflictError,
} from '@/middleware/errorHandler';
import { UserRepository } from '@/repositories/UserRepository';
import { ServiceResponse, TokenPayload } from '@/types';
import { securityConfig } from '@/config';
import logger from '@/utils/logger';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | undefined;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private userRepository: UserRepository;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.userRepository = new UserRepository(this.prisma);
  }

  async register(data: RegisterData): Promise<ServiceResponse<AuthResponse>> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, securityConfig.bcryptRounds);

      // Create user
      const user = await this.userRepository.createUser({
        ...data,
        password: hashedPassword,
      });

      // Generate tokens
      const tokenPayload: Omit<TokenPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      // Store refresh token
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      logger.info(`User registered successfully: ${user.email}`);

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            emailVerified: user.emailVerified,
          },
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      logger.error(`Registration failed for ${data.email}:`, error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<ServiceResponse<AuthResponse>> {
    try {
      // Find user by email
      const user = await this.userRepository.findByEmail(credentials.email);
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        throw new AuthenticationError('Account is inactive');
      }

      // Update last login
      await this.userRepository.updateLastLogin(user.id);

      // Generate tokens
      const tokenPayload: Omit<TokenPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = generateToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      // Store refresh token
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });

      logger.info(`User logged in successfully: ${user.email}`);

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            emailVerified: user.emailVerified,
          },
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      logger.error(`Login failed for ${credentials.email}:`, error);
      throw error;
    }
  }

  async refreshToken(token: string): Promise<ServiceResponse<{ accessToken: string }>> {
    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(token);

      // Check if refresh token exists in database
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new AuthenticationError('Invalid or expired refresh token');
      }

      // Check if user is still active
      if (storedToken.user.status !== 'ACTIVE') {
        throw new AuthenticationError('User account is inactive');
      }

      // Generate new access token
      const tokenPayload: Omit<TokenPayload, 'iat' | 'exp'> = {
        userId: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role,
      };

      const accessToken = generateToken(tokenPayload);

      logger.info(`Token refreshed for user: ${storedToken.user.email}`);

      return {
        success: true,
        data: { accessToken },
      };
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw error;
    }
  }

  async logout(refreshToken: string): Promise<ServiceResponse<void>> {
    try {
      // Remove refresh token from database
      await this.prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });

      logger.info('User logged out successfully');

      return {
        success: true,
        message: 'Logged out successfully',
      };
    } catch (error) {
      logger.error('Logout failed:', error);
      throw error;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ServiceResponse<void>> {
    try {
      // Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new ValidationError('Current password is incorrect');
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, securityConfig.bcryptRounds);

      // Update password
      await this.userRepository.update(userId, { password: hashedNewPassword });

      // Invalidate all refresh tokens for this user
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });

      logger.info(`Password changed for user: ${user.email}`);

      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      logger.error(`Password change failed for user ${userId}:`, error);
      throw error;
    }
  }
}

export default AuthService;