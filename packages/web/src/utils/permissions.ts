// Permission utilities for checking user permissions

interface User {
  permissions: string[];
}

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

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User, permission: Permission): boolean {
  if (!user || !user.permissions) {
    return false;
  }
  return user.permissions.includes(permission);
}

/**
 * Check if a user has any of the specified permissions
 */
export function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  if (!user || !user.permissions) {
    return false;
  }
  return permissions.some(permission => user.permissions.includes(permission));
}

/**
 * Check if a user has all of the specified permissions
 */
export function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  if (!user || !user.permissions) {
    return false;
  }
  return permissions.every(permission => user.permissions.includes(permission));
}

/**
 * Get role-based permissions
 */
export function getRolePermissions(role: string): Permission[] {
  const rolePermissions: Record<string, Permission[]> = {
    admin: [
      Permission.MANAGE_USERS,
      Permission.VIEW_USERS,
      Permission.CREATE_USERS,
      Permission.DELETE_USERS,
      Permission.MANAGE_PROPERTIES,
      Permission.VIEW_PROPERTIES,
      Permission.CREATE_PROPERTIES,
      Permission.EDIT_PROPERTIES,
      Permission.DELETE_PROPERTIES,
      Permission.MANAGE_TRANSACTIONS,
      Permission.VIEW_TRANSACTIONS,
      Permission.CREATE_TRANSACTIONS,
      Permission.VIEW_REPORTS,
      Permission.GENERATE_REPORTS,
      Permission.ADMIN_ACCESS,
      Permission.SYSTEM_SETTINGS,
      Permission.MANAGE_OWN_CONTENT,
      Permission.VIEW_OWN_CONTENT,
    ],
    agent: [
      Permission.VIEW_USERS,
      Permission.MANAGE_PROPERTIES,
      Permission.VIEW_PROPERTIES,
      Permission.CREATE_PROPERTIES,
      Permission.EDIT_PROPERTIES,
      Permission.MANAGE_TRANSACTIONS,
      Permission.VIEW_TRANSACTIONS,
      Permission.CREATE_TRANSACTIONS,
      Permission.VIEW_REPORTS,
      Permission.MANAGE_OWN_CONTENT,
      Permission.VIEW_OWN_CONTENT,
    ],
    owner: [
      Permission.VIEW_PROPERTIES,
      Permission.CREATE_PROPERTIES,
      Permission.EDIT_PROPERTIES,
      Permission.VIEW_TRANSACTIONS,
      Permission.CREATE_TRANSACTIONS,
      Permission.VIEW_REPORTS,
      Permission.MANAGE_OWN_CONTENT,
      Permission.VIEW_OWN_CONTENT,
    ],
    client: [
      Permission.VIEW_PROPERTIES,
      Permission.VIEW_TRANSACTIONS,
      Permission.CREATE_TRANSACTIONS,
      Permission.MANAGE_OWN_CONTENT,
      Permission.VIEW_OWN_CONTENT,
    ],
    investor: [
      Permission.VIEW_PROPERTIES,
      Permission.VIEW_TRANSACTIONS,
      Permission.CREATE_TRANSACTIONS,
      Permission.VIEW_REPORTS,
      Permission.MANAGE_OWN_CONTENT,
      Permission.VIEW_OWN_CONTENT,
    ],
  };

  return rolePermissions[role] || [];
}