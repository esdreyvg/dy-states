// Local types for web project to avoid workspace resolution issues

export enum Permission {
  // User management
  MANAGE_USERS = 'manage_users',
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  DELETE_USERS = 'delete_users',

  // Property management
  MANAGE_PROPERTIES = 'manage_properties',
  VIEW_PROPERTIES = 'view_properties',
  CREATE_PROPERTIES = 'create_properties',
  EDIT_PROPERTIES = 'edit_properties',
  DELETE_PROPERTIES = 'delete_properties',

  // Transaction management
  MANAGE_TRANSACTIONS = 'manage_transactions',
  VIEW_TRANSACTIONS = 'view_transactions',
  CREATE_TRANSACTIONS = 'create_transactions',

  // Report management
  VIEW_REPORTS = 'view_reports',
  GENERATE_REPORTS = 'generate_reports',

  // Administrative
  ADMIN_ACCESS = 'admin_access',
  SYSTEM_SETTINGS = 'system_settings',

  // Own content management
  MANAGE_OWN_CONTENT = 'manage_own_content',
  VIEW_OWN_CONTENT = 'view_own_content',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  isVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      marketing?: boolean;
    };
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  tokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'client' | 'agent' | 'owner' | 'investor';
  termsAccepted: boolean;
}

// Add missing types for the context
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  termsAccepted: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions?: string[];
  };
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}