export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
}
export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}
export interface LoginResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        permissions: string[];
        emailVerified: boolean;
        avatar?: string;
    };
    tokens: AuthTokens;
}
export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: 'agent' | 'owner' | 'client' | 'investor';
    acceptTerms: boolean;
}
export interface RegisterResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
    message: string;
    requiresVerification: boolean;
}
export interface RefreshTokenRequest {
    refreshToken: string;
}
export interface RefreshTokenResponse {
    tokens: AuthTokens;
}
export interface ForgotPasswordRequest {
    email: string;
}
export interface ForgotPasswordResponse {
    message: string;
    resetToken?: string;
}
export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}
export interface ResetPasswordResponse {
    message: string;
}
export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface VerifyEmailRequest {
    token: string;
}
export interface VerifyEmailResponse {
    message: string;
    tokens?: AuthTokens;
}
export interface AuthState {
    isAuthenticated: boolean;
    user: LoginResponse['user'] | null;
    tokens: AuthTokens | null;
    isLoading: boolean;
    error: string | null;
}
