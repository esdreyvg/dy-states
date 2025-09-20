import { z } from 'zod';
export const PropertySchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be positive'),
    location: z.object({
        address: z.string().min(1, 'Address is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        country: z.string().min(1, 'Country is required'),
        zipCode: z.string().optional(),
        coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
        }).optional(),
    }),
    type: z.enum(['house', 'apartment', 'condo', 'villa', 'land']),
    status: z.enum(['available', 'sold', 'rented', 'pending']),
    features: z.object({
        bedrooms: z.number().min(0),
        bathrooms: z.number().min(0),
        area: z.number().positive('Area must be positive'),
        parkingSpaces: z.number().min(0).optional(),
        yearBuilt: z.number().optional(),
        furnished: z.boolean().optional(),
    }),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    amenities: z.array(z.string()).optional(),
    agentId: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
