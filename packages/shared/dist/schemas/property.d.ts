import { z } from 'zod';
import { PropertyType, PropertyStatus, ListingType, FeatureCategory, ImageType, PlaceType, OwnerType, VirtualTourType, SharePlatform, InquiryType, ContactMethod } from '../types/property';
export declare const coordinatesSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latitude: number;
    longitude: number;
}, {
    latitude: number;
    longitude: number;
}>;
export declare const propertyLocationSchema: z.ZodObject<{
    address: z.ZodString;
    city: z.ZodString;
    province: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodOptional<z.ZodString>;
    neighborhood: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>;
    nearbyPlaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodNativeEnum<typeof PlaceType>;
        distance: z.ZodNumber;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        type: PlaceType;
        name: string;
        distance: number;
    }, {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        type: PlaceType;
        name: string;
        distance: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    address: string;
    city: string;
    province: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    nearbyPlaces?: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        type: PlaceType;
        name: string;
        distance: number;
    }[] | undefined;
    postalCode?: string | undefined;
    neighborhood?: string | undefined;
}, {
    address: string;
    city: string;
    province: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    nearbyPlaces?: {
        coordinates: {
            latitude: number;
            longitude: number;
        };
        type: PlaceType;
        name: string;
        distance: number;
    }[] | undefined;
    postalCode?: string | undefined;
    neighborhood?: string | undefined;
}>;
export declare const propertyFeatureSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    category: z.ZodNativeEnum<typeof FeatureCategory>;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    category: FeatureCategory;
    icon?: string | undefined;
}, {
    id: string;
    name: string;
    category: FeatureCategory;
    icon?: string | undefined;
}>;
export declare const propertyImageSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    alt: z.ZodString;
    isPrimary: z.ZodBoolean;
    order: z.ZodNumber;
    type: z.ZodNativeEnum<typeof ImageType>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: ImageType;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
}, {
    id: string;
    type: ImageType;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
}>;
export declare const virtualTourSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof VirtualTourType>;
    url: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    type: VirtualTourType;
    url: string;
    order: number;
    description?: string | undefined;
    thumbnail?: string | undefined;
    duration?: number | undefined;
}, {
    id: string;
    title: string;
    type: VirtualTourType;
    url: string;
    order: number;
    description?: string | undefined;
    thumbnail?: string | undefined;
    duration?: number | undefined;
}>;
export declare const propertyAgentSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    license: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar?: string | undefined;
    company?: string | undefined;
    license?: string | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar?: string | undefined;
    company?: string | undefined;
    license?: string | undefined;
}>;
export declare const propertyOwnerSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    type: z.ZodNativeEnum<typeof OwnerType>;
}, "strip", z.ZodTypeAny, {
    id: string;
    firstName: string;
    lastName: string;
    type: OwnerType;
    email?: string | undefined;
    phone?: string | undefined;
}, {
    id: string;
    firstName: string;
    lastName: string;
    type: OwnerType;
    email?: string | undefined;
    phone?: string | undefined;
}>;
export declare const propertySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodNativeEnum<typeof PropertyType>;
    status: z.ZodNativeEnum<typeof PropertyStatus>;
    listingType: z.ZodNativeEnum<typeof ListingType>;
    price: z.ZodNumber;
    currency: z.ZodEnum<["DOP", "USD"]>;
    area: z.ZodNumber;
    bedrooms: z.ZodNumber;
    bathrooms: z.ZodNumber;
    halfBathrooms: z.ZodOptional<z.ZodNumber>;
    parkingSpaces: z.ZodNumber;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
    lotSize: z.ZodOptional<z.ZodNumber>;
    features: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        category: z.ZodNativeEnum<typeof FeatureCategory>;
        icon: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }, {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }>, "many">;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        province: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        nearbyPlaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodNativeEnum<typeof PlaceType>;
            distance: z.ZodNumber;
            coordinates: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        alt: z.ZodString;
        isPrimary: z.ZodBoolean;
        order: z.ZodNumber;
        type: z.ZodNativeEnum<typeof ImageType>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }, {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }>, "many">;
    virtualTours: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof VirtualTourType>;
        url: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        thumbnail: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodNumber>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }, {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }>, "many">>;
    agent: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        license: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    }>;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        type: z.ZodNativeEnum<typeof OwnerType>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    }, {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
    viewsCount: z.ZodNumber;
    favoritesCount: z.ZodNumber;
    isActive: z.ZodBoolean;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    maintenanceFee: z.ZodOptional<z.ZodNumber>;
    propertyTax: z.ZodOptional<z.ZodNumber>;
    hoaFee: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    agent: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    };
    id: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    isActive: boolean;
    viewsCount: number;
    listingType: ListingType;
    images: {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }[];
    favoritesCount: number;
    owner?: {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    } | undefined;
    yearBuilt?: number | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    virtualTours?: {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }[] | undefined;
    publishedAt?: Date | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}, {
    agent: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    };
    id: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    isActive: boolean;
    viewsCount: number;
    listingType: ListingType;
    images: {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }[];
    favoritesCount: number;
    owner?: {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    } | undefined;
    yearBuilt?: number | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    virtualTours?: {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }[] | undefined;
    publishedAt?: Date | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}>;
