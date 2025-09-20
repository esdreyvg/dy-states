import { z } from 'zod';
export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().optional(),
    avatar: z.string().url().optional(),
    role: z.enum(['buyer', 'seller', 'agent', 'admin']),
    preferences: z.object({
        language: z.enum(['en', 'es']).default('es'),
        currency: z.enum(['USD', 'DOP']).default('USD'),
        notifications: z.object({
            email: z.boolean().default(true),
            push: z.boolean().default(true),
            sms: z.boolean().default(false),
        }).default({}),
    }).optional(),
    profile: z.object({
        bio: z.string().optional(),
        company: z.string().optional(),
        website: z.string().url().optional(),
        socialLinks: z.object({
            facebook: z.string().url().optional(),
            instagram: z.string().url().optional(),
            linkedin: z.string().url().optional(),
            twitter: z.string().url().optional(),
        }).optional(),
    }).optional(),
    isVerified: z.boolean().default(false),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});
export const RegisterSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().optional(),
    role: z.enum(['buyer', 'seller', 'agent']).default('buyer'),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
