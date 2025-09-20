import { z } from 'zod';
export declare const PropertySchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        zipCode: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodOptional<z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lat: number;
            lng: number;
        }, {
            lat: number;
            lng: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        zipCode?: string | undefined;
    }, {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        zipCode?: string | undefined;
    }>;
    type: z.ZodEnum<["house", "apartment", "condo", "villa", "land"]>;
    status: z.ZodEnum<["available", "sold", "rented", "pending"]>;
    features: z.ZodObject<{
        bedrooms: z.ZodNumber;
        bathrooms: z.ZodNumber;
        area: z.ZodNumber;
        parkingSpaces: z.ZodOptional<z.ZodNumber>;
        yearBuilt: z.ZodOptional<z.ZodNumber>;
        furnished: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        area: number;
        bedrooms: number;
        bathrooms: number;
        parkingSpaces?: number | undefined;
        yearBuilt?: number | undefined;
        furnished?: boolean | undefined;
    }, {
        area: number;
        bedrooms: number;
        bathrooms: number;
        parkingSpaces?: number | undefined;
        yearBuilt?: number | undefined;
        furnished?: boolean | undefined;
    }>;
    images: z.ZodArray<z.ZodString, "many">;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    agentId: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "sold" | "rented" | "available";
    createdAt: string;
    updatedAt: string;
    type: "apartment" | "house" | "villa" | "land" | "condo";
    title: string;
    description: string;
    price: number;
    features: {
        area: number;
        bedrooms: number;
        bathrooms: number;
        parkingSpaces?: number | undefined;
        yearBuilt?: number | undefined;
        furnished?: boolean | undefined;
    };
    location: {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        zipCode?: string | undefined;
    };
    agentId: string;
    images: string[];
    amenities?: string[] | undefined;
}, {
    id: string;
    status: "pending" | "sold" | "rented" | "available";
    createdAt: string;
    updatedAt: string;
    type: "apartment" | "house" | "villa" | "land" | "condo";
    title: string;
    description: string;
    price: number;
    features: {
        area: number;
        bedrooms: number;
        bathrooms: number;
        parkingSpaces?: number | undefined;
        yearBuilt?: number | undefined;
        furnished?: boolean | undefined;
    };
    location: {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        zipCode?: string | undefined;
    };
    agentId: string;
    images: string[];
    amenities?: string[] | undefined;
}>;
export type Property = z.infer<typeof PropertySchema>;