export declare const createPropertySchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodNativeEnum<typeof PropertyType>;
    status: z.ZodNativeEnum<typeof PropertyStatus>;
    listingType: z.ZodNativeEnum<typeof ListingType>;
    price: z.ZodNumber;
    currency: z.ZodEnum<["DOP", "USD"]>;
    area: z.ZodNumber;
    bedrooms: z.ZodNumber;
    bathrooms: z.ZodNumber;
    halfBathrooms: z.ZodOptional<z.ZodNumber>;
    parkingSpaces: z.ZodNumber;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
    lotSize: z.ZodOptional<z.ZodNumber>;
    features: z.ZodArray<z.ZodString, "many">;
    location: z.ZodObject<Omit<{
        address: z.ZodString;
        city: z.ZodString;
        province: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        nearbyPlaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodNativeEnum<typeof PlaceType>;
            distance: z.ZodNumber;
            coordinates: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }>, "many">>;
    }, "nearbyPlaces">, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }>;
    agentId: z.ZodString;
    ownerId: z.ZodOptional<z.ZodString>;
    isFeatured: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    isVerified: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    maintenanceFee: z.ZodOptional<z.ZodNumber>;
    propertyTax: z.ZodOptional<z.ZodNumber>;
    hoaFee: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: PropertyStatus;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: string[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    agentId: string;
    isVerified: boolean;
    isFeatured: boolean;
    listingType: ListingType;
    yearBuilt?: number | undefined;
    ownerId?: string | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}, {
    status: PropertyStatus;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: string[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    agentId: string;
    listingType: ListingType;
    yearBuilt?: number | undefined;
    ownerId?: string | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}>;
export declare const updatePropertySchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof PropertyType>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof PropertyStatus>>;
    listingType: z.ZodOptional<z.ZodNativeEnum<typeof ListingType>>;
    price: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
    area: z.ZodOptional<z.ZodNumber>;
    bedrooms: z.ZodOptional<z.ZodNumber>;
    bathrooms: z.ZodOptional<z.ZodNumber>;
    halfBathrooms: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    parkingSpaces: z.ZodOptional<z.ZodNumber>;
    yearBuilt: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    lotSize: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    location: z.ZodOptional<z.ZodObject<Omit<{
        address: z.ZodString;
        city: z.ZodString;
        province: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        nearbyPlaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodNativeEnum<typeof PlaceType>;
            distance: z.ZodNumber;
            coordinates: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }>, "many">>;
    }, "nearbyPlaces">, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }>>;
    agentId: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    isVerified: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    maintenanceFee: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    propertyTax: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    hoaFee: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
} & {
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status?: PropertyStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    type?: PropertyType | undefined;
    price?: number | undefined;
    currency?: "DOP" | "USD" | undefined;
    area?: number | undefined;
    bedrooms?: number | undefined;
    bathrooms?: number | undefined;
    parkingSpaces?: number | undefined;
    yearBuilt?: number | undefined;
    features?: string[] | undefined;
    location?: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    } | undefined;
    agentId?: string | undefined;
    ownerId?: string | undefined;
    isActive?: boolean | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    listingType?: ListingType | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}, {
    status?: PropertyStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    type?: PropertyType | undefined;
    price?: number | undefined;
    currency?: "DOP" | "USD" | undefined;
    area?: number | undefined;
    bedrooms?: number | undefined;
    bathrooms?: number | undefined;
    parkingSpaces?: number | undefined;
    yearBuilt?: number | undefined;
    features?: string[] | undefined;
    location?: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    } | undefined;
    agentId?: string | undefined;
    ownerId?: string | undefined;
    isActive?: boolean | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    listingType?: ListingType | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}>;
