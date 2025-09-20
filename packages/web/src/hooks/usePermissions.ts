import { User } from '@/types/auth';

// Permission types - local definitions
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
}

// Utility functions for permission checking
const hasPermission = (userPermissions: string[], requiredPermission: Permission): boolean => {
  return userPermissions.includes(requiredPermission);
};

const hasAnyPermission = (userPermissions: string[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

const hasAllPermissions = (userPermissions: string[], requiredPermissions: Permission[]): boolean => {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

// Hook for checking permissions in React components
export const usePermissions = (user: User | null) => {
  const checkPermission = (permission: Permission): boolean => {
    if (!user?.permissions) return false;
    return hasPermission(user.permissions, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user?.permissions) return false;
    return hasAnyPermission(user.permissions, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user?.permissions) return false;
    return hasAllPermissions(user.permissions, permissions);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin' || false;
  };

  const isAgent = (): boolean => {
    return user?.role === 'agent' || false;
  };

  const isOwner = (): boolean => {
    return user?.role === 'owner' || false;
  };

  const isClient = (): boolean => {
    return user?.role === 'client' || false;
  };

  const isInvestor = (): boolean => {
    return user?.role === 'investor' || false;
  };

  return {
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    isAdmin,
    isAgent,
    isOwner,
    isClient,
    isInvestor,
    hasPermissions: Boolean(user?.permissions?.length),
  };
};