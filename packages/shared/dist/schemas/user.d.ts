import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    role: z.ZodEnum<["admin", "agent", "owner", "client", "investor"]>;
    preferences: z.ZodOptional<z.ZodObject<{
        language: z.ZodDefault<z.ZodEnum<["en", "es"]>>;
        currency: z.ZodDefault<z.ZodEnum<["USD", "DOP"]>>;
        notifications: z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            push: z.ZodDefault<z.ZodBoolean>;
            sms: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
        }, {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        currency: "DOP" | "USD";
        language: "es" | "en";
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    }, {
        currency?: "DOP" | "USD" | undefined;
        language?: "es" | "en" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    }>>;
    profile: z.ZodOptional<z.ZodObject<{
        bio: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialLinks: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        company?: string | undefined;
        website?: string | undefined;
        bio?: string | undefined;
        socialLinks?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        company?: string | undefined;
        website?: string | undefined;
        bio?: string | undefined;
        socialLinks?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "agent" | "owner" | "client" | "investor" | "admin";
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isVerified: boolean;
    phone?: string | undefined;
    avatar?: string | undefined;
    preferences?: {
        currency: "DOP" | "USD";
        language: "es" | "en";
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
    } | undefined;
    profile?: {
        company?: string | undefined;
        website?: string | undefined;
        bio?: string | undefined;
        socialLinks?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "agent" | "owner" | "client" | "investor" | "admin";
    createdAt: string;
    updatedAt: string;
    phone?: string | undefined;
    avatar?: string | undefined;
    preferences?: {
        currency?: "DOP" | "USD" | undefined;
        language?: "es" | "en" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
    } | undefined;
    isActive?: boolean | undefined;
    isVerified?: boolean | undefined;
    profile?: {
        company?: string | undefined;
        website?: string | undefined;
        bio?: string | undefined;
        socialLinks?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
    rememberMe?: boolean | undefined;
}, {
    password: string;
    email: string;
    rememberMe?: boolean | undefined;
}>;
export declare const RegisterSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<["agent", "owner", "client", "investor"]>>;
    termsAccepted: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "agent" | "owner" | "client" | "investor";
    confirmPassword: string;
    termsAccepted: boolean;
    phone?: string | undefined;
}, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    termsAccepted: boolean;
    phone?: string | undefined;
    role?: "agent" | "owner" | "client" | "investor" | undefined;
}>, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "agent" | "owner" | "client" | "investor";
    confirmPassword: string;
    termsAccepted: boolean;
    phone?: string | undefined;
}, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    termsAccepted: boolean;
    phone?: string | undefined;
    role?: "agent" | "owner" | "client" | "investor" | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
