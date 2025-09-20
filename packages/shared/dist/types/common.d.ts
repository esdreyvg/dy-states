export type ID = string;
export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}
export interface SoftDelete {
    deletedAt?: Date;
}
export interface BaseEntity extends Timestamps {
    id: ID;
}
export interface Address {
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode?: string;
}
export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface Image {
    id: ID;
    url: string;
    alt: string;
    width?: number;
    height?: number;
    size?: number;
    mimeType?: string;
}
export interface File {
    id: ID;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
}
export interface Contact {
    email?: string;
    phone?: string;
    website?: string;
    address?: Address;
}
export interface Money {
    amount: number;
    currency: 'DOP' | 'USD' | 'EUR';
}
export interface DateRange {
    start: Date;
    end: Date;
}
export interface NumberRange {
    min: number;
    max: number;
}
export interface SelectOption<T = string> {
    label: string;
    value: T;
    disabled?: boolean;
}
export interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
}
export interface TableRow {
    [key: string]: any;
}
export interface Notification {
    id: ID;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    data?: Record<string, any>;
}
export declare enum NotificationType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
}
export interface Toast {
    id: ID;
    type: NotificationType;
    title?: string;
    message: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
export interface LoadingState {
    isLoading: boolean;
    progress?: number;
    message?: string;
}
export interface ErrorState {
    hasError: boolean;
    message?: string;
    code?: string;
    details?: any;
}
