// Web Service Configuration
export const webApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Mobile Service Configuration
export const mobileApiConfig = {
  baseURL: __DEV__ ? 'http://10.0.2.2:3001/api/v1' : 'https://api.dominicanestate.com/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// GraphQL Configuration
export const graphqlConfig = {
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql',
  wsUri: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || 'ws://localhost:3001/graphql',
};

// Auth Configuration
export const authConfig = {
  tokenKey: 'dominican_estates_token',
  refreshTokenKey: 'dominican_estates_refresh_token',
  userKey: 'dominican_estates_user',
  tokenExpireTime: 15 * 60 * 1000, // 15 minutes
  refreshTokenExpireTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  autoRefreshBuffer: 2 * 60 * 1000, // 2 minutes before expiry
};

// Request/Response Configuration
export const requestConfig = {
  retryAttempts: 3,
  retryDelay: 1000,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  longCacheTimeout: 30 * 60 * 1000, // 30 minutes
};

// File Upload Configuration
export const uploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  maxImagesPerProperty: 20,
};