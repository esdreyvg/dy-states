export interface Property {
    id: string;
    title: string;
    description: string;
    type: PropertyType;
    status: PropertyStatus;
    listingType: ListingType;
    price: number;
    currency: 'DOP' | 'USD';
    area: number;
    bedrooms: number;
    bathrooms: number;
    halfBathrooms?: number;
    parkingSpaces: number;
    yearBuilt?: number;
    lotSize?: number;
    features: PropertyFeature[];
    location: PropertyLocation;
    images: PropertyImage[];
    virtualTours?: VirtualTour[];
    agent: PropertyAgent;
    owner?: PropertyOwner;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    viewsCount: number;
    favoritesCount: number;
    isActive: boolean;
    isFeatured?: boolean;
    isVerified?: boolean;
    tags?: string[];
    maintenanceFee?: number;
    propertyTax?: number;
    hoaFee?: number;
}
export declare enum PropertyType {
    APARTMENT = "apartment",
    HOUSE = "house",
    VILLA = "villa",
    TOWNHOUSE = "townhouse",
    PENTHOUSE = "penthouse",
    STUDIO = "studio",
    DUPLEX = "duplex",
    LAND = "land",
    COMMERCIAL = "commercial",
    OFFICE = "office",
    WAREHOUSE = "warehouse"
}
export declare enum PropertyStatus {
    FOR_SALE = "for_sale",
    FOR_RENT = "for_rent",
    SOLD = "sold",
    RENTED = "rented",
    OFF_MARKET = "off_market",
    UNDER_CONTRACT = "under_contract"
}
export declare enum ListingType {
    SALE = "sale",
    RENT = "rent",
    BOTH = "both"
}
export interface VirtualTour {
    id: string;
    type: VirtualTourType;
    url: string;
    title: string;
    description?: string;
    thumbnail?: string;
    duration?: number;
    order: number;
}
export declare enum VirtualTourType {
    VIRTUAL_360 = "virtual_360",
    VIDEO_TOUR = "video_tour",
    INTERACTIVE = "interactive",
    LIVE_TOUR = "live_tour"
}
export interface PropertyFeature {
    id: string;
    name: string;
    category: FeatureCategory;
    icon?: string;
}
export declare enum FeatureCategory {
    AMENITIES = "amenities",
    SECURITY = "security",
    UTILITIES = "utilities",
    ACCESSIBILITY = "accessibility",
    OUTDOOR = "outdoor",
    INDOOR = "indoor"
}
export interface PropertyLocation {
    address: string;
    city: string;
    province: string;
    country: string;
    postalCode?: string;
    neighborhood?: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    nearbyPlaces?: NearbyPlace[];
}
export interface NearbyPlace {
    name: string;
    type: PlaceType;
    distance: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
export declare enum PlaceType {
    SCHOOL = "school",
    HOSPITAL = "hospital",
    SUPERMARKET = "supermarket",
    RESTAURANT = "restaurant",
    BANK = "bank",
    GAS_STATION = "gas_station",
    BEACH = "beach",
    PARK = "park",
    MALL = "mall",
    AIRPORT = "airport",
    METRO = "metro",
    BUS_STOP = "bus_stop"
}
export declare enum PropertySortBy {
    MOST_RECENT = "most_recent",
    PRICE_LOW_TO_HIGH = "price_low_to_high",
    PRICE_HIGH_TO_LOW = "price_high_to_low",
    AREA_LARGEST = "area_largest",
    AREA_SMALLEST = "area_smallest",
    MOST_VIEWED = "most_viewed",
    MOST_FAVORITED = "most_favorited"
}
export interface PropertyImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
    type: ImageType;
}
export declare enum ImageType {
    EXTERIOR = "exterior",
    INTERIOR = "interior",
    KITCHEN = "kitchen",
    BATHROOM = "bathroom",
    BEDROOM = "bedroom",
    LIVING_ROOM = "living_room",
    POOL = "pool",
    GARDEN = "garden",
    VIEW = "view",
    FLOOR_PLAN = "floor_plan"
}
export interface PropertyAgent {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
    company?: string;
    license?: string;
}
export interface PropertyOwner {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    type: OwnerType;
}
export declare enum OwnerType {
    INDIVIDUAL = "individual",
    COMPANY = "company",
    GOVERNMENT = "government"
}
export interface PropertySearchFilters {
    query?: string;
    type?: PropertyType[];
    status?: PropertyStatus[];
    listingType?: ListingType;
    priceMin?: number;
    priceMax?: number;
    currency?: 'DOP' | 'USD';
    areaMin?: number;
    areaMax?: number;
    bedrooms?: number[];
    bathrooms?: number[];
    parkingSpaces?: number[];
    location?: {
        city?: string;
        province?: string;
        neighborhood?: string;
        radius?: number;
        coordinates?: {
            latitude: number;
            longitude: number;
        };
    };
    features?: string[];
    yearBuiltMin?: number;
    yearBuiltMax?: number;
    sortBy?: PropertySortBy;
    limit?: number;
    offset?: number;
}
export interface PropertySearchResult {
    properties: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    filters: PropertySearchFilters;
}
export interface CreatePropertyDTO {
    title: string;
    description: string;
    type: PropertyType;
    status: PropertyStatus;
    price: number;
    currency: 'DOP' | 'USD';
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    yearBuilt?: number;
    features: string[];
    location: Omit<PropertyLocation, 'nearbyPlaces'>;
    agentId: string;
    ownerId?: string;
}
export interface UpdatePropertyDTO extends Partial<CreatePropertyDTO> {
    isActive?: boolean;
}
export interface PropertyFavorite {
    id: string;
    userId: string;
    propertyId: string;
    createdAt: Date;
    notes?: string;
}
export interface PropertyView {
    id: string;
    propertyId: string;
    userId?: string;
    sessionId: string;
    ipAddress?: string;
    userAgent?: string;
    viewedAt: Date;
    duration?: number;
}
export interface PropertyShare {
    id: string;
    propertyId: string;
    userId?: string;
    platform: SharePlatform;
    sharedAt: Date;
    message?: string;
}
export declare enum SharePlatform {
    EMAIL = "email",
    WHATSAPP = "whatsapp",
    FACEBOOK = "facebook",
    TWITTER = "twitter",
    LINKEDIN = "linkedin",
    TELEGRAM = "telegram",
    COPY_LINK = "copy_link"
}
export interface PropertyInquiry {
    id: string;
    propertyId: string;
    userId?: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    inquiryType: InquiryType;
    preferredContactMethod: ContactMethod;
    createdAt: Date;
    status: InquiryStatus;
    agentResponse?: string;
    respondedAt?: Date;
}
export declare enum InquiryType {
    GENERAL_INFO = "general_info",
    SCHEDULE_VISIT = "schedule_visit",
    PRICE_NEGOTIATION = "price_negotiation",
    FINANCING = "financing",
    LEGAL_INFO = "legal_info"
}
export declare enum ContactMethod {
    EMAIL = "email",
    PHONE = "phone",
    WHATSAPP = "whatsapp",
    ANY = "any"
}
export declare enum InquiryStatus {
    PENDING = "pending",
    RESPONDED = "responded",
    IN_PROGRESS = "in_progress",
    CLOSED = "closed"
}
export interface PropertyStats {
    propertyId: string;
    views24h: number;
    views7d: number;
    views30d: number;
    totalViews: number;
    favorites: number;
    shares: number;
    inquiries: number;
    viewHistory: {
        date: string;
        views: number;
    }[];
    topReferrers: {
        source: string;
        views: number;
    }[];
}
export interface PropertyAdvancedFilters extends PropertySearchFilters {
    isVerified?: boolean;
    isFeatured?: boolean;
    hasVirtualTour?: boolean;
    hasVideo?: boolean;
    pricePerSqm?: {
        min?: number;
        max?: number;
    };
    lotSizeMin?: number;
    lotSizeMax?: number;
    halfBathrooms?: number[];
    tags?: string[];
    agentId?: string;
    ownerId?: string;
    publishedAfter?: Date;
    publishedBefore?: Date;
}
export interface PropertySortOptions {
    field: 'price' | 'area' | 'bedrooms' | 'createdAt' | 'viewsCount' | 'relevance';
    order: 'asc' | 'desc';
}
export interface PropertySearchParams {
    query?: string;
    filters?: PropertyAdvancedFilters;
    sort?: PropertySortOptions;
    page?: number;
    limit?: number;
    includeInactive?: boolean;
}
