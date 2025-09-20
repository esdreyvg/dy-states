export declare const webApiConfig: {
    baseURL: string;
    timeout: number;
    headers: {
        'Content-Type': string;
    };
};
export declare const mobileApiConfig: {
    baseURL: string;
    timeout: number;
    headers: {
        'Content-Type': string;
    };
};
export declare const graphqlConfig: {
    uri: string;
    wsUri: string;
};
export declare const authConfig: {
    tokenKey: string;
    refreshTokenKey: string;
    userKey: string;
    tokenExpireTime: number;
    refreshTokenExpireTime: number;
    autoRefreshBuffer: number;
};
export declare const requestConfig: {
    retryAttempts: number;
    retryDelay: number;
    cacheTimeout: number;
    longCacheTimeout: number;
};
export declare const uploadConfig: {
    maxFileSize: number;
    allowedImageTypes: string[];
    allowedDocumentTypes: string[];
    maxImagesPerProperty: number;
};
