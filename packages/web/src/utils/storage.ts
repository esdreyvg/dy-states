// Enhanced token storage with better security practices
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

// Simple encryption for token storage (basic obfuscation)
const encryptToken = (token: string): string => {
  return btoa(encodeURIComponent(token));
};

const decryptToken = (encryptedToken: string): string => {
  try {
    return decodeURIComponent(atob(encryptedToken));
  } catch {
    return '';
  }
};

// Check if we're in a browser environment
const isBrowser = (): boolean => typeof window !== 'undefined';

// Storage interface for better type safety
interface TokenData {
  token: string;
  expiresAt?: number;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
}

export const tokenStorage = {
  // Token management
  getToken(): string | null {
    if (!isBrowser()) return null;
    
    try {
      const encryptedToken = localStorage.getItem(TOKEN_KEY);
      if (!encryptedToken) return null;
      
      const token = decryptToken(encryptedToken);
      
      // Check if token is expired (if expiration data exists)
      const tokenData = this.getTokenData();
      if (tokenData?.expiresAt && Date.now() > tokenData.expiresAt) {
        this.removeToken();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      this.removeToken();
      return null;
    }
  },

  setToken(token: string, expiresIn?: number): void {
    if (!isBrowser()) return;
    
    try {
      const encryptedToken = encryptToken(token);
      localStorage.setItem(TOKEN_KEY, encryptedToken);
      
      // Store expiration data if provided
      if (expiresIn) {
        const tokenData: TokenData = {
          token: TOKEN_KEY,
          expiresAt: Date.now() + (expiresIn * 1000), // Convert to milliseconds
        };
        localStorage.setItem(`${TOKEN_KEY}_data`, JSON.stringify(tokenData));
      }
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  removeToken(): void {
    if (!isBrowser()) return;
    
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(`${TOKEN_KEY}_data`);
  },

  getTokenData(): TokenData | null {
    if (!isBrowser()) return null;
    
    try {
      const data = localStorage.getItem(`${TOKEN_KEY}_data`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Refresh token management
  getRefreshToken(): string | null {
    if (!isBrowser()) return null;
    
    try {
      const encryptedToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      return encryptedToken ? decryptToken(encryptedToken) : null;
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      this.removeRefreshToken();
      return null;
    }
  },

  setRefreshToken(token: string): void {
    if (!isBrowser()) return;
    
    try {
      const encryptedToken = encryptToken(token);
      localStorage.setItem(REFRESH_TOKEN_KEY, encryptedToken);
    } catch (error) {
      console.error('Error storing refresh token:', error);
    }
  },

  removeRefreshToken(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // User data management
  getUserData(): UserData | null {
    if (!isBrowser()) return null;
    
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      this.removeUserData();
      return null;
    }
  },

  setUserData(user: UserData): void {
    if (!isBrowser()) return;
    
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  removeUserData(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(USER_KEY);
  },

  // Combined operations
  removeTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserData();
  },

  hasToken(): boolean {
    return !!this.getToken();
  },

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const tokenData = this.getTokenData();
    if (tokenData?.expiresAt) {
      return Date.now() < tokenData.expiresAt;
    }
    
    return true; // If no expiration data, assume valid
  },

  // Token expiration utilities
  getTokenExpiration(): Date | null {
    const tokenData = this.getTokenData();
    return tokenData?.expiresAt ? new Date(tokenData.expiresAt) : null;
  },

  isTokenExpired(): boolean {
    const tokenData = this.getTokenData();
    if (!tokenData?.expiresAt) return false;
    
    return Date.now() > tokenData.expiresAt;
  },

  getTimeUntilExpiration(): number {
    const tokenData = this.getTokenData();
    if (!tokenData?.expiresAt) return 0;
    
    return Math.max(0, tokenData.expiresAt - Date.now());
  },

  // Storage cleanup utility
  clearAllStorage(): void {
    if (!isBrowser()) return;
    
    // Remove all auth-related items
    const keysToRemove = [TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY, `${TOKEN_KEY}_data`];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },
};