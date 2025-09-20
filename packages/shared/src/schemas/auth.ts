import { z } from 'zod';
import { VALIDATION_RULES } from '../constants/validation';

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Formato de email inválido')
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH),
  password: z
    .string()
    .min(1, 'Contraseña es requerida')
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Formato de email inválido')
    .max(VALIDATION_RULES.EMAIL.MAX_LENGTH),
  password: z
    .string()
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH)
    .regex(/[A-Z]/, 'Contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Contraseña debe contener al menos una minúscula')
    .regex(/\d/, 'Contraseña debe contener al menos un número'),
  confirmPassword: z.string(),
  firstName: z
    .string()
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, `Nombre debe tener al menos ${VALIDATION_RULES.NAME.MIN_LENGTH} caracteres`)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH)
    .regex(VALIDATION_RULES.NAME.PATTERN, 'Nombre solo puede contener letras y espacios'),
  lastName: z
    .string()
    .min(VALIDATION_RULES.NAME.MIN_LENGTH, `Apellido debe tener al menos ${VALIDATION_RULES.NAME.MIN_LENGTH} caracteres`)
    .max(VALIDATION_RULES.NAME.MAX_LENGTH)
    .regex(VALIDATION_RULES.NAME.PATTERN, 'Apellido solo puede contener letras y espacios'),
  phone: z
    .string()
    .regex(VALIDATION_RULES.PHONE.PATTERN, 'Formato de teléfono inválido (ej: 809-123-4567)')
    .optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Debe aceptar los términos y condiciones'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email es requerido')
    .email('Formato de email inválido'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token es requerido'),
  password: z
    .string()
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH)
    .regex(/[A-Z]/, 'Contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Contraseña debe contener al menos una minúscula')
    .regex(/\d/, 'Contraseña debe contener al menos un número'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual es requerida'),
  newPassword: z
    .string()
    .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, `Nueva contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} caracteres`)
    .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH)
    .regex(/[A-Z]/, 'Nueva contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Nueva contraseña debe contener al menos una minúscula')
    .regex(/\d/, 'Nueva contraseña debe contener al menos un número'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;