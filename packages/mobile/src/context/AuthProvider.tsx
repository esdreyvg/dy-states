import React, { createContext, useContext, useEffect, useState } from 'react';

// Local types for mobile project
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: unknown) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
    error: null,
  });

  const login = async (email: string, password: string) => {
    // Implementar lógica de login
    console.log('Login:', email, password);
  };

  const register = async (userData: unknown) => {
    // Implementar lógica de registro
    console.log('Register:', userData);
  };

  const logout = async () => {
    setState((prev: AuthState) => ({
      ...prev,
      isAuthenticated: false,
      user: null,
      token: null,
    }));
  };

  const refreshToken = async () => {
    // Implementar lógica de refresh token
    console.log('Refresh token');
  };

  useEffect(() => {
    // Verificar token almacenado al iniciar
    setState((prev: AuthState) => ({ ...prev, isLoading: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};