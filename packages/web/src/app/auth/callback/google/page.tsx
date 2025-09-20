'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { oauthService } from '@/services/oauth';
import { useAuth } from '@/context/auth-provider';
import { tokenStorage } from '@/utils/storage';

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Check for OAuth errors
        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state parameter');
        }

        // Validate state parameter
        const storedState = sessionStorage.getItem('oauth_state_google');
        if (!storedState || storedState !== state) {
          throw new Error('Invalid state parameter - possible CSRF attack');
        }

        // Clean up stored state
        sessionStorage.removeItem('oauth_state_google');

        // Complete OAuth login
        const result = await oauthService.login('google', code, state);

        // Store tokens and user data
        tokenStorage.setToken(result.tokens.accessToken);
        tokenStorage.setRefreshToken(result.tokens.refreshToken);
        tokenStorage.setUserData({
          id: result.user.id,
          email: result.user.email,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          role: result.user.role,
          permissions: result.user.permissions,
        });

        // Update auth context
        updateUser(result.user);

        setStatus('success');

        // Redirect after successful login
        setTimeout(() => {
          const redirectPath = sessionStorage.getItem('oauth_redirect') || '/dashboard';
          sessionStorage.removeItem('oauth_redirect');
          router.push(redirectPath);
        }, 2000);

      } catch (error) {
        console.error('Google OAuth callback error:', error);
        setError(error instanceof Error ? error.message : 'Error de autenticación');
        setStatus('error');

        // Redirect to login page after error
        setTimeout(() => {
          router.push('/auth/login?error=oauth_failed');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, updateUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Autenticando con Google
            </h1>
            <p className="text-gray-600">
              Por favor espera mientras procesamos tu autenticación...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              ¡Autenticación exitosa!
            </h1>
            <p className="text-gray-600">
              Te redirigiremos en unos segundos...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Error de Autenticación
            </h1>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Volver al Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}