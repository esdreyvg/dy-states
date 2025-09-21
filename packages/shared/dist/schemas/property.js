import { z } from 'zod';
import { PropertyType, PropertyStatus, ListingType, FeatureCategory, ImageType, PlaceType, OwnerType, VirtualTourType, SharePlatform, InquiryType, ContactMethod } from '../types/property';
// Base schemas
export const coordinatesSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
});
export const propertyLocationSchema = z.object({
    address: z.string().min(1, 'La dirección es requerida'),
    city: z.string().min(1, 'La ciudad es requerida'),
    province: z.string().min(1, 'La provincia es requerida'),
    country: z.string().min(1, 'El país es requerido'),
    postalCode: z.string().optional(),
    neighborhood: z.string().optional(),
    coordinates: coordinatesSchema,
    nearbyPlaces: z.array(z.object({
        name: z.string(),
        type: z.nativeEnum(PlaceType),
        distance: z.number().positive(),
        coordinates: coordinatesSchema,
    })).optional(),
});
export const propertyFeatureSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre de la característica es requerido'),
    category: z.nativeEnum(FeatureCategory),
    icon: z.string().optional(),
});
export const propertyImageSchema = z.object({
    id: z.string(),
    url: z.string().url('URL de imagen inválida'),
    alt: z.string().min(1, 'El texto alternativo es requerido'),
    isPrimary: z.boolean(),
    order: z.number().int().nonnegative(),
    type: z.nativeEnum(ImageType),
});
export const virtualTourSchema = z.object({
    id: z.string(),
    type: z.nativeEnum(VirtualTourType),
    url: z.string().url('URL de tour virtual inválida'),
    title: z.string().min(1, 'El título del tour es requerido'),
    description: z.string().optional(),
    thumbnail: z.string().url().optional(),
    duration: z.number().positive().optional(),
    order: z.number().int().nonnegative(),
});
export const propertyAgentSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(1, 'El teléfono es requerido'),
    avatar: z.string().url().optional(),
    company: z.string().optional(),
    license: z.string().optional(),
});
export const propertyOwnerSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, 'El nombre es requerido'),
    lastName: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    type: z.nativeEnum(OwnerType),
});
// Main property schema
export const propertySchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'El título es requerido').max(200, 'El título no puede exceder 200 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(5000, 'La descripción no puede exceder 5000 caracteres'),
    type: z.nativeEnum(PropertyType, {
        errorMap: () => ({ message: 'Tipo de propiedad inválido' })
    }),
    status: z.nativeEnum(PropertyStatus, {
        errorMap: () => ({ message: 'Estado de propiedad inválido' })
    }),
    listingType: z.nativeEnum(ListingType, {
        errorMap: () => ({ message: 'Tipo de listado inválido' })
    }),
    price: z.number().positive('El precio debe ser mayor a 0'),
    currency: z.enum(['DOP', 'USD'], {
        errorMap: () => ({ message: 'Moneda inválida' })
    }),
    area: z.number().positive('El área debe ser mayor a 0'),
    bedrooms: z.number().int().nonnegative('El número de habitaciones debe ser mayor o igual a 0'),
    bathrooms: z.number().int().nonnegative('El número de baños debe ser mayor o igual a 0'),
    halfBathrooms: z.number().int().nonnegative().optional(),
    parkingSpaces: z.number().int().nonnegative('El número de espacios de parqueo debe ser mayor o igual a 0'),
    yearBuilt: z.number().int().min(1800, 'Año inválido').max(new Date().getFullYear() + 5, 'Año inválido').optional(),
    lotSize: z.number().positive().optional(),
    features: z.array(propertyFeatureSchema),
    location: propertyLocationSchema,
    images: z.array(propertyImageSchema).min(1, 'Se requiere al menos una imagen'),
    virtualTours: z.array(virtualTourSchema).optional(),
    agent: propertyAgentSchema,
    owner: propertyOwnerSchema.optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date().optional(),
    viewsCount: z.number().int().nonnegative(),
    favoritesCount: z.number().int().nonnegative(),
    isActive: z.boolean(),
    isFeatured: z.boolean().optional(),
    isVerified: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    maintenanceFee: z.number().nonnegative().optional(),
    propertyTax: z.number().nonnegative().optional(),
    hoaFee: z.number().nonnegative().optional(),
});
// Create property schema
export const createPropertySchema = z.object({
    title: z.string().min(1, 'El título es requerido').max(200, 'El título no puede exceder 200 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(5000, 'La descripción no puede exceder 5000 caracteres'),
    type: z.nativeEnum(PropertyType),
    status: z.nativeEnum(PropertyStatus),
    listingType: z.nativeEnum(ListingType),
    price: z.number().positive('El precio debe ser mayor a 0'),
    currency: z.enum(['DOP', 'USD']),
    area: z.number().positive('El área debe ser mayor a 0'),
    bedrooms: z.number().int().nonnegative(),
    bathrooms: z.number().int().nonnegative(),
    halfBathrooms: z.number().int().nonnegative().optional(),
    parkingSpaces: z.number().int().nonnegative(),
    yearBuilt: z.number().int().min(1800).max(new Date().getFullYear() + 5).optional(),
    lotSize: z.number().positive().optional(),
    features: z.array(z.string()).min(1, 'Se requiere al menos una característica'),
    location: propertyLocationSchema.omit({ nearbyPlaces: true }),
    agentId: z.string().min(1, 'Se requiere un agente asignado'),
    ownerId: z.string().optional(),
    isFeatured: z.boolean().optional().default(false),
    isVerified: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    maintenanceFee: z.number().nonnegative().optional(),
    propertyTax: z.number().nonnegative().optional(),
    hoaFee: z.number().nonnegative().optional(),
});
// Update property schema
export const updatePropertySchema = createPropertySchema.partial().extend({
    isActive: z.boolean().optional(),
});
// Property search filters schema
export const propertySearchFiltersSchema = z.object({
    type: z.array(z.nativeEnum(PropertyType)).optional(),
    status: z.array(z.nativeEnum(PropertyStatus)).optional(),
    listingType: z.nativeEnum(ListingType).optional(),
    priceMin: z.number().nonnegative().optional(),
    priceMax: z.number().nonnegative().optional(),
    currency: z.enum(['DOP', 'USD']).optional(),
    areaMin: z.number().positive().optional(),
    areaMax: z.number().positive().optional(),
    bedrooms: z.array(z.number().int().nonnegative()).optional(),
    bathrooms: z.array(z.number().int().nonnegative()).optional(),
    parkingSpaces: z.array(z.number().int().nonnegative()).optional(),
    location: z.object({
        city: z.string().optional(),
        province: z.string().optional(),
        neighborhood: z.string().optional(),
        radius: z.number().positive().max(100).optional(), // max 100km
        coordinates: coordinatesSchema.optional(),
    }).optional(),
    features: z.array(z.string()).optional(),
    yearBuiltMin: z.number().int().min(1800).optional(),
    yearBuiltMax: z.number().int().max(new Date().getFullYear() + 5).optional(),
    isVerified: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    hasVirtualTour: z.boolean().optional(),
    hasVideo: z.boolean().optional(),
    pricePerSqm: z.object({
        min: z.number().positive().optional(),
        max: z.number().positive().optional(),
    }).optional(),
    lotSizeMin: z.number().positive().optional(),
    lotSizeMax: z.number().positive().optional(),
    halfBathrooms: z.array(z.number().int().nonnegative()).optional(),
    tags: z.array(z.string()).optional(),
    agentId: z.string().optional(),
    ownerId: z.string().optional(),
    publishedAfter: z.date().optional(),
    publishedBefore: z.date().optional(),
});
// Property search params schema
export const propertySearchParamsSchema = z.object({
    query: z.string().optional(),
    filters: propertySearchFiltersSchema.optional(),
    sort: z.object({
        field: z.enum(['price', 'area', 'bedrooms', 'createdAt', 'viewsCount', 'relevance']),
        order: z.enum(['asc', 'desc']),
    }).optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(20),
    includeInactive: z.boolean().optional().default(false),
});
// Property interactions schemas
export const propertyFavoriteSchema = z.object({
    id: z.string(),
    userId: z.string(),
    propertyId: z.string(),
    createdAt: z.date(),
    notes: z.string().max(500).optional(),
});
export const createPropertyFavoriteSchema = z.object({
    propertyId: z.string().min(1, 'ID de propiedad es requerido'),
    notes: z.string().max(500).optional(),
});
export const propertyShareSchema = z.object({
    propertyId: z.string().min(1, 'ID de propiedad es requerido'),
    platform: z.nativeEnum(SharePlatform),
    message: z.string().max(1000).optional(),
});
export const propertyInquirySchema = z.object({
    propertyId: z.string().min(1, 'ID de propiedad es requerido'),
    name: z.string().min(1, 'El nombre es requerido').max(100),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Teléfono inválido').max(20).optional(),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(2000),
    inquiryType: z.nativeEnum(InquiryType),
    preferredContactMethod: z.nativeEnum(ContactMethod),
});
// File upload schemas
export const imageUploadSchema = z.object({
    file: z.any(), // Will be validated by multer/file upload middleware
    alt: z.string().min(1, 'Texto alternativo requerido'),
    type: z.nativeEnum(ImageType),
    isPrimary: z.boolean().optional().default(false),
});
export const virtualTourUploadSchema = z.object({
    type: z.nativeEnum(VirtualTourType),
    title: z.string().min(1, 'Título requerido'),
    description: z.string().optional(),
    url: z.string().url('URL inválida').optional(), // Optional if uploading file
    file: z.any().optional(), // For file uploads
    duration: z.number().positive().optional(),
});
// Validation helpers
export const validateProperty = (data) => propertySchema.parse(data);
export const validateCreateProperty = (data) => createPropertySchema.parse(data);
export const validateUpdateProperty = (data) => updatePropertySchema.parse(data);
export const validatePropertySearch = (data) => propertySearchParamsSchema.parse(data);
export const validatePropertyInquiry = (data) => propertyInquirySchema.parse(data);
// Legacy export for compatibility
export const PropertySchema = propertySchema;
