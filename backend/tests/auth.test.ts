import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import App from '@/app';
import { describe, it, beforeEach } from 'node:test';

const app = new App().app;
const prisma = new PrismaClient();

describe('Authentication Endpoints', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'CLIENT',
            emailVerified: false,
          },
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      });
    });

    it('should return validation error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        code: 'VALIDATION_ERROR',
      });
    });

    it('should return conflict error for existing email', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      // Register user first time
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      // Try to register same email again
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body).toMatchObject({
        success: false,
        code: 'CONFLICT_ERROR',
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      const userData = {
        email: 'login@example.com',
        password: 'password123',
        firstName: 'Login',
        lastName: 'User',
      };

      await request(app)
        .post('/api/v1/auth/register')
        .send(userData);
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            email: loginData.email,
            firstName: 'Login',
            lastName: 'User',
            role: 'CLIENT',
          },
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      });
    });

    it('should return authentication error for invalid credentials', async () => {
      const loginData = {
        email: 'login@example.com',
        password: 'wrongpassword',
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        code: 'AUTHENTICATION_ERROR',
      });
    });

    it('should return authentication error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        code: 'AUTHENTICATION_ERROR',
      });
    });
  });

  describe('GET /api/v1/auth/me', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Register and login to get access token
      const userData = {
        email: 'me@example.com',
        password: 'password123',
        firstName: 'Me',
        lastName: 'User',
      };

      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send(userData);

      accessToken = registerResponse.body.data.accessToken;
    });

    it('should return current user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          userId: expect.any(String),
          email: 'me@example.com',
          role: 'CLIENT',
        },
      });
    });

    it('should return authentication error without token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        code: 'AUTHENTICATION_ERROR',
      });
    });

    it('should return authentication error with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        code: 'AUTHENTICATION_ERROR',
      });
    });
  });
});

function expect(body: any) {
    throw new Error('Function not implemented.');
}
