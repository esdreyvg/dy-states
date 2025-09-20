export declare class ApiEndpoints {
    static auth: {
        readonly LOGIN: "/auth/login";
        readonly REGISTER: "/auth/register";
        readonly LOGOUT: "/auth/logout";
        readonly REFRESH: "/auth/refresh";
        readonly FORGOT_PASSWORD: "/auth/forgot-password";
        readonly RESET_PASSWORD: "/auth/reset-password";
        readonly VERIFY_EMAIL: "/auth/verify-email";
        readonly CHANGE_PASSWORD: "/auth/change-password";
        readonly PROFILE: "/auth/profile";
    };
    static user: {
        readonly BASE: "/users";
        readonly PROFILE: "/users/profile";
        readonly PREFERENCES: "/users/preferences";
        readonly AVATAR: "/users/avatar";
        readonly FAVORITES: "/users/favorites";
        readonly SEARCHES: "/users/searches";
    };
    static property: {
        readonly BASE: "/properties";
        readonly SEARCH: "/properties/search";
        readonly FEATURED: "/properties/featured";
        readonly SIMILAR: "/properties/similar";
        readonly IMAGES: "/properties/:id/images";
        readonly FAVORITES: "/properties/:id/favorite";
        readonly VIEWS: "/properties/:id/views";
    };
    static upload: {
        readonly IMAGES: "/upload/images";
        readonly DOCUMENTS: "/upload/documents";
        readonly AVATAR: "/upload/avatar";
    };
    static search: {
        readonly PROPERTIES: "/search/properties";
        readonly AGENTS: "/search/agents";
        readonly LOCATIONS: "/search/locations";
        readonly SUGGESTIONS: "/search/suggestions";
    };
    static analytics: {
        readonly PROPERTY_VIEWS: "/analytics/property-views";
        readonly SEARCH_ANALYTICS: "/analytics/searches";
        readonly USER_ACTIVITY: "/analytics/user-activity";
    };
    static notification: {
        readonly BASE: "/notifications";
        readonly MARK_READ: "/notifications/:id/read";
        readonly MARK_ALL_READ: "/notifications/read-all";
        readonly PREFERENCES: "/notifications/preferences";
    };
    static replaceParams(endpoint: string, params: Record<string, string | number>): string;
    static getPropertyImages(propertyId: string): string;
    static togglePropertyFavorite(propertyId: string): string;
    static recordPropertyView(propertyId: string): string;
    static getAgentProperties(agentId: string): string;
    static getAgentProfile(agentId: string): string;
    static contactAgent(agentId: string): string;
    static markNotificationAsRead(notificationId: string): string;
}
export declare class QueryBuilder {
    private params;
    constructor();
    static create(): QueryBuilder;
    add(key: string, value: string | number | boolean | Date): QueryBuilder;
    addArray(key: string, values: (string | number)[]): QueryBuilder;
    pagination(page?: number, limit?: number): QueryBuilder;
    sorting(sortBy?: string, sortOrder?: 'asc' | 'desc'): QueryBuilder;
    search(query?: string): QueryBuilder;
    build(): string;
}
export declare class UrlBuilder {
    private baseUrl;
    private endpoint;
    private queryBuilder;
    constructor(baseUrl: string, endpoint: string);
    static create(baseUrl: string, endpoint: string): UrlBuilder;
    params(params: Record<string, string | number>): UrlBuilder;
    query(key: string, value: string | number | boolean | Date): UrlBuilder;
    queryArray(key: string, values: (string | number)[]): UrlBuilder;
    pagination(page?: number, limit?: number): UrlBuilder;
    sorting(sortBy?: string, sortOrder?: 'asc' | 'desc'): UrlBuilder;
    search(query?: string): UrlBuilder;
    build(): string;
}
