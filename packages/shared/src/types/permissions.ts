// Permission types and role-based access control
export enum Permission {
  // User management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_LIST = 'user:list',
  
  // Property management
  PROPERTY_CREATE = 'property:create',
  PROPERTY_READ = 'property:read',
  PROPERTY_UPDATE = 'property:update',
  PROPERTY_DELETE = 'property:delete',
  PROPERTY_LIST = 'property:list',
  PROPERTY_PUBLISH = 'property:publish',
  PROPERTY_MODERATE = 'property:moderate',
  
  // Admin functions
  ADMIN_DASHBOARD = 'admin:dashboard',
  ADMIN_ANALYTICS = 'admin:analytics',
  ADMIN_SETTINGS = 'admin:settings',
  ADMIN_REPORTS = 'admin:reports',
  
  // Profile management
  PROFILE_READ = 'profile:read',
  PROFILE_UPDATE = 'profile:update',
  PROFILE_DELETE = 'profile:delete',
  
  // Favorites and searches
  FAVORITES_MANAGE = 'favorites:manage',
  SEARCHES_SAVE = 'searches:save',
  
  // Communications
  MESSAGES_SEND = 'messages:send',
  MESSAGES_READ = 'messages:read',
  
  // Financial operations
  PAYMENT_PROCESS = 'payment:process',
  PAYMENT_VIEW = 'payment:view',
  
  // Notifications
  NOTIFICATIONS_SEND = 'notifications:send',
  NOTIFICATIONS_MANAGE = 'notifications:manage',
}

// Role-based permissions mapping
export const RolePermissions: Record<string, Permission[]> = {
  admin: [
    // Full access to everything
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_LIST,
    Permission.PROPERTY_CREATE,
    Permission.PROPERTY_READ,
    Permission.PROPERTY_UPDATE,
    Permission.PROPERTY_DELETE,
    Permission.PROPERTY_LIST,
    Permission.PROPERTY_PUBLISH,
    Permission.PROPERTY_MODERATE,
    Permission.ADMIN_DASHBOARD,
    Permission.ADMIN_ANALYTICS,
    Permission.ADMIN_SETTINGS,
    Permission.ADMIN_REPORTS,
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.PROFILE_DELETE,
    Permission.FAVORITES_MANAGE,
    Permission.SEARCHES_SAVE,
    Permission.MESSAGES_SEND,
    Permission.MESSAGES_READ,
    Permission.PAYMENT_PROCESS,
    Permission.PAYMENT_VIEW,
    Permission.NOTIFICATIONS_SEND,
    Permission.NOTIFICATIONS_MANAGE,
  ],
  
  agent: [
    // Property management and client interaction
    Permission.PROPERTY_CREATE,
    Permission.PROPERTY_READ,
    Permission.PROPERTY_UPDATE,
    Permission.PROPERTY_LIST,
    Permission.PROPERTY_PUBLISH,
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.FAVORITES_MANAGE,
    Permission.SEARCHES_SAVE,
    Permission.MESSAGES_SEND,
    Permission.MESSAGES_READ,
    Permission.PAYMENT_VIEW,
    Permission.USER_READ, // Can view client profiles
  ],
  
  owner: [
    // Property owners can manage their properties
    Permission.PROPERTY_CREATE,
    Permission.PROPERTY_READ,
    Permission.PROPERTY_UPDATE,
    Permission.PROPERTY_LIST,
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.MESSAGES_SEND,
    Permission.MESSAGES_READ,
    Permission.PAYMENT_VIEW,
  ],
  
  client: [
    // Basic client permissions
    Permission.PROPERTY_READ,
    Permission.PROPERTY_LIST,
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.FAVORITES_MANAGE,
    Permission.SEARCHES_SAVE,
    Permission.MESSAGES_SEND,
    Permission.MESSAGES_READ,
  ],
  
  investor: [
    // Similar to client but with additional financial access
    Permission.PROPERTY_READ,
    Permission.PROPERTY_LIST,
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.FAVORITES_MANAGE,
    Permission.SEARCHES_SAVE,
    Permission.MESSAGES_SEND,
    Permission.MESSAGES_READ,
    Permission.PAYMENT_PROCESS,
    Permission.PAYMENT_VIEW,
  ],
};

// Utility functions for permission checking
export const hasPermission = (userPermissions: string[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasAllPermissions = (userPermissions: string[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

export const getPermissionsForRole = (role: string): Permission[] => {
  return RolePermissions[role] || [];
};

// Permission groups for easier management
export const PermissionGroups = {
  USER_MANAGEMENT: [
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_LIST,
  ],
  PROPERTY_MANAGEMENT: [
    Permission.PROPERTY_CREATE,
    Permission.PROPERTY_READ,
    Permission.PROPERTY_UPDATE,
    Permission.PROPERTY_DELETE,
    Permission.PROPERTY_LIST,
    Permission.PROPERTY_PUBLISH,
    Permission.PROPERTY_MODERATE,
  ],
  ADMIN_FUNCTIONS: [
    Permission.ADMIN_DASHBOARD,
    Permission.ADMIN_ANALYTICS,
    Permission.ADMIN_SETTINGS,
    Permission.ADMIN_REPORTS,
  ],
  BASIC_USER: [
    Permission.PROFILE_READ,
    Permission.PROFILE_UPDATE,
    Permission.FAVORITES_MANAGE,
    Permission.SEARCHES_SAVE,
  ],
} as const;

export type PermissionGroup = keyof typeof PermissionGroups;