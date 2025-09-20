import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '../types/auth';

import {
  Property,
  PropertySearchFilters,
  PropertySearchResult,
  CreatePropertyDTO,
  UpdatePropertyDTO,
} from '../types/property';

import { 
  User, 
  CreateUserDTO, 
  UpdateUserDTO, 
  UserProfile 
} from '../types/user';

import { ApiResponse, PaginationParams } from '../types/api';

// Authentication API Responses
export interface AuthApiResponses {
  login: ApiResponse<LoginResponse>;
  register: ApiResponse<RegisterResponse>;
  refreshToken: ApiResponse<RefreshTokenResponse>;
  forgotPassword: ApiResponse<ForgotPasswordResponse>;
  resetPassword: ApiResponse<ResetPasswordResponse>;
  changePassword: ApiResponse<{ message: string }>;
  verifyEmail: ApiResponse<VerifyEmailResponse>;
  logout: ApiResponse<{ message: string }>;
}

// User API Responses
export interface UserApiResponses {
  getProfile: ApiResponse<UserProfile>;
  updateProfile: ApiResponse<User>;
  updatePreferences: ApiResponse<User>;
  uploadAvatar: ApiResponse<{ avatarUrl: string }>;
  getUsersList: ApiResponse<User[]>;
  createUser: ApiResponse<User>;
  updateUser: ApiResponse<User>;
  deleteUser: ApiResponse<{ message: string }>;
}

// Property API Responses
export interface PropertyApiResponses {
  getProperties: ApiResponse<PropertySearchResult>;
  getProperty: ApiResponse<Property>;
  createProperty: ApiResponse<Property>;
  updateProperty: ApiResponse<Property>;
  deleteProperty: ApiResponse<{ message: string }>;
  searchProperties: ApiResponse<PropertySearchResult>;
  getFeaturedProperties: ApiResponse<Property[]>;
  getSimilarProperties: ApiResponse<Property[]>;
  addToFavorites: ApiResponse<{ message: string }>;
  removeFromFavorites: ApiResponse<{ message: string }>;
  getFavorites: ApiResponse<Property[]>;
  recordView: ApiResponse<{ viewsCount: number }>;
}

// File Upload API Responses
export interface UploadApiResponses {
  uploadImage: ApiResponse<{ url: string; id: string }>;
  uploadDocument: ApiResponse<{ url: string; id: string; fileName: string }>;
  uploadMultipleImages: ApiResponse<Array<{ url: string; id: string }>>;
  deleteFile: ApiResponse<{ message: string }>;
}

// Search API Responses
export interface SearchApiResponses {
  searchProperties: ApiResponse<PropertySearchResult>;
  searchLocations: ApiResponse<Array<{ name: string; type: string; coordinates: { lat: number; lng: number } }>>;
  getSearchSuggestions: ApiResponse<Array<{ text: string; type: string }>>;
  saveSearch: ApiResponse<{ id: string; message: string }>;
  getSavedSearches: ApiResponse<Array<{ id: string; name: string; filters: PropertySearchFilters; createdAt: Date }>>;
}

// Analytics API Responses
export interface AnalyticsApiResponses {
  getPropertyViews: ApiResponse<{ views: number; uniqueViews: number; dailyViews: Array<{ date: string; views: number }> }>;
  getUserActivity: ApiResponse<{ 
    totalViews: number;
    totalSearches: number;
    favoriteProperties: number;
    recentActivity: Array<{ type: string; description: string; timestamp: Date }>;
  }>;
  getSearchAnalytics: ApiResponse<{
    totalSearches: number;
    popularFilters: Array<{ filter: string; count: number }>;
    searchTrends: Array<{ period: string; searches: number }>;
  }>;
}

// Notification API Responses
export interface NotificationApiResponses {
  getNotifications: ApiResponse<Array<{
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    data?: any;
  }>>;
  markAsRead: ApiResponse<{ message: string }>;
  markAllAsRead: ApiResponse<{ message: string }>;
  updateNotificationPreferences: ApiResponse<{ message: string }>;
}

// Combined API Response Types
export interface ApiResponses 
  extends AuthApiResponses,
          UserApiResponses,
          PropertyApiResponses,
          UploadApiResponses,
          SearchApiResponses,
          AnalyticsApiResponses,
          NotificationApiResponses {}

// Generic List Response
export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Error Response
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    path?: string;
  };
}