export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    preferences: UserPreferences;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    ADMIN = "admin",
    AGENT = "agent",
    CLIENT = "client",
    INVESTOR = "investor"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    SUSPENDED = "suspended"
}
export interface UserPreferences {
    language: 'es' | 'en';
    currency: 'DOP' | 'USD';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    theme: 'light' | 'dark' | 'system';
}
export interface CreateUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phone?: string;
    role?: UserRole;
}
export interface UpdateUserDTO {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
    preferences?: Partial<UserPreferences>;
}
export interface UserProfile extends Omit<User, 'password'> {
    stats?: {
        propertiesViewed: number;
        favoriteProperties: number;
        searchesCount: number;
    };
}
