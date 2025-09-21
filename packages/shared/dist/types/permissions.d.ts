export declare enum Permission {
    USER_CREATE = "user:create",
    USER_READ = "user:read",
    USER_UPDATE = "user:update",
    USER_DELETE = "user:delete",
    USER_LIST = "user:list",
    PROPERTY_CREATE = "property:create",
    PROPERTY_READ = "property:read",
    PROPERTY_UPDATE = "property:update",
    PROPERTY_DELETE = "property:delete",
    PROPERTY_LIST = "property:list",
    PROPERTY_PUBLISH = "property:publish",
    PROPERTY_MODERATE = "property:moderate",
    ADMIN_DASHBOARD = "admin:dashboard",
    ADMIN_ANALYTICS = "admin:analytics",
    ADMIN_SETTINGS = "admin:settings",
    ADMIN_REPORTS = "admin:reports",
    PROFILE_READ = "profile:read",
    PROFILE_UPDATE = "profile:update",
    PROFILE_DELETE = "profile:delete",
    FAVORITES_MANAGE = "favorites:manage",
    SEARCHES_SAVE = "searches:save",
    MESSAGES_SEND = "messages:send",
    MESSAGES_READ = "messages:read",
    PAYMENT_PROCESS = "payment:process",
    PAYMENT_VIEW = "payment:view",
    NOTIFICATIONS_SEND = "notifications:send",
    NOTIFICATIONS_MANAGE = "notifications:manage"
}
export declare const RolePermissions: Record<string, Permission[]>;
export declare const hasPermission: (userPermissions: string[], requiredPermission: Permission) => boolean;
export declare const hasAnyPermission: (userPermissions: string[], requiredPermissions: Permission[]) => boolean;
export declare const hasAllPermissions: (userPermissions: string[], requiredPermissions: Permission[]) => boolean;
export declare const getPermissionsForRole: (role: string) => Permission[];
export declare const PermissionGroups: {
    readonly USER_MANAGEMENT: readonly [Permission.USER_CREATE, Permission.USER_READ, Permission.USER_UPDATE, Permission.USER_DELETE, Permission.USER_LIST];
    readonly PROPERTY_MANAGEMENT: readonly [Permission.PROPERTY_CREATE, Permission.PROPERTY_READ, Permission.PROPERTY_UPDATE, Permission.PROPERTY_DELETE, Permission.PROPERTY_LIST, Permission.PROPERTY_PUBLISH, Permission.PROPERTY_MODERATE];
    readonly ADMIN_FUNCTIONS: readonly [Permission.ADMIN_DASHBOARD, Permission.ADMIN_ANALYTICS, Permission.ADMIN_SETTINGS, Permission.ADMIN_REPORTS];
    readonly BASIC_USER: readonly [Permission.PROFILE_READ, Permission.PROFILE_UPDATE, Permission.FAVORITES_MANAGE, Permission.SEARCHES_SAVE];
};
export type PermissionGroup = keyof typeof PermissionGroups;
