'use client';

import React, { useState } from 'react';
import { oauthService, OAuthLoginResponse } from '@/services/oauth';

// Simple button component since variant doesn't exist in our Button
const SocialButtonBase: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}> = ({ children, onClick, disabled = false, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full relative inline-flex items-center justify-center px-4 py-2 border border-gray-300 
      rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none 
      focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
      disabled:cursor-not-allowed transition-colors duration-200
      ${className}
    `}
  >
    {children}
  </button>
);

// Icon components for social providers
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface SocialButtonProps {
  provider: 'google' | 'facebook';
  mode?: 'login' | 'register' | 'link';
  onSuccess?: (result: OAuthLoginResponse) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  mode = 'login',
  onError,
  disabled = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const providerConfig = {
    google: {
      name: 'Google',
      icon: <GoogleIcon />,
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
    },
    facebook: {
      name: 'Facebook',
      icon: <FacebookIcon />,
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
    },
  };

  const config = providerConfig[provider];

  const getButtonText = () => {
    switch (mode) {
      case 'register':
        return `Registrarse con ${config.name}`;
      case 'link':
        return `Vincular ${config.name}`;
      default:
        return `Continuar con ${config.name}`;
    }
  };

  const handleClick = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);

      // Generate state for CSRF protection
      const state = oauthService.generateState();
      
      // Store state in sessionStorage for later validation
      sessionStorage.setItem(`oauth_state_${provider}`, state);
      
      // Get authorization URL
      const authUrl = oauthService.getAuthUrl(provider, state);
      
      // Redirect to OAuth provider
      window.location.href = authUrl;
      
    } catch (error) {
      console.error(`${provider} OAuth error:`, error);
      setIsLoading(false);
      
      const errorMessage = error instanceof Error ? error : new Error(`Error con ${config.name}`);
      onError?.(errorMessage);
    }
  };

  return (
    <SocialButtonBase
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        ${config.bgColor}
        ${config.textColor}
        ${config.borderColor}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Conectando...
        </div>
      ) : (
        <div className="flex items-center">
          {config.icon}
          <span className="ml-2">{getButtonText()}</span>
        </div>
      )}
    </SocialButtonBase>
  );
};

// Combined social login component
interface SocialLoginProps {
  mode?: 'login' | 'register';
  onSuccess?: (result: OAuthLoginResponse) => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({
  mode = 'login',
  onError,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            O {mode === 'register' ? 'regístrate' : 'inicia sesión'} con
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <SocialButton
          provider="google"
          mode={mode}
          onError={onError}
        />
        <SocialButton
          provider="facebook"
          mode={mode}
          onError={onError}
        />
      </div>
    </div>
  );
};

// Account linking component for user profile
interface AccountLinkingProps {
  linkedAccounts: { provider: string; email: string }[];
  onLink?: (provider: 'google' | 'facebook') => void;
  onUnlink?: (provider: 'google' | 'facebook') => void;
  className?: string;
}

export const AccountLinking: React.FC<AccountLinkingProps> = ({
  linkedAccounts,
  onLink,
  onUnlink,
  className = '',
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const isLinked = (provider: string) => {
    return linkedAccounts.some(account => account.provider === provider);
  };

  const getLinkedAccount = (provider: string) => {
    return linkedAccounts.find(account => account.provider === provider);
  };

  const handleAction = async (provider: 'google' | 'facebook', action: 'link' | 'unlink') => {
    setLoadingStates(prev => ({ ...prev, [provider]: true }));
    
    try {
      if (action === 'link') {
        onLink?.(provider);
      } else {
        onUnlink?.(provider);
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, [provider]: false }));
    }
  };

  const providerConfig = {
    google: { name: 'Google', icon: <GoogleIcon /> },
    facebook: { name: 'Facebook', icon: <FacebookIcon /> },
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">Cuentas Vinculadas</h3>
      <p className="text-sm text-gray-600">
        Vincula tus cuentas de redes sociales para iniciar sesión fácilmente.
      </p>

      <div className="space-y-3">
        {Object.entries(providerConfig).map(([provider, config]) => {
          const linked = isLinked(provider);
          const account = getLinkedAccount(provider);
          const isLoading = loadingStates[provider];

          return (
            <div
              key={provider}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                {config.icon}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{config.name}</p>
                  {linked && account ? (
                    <p className="text-sm text-gray-500">{account.email}</p>
                  ) : (
                    <p className="text-sm text-gray-500">No vinculada</p>
                  )}
                </div>
              </div>

              <button
                className={`
                  px-3 py-1 text-sm rounded-md transition-colors
                  ${linked 
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                onClick={() => handleAction(provider as 'google' | 'facebook', linked ? 'unlink' : 'link')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : linked ? (
                  'Desvincular'
                ) : (
                  'Vincular'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLogin;