import { LoginResponse, RegisterResponse, RefreshTokenResponse, ForgotPasswordResponse, ResetPasswordResponse, VerifyEmailResponse } from '../types/auth';
import { Property, PropertySearchFilters, PropertySearchResult } from '../types/property';
import { User, UserProfile } from '../types/user';
import { ApiResponse } from '../types/api';
export interface AuthApiResponses {
    login: ApiResponse<LoginResponse>;
    register: ApiResponse<RegisterResponse>;
    refreshToken: ApiResponse<RefreshTokenResponse>;
    forgotPassword: ApiResponse<ForgotPasswordResponse>;
    resetPassword: ApiResponse<ResetPasswordResponse>;
    changePassword: ApiResponse<{
        message: string;
    }>;
    verifyEmail: ApiResponse<VerifyEmailResponse>;
    logout: ApiResponse<{
        message: string;
    }>;
}
export interface UserApiResponses {
    getProfile: ApiResponse<UserProfile>;
    updateProfile: ApiResponse<User>;
    updatePreferences: ApiResponse<User>;
    uploadAvatar: ApiResponse<{
        avatarUrl: string;
    }>;
    getUsersList: ApiResponse<User[]>;
    createUser: ApiResponse<User>;
    updateUser: ApiResponse<User>;
    deleteUser: ApiResponse<{
        message: string;
    }>;
}
export interface PropertyApiResponses {
    getProperties: ApiResponse<PropertySearchResult>;
    getProperty: ApiResponse<Property>;
    createProperty: ApiResponse<Property>;
    updateProperty: ApiResponse<Property>;
    deleteProperty: ApiResponse<{
        message: string;
    }>;
    searchProperties: ApiResponse<PropertySearchResult>;
    getFeaturedProperties: ApiResponse<Property[]>;
    getSimilarProperties: ApiResponse<Property[]>;
    addToFavorites: ApiResponse<{
        message: string;
    }>;
    removeFromFavorites: ApiResponse<{
        message: string;
    }>;
    getFavorites: ApiResponse<Property[]>;
    recordView: ApiResponse<{
        viewsCount: number;
    }>;
}
export interface UploadApiResponses {
    uploadImage: ApiResponse<{
        url: string;
        id: string;
    }>;
    uploadDocument: ApiResponse<{
        url: string;
        id: string;
        fileName: string;
    }>;
    uploadMultipleImages: ApiResponse<Array<{
        url: string;
        id: string;
    }>>;
    deleteFile: ApiResponse<{
        message: string;
    }>;
}
export interface SearchApiResponses {
    searchProperties: ApiResponse<PropertySearchResult>;
    searchLocations: ApiResponse<Array<{
        name: string;
        type: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    }>>;
    getSearchSuggestions: ApiResponse<Array<{
        text: string;
        type: string;
    }>>;
    saveSearch: ApiResponse<{
        id: string;
        message: string;
    }>;
    getSavedSearches: ApiResponse<Array<{
        id: string;
        name: string;
        filters: PropertySearchFilters;
        createdAt: Date;
    }>>;
}
export interface AnalyticsApiResponses {
    getPropertyViews: ApiResponse<{
        views: number;
        uniqueViews: number;
        dailyViews: Array<{
            date: string;
            views: number;
        }>;
    }>;
    getUserActivity: ApiResponse<{
        totalViews: number;
        totalSearches: number;
        favoriteProperties: number;
        recentActivity: Array<{
            type: string;
            description: string;
            timestamp: Date;
        }>;
    }>;
    getSearchAnalytics: ApiResponse<{
        totalSearches: number;
        popularFilters: Array<{
            filter: string;
            count: number;
        }>;
        searchTrends: Array<{
            period: string;
            searches: number;
        }>;
    }>;
}
export interface NotificationApiResponses {
    getNotifications: ApiResponse<Array<{
        id: string;
        type: string;
        title: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
        data?: any;
    }>>;
    markAsRead: ApiResponse<{
        message: string;
    }>;
    markAllAsRead: ApiResponse<{
        message: string;
    }>;
    updateNotificationPreferences: ApiResponse<{
        message: string;
    }>;
}
export interface ApiResponses extends AuthApiResponses, UserApiResponses, PropertyApiResponses, UploadApiResponses, SearchApiResponses, AnalyticsApiResponses, NotificationApiResponses {
}
export interface ListResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
        timestamp: string;
        path?: string;
    };
}
