// Base API URL
export const API_BASE_URL = '/api/v1';

// GraphQL
export const GRAPHQL_ENDPOINT = '/graphql';

// WebSocket
export const WS_ENDPOINT = '/ws';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  CHANGE_PASSWORD: '/auth/change-password',
  PROFILE: '/auth/profile',
} as const;

// User Endpoints
export const USER_ENDPOINTS = {
  BASE: '/users',
  PROFILE: '/users/profile',
  PREFERENCES: '/users/preferences',
  AVATAR: '/users/avatar',
  FAVORITES: '/users/favorites',
  SEARCHES: '/users/searches',
} as const;

// Property Endpoints
export const PROPERTY_ENDPOINTS = {
  BASE: '/properties',
  SEARCH: '/properties/search',
  FEATURED: '/properties/featured',
  SIMILAR: '/properties/similar',
  IMAGES: '/properties/:id/images',
  FAVORITES: '/properties/:id/favorite',
  VIEWS: '/properties/:id/views',
} as const;

// Agent Endpoints
export const AGENT_ENDPOINTS = {
  BASE: '/agents',
  PROPERTIES: '/agents/:id/properties',
  PROFILE: '/agents/:id/profile',
  CONTACT: '/agents/:id/contact',
} as const;

// File Upload Endpoints
export const UPLOAD_ENDPOINTS = {
  IMAGES: '/upload/images',
  DOCUMENTS: '/upload/documents',
  AVATAR: '/upload/avatar',
} as const;

// Notification Endpoints
export const NOTIFICATION_ENDPOINTS = {
  BASE: '/notifications',
  MARK_READ: '/notifications/:id/read',
  MARK_ALL_READ: '/notifications/read-all',
  PREFERENCES: '/notifications/preferences',
} as const;

// Search & Filter Endpoints
export const SEARCH_ENDPOINTS = {
  PROPERTIES: '/search/properties',
  AGENTS: '/search/agents',
  LOCATIONS: '/search/locations',
  SUGGESTIONS: '/search/suggestions',
} as const;

// Analytics Endpoints
export const ANALYTICS_ENDPOINTS = {
  PROPERTY_VIEWS: '/analytics/property-views',
  SEARCH_ANALYTICS: '/analytics/searches',
  USER_ACTIVITY: '/analytics/user-activity',
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const;

// Request Headers
export const REQUEST_HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  ACCEPT_LANGUAGE: 'Accept-Language',
  USER_AGENT: 'User-Agent',
  X_REQUESTED_WITH: 'X-Requested-With',
} as const;

// Response Headers
export const RESPONSE_HEADERS = {
  CONTENT_TYPE: 'content-type',
  SET_COOKIE: 'set-cookie',
  CACHE_CONTROL: 'cache-control',
  ETAG: 'etag',
  LAST_MODIFIED: 'last-modified',
} as const;