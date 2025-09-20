'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthState, LoginRequest, RegisterRequest, User } from '@/types/auth';
import { authService } from '@/services/auth';
import { tokenStorage } from '@/utils/storage';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    tokens: null,
    isLoading: true,
    error: null,
  });

  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto refresh token
  useEffect(() => {
    if (state.tokens?.accessToken) {
      const interval = setInterval(() => {
        refreshToken();
      }, 14 * 60 * 1000); // Refresh every 14 minutes

      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tokens]);

  const initializeAuth = async () => {
    try {
      setState((prev: AuthState) => ({ ...prev, isLoading: true }));
      
      // Simplified initialization - check for basic token
      const token = tokenStorage.getToken();
      
      if (token) {
        setState({
          isAuthenticated: true,
          user: null, // Will be populated from API
          tokens: null,
          isLoading: false,
          error: null,
        });
      } else {
        setState((prev: AuthState) => ({ ...prev, isLoading: false }));
      }
    } catch (error: unknown) {
      setState({
        isAuthenticated: false,
        user: null,
        tokens: null,
        isLoading: false,
        error: 'Error al inicializar autenticación',
      });
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }));
      
      const response = await authService.login(credentials);
      
      // Store only the token for now
      tokenStorage.setToken(response.token);

      setState({
        isAuthenticated: true,
        user: {
          ...response.user,
          permissions: [], // Default empty permissions array
        },
        tokens: null, // Simplified for now
        isLoading: false,
        error: null,
      });

      router.push('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setState((prev: AuthState) => ({ ...prev, isLoading: true, error: null }));
      
      await authService.register(userData);
      
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      // Simplified flow - always redirect to login
      router.push('/auth/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';
      setState((prev: AuthState) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout service without parameters
      await authService.logout();
    } catch (error: unknown) {
      // Continue with logout even if API call fails
      console.error('Error during logout:', error);
    } finally {
      tokenStorage.removeTokens();
      
      setState({
        isAuthenticated: false,
        user: null,
        tokens: null,
        isLoading: false,
        error: null,
      });

      router.push('/');
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = tokenStorage.getRefreshToken();
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      // Simplified call without parameters
      const response = await authService.refreshToken();
      
      // Store basic token
      tokenStorage.setToken(response.token);

      setState((prev: AuthState) => ({
        ...prev,
        tokens: null, // Simplified
        error: null,
      }));
    } catch (error: unknown) {
      console.error('Token refresh failed:', error);
      await logout();
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setState((prev: AuthState) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updatedUser } : null,
    }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};