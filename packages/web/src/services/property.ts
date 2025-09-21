import { apiClient } from './api';
import type { 
  Property,
  PropertySearchParams,
  PropertySearchResult,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PropertyFavorite,
  PropertyShare,
  PropertyInquiry,
  PropertyStats
} from '@dy-estates/shared';

// Properties API service
export class PropertyService {
  private baseUrl = '/api/properties';

  /**
   * Get all properties with optional filtering and pagination
   */
  async getProperties(params?: PropertySearchParams): Promise<PropertySearchResult> {
    const response = await apiClient.get(this.baseUrl, { params });
    return response.data;
  }

  /**
   * Get a single property by ID
   */
  async getProperty(id: string): Promise<Property> {
    const response = await apiClient.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Create a new property
   */
  async createProperty(data: CreatePropertyDTO): Promise<Property> {
    const response = await apiClient.post(this.baseUrl, data);
    return response.data;
  }

  /**
   * Update an existing property
   */
  async updateProperty(id: string, data: UpdatePropertyDTO): Promise<Property> {
    const response = await apiClient.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  /**
   * Delete a property
   */
  async deleteProperty(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * Upload property images
   */
  async uploadImages(propertyId: string, files: File[], imageData: Array<{
    alt: string;
    type: string;
    isPrimary?: boolean;
  }>): Promise<Property> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append('images', file);
      formData.append(`imageData[${index}]`, JSON.stringify(imageData[index]));
    });

    const response = await apiClient.post(
      `${this.baseUrl}/${propertyId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Delete a property image
   */
  async deleteImage(propertyId: string, imageId: string): Promise<Property> {
    const response = await apiClient.delete(`${this.baseUrl}/${propertyId}/images/${imageId}`);
    return response.data;
  }

  /**
   * Upload virtual tour
   */
  async uploadVirtualTour(propertyId: string, tourData: {
    type: string;
    title: string;
    description?: string;
    url?: string;
    file?: File;
    duration?: number;
  }): Promise<Property> {
    const formData = new FormData();
    
    if (tourData.file) {
      formData.append('tourFile', tourData.file);
    }
    
    formData.append('tourData', JSON.stringify(tourData));

    const response = await apiClient.post(
      `${this.baseUrl}/${propertyId}/virtual-tours`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  /**
   * Delete virtual tour
   */
  async deleteVirtualTour(propertyId: string, tourId: string): Promise<Property> {
    const response = await apiClient.delete(`${this.baseUrl}/${propertyId}/virtual-tours/${tourId}`);
    return response.data;
  }

  /**
   * Get featured properties
   */
  async getFeaturedProperties(limit = 6): Promise<Property[]> {
    const response = await apiClient.get(`${this.baseUrl}/featured`, {
      params: { limit }
    });
    return response.data;
  }

  /**
   * Get similar properties
   */
  async getSimilarProperties(propertyId: string, limit = 4): Promise<Property[]> {
    const response = await apiClient.get(`${this.baseUrl}/${propertyId}/similar`, {
      params: { limit }
    });
    return response.data;
  }

  /**
   * Record property view
   */
  async recordView(propertyId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/${propertyId}/view`);
  }

  /**
   * Get property statistics
   */
  async getPropertyStats(propertyId: string): Promise<PropertyStats> {
    const response = await apiClient.get(`${this.baseUrl}/${propertyId}/stats`);
    return response.data;
  }

  /**
   * Get agent's properties
   */
  async getAgentProperties(agentId: string, params?: PropertySearchParams): Promise<PropertySearchResult> {
    const response = await apiClient.get(`/api/agents/${agentId}/properties`, { params });
    return response.data;
  }
}

// Property favorites service
export class PropertyFavoritesService {
  private baseUrl = '/api/favorites';

  /**
   * Get user's favorite properties
   */
  async getFavorites(): Promise<PropertyFavorite[]> {
    const response = await apiClient.get(this.baseUrl);
    return response.data;
  }

  /**
   * Add property to favorites
   */
  async addFavorite(propertyId: string, notes?: string): Promise<PropertyFavorite> {
    const response = await apiClient.post(this.baseUrl, {
      propertyId,
      notes
    });
    return response.data;
  }

