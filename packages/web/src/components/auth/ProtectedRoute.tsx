'use client';

import { useAuth } from '@/context/auth-provider';
import { usePermissions, Permission } from '@/hooks/usePermissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredPermissions?: Permission[];
  requireAllPermissions?: boolean;
  requiredRole?: string;
  requiredRoles?: string[];
  fallbackPath?: string;
  showUnauthorized?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredPermissions = [],
  requireAllPermissions = false,
  requiredRole,
  requiredRoles = [],
  fallbackPath = '/auth/login',
  showUnauthorized = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { checkPermission, checkAnyPermission, checkAllPermissions } = usePermissions(user);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(fallbackPath);
      return;
    }

    if (!isLoading && isAuthenticated && user) {
      // Check role requirements
      if (requiredRole && user.role !== requiredRole) {
        if (showUnauthorized) {
          router.push('/unauthorized');
        } else {
          router.push(fallbackPath);
        }
        return;
      }

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        if (showUnauthorized) {
          router.push('/unauthorized');
        } else {
          router.push(fallbackPath);
        }
        return;
      }

      // Check permission requirements
      if (requiredPermission && !checkPermission(requiredPermission)) {
        if (showUnauthorized) {
          router.push('/unauthorized');
        } else {
          router.push(fallbackPath);
        }
        return;
      }

      if (requiredPermissions.length > 0) {
        const hasRequiredPermissions = requireAllPermissions
          ? checkAllPermissions(requiredPermissions)
          : checkAnyPermission(requiredPermissions);

        if (!hasRequiredPermissions) {
          if (showUnauthorized) {
            router.push('/unauthorized');
          } else {
            router.push(fallbackPath);
          }
          return;
        }
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    requiredPermission,
    requiredPermissions,
    requireAllPermissions,
    requiredRole,
    requiredRoles,
    fallbackPath,
    showUnauthorized,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    router,
  ]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated or not authorized
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check permissions one more time before rendering
  if (requiredPermission && !checkPermission(requiredPermission)) {
    return null;
  }

  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requireAllPermissions
      ? checkAllPermissions(requiredPermissions)
      : checkAnyPermission(requiredPermissions);

    if (!hasRequiredPermissions) {
      return null;
    }
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

// Higher-order component for protecting pages
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  config?: Omit<ProtectedRouteProps, 'children'>
) => {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute {...config}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Utility component for conditional rendering based on permissions
interface PermissionGateProps {
  children: React.ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  role?: string;
  roles?: string[];
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permission,
  permissions = [],
  requireAll = false,
  role,
  roles = [],
  fallback = null,
}) => {
  const { user } = useAuth();
  const { checkPermission, checkAnyPermission, checkAllPermissions } = usePermissions(user);

  if (!user) {
    return <>{fallback}</>;
  }

  // Check role requirements
  if (role && user.role !== role) {
    return <>{fallback}</>;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <>{fallback}</>;
  }

  // Check permission requirements
  if (permission && !checkPermission(permission)) {
    return <>{fallback}</>;
  }

  if (permissions.length > 0) {
    const hasRequiredPermissions = requireAll
      ? checkAllPermissions(permissions)
      : checkAnyPermission(permissions);

    if (!hasRequiredPermissions) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};