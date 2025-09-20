import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}

// Route protection configuration
const PROTECTED_ROUTES: Record<string, { roles?: string[]; permissions?: string[] }> = {
  '/dashboard': { roles: ['admin', 'agent', 'owner', 'client', 'investor'] },
  '/admin': { roles: ['admin'] },
  '/admin/*': { roles: ['admin'] },
  '/agent': { roles: ['admin', 'agent'] },
  '/agent/*': { roles: ['admin', 'agent'] },
  '/properties/create': { roles: ['admin', 'agent', 'owner'] },
  '/properties/*/edit': { roles: ['admin', 'agent', 'owner'] },
  '/users': { roles: ['admin'] },
  '/users/*': { roles: ['admin'] },
  '/profile': { roles: ['admin', 'agent', 'owner', 'client', 'investor'] },
  '/settings': { roles: ['admin', 'agent', 'owner', 'client', 'investor'] },
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/properties',
  '/properties/*',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
];

// API routes that require authentication
const PROTECTED_API_ROUTES: Record<string, { roles?: string[]; permissions?: string[] }> = {
  '/api/users': { roles: ['admin'] },
  '/api/users/*': { roles: ['admin'] },
  '/api/properties/create': { roles: ['admin', 'agent', 'owner'] },
  '/api/properties/*/edit': { roles: ['admin', 'agent', 'owner'] },
  '/api/profile': { roles: ['admin', 'agent', 'owner', 'client', 'investor'] },
  '/api/admin/*': { roles: ['admin'] },
};

function isRouteMatch(pathname: string, routePattern: string): boolean {
  if (routePattern.endsWith('/*')) {
    const baseRoute = routePattern.slice(0, -2);
    return pathname.startsWith(baseRoute);
  }
  return pathname === routePattern;
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => isRouteMatch(pathname, route));
}

function getRouteConfig(pathname: string) {
  // Check protected routes
  for (const [route, config] of Object.entries(PROTECTED_ROUTES)) {
    if (isRouteMatch(pathname, route)) {
      return config;
    }
  }

  // Check protected API routes
  for (const [route, config] of Object.entries(PROTECTED_API_ROUTES)) {
    if (isRouteMatch(pathname, route)) {
      return config;
    }
  }

  return null;
}

async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate payload structure
    if (
      typeof payload.sub === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string' &&
      Array.isArray(payload.permissions) &&
      typeof payload.iat === 'number' &&
      typeof payload.exp === 'number'
    ) {
      return {
        sub: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
        permissions: payload.permissions as string[],
        iat: payload.iat as number,
        exp: payload.exp as number,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

function hasRequiredRole(userRole: string, requiredRoles?: string[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  return requiredRoles.includes(userRole);
}

function hasRequiredPermissions(userPermissions: string[], requiredPermissions?: string[]): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_next') ||
    pathname.includes('favicon.ico') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get route configuration
  const routeConfig = getRouteConfig(pathname);

  // If no specific configuration, require authentication but no specific role/permission
  if (!routeConfig) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Check authentication for protected routes
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const payload = await verifyToken(token);
  if (!payload) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role requirements
  if (!hasRequiredRole(payload.role, routeConfig.roles)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Check permission requirements
  if (!hasRequiredPermissions(payload.permissions, routeConfig.permissions)) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Add user info to headers for API routes
  if (pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);
    requestHeaders.set('x-user-permissions', JSON.stringify(payload.permissions));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};