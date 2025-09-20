export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: ApiError;
    meta?: ResponseMeta;
}
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    path?: string;
}
export interface ResponseMeta {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface SearchParams extends PaginationParams {
    q?: string;
    filters?: Record<string, any>;
}
export declare enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503
}
export declare enum ApiErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    TOKEN_INVALID = "TOKEN_INVALID",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    REQUIRED_FIELD = "REQUIRED_FIELD",
    INVALID_FORMAT = "INVALID_FORMAT",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
    RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
    RESOURCE_CONFLICT = "RESOURCE_CONFLICT",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    DATABASE_ERROR = "DATABASE_ERROR",
    PROPERTY_NOT_AVAILABLE = "PROPERTY_NOT_AVAILABLE",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
    OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED"
}
