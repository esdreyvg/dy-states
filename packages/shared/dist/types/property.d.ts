export interface Property {
    id: string;
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
    features: PropertyFeature[];
    location: PropertyLocation;
    images: PropertyImage[];
    agent: PropertyAgent;
    owner?: PropertyOwner;
    createdAt: Date;
    updatedAt: Date;
    viewsCount: number;
    favoritesCount: number;
    isActive: boolean;
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
    type?: PropertyType[];
    status?: PropertyStatus[];
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
