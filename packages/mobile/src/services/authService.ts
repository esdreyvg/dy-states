import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_URL = 'http://localhost:3001/api'; // Replace with your API URL

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  termsAccepted: boolean;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  isVerified?: boolean;
  isActive?: boolean;
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      marketing?: boolean;
    };
  };
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store tokens securely
    await AsyncStorage.setItem('access_token', response.accessToken);
    await AsyncStorage.setItem('refresh_token', response.refreshToken);

    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Store tokens securely
    await AsyncStorage.setItem('access_token', response.accessToken);
    await AsyncStorage.setItem('refresh_token', response.refreshToken);

    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
    }
  }

  async getCurrentUser(): Promise<User> {
    return await this.makeRequest('/auth/me');
  }

  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    // Update stored tokens
    await AsyncStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
      await AsyncStorage.setItem('refresh_token', response.refreshToken);
    }

    return response;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return await this.makeRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return await this.makeRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return await this.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return await this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  async uploadAvatar(imageUri: string): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    } as any);

    const token = await AsyncStorage.getItem('access_token');
    
    const response = await fetch(`${this.baseURL}/auth/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to upload avatar');
    }

    return await response.json();
  }

  async deleteAccount(): Promise<{ message: string }> {
    return await this.makeRequest('/auth/account', {
      method: 'DELETE',
    });
  }

  // Helper method to check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('access_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Helper method to clear all auth data
  async clearAuthData(): Promise<void> {
    await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
  }

  // Handle authentication errors globally
  handleAuthError(error: any): void {
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      Alert.alert(
        'Sesión Expirada',
        'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
        [
          {
            text: 'OK',
            onPress: () => this.logout(),
          },
        ]
      );
    } else {
      Alert.alert('Error', error.message || 'Ha ocurrido un error inesperado');
    }
  }
}

export const authService = new AuthService();
export type { LoginCredentials, RegisterData, User, AuthResponse, TokenResponse };