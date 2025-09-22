import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment validation schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  
  // Database
  DATABASE_URL: z.string().min(1, 'Database URL is required'),
  DATABASE_URL_TEST: z.string().optional(),
  
  // JWT
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT refresh secret must be at least 32 characters'),
  JWT_EXPIRE_TIME: z.string().default('1h'),
  JWT_REFRESH_EXPIRE_TIME: z.string().default('7d'),
  
  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_PASSWORD: z.string().optional(),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_SECURE: z.string().transform(val => val === 'true').optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // File Upload
  MAX_FILE_SIZE: z.string().default('5mb'),
  UPLOAD_PATH: z.string().default('./uploads'),
  
  // API
  API_PREFIX: z.string().default('/api/v1'),
  GRAPHQL_PATH: z.string().default('/graphql'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE: z.string().default('./logs/app.log'),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),

  // Security
  BCRYPT_ROUNDS: z.string().transform(Number).default('12'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  
  // Development
  DEBUG: z.string().transform(val => val === 'true').default('false'),
});

// Validate environment variables
const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('❌ Invalid environment variables:');
  console.error(envValidation.error.format());
  process.exit(1);
}

export const config = envValidation.data;

// Database configuration
export const dbConfig = {
  url: config.NODE_ENV === 'test' ? config.DATABASE_URL_TEST || config.DATABASE_URL : config.DATABASE_URL,
};

// JWT configuration
export const jwtConfig = {
  secret: config.JWT_SECRET,
  refreshSecret: config.JWT_REFRESH_SECRET,
  expiresIn: config.JWT_EXPIRE_TIME,
  refreshExpiresIn: config.JWT_REFRESH_EXPIRE_TIME,
};

// Redis configuration
export const redisConfig = {
  url: config.REDIS_URL,
  password: config.REDIS_PASSWORD,
};

// Email configuration
export const emailConfig = {
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  auth: config.SMTP_USER && config.SMTP_PASS ? {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  } : undefined,
};

// File upload configuration
export const uploadConfig = {
  maxSize: config.MAX_FILE_SIZE,
  path: config.UPLOAD_PATH,
};

// API configuration
export const apiConfig = {
  prefix: config.API_PREFIX,
  graphqlPath: config.GRAPHQL_PATH,
};

// Logging configuration
export const logConfig = {
  level: config.LOG_LEVEL,
  file: config.LOG_FILE,
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  maxRequests: config.RATE_LIMIT_MAX_REQUESTS,
};

// Security configuration
export const securityConfig = {
  bcryptRounds: config.BCRYPT_ROUNDS,
  corsOrigin: config.CORS_ORIGIN,
};

export default config;