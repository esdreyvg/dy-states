// Permission types and role-based access control
export var Permission;
(function (Permission) {
    // User management
    Permission["USER_CREATE"] = "user:create";
    Permission["USER_READ"] = "user:read";
    Permission["USER_UPDATE"] = "user:update";
    Permission["USER_DELETE"] = "user:delete";
    Permission["USER_LIST"] = "user:list";
    // Property management
    Permission["PROPERTY_CREATE"] = "property:create";
    Permission["PROPERTY_READ"] = "property:read";
    Permission["PROPERTY_UPDATE"] = "property:update";
    Permission["PROPERTY_DELETE"] = "property:delete";
    Permission["PROPERTY_LIST"] = "property:list";
    Permission["PROPERTY_PUBLISH"] = "property:publish";
    Permission["PROPERTY_MODERATE"] = "property:moderate";
    // Admin functions
    Permission["ADMIN_DASHBOARD"] = "admin:dashboard";
    Permission["ADMIN_ANALYTICS"] = "admin:analytics";
    Permission["ADMIN_SETTINGS"] = "admin:settings";
    Permission["ADMIN_REPORTS"] = "admin:reports";
    // Profile management
    Permission["PROFILE_READ"] = "profile:read";
    Permission["PROFILE_UPDATE"] = "profile:update";
    Permission["PROFILE_DELETE"] = "profile:delete";
    // Favorites and searches
    Permission["FAVORITES_MANAGE"] = "favorites:manage";
    Permission["SEARCHES_SAVE"] = "searches:save";
    // Communications
    Permission["MESSAGES_SEND"] = "messages:send";
    Permission["MESSAGES_READ"] = "messages:read";
    // Financial operations
    Permission["PAYMENT_PROCESS"] = "payment:process";
    Permission["PAYMENT_VIEW"] = "payment:view";
    // Notifications
    Permission["NOTIFICATIONS_SEND"] = "notifications:send";
    Permission["NOTIFICATIONS_MANAGE"] = "notifications:manage";
})(Permission || (Permission = {}));
// Role-based permissions mapping
export const RolePermissions = {
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
export const hasPermission = (userPermissions, requiredPermission) => {
    return userPermissions.includes(requiredPermission);
};
export const hasAnyPermission = (userPermissions, requiredPermissions) => {
    return requiredPermissions.some(permission => userPermissions.includes(permission));
};
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
    return requiredPermissions.every(permission => userPermissions.includes(permission));
};
export const getPermissionsForRole = (role) => {
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
};