export declare const propertySearchFiltersSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyStatus>, "many">>;
    listingType: z.ZodOptional<z.ZodNativeEnum<typeof ListingType>>;
    priceMin: z.ZodOptional<z.ZodNumber>;
    priceMax: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
    areaMin: z.ZodOptional<z.ZodNumber>;
    areaMax: z.ZodOptional<z.ZodNumber>;
    bedrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    bathrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    parkingSpaces: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    location: z.ZodOptional<z.ZodObject<{
        city: z.ZodOptional<z.ZodString>;
        province: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city?: string | undefined;
        province?: string | undefined;
        neighborhood?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
        radius?: number | undefined;
    }, {
        city?: string | undefined;
        province?: string | undefined;
        neighborhood?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
        radius?: number | undefined;
    }>>;
    features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    yearBuiltMin: z.ZodOptional<z.ZodNumber>;
    yearBuiltMax: z.ZodOptional<z.ZodNumber>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    hasVirtualTour: z.ZodOptional<z.ZodBoolean>;
    hasVideo: z.ZodOptional<z.ZodBoolean>;
    pricePerSqm: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>>;
    lotSizeMin: z.ZodOptional<z.ZodNumber>;
    lotSizeMax: z.ZodOptional<z.ZodNumber>;
    halfBathrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    agentId: z.ZodOptional<z.ZodString>;
    ownerId: z.ZodOptional<z.ZodString>;
    publishedAfter: z.ZodOptional<z.ZodDate>;
    publishedBefore: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status?: PropertyStatus[] | undefined;
    type?: PropertyType[] | undefined;
    currency?: "DOP" | "USD" | undefined;
    bedrooms?: number[] | undefined;
    bathrooms?: number[] | undefined;
    parkingSpaces?: number[] | undefined;
    features?: string[] | undefined;
    location?: {
        city?: string | undefined;
        province?: string | undefined;
        neighborhood?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
        radius?: number | undefined;
    } | undefined;
    agentId?: string | undefined;
    ownerId?: string | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    hasVirtualTour?: boolean | undefined;
    hasVideo?: boolean | undefined;
    pricePerSqm?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    lotSizeMin?: number | undefined;
    lotSizeMax?: number | undefined;
    halfBathrooms?: number[] | undefined;
    tags?: string[] | undefined;
    publishedAfter?: Date | undefined;
    publishedBefore?: Date | undefined;
    listingType?: ListingType | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    areaMin?: number | undefined;
    areaMax?: number | undefined;
    yearBuiltMin?: number | undefined;
    yearBuiltMax?: number | undefined;
}, {
    status?: PropertyStatus[] | undefined;
    type?: PropertyType[] | undefined;
    currency?: "DOP" | "USD" | undefined;
    bedrooms?: number[] | undefined;
    bathrooms?: number[] | undefined;
    parkingSpaces?: number[] | undefined;
    features?: string[] | undefined;
    location?: {
        city?: string | undefined;
        province?: string | undefined;
        neighborhood?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
        radius?: number | undefined;
    } | undefined;
    agentId?: string | undefined;
    ownerId?: string | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    hasVirtualTour?: boolean | undefined;
    hasVideo?: boolean | undefined;
    pricePerSqm?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    lotSizeMin?: number | undefined;
    lotSizeMax?: number | undefined;
    halfBathrooms?: number[] | undefined;
    tags?: string[] | undefined;
    publishedAfter?: Date | undefined;
    publishedBefore?: Date | undefined;
    listingType?: ListingType | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    areaMin?: number | undefined;
    areaMax?: number | undefined;
    yearBuiltMin?: number | undefined;
    yearBuiltMax?: number | undefined;
}>;
export declare const propertySearchParamsSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    filters: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
        status: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyStatus>, "many">>;
        listingType: z.ZodOptional<z.ZodNativeEnum<typeof ListingType>>;
        priceMin: z.ZodOptional<z.ZodNumber>;
        priceMax: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
        areaMin: z.ZodOptional<z.ZodNumber>;
        areaMax: z.ZodOptional<z.ZodNumber>;
        bedrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        bathrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        parkingSpaces: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        location: z.ZodOptional<z.ZodObject<{
            city: z.ZodOptional<z.ZodString>;
            province: z.ZodOptional<z.ZodString>;
            neighborhood: z.ZodOptional<z.ZodString>;
            radius: z.ZodOptional<z.ZodNumber>;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        }, {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        }>>;
        features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        yearBuiltMin: z.ZodOptional<z.ZodNumber>;
        yearBuiltMax: z.ZodOptional<z.ZodNumber>;
        isVerified: z.ZodOptional<z.ZodBoolean>;
        isFeatured: z.ZodOptional<z.ZodBoolean>;
        hasVirtualTour: z.ZodOptional<z.ZodBoolean>;
        hasVideo: z.ZodOptional<z.ZodBoolean>;
        pricePerSqm: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
        lotSizeMin: z.ZodOptional<z.ZodNumber>;
        lotSizeMax: z.ZodOptional<z.ZodNumber>;
        halfBathrooms: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        agentId: z.ZodOptional<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodString>;
        publishedAfter: z.ZodOptional<z.ZodDate>;
        publishedBefore: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        status?: PropertyStatus[] | undefined;
        type?: PropertyType[] | undefined;
        currency?: "DOP" | "USD" | undefined;
        bedrooms?: number[] | undefined;
        bathrooms?: number[] | undefined;
        parkingSpaces?: number[] | undefined;
        features?: string[] | undefined;
        location?: {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        } | undefined;
        agentId?: string | undefined;
        ownerId?: string | undefined;
        isVerified?: boolean | undefined;
        isFeatured?: boolean | undefined;
        hasVirtualTour?: boolean | undefined;
        hasVideo?: boolean | undefined;
        pricePerSqm?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        lotSizeMin?: number | undefined;
        lotSizeMax?: number | undefined;
        halfBathrooms?: number[] | undefined;
        tags?: string[] | undefined;
        publishedAfter?: Date | undefined;
        publishedBefore?: Date | undefined;
        listingType?: ListingType | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        areaMin?: number | undefined;
        areaMax?: number | undefined;
        yearBuiltMin?: number | undefined;
        yearBuiltMax?: number | undefined;
    }, {
        status?: PropertyStatus[] | undefined;
        type?: PropertyType[] | undefined;
        currency?: "DOP" | "USD" | undefined;
        bedrooms?: number[] | undefined;
        bathrooms?: number[] | undefined;
        parkingSpaces?: number[] | undefined;
        features?: string[] | undefined;
        location?: {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        } | undefined;
        agentId?: string | undefined;
        ownerId?: string | undefined;
        isVerified?: boolean | undefined;
        isFeatured?: boolean | undefined;
        hasVirtualTour?: boolean | undefined;
        hasVideo?: boolean | undefined;
        pricePerSqm?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        lotSizeMin?: number | undefined;
        lotSizeMax?: number | undefined;
        halfBathrooms?: number[] | undefined;
        tags?: string[] | undefined;
        publishedAfter?: Date | undefined;
        publishedBefore?: Date | undefined;
        listingType?: ListingType | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        areaMin?: number | undefined;
        areaMax?: number | undefined;
        yearBuiltMin?: number | undefined;
        yearBuiltMax?: number | undefined;
    }>>;
    sort: z.ZodOptional<z.ZodObject<{
        field: z.ZodEnum<["price", "area", "bedrooms", "createdAt", "viewsCount", "relevance"]>;
        order: z.ZodEnum<["asc", "desc"]>;
    }, "strip", z.ZodTypeAny, {
        order: "asc" | "desc";
        field: "createdAt" | "price" | "area" | "bedrooms" | "viewsCount" | "relevance";
    }, {
        order: "asc" | "desc";
        field: "createdAt" | "price" | "area" | "bedrooms" | "viewsCount" | "relevance";
    }>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    includeInactive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    includeInactive: boolean;
    sort?: {
        order: "asc" | "desc";
        field: "createdAt" | "price" | "area" | "bedrooms" | "viewsCount" | "relevance";
    } | undefined;
    query?: string | undefined;
    filters?: {
        status?: PropertyStatus[] | undefined;
        type?: PropertyType[] | undefined;
        currency?: "DOP" | "USD" | undefined;
        bedrooms?: number[] | undefined;
        bathrooms?: number[] | undefined;
        parkingSpaces?: number[] | undefined;
        features?: string[] | undefined;
        location?: {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        } | undefined;
        agentId?: string | undefined;
        ownerId?: string | undefined;
        isVerified?: boolean | undefined;
        isFeatured?: boolean | undefined;
        hasVirtualTour?: boolean | undefined;
        hasVideo?: boolean | undefined;
        pricePerSqm?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        lotSizeMin?: number | undefined;
        lotSizeMax?: number | undefined;
        halfBathrooms?: number[] | undefined;
        tags?: string[] | undefined;
        publishedAfter?: Date | undefined;
        publishedBefore?: Date | undefined;
        listingType?: ListingType | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        areaMin?: number | undefined;
        areaMax?: number | undefined;
        yearBuiltMin?: number | undefined;
        yearBuiltMax?: number | undefined;
    } | undefined;
}, {
    sort?: {
        order: "asc" | "desc";
        field: "createdAt" | "price" | "area" | "bedrooms" | "viewsCount" | "relevance";
    } | undefined;
    query?: string | undefined;
    filters?: {
        status?: PropertyStatus[] | undefined;
        type?: PropertyType[] | undefined;
        currency?: "DOP" | "USD" | undefined;
        bedrooms?: number[] | undefined;
        bathrooms?: number[] | undefined;
        parkingSpaces?: number[] | undefined;
        features?: string[] | undefined;
        location?: {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        } | undefined;
        agentId?: string | undefined;
        ownerId?: string | undefined;
        isVerified?: boolean | undefined;
        isFeatured?: boolean | undefined;
        hasVirtualTour?: boolean | undefined;
        hasVideo?: boolean | undefined;
        pricePerSqm?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        lotSizeMin?: number | undefined;
        lotSizeMax?: number | undefined;
        halfBathrooms?: number[] | undefined;
        tags?: string[] | undefined;
        publishedAfter?: Date | undefined;
        publishedBefore?: Date | undefined;
        listingType?: ListingType | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        areaMin?: number | undefined;
        areaMax?: number | undefined;
        yearBuiltMin?: number | undefined;
        yearBuiltMax?: number | undefined;
    } | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    includeInactive?: boolean | undefined;
}>;
export declare const propertyFavoriteSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    propertyId: z.ZodString;
    createdAt: z.ZodDate;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    userId: string;
    propertyId: string;
    notes?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    userId: string;
    propertyId: string;
    notes?: string | undefined;
}>;
export declare const createPropertyFavoriteSchema: z.ZodObject<{
    propertyId: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    propertyId: string;
    notes?: string | undefined;
}, {
    propertyId: string;
    notes?: string | undefined;
}>;
export declare const propertyShareSchema: z.ZodObject<{
    propertyId: z.ZodString;
    platform: z.ZodNativeEnum<typeof SharePlatform>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    propertyId: string;
    platform: SharePlatform;
    message?: string | undefined;
}, {
    propertyId: string;
    platform: SharePlatform;
    message?: string | undefined;
}>;
export declare const propertyInquirySchema: z.ZodObject<{
    propertyId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    inquiryType: z.ZodNativeEnum<typeof InquiryType>;
    preferredContactMethod: z.ZodNativeEnum<typeof ContactMethod>;
}, "strip", z.ZodTypeAny, {
    email: string;
    message: string;
    name: string;
    propertyId: string;
    inquiryType: InquiryType;
    preferredContactMethod: ContactMethod;
    phone?: string | undefined;
}, {
    email: string;
    message: string;
    name: string;
    propertyId: string;
    inquiryType: InquiryType;
    preferredContactMethod: ContactMethod;
    phone?: string | undefined;
}>;
export declare const imageUploadSchema: z.ZodObject<{
    file: z.ZodAny;
    alt: z.ZodString;
    type: z.ZodNativeEnum<typeof ImageType>;
    isPrimary: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    type: ImageType;
    alt: string;
    isPrimary: boolean;
    file?: any;
}, {
    type: ImageType;
    alt: string;
    isPrimary?: boolean | undefined;
    file?: any;
}>;
export declare const virtualTourUploadSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof VirtualTourType>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    file: z.ZodOptional<z.ZodAny>;
    duration: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: VirtualTourType;
    description?: string | undefined;
    url?: string | undefined;
    duration?: number | undefined;
    file?: any;
}, {
    title: string;
    type: VirtualTourType;
    description?: string | undefined;
    url?: string | undefined;
    duration?: number | undefined;
    file?: any;
}>;
export declare const validateProperty: (data: unknown) => {
    agent: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    };
    id: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    isActive: boolean;
    viewsCount: number;
    listingType: ListingType;
    images: {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }[];
    favoritesCount: number;
    owner?: {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    } | undefined;
    yearBuilt?: number | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    virtualTours?: {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }[] | undefined;
    publishedAt?: Date | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
};
export declare const validateCreateProperty: (data: unknown) => {
    status: PropertyStatus;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: string[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    agentId: string;
    isVerified: boolean;
    isFeatured: boolean;
    listingType: ListingType;
    yearBuilt?: number | undefined;
    ownerId?: string | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
};
export declare const validateUpdateProperty: (data: unknown) => {
    status?: PropertyStatus | undefined;
    title?: string | undefined;
    description?: string | undefined;
    type?: PropertyType | undefined;
    price?: number | undefined;
    currency?: "DOP" | "USD" | undefined;
    area?: number | undefined;
    bedrooms?: number | undefined;
    bathrooms?: number | undefined;
    parkingSpaces?: number | undefined;
    yearBuilt?: number | undefined;
    features?: string[] | undefined;
    location?: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    } | undefined;
    agentId?: string | undefined;
    ownerId?: string | undefined;
    isActive?: boolean | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    listingType?: ListingType | undefined;
    lotSize?: number | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
};
export declare const validatePropertySearch: (data: unknown) => {
    page: number;
    limit: number;
    includeInactive: boolean;
    sort?: {
        order: "asc" | "desc";
        field: "createdAt" | "price" | "area" | "bedrooms" | "viewsCount" | "relevance";
    } | undefined;
    query?: string | undefined;
    filters?: {
        status?: PropertyStatus[] | undefined;
        type?: PropertyType[] | undefined;
        currency?: "DOP" | "USD" | undefined;
        bedrooms?: number[] | undefined;
        bathrooms?: number[] | undefined;
        parkingSpaces?: number[] | undefined;
        features?: string[] | undefined;
        location?: {
            city?: string | undefined;
            province?: string | undefined;
            neighborhood?: string | undefined;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
            radius?: number | undefined;
        } | undefined;
        agentId?: string | undefined;
        ownerId?: string | undefined;
        isVerified?: boolean | undefined;
        isFeatured?: boolean | undefined;
        hasVirtualTour?: boolean | undefined;
        hasVideo?: boolean | undefined;
        pricePerSqm?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        lotSizeMin?: number | undefined;
        lotSizeMax?: number | undefined;
        halfBathrooms?: number[] | undefined;
        tags?: string[] | undefined;
        publishedAfter?: Date | undefined;
        publishedBefore?: Date | undefined;
        listingType?: ListingType | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        areaMin?: number | undefined;
        areaMax?: number | undefined;
        yearBuiltMin?: number | undefined;
        yearBuiltMax?: number | undefined;
    } | undefined;
};
export declare const validatePropertyInquiry: (data: unknown) => {
    email: string;
    message: string;
    name: string;
    propertyId: string;
    inquiryType: InquiryType;
    preferredContactMethod: ContactMethod;
    phone?: string | undefined;
};
export type PropertySchemaType = z.infer<typeof propertySchema>;
export type CreatePropertySchemaType = z.infer<typeof createPropertySchema>;
export type UpdatePropertySchemaType = z.infer<typeof updatePropertySchema>;
export type PropertySearchParamsType = z.infer<typeof propertySearchParamsSchema>;
export type PropertyInquirySchemaType = z.infer<typeof propertyInquirySchema>;
export declare const PropertySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodNativeEnum<typeof PropertyType>;
    status: z.ZodNativeEnum<typeof PropertyStatus>;
    listingType: z.ZodNativeEnum<typeof ListingType>;
    price: z.ZodNumber;
    currency: z.ZodEnum<["DOP", "USD"]>;
    area: z.ZodNumber;
    bedrooms: z.ZodNumber;
    bathrooms: z.ZodNumber;
    halfBathrooms: z.ZodOptional<z.ZodNumber>;
    parkingSpaces: z.ZodNumber;
    yearBuilt: z.ZodOptional<z.ZodNumber>;
    lotSize: z.ZodOptional<z.ZodNumber>;
    features: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        category: z.ZodNativeEnum<typeof FeatureCategory>;
        icon: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }, {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }>, "many">;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        province: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        nearbyPlaces: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodNativeEnum<typeof PlaceType>;
            distance: z.ZodNumber;
            coordinates: z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }, {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    }>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        alt: z.ZodString;
        isPrimary: z.ZodBoolean;
        order: z.ZodNumber;
        type: z.ZodNativeEnum<typeof ImageType>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }, {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }>, "many">;
    virtualTours: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodNativeEnum<typeof VirtualTourType>;
        url: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        thumbnail: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodNumber>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }, {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }>, "many">>;
    agent: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        license: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    }>;
    owner: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        type: z.ZodNativeEnum<typeof OwnerType>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    }, {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    publishedAt: z.ZodOptional<z.ZodDate>;
    viewsCount: z.ZodNumber;
    favoritesCount: z.ZodNumber;
    isActive: z.ZodBoolean;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    maintenanceFee: z.ZodOptional<z.ZodNumber>;
    propertyTax: z.ZodOptional<z.ZodNumber>;
    hoaFee: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    agent: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    };
    id: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    isActive: boolean;
    viewsCount: number;
    listingType: ListingType;
    images: {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }[];
    favoritesCount: number;
    owner?: {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    } | undefined;
    yearBuilt?: number | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    virtualTours?: {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }[] | undefined;
    publishedAt?: Date | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}, {
    agent: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        avatar?: string | undefined;
        company?: string | undefined;
        license?: string | undefined;
    };
    id: string;
    status: PropertyStatus;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    type: PropertyType;
    price: number;
    currency: "DOP" | "USD";
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    features: {
        id: string;
        name: string;
        category: FeatureCategory;
        icon?: string | undefined;
    }[];
    location: {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        nearbyPlaces?: {
            coordinates: {
                latitude: number;
                longitude: number;
            };
            type: PlaceType;
            name: string;
            distance: number;
        }[] | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
    };
    isActive: boolean;
    viewsCount: number;
    listingType: ListingType;
    images: {
        id: string;
        type: ImageType;
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
    }[];
    favoritesCount: number;
    owner?: {
        id: string;
        firstName: string;
        lastName: string;
        type: OwnerType;
        email?: string | undefined;
        phone?: string | undefined;
    } | undefined;
    yearBuilt?: number | undefined;
    isVerified?: boolean | undefined;
    isFeatured?: boolean | undefined;
    halfBathrooms?: number | undefined;
    tags?: string[] | undefined;
    lotSize?: number | undefined;
    virtualTours?: {
        id: string;
        title: string;
        type: VirtualTourType;
        url: string;
        order: number;
        description?: string | undefined;
        thumbnail?: string | undefined;
        duration?: number | undefined;
    }[] | undefined;
    publishedAt?: Date | undefined;
    maintenanceFee?: number | undefined;
    propertyTax?: number | undefined;
    hoaFee?: number | undefined;
}>;
export type Property = PropertySchemaType;
