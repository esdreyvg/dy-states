import { 
  AUTH_ENDPOINTS,
  USER_ENDPOINTS,
  PROPERTY_ENDPOINTS,
  UPLOAD_ENDPOINTS,
  SEARCH_ENDPOINTS,
  ANALYTICS_ENDPOINTS,
  NOTIFICATION_ENDPOINTS,
} from '../constants/api';

// API Endpoint Builder
export class ApiEndpoints {
  static auth = AUTH_ENDPOINTS;
  static user = USER_ENDPOINTS;
  static property = PROPERTY_ENDPOINTS;
  static upload = UPLOAD_ENDPOINTS;
  static search = SEARCH_ENDPOINTS;
  static analytics = ANALYTICS_ENDPOINTS;
  static notification = NOTIFICATION_ENDPOINTS;

  // Helper method to replace path parameters
  static replaceParams(endpoint: string, params: Record<string, string | number>): string {
    let result = endpoint;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, String(value));
    });
    return result;
  }

  // Property endpoints with ID replacement
  static getPropertyImages(propertyId: string): string {
    return this.replaceParams(this.property.IMAGES, { id: propertyId });
  }

  static togglePropertyFavorite(propertyId: string): string {
    return this.replaceParams(this.property.FAVORITES, { id: propertyId });
  }

  static recordPropertyView(propertyId: string): string {
    return this.replaceParams(this.property.VIEWS, { id: propertyId });
  }

  // Agent endpoints with ID replacement
  static getAgentProperties(agentId: string): string {
    return this.replaceParams('/agents/:id/properties', { id: agentId });
  }

  static getAgentProfile(agentId: string): string {
    return this.replaceParams('/agents/:id/profile', { id: agentId });
  }

  static contactAgent(agentId: string): string {
    return this.replaceParams('/agents/:id/contact', { id: agentId });
  }

  // Notification endpoints with ID replacement
  static markNotificationAsRead(notificationId: string): string {
    return this.replaceParams(this.notification.MARK_READ, { id: notificationId });
  }
}

// Query Parameter Builders
export class QueryBuilder {
  private params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams();
  }

  static create(): QueryBuilder {
    return new QueryBuilder();
  }

  add(key: string, value: string | number | boolean | Date): QueryBuilder {
    if (value !== undefined && value !== null) {
      if (value instanceof Date) {
        this.params.append(key, value.toISOString());
      } else {
        this.params.append(key, String(value));
      }
    }
    return this;
  }

  addArray(key: string, values: (string | number)[]): QueryBuilder {
    values.forEach(value => {
      this.params.append(key, String(value));
    });
    return this;
  }

  pagination(page?: number, limit?: number): QueryBuilder {
    if (page !== undefined) this.add('page', page);
    if (limit !== undefined) this.add('limit', limit);
    return this;
  }

  sorting(sortBy?: string, sortOrder?: 'asc' | 'desc'): QueryBuilder {
    if (sortBy) this.add('sortBy', sortBy);
    if (sortOrder) this.add('sortOrder', sortOrder);
    return this;
  }

  search(query?: string): QueryBuilder {
    if (query) this.add('q', query);
    return this;
  }

  build(): string {
    const queryString = this.params.toString();
    return queryString ? `?${queryString}` : '';
  }
}

// URL Builder for complete API URLs
export class UrlBuilder {
  private baseUrl: string;
  private endpoint: string;
  private queryBuilder: QueryBuilder;

  constructor(baseUrl: string, endpoint: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.endpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    this.queryBuilder = new QueryBuilder();
  }

  static create(baseUrl: string, endpoint: string): UrlBuilder {
    return new UrlBuilder(baseUrl, endpoint);
  }

  params(params: Record<string, string | number>): UrlBuilder {
    this.endpoint = ApiEndpoints.replaceParams(this.endpoint, params);
    return this;
  }

  query(key: string, value: string | number | boolean | Date): UrlBuilder {
    this.queryBuilder.add(key, value);
    return this;
  }

  queryArray(key: string, values: (string | number)[]): UrlBuilder {
    this.queryBuilder.addArray(key, values);
    return this;
  }

  pagination(page?: number, limit?: number): UrlBuilder {
    this.queryBuilder.pagination(page, limit);
    return this;
  }

  sorting(sortBy?: string, sortOrder?: 'asc' | 'desc'): UrlBuilder {
    this.queryBuilder.sorting(sortBy, sortOrder);
    return this;
  }

  search(query?: string): UrlBuilder {
    this.queryBuilder.search(query);
    return this;
  }

  build(): string {
    return `${this.baseUrl}${this.endpoint}${this.queryBuilder.build()}`;
  }
}