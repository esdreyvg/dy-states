import { AUTH_ENDPOINTS, USER_ENDPOINTS, PROPERTY_ENDPOINTS, UPLOAD_ENDPOINTS, SEARCH_ENDPOINTS, ANALYTICS_ENDPOINTS, NOTIFICATION_ENDPOINTS, } from '../constants/api';
// API Endpoint Builder
export class ApiEndpoints {
    // Helper method to replace path parameters
    static replaceParams(endpoint, params) {
        let result = endpoint;
        Object.entries(params).forEach(([key, value]) => {
            result = result.replace(`:${key}`, String(value));
        });
        return result;
    }
    // Property endpoints with ID replacement
    static getPropertyImages(propertyId) {
        return this.replaceParams(this.property.IMAGES, { id: propertyId });
    }
    static togglePropertyFavorite(propertyId) {
        return this.replaceParams(this.property.FAVORITES, { id: propertyId });
    }
    static recordPropertyView(propertyId) {
        return this.replaceParams(this.property.VIEWS, { id: propertyId });
    }
    // Agent endpoints with ID replacement
    static getAgentProperties(agentId) {
        return this.replaceParams('/agents/:id/properties', { id: agentId });
    }
    static getAgentProfile(agentId) {
        return this.replaceParams('/agents/:id/profile', { id: agentId });
    }
    static contactAgent(agentId) {
        return this.replaceParams('/agents/:id/contact', { id: agentId });
    }
    // Notification endpoints with ID replacement
    static markNotificationAsRead(notificationId) {
        return this.replaceParams(this.notification.MARK_READ, { id: notificationId });
    }
}
ApiEndpoints.auth = AUTH_ENDPOINTS;
ApiEndpoints.user = USER_ENDPOINTS;
ApiEndpoints.property = PROPERTY_ENDPOINTS;
ApiEndpoints.upload = UPLOAD_ENDPOINTS;
ApiEndpoints.search = SEARCH_ENDPOINTS;
ApiEndpoints.analytics = ANALYTICS_ENDPOINTS;
ApiEndpoints.notification = NOTIFICATION_ENDPOINTS;
// Query Parameter Builders
export class QueryBuilder {
    constructor() {
        this.params = new URLSearchParams();
    }
    static create() {
        return new QueryBuilder();
    }
    add(key, value) {
        if (value !== undefined && value !== null) {
            if (value instanceof Date) {
                this.params.append(key, value.toISOString());
            }
            else {
                this.params.append(key, String(value));
            }
        }
        return this;
    }
    addArray(key, values) {
        values.forEach(value => {
            this.params.append(key, String(value));
        });
        return this;
    }
    pagination(page, limit) {
        if (page !== undefined)
            this.add('page', page);
        if (limit !== undefined)
            this.add('limit', limit);
        return this;
    }
    sorting(sortBy, sortOrder) {
        if (sortBy)
            this.add('sortBy', sortBy);
        if (sortOrder)
            this.add('sortOrder', sortOrder);
        return this;
    }
    search(query) {
        if (query)
            this.add('q', query);
        return this;
    }
    build() {
        const queryString = this.params.toString();
        return queryString ? `?${queryString}` : '';
    }
}
// URL Builder for complete API URLs
export class UrlBuilder {
    constructor(baseUrl, endpoint) {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
        this.endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        this.queryBuilder = new QueryBuilder();
    }
    static create(baseUrl, endpoint) {
        return new UrlBuilder(baseUrl, endpoint);
    }
    params(params) {
        this.endpoint = ApiEndpoints.replaceParams(this.endpoint, params);
        return this;
    }
    query(key, value) {
        this.queryBuilder.add(key, value);
        return this;
    }
    queryArray(key, values) {
        this.queryBuilder.addArray(key, values);
        return this;
    }
    pagination(page, limit) {
        this.queryBuilder.pagination(page, limit);
        return this;
    }
    sorting(sortBy, sortOrder) {
        this.queryBuilder.sorting(sortBy, sortOrder);
        return this;
    }
    search(query) {
        this.queryBuilder.search(query);
        return this;
    }
    build() {
        return `${this.baseUrl}${this.endpoint}${this.queryBuilder.build()}`;
    }
}
