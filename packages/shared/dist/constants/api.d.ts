export declare const API_BASE_URL = "/api/v1";
export declare const GRAPHQL_ENDPOINT = "/graphql";
export declare const WS_ENDPOINT = "/ws";
export declare const AUTH_ENDPOINTS: {
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
export declare const USER_ENDPOINTS: {
    readonly BASE: "/users";
    readonly PROFILE: "/users/profile";
    readonly PREFERENCES: "/users/preferences";
    readonly AVATAR: "/users/avatar";
    readonly FAVORITES: "/users/favorites";
    readonly SEARCHES: "/users/searches";
};
export declare const PROPERTY_ENDPOINTS: {
    readonly BASE: "/properties";
    readonly SEARCH: "/properties/search";
    readonly FEATURED: "/properties/featured";
    readonly SIMILAR: "/properties/similar";
    readonly IMAGES: "/properties/:id/images";
    readonly FAVORITES: "/properties/:id/favorite";
    readonly VIEWS: "/properties/:id/views";
};
export declare const AGENT_ENDPOINTS: {
    readonly BASE: "/agents";
    readonly PROPERTIES: "/agents/:id/properties";
    readonly PROFILE: "/agents/:id/profile";
    readonly CONTACT: "/agents/:id/contact";
};
export declare const UPLOAD_ENDPOINTS: {
    readonly IMAGES: "/upload/images";
    readonly DOCUMENTS: "/upload/documents";
    readonly AVATAR: "/upload/avatar";
};
export declare const NOTIFICATION_ENDPOINTS: {
    readonly BASE: "/notifications";
    readonly MARK_READ: "/notifications/:id/read";
    readonly MARK_ALL_READ: "/notifications/read-all";
    readonly PREFERENCES: "/notifications/preferences";
};
export declare const SEARCH_ENDPOINTS: {
    readonly PROPERTIES: "/search/properties";
    readonly AGENTS: "/search/agents";
    readonly LOCATIONS: "/search/locations";
    readonly SUGGESTIONS: "/search/suggestions";
};
export declare const ANALYTICS_ENDPOINTS: {
    readonly PROPERTY_VIEWS: "/analytics/property-views";
    readonly SEARCH_ANALYTICS: "/analytics/searches";
    readonly USER_ACTIVITY: "/analytics/user-activity";
};
export declare const HTTP_METHODS: {
    readonly GET: "GET";
    readonly POST: "POST";
    readonly PUT: "PUT";
    readonly PATCH: "PATCH";
    readonly DELETE: "DELETE";
};
export declare const CONTENT_TYPES: {
    readonly JSON: "application/json";
    readonly FORM_DATA: "multipart/form-data";
    readonly URL_ENCODED: "application/x-www-form-urlencoded";
};
export declare const REQUEST_HEADERS: {
    readonly AUTHORIZATION: "Authorization";
    readonly CONTENT_TYPE: "Content-Type";
    readonly ACCEPT: "Accept";
    readonly ACCEPT_LANGUAGE: "Accept-Language";
    readonly USER_AGENT: "User-Agent";
    readonly X_REQUESTED_WITH: "X-Requested-With";
};
export declare const RESPONSE_HEADERS: {
    readonly CONTENT_TYPE: "content-type";
    readonly SET_COOKIE: "set-cookie";
    readonly CACHE_CONTROL: "cache-control";
    readonly ETAG: "etag";
    readonly LAST_MODIFIED: "last-modified";
};