  /**
   * Remove property from favorites
   */
  async removeFavorite(propertyId: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${propertyId}`);
  }

  /**
   * Update favorite notes
   */
  async updateFavorite(propertyId: string, notes: string): Promise<PropertyFavorite> {
    const response = await apiClient.put(`${this.baseUrl}/${propertyId}`, {
      notes
    });
    return response.data;
  }

  /**
   * Check if property is favorited
   */
  async isFavorite(propertyId: string): Promise<boolean> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/${propertyId}/status`);
      return response.data.isFavorite;
    } catch {
      return false;
    }
  }
}

// Property sharing service
export class PropertySharingService {
  private baseUrl = '/api/properties';

  /**
   * Share property
   */
  async shareProperty(share: PropertyShare): Promise<{ shareUrl: string; success: boolean }> {
    const response = await apiClient.post(`${this.baseUrl}/${share.propertyId}/share`, share);
    return response.data;
  }

  /**
   * Get share URL for property
   */
  async getShareUrl(propertyId: string): Promise<string> {
    const response = await apiClient.get(`${this.baseUrl}/${propertyId}/share-url`);
    return response.data.shareUrl;
  }

  /**
   * Get property share statistics
   */
  async getShareStats(propertyId: string): Promise<{
    totalShares: number;
    sharesByPlatform: Record<string, number>;
  }> {
    const response = await apiClient.get(`${this.baseUrl}/${propertyId}/share-stats`);
    return response.data;
  }
}

// Property inquiries service
export class PropertyInquiriesService {
  private baseUrl = '/api/inquiries';

  /**
   * Submit property inquiry
   */
  async submitInquiry(inquiry: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status' | 'agentResponse' | 'respondedAt'>): Promise<PropertyInquiry> {
    const response = await apiClient.post(this.baseUrl, inquiry);
    return response.data;
  }

  /**
   * Get inquiries for a property (agent/admin only)
   */
  async getPropertyInquiries(propertyId: string): Promise<PropertyInquiry[]> {
    const response = await apiClient.get(`${this.baseUrl}/property/${propertyId}`);
    return response.data;
  }

  /**
   * Get user's inquiries
   */
  async getUserInquiries(): Promise<PropertyInquiry[]> {
    const response = await apiClient.get(`${this.baseUrl}/user`);
    return response.data;
  }

  /**
   * Respond to inquiry (agent/admin only)
   */
  async respondToInquiry(inquiryId: string, response: string): Promise<PropertyInquiry> {
    const inquiryResponse = await apiClient.put(`${this.baseUrl}/${inquiryId}/respond`, {
      response
    });
    return inquiryResponse.data;
  }

  /**
   * Update inquiry status (agent/admin only)
   */
  async updateInquiryStatus(inquiryId: string, status: string): Promise<PropertyInquiry> {
    const response = await apiClient.put(`${this.baseUrl}/${inquiryId}/status`, {
      status
    });
    return response.data;
  }
}

// Search and filters service
export class PropertySearchService {
  private baseUrl = '/api/search';

  /**
   * Search properties with full-text search
   */
  async searchProperties(query: string, filters?: PropertySearchParams): Promise<PropertySearchResult> {
    const response = await apiClient.get(`${this.baseUrl}/properties`, {
      params: { query, ...filters }
    });
    return response.data;
  }

  /**
   * Get search suggestions
   */
  async getSearchSuggestions(query: string): Promise<string[]> {
    const response = await apiClient.get(`${this.baseUrl}/suggestions`, {
      params: { query }
    });
    return response.data;
  }

  /**
   * Get popular searches
   */
  async getPopularSearches(): Promise<{ query: string; count: number }[]> {
    const response = await apiClient.get(`${this.baseUrl}/popular`);
    return response.data;
  }

  /**
   * Get filter options (cities, neighborhoods, etc.)
   */
  async getFilterOptions(): Promise<{
    cities: string[];
    neighborhoods: Record<string, string[]>;
    priceRanges: { min: number; max: number; currency: string }[];
    amenities: string[];
    features: string[];
  }> {
    const response = await apiClient.get(`${this.baseUrl}/filter-options`);
    return response.data;
  }
}

// Export service instances
export const propertyService = new PropertyService();
export const propertyFavoritesService = new PropertyFavoritesService();
export const propertySharingService = new PropertySharingService();
export const propertyInquiriesService = new PropertyInquiriesService();
export const propertySearchService = new PropertySearchService();