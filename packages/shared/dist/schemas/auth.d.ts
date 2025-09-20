import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
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
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    acceptTerms: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
    phone?: string | undefined;
}, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
    phone?: string | undefined;
}>, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
    phone?: string | undefined;
}, {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    acceptTerms: boolean;
    phone?: string | undefined;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const resetPasswordSchema: z.ZodEffects<z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    confirmPassword: string;
    token: string;
}, {
    password: string;
    confirmPassword: string;
    token: string;
}>, {
    password: string;
    confirmPassword: string;
    token: string;
}, {
    password: string;
    confirmPassword: string;
    token: string;
}>;
export declare const changePasswordSchema: z.ZodEffects<z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}>, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}, {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
