// OAuth provider types
export interface OAuthProvider {
  name: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
}

// OAuth response types
export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface OAuthUserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  provider: 'google' | 'facebook';
}

export interface OAuthLoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    permissions: string[];
    avatar?: string;
    provider?: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  isNewUser: boolean;
}

// OAuth Configuration
const OAUTH_CONFIG = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback/google`,
    scope: ['openid', 'email', 'profile'],
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
  },
  facebook: {
    clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI || `${window.location.origin}/auth/callback/facebook`,
    scope: ['email', 'public_profile'],
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/v18.0/me',
  },
};

class OAuthService {
  // Generate OAuth authorization URL
  getAuthUrl(provider: 'google' | 'facebook', state?: string): string {
    const config = OAUTH_CONFIG[provider];
    
    const paramsObj: Record<string, string> = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope.join(' '),
      response_type: 'code',
      state: state || this.generateState(),
    };

    // Add provider-specific parameters
    if (provider === 'google') {
      paramsObj.access_type = 'offline';
      paramsObj.prompt = 'consent';
    }

    const params = new URLSearchParams(paramsObj);

    return `${config.authUrl}?${params.toString()}`;
  }

  // Generate state parameter for CSRF protection
  generateState(): string {
    return btoa(JSON.stringify({
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(7),
    }));
  }

  // Validate state parameter
  validateState(state: string): boolean {
    try {
      const decoded = JSON.parse(atob(state));
      const { timestamp } = decoded;
      
      // State should be used within 10 minutes
      const isValid = Date.now() - timestamp < 10 * 60 * 1000;
      return isValid;
    } catch {
      return false;
    }
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(
    provider: 'google' | 'facebook',
    code: string,
    state: string
  ): Promise<OAuthTokenResponse> {
    if (!this.validateState(state)) {
      throw new Error('Invalid state parameter');
    }

    const config = OAUTH_CONFIG[provider];
    
    const tokenData = {
      client_id: config.clientId,
      client_secret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] || '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.redirectUri,
    };

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams(tokenData),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get user information from OAuth provider
  async getUserInfo(provider: 'google' | 'facebook', accessToken: string): Promise<OAuthUserInfo> {
    const config = OAUTH_CONFIG[provider];
    
    let url = config.userInfoUrl;
    if (provider === 'facebook') {
      url += '?fields=id,email,first_name,last_name,picture';
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Normalize user data based on provider
    if (provider === 'google') {
      return {
        id: data.id,
        email: data.email,
        firstName: data.given_name || '',
        lastName: data.family_name || '',
        avatar: data.picture,
        provider: 'google',
      };
    } else {
      return {
        id: data.id,
        email: data.email,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        avatar: data.picture?.data?.url,
        provider: 'facebook',
      };
    }
  }

  // Complete OAuth login process
  async login(provider: 'google' | 'facebook', code: string, state: string): Promise<OAuthLoginResponse> {
    try {
      // Exchange code for token
      const tokenResponse = await this.exchangeCodeForToken(provider, code, state);
      
      // Get user information
      const userInfo = await this.getUserInfo(provider, tokenResponse.access_token);
      
      // Send to backend for authentication
      const response = await fetch('/api/auth/oauth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider,
          userInfo,
          tokenResponse,
        }),
      });

      if (!response.ok) {
        throw new Error(`OAuth login failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  }

  // Link OAuth account to existing user
  async linkAccount(
    provider: 'google' | 'facebook',
    code: string,
    state: string,
    userToken: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Exchange code for token
      const tokenResponse = await this.exchangeCodeForToken(provider, code, state);
      
      // Get user information
      const userInfo = await this.getUserInfo(provider, tokenResponse.access_token);
      
      // Send to backend for account linking
      const response = await fetch('/api/auth/oauth/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          provider,
          userInfo,
          tokenResponse,
        }),
      });

      if (!response.ok) {
        throw new Error(`Account linking failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('OAuth account linking error:', error);
      throw error;
    }
  }

  // Unlink OAuth account
  async unlinkAccount(
    provider: 'google' | 'facebook',
    userToken: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`/api/auth/oauth/unlink/${provider}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Account unlinking failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('OAuth account unlinking error:', error);
      throw error;
    }
  }

  // Revoke OAuth token
  async revokeToken(provider: 'google' | 'facebook', token: string): Promise<void> {
    try {
      let revokeUrl: string;
      
      if (provider === 'google') {
        revokeUrl = `https://oauth2.googleapis.com/revoke?token=${token}`;
      } else {
        // Facebook doesn't have a public revoke endpoint
        console.warn('Facebook token revocation not supported');
        return;
      }

      const response = await fetch(revokeUrl, {
        method: 'POST',
      });

      if (!response.ok) {
        console.warn(`Failed to revoke ${provider} token:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error revoking ${provider} token:`, error);
    }
  }
}

export const oauthService = new OAuthService();
export default oauthService;