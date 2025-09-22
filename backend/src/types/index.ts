// Base API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// Pagination interface
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// User role types
export enum UserRole {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
}

// Property status types
export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  PENDING = 'PENDING',
}

// Transaction types
export enum TransactionType {
  SALE = 'SALE',
  RENT = 'RENT',
  LEASE = 'LEASE',
}

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// JWT Token payload
export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// Request with authenticated user
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

// File upload interface
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  filename: string;
  path: string;
  url?: string;
}

// Database query options
export interface QueryOptions {
  include?: Record<string, boolean | QueryOptions>;
  where?: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  skip?: number;
  take?: number;
}

// Generic repository interface
export interface IRepository<T> {
  findById(id: string, options?: QueryOptions): Promise<T | null>;
  findMany(options?: QueryOptions): Promise<T[]>;
  create(data: Omit<T, keyof BaseEntity>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  count(options?: QueryOptions): Promise<number>;
}

// Service response interface
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// Email template interface
export interface EmailTemplate {
  to: string | string[];
  subject: string;
  template: string;
  data?: Record<string, any>;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: Record<string, any>;
}

export default {};