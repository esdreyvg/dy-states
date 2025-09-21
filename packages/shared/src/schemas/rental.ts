// Rental Management Validation Schemas for DY States
// Esquemas de validación con mensajes en español para República Dominicana

import { z } from 'zod';
import {
  RentalStatus,
  RentalType,
  PricingType,
  DiscountType,
  FeeType,
  BookingStatus,
  TravelPurpose,
  PaymentMethod,
  PaymentStatus,
  CancellationPolicyType,
  MessageType,
  NotificationType,
  NotificationChannel,
  NotificationStatus,
  NotificationPriority,
  DevicePlatform,
  AmenityCategory,
  TransportationType,
  AttractionType,
  PaymentProvider,
  UserType,
  VerificationStatus,
  DocumentType,
  ReviewType,
  ReviewStatus,
  ReportReason,
  AdminRole,
  AdminUserStatus,
  PropertyPublicationStatus,
  PermissionType,
  ActivityType,
  LogLevel,
} from '../types/rental';

// Configuración de mensajes de error en español
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') {
        return { message: 'Este campo debe ser un texto' };
      }
      if (issue.expected === 'number') {
        return { message: 'Este campo debe ser un número' };
      }
      if (issue.expected === 'boolean') {
        return { message: 'Este campo debe ser verdadero o falso' };
      }
      if (issue.expected === 'date') {
        return { message: 'Este campo debe ser una fecha válida' };
      }
      break;
    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') {
        return { message: `Debe tener al menos ${issue.minimum} caracteres` };
      }
      if (issue.type === 'number') {
        return { message: `Debe ser al menos ${issue.minimum}` };
      }
      if (issue.type === 'array') {
        return { message: `Debe tener al menos ${issue.minimum} elementos` };
      }
      break;
    case z.ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return { message: `Debe tener máximo ${issue.maximum} caracteres` };
      }
      if (issue.type === 'number') {
        return { message: `Debe ser máximo ${issue.maximum}` };
      }
      if (issue.type === 'array') {
        return { message: `Debe tener máximo ${issue.maximum} elementos` };
      }
      break;
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'Debe ser un email válido' };
      }
      if (issue.validation === 'url') {
        return { message: 'Debe ser una URL válida' };
      }
      if (issue.validation === 'uuid') {
        return { message: 'Debe ser un ID válido' };
      }
      break;
    case z.ZodIssueCode.invalid_enum_value:
      return { message: `Valor inválido. Opciones permitidas: ${issue.options?.join(', ')}` };
    case z.ZodIssueCode.invalid_date:
      return { message: 'Fecha inválida' };
    default:
      break;
  }
  return { message: ctx.defaultError };
};

// Configurar Zod para usar mensajes en español
z.setErrorMap(customErrorMap);

// Esquemas base para tipos comunes
export const priceSchema = z.number()
  .min(0, 'El precio no puede ser negativo')
  .max(10000000, 'El precio máximo es RD$10,000,000');

export const currencySchema = z.enum(['DOP', 'USD'], {
  errorMap: () => ({ message: 'Moneda debe ser DOP (Pesos Dominicanos) o USD (Dólares)' })
});

export const phoneSchema = z.string()
  .regex(/^(\+1)?\s?8\d{2}[\s-]?\d{3}[\s-]?\d{4}$/, 
    'Formato de teléfono inválido. Use formato dominicano: 809-123-4567 o +1 809-123-4567');

export const coordinatesSchema = z.object({
  latitude: z.number()
    .min(17.5, 'Latitud debe estar dentro de República Dominicana')
    .max(20.0, 'Latitud debe estar dentro de República Dominicana'),
  longitude: z.number()
    .min(-72.5, 'Longitud debe estar dentro de República Dominicana')
    .max(-68.0, 'Longitud debe estar dentro de República Dominicana'),
});

// Esquemas para precios y descuentos
export const rentalPricingSchema = z.object({
  basePrice: priceSchema.min(100, 'Precio base mínimo es RD$100 por noche'),
  currency: currencySchema,
  pricingType: z.nativeEnum(PricingType, {
    errorMap: () => ({ message: 'Tipo de precio inválido' })
  }),
  securityDeposit: priceSchema.max(50000, 'Depósito de seguridad máximo es RD$50,000'),
  cleaningFee: priceSchema.optional(),
  minimumStay: z.number()
    .int('Estancia mínima debe ser un número entero')
    .min(1, 'Estancia mínima debe ser al menos 1 día')
    .max(365, 'Estancia mínima no puede ser mayor a 365 días'),
  maximumStay: z.number()
    .int('Estancia máxima debe ser un número entero')
    .min(1, 'Estancia máxima debe ser al menos 1 día')
    .max(365, 'Estancia máxima no puede ser mayor a 365 días')
    .optional(),
}).refine((data) => {
  if (data.maximumStay && data.maximumStay < data.minimumStay) {
    return false;
  }
  return true;
}, {
  message: 'Estancia máxima debe ser mayor que la mínima',
  path: ['maximumStay'],
});

export const seasonalRateSchema = z.object({
  id: z.string().uuid('ID de tarifa estacional inválido'),
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  startDate: z.date({
    required_error: 'Fecha de inicio es requerida',
    invalid_type_error: 'Fecha de inicio inválida',
  }),
  endDate: z.date({
    required_error: 'Fecha de fin es requerida',
    invalid_type_error: 'Fecha de fin inválida',
  }),
  priceMultiplier: z.number()
    .min(0.1, 'Multiplicador mínimo es 0.1 (10% del precio base)')
    .max(10, 'Multiplicador máximo es 10 (1000% del precio base)'),
  isActive: z.boolean(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'Fecha de fin debe ser posterior a fecha de inicio',
  path: ['endDate'],
});

export const rentalDiscountSchema = z.object({
  id: z.string().uuid('ID de descuento inválido'),
  type: z.nativeEnum(DiscountType, {
    errorMap: () => ({ message: 'Tipo de descuento inválido' })
  }),
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  value: z.number()
    .min(0, 'Valor del descuento no puede ser negativo')
    .max(100, 'Descuento máximo es 100%'),
  isPercentage: z.boolean(),
  minimumStay: z.number()
    .int('Estancia mínima debe ser un número entero')
    .min(1, 'Estancia mínima debe ser al menos 1 día')
    .optional(),
  conditions: z.string().max(200, 'Condiciones no pueden exceder 200 caracteres').optional(),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
  isActive: z.boolean(),
}).refine((data) => {
  if (data.validFrom && data.validTo && data.validTo <= data.validFrom) {
    return false;
  }
  return true;
}, {
  message: 'Fecha de fin debe ser posterior a fecha de inicio',
  path: ['validTo'],
});

export const rentalFeeSchema = z.object({
  id: z.string().uuid('ID de tarifa inválido'),
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  amount: priceSchema.max(10000, 'Tarifa máxima es RD$10,000'),
  type: z.nativeEnum(FeeType, {
    errorMap: () => ({ message: 'Tipo de tarifa inválido' })
  }),
  isRequired: z.boolean(),
  description: z.string().max(200, 'Descripción no puede exceder 200 caracteres').optional(),
});

// Esquemas para disponibilidad y reglas
export const rentalAvailabilitySchema = z.object({
  isInstantBook: z.boolean(),
  advanceNotice: z.number()
    .int('Horas de anticipación debe ser un número entero')
    .min(0, 'Horas de anticipación no puede ser negativo')
    .max(168, 'Horas de anticipación máximo es 168 (7 días)'),
  preparationTime: z.number()
    .int('Tiempo de preparación debe ser un número entero')
    .min(0, 'Tiempo de preparación no puede ser negativo')
    .max(48, 'Tiempo de preparación máximo es 48 horas'),
  checkInTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora de entrada debe estar en formato HH:MM (24h)'),
  checkOutTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora de salida debe estar en formato HH:MM (24h)'),
  blockedDates: z.array(z.date()).default([]),
  minimumAdvanceBooking: z.number()
    .int('Días mínimos de anticipación debe ser un número entero')
    .min(0, 'Días mínimos de anticipación no puede ser negativo')
    .max(365, 'Días mínimos de anticipación máximo es 365'),
  maximumAdvanceBooking: z.number()
    .int('Días máximos de anticipación debe ser un número entero')
    .min(1, 'Días máximos de anticipación debe ser al menos 1')
    .max(730, 'Días máximos de anticipación máximo es 730 (2 años)'),
}).refine((data) => data.maximumAdvanceBooking > data.minimumAdvanceBooking, {
  message: 'Días máximos de anticipación debe ser mayor que días mínimos',
  path: ['maximumAdvanceBooking'],
});

export const quietHoursSchema = z.object({
  start: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora de inicio debe estar en formato HH:MM (24h)'),
  end: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora de fin debe estar en formato HH:MM (24h)'),
});

export const rentalRulesSchema = z.object({
  maxGuests: z.number()
    .int('Máximo de huéspedes debe ser un número entero')
    .min(1, 'Debe permitir al menos 1 huésped')
    .max(50, 'Máximo de huéspedes no puede exceder 50'),
  allowChildren: z.boolean(),
  allowInfants: z.boolean(),
  allowPets: z.boolean(),
  allowSmoking: z.boolean(),
  allowParties: z.boolean(),
  quietHours: quietHoursSchema.optional(),
  checkInInstructions: z.string()
    .max(1000, 'Instrucciones de entrada no pueden exceder 1000 caracteres')
    .optional(),
  houseRules: z.array(z.string().max(200, 'Cada regla no puede exceder 200 caracteres'))
    .max(10, 'Máximo 10 reglas de la casa')
    .optional(),
  additionalRules: z.string()
    .max(500, 'Reglas adicionales no pueden exceder 500 caracteres')
    .optional(),
});

// Esquemas para amenidades y ubicación
export const rentalAmenitySchema = z.object({
  id: z.string().uuid('ID de amenidad inválido'),
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  category: z.nativeEnum(AmenityCategory, {
    errorMap: () => ({ message: 'Categoría de amenidad inválida' })
  }),
  icon: z.string().optional(),
  isHighlighted: z.boolean(),
});

export const transportationOptionSchema = z.object({
  type: z.nativeEnum(TransportationType, {
    errorMap: () => ({ message: 'Tipo de transporte inválido' })
  }),
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre no puede exceder 100 caracteres'),
  distance: z.number()
    .min(0, 'Distancia no puede ser negativa')
    .max(100000, 'Distancia máxima es 100km'),
  walkingTime: z.number()
    .int('Tiempo caminando debe ser un número entero')
    .min(0, 'Tiempo caminando no puede ser negativo')
    .max(300, 'Tiempo caminando máximo es 300 minutos')
    .optional(),
});

export const nearbyAttractionSchema = z.object({
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre no puede exceder 100 caracteres'),
  type: z.nativeEnum(AttractionType, {
    errorMap: () => ({ message: 'Tipo de atracción inválido' })
  }),
  distance: z.number()
    .min(0, 'Distancia no puede ser negativa')
    .max(50000, 'Distancia máxima es 50km'),
  description: z.string()
    .max(200, 'Descripción no puede exceder 200 caracteres')
    .optional(),
});

export const rentalLocationSchema = z.object({
  address: z.string()
    .min(10, 'Dirección debe tener al menos 10 caracteres')
    .max(200, 'Dirección no puede exceder 200 caracteres'),
  city: z.string()
    .min(2, 'Ciudad debe tener al menos 2 caracteres')
    .max(50, 'Ciudad no puede exceder 50 caracteres'),
  province: z.string()
    .min(2, 'Provincia debe tener al menos 2 caracteres')
    .max(50, 'Provincia no puede exceder 50 caracteres'),
  country: z.string().default('República Dominicana'),
  postalCode: z.string()
    .regex(/^\d{5}$/, 'Código postal debe tener 5 dígitos')
    .optional(),
  neighborhood: z.string()
    .max(50, 'Barrio no puede exceder 50 caracteres')
    .optional(),
  coordinates: coordinatesSchema,
  transportation: z.array(transportationOptionSchema)
    .max(10, 'Máximo 10 opciones de transporte')
    .optional(),
  nearbyAttractions: z.array(nearbyAttractionSchema)
    .max(15, 'Máximo 15 atracciones cercanas')
    .optional(),
});

export const rentalImageSchema = z.object({
  id: z.string().uuid('ID de imagen inválido'),
  url: z.string().url('URL de imagen inválida'),
  alt: z.string()
    .min(5, 'Texto alternativo debe tener al menos 5 caracteres')
    .max(100, 'Texto alternativo no puede exceder 100 caracteres'),
  caption: z.string()
    .max(200, 'Leyenda no puede exceder 200 caracteres')
    .optional(),
  order: z.number()
    .int('Orden debe ser un número entero')
    .min(1, 'Orden debe ser al menos 1'),
  isPrimary: z.boolean(),
  room: z.string()
    .max(50, 'Habitación no puede exceder 50 caracteres')
    .optional(),
});

// Esquemas para configuración y notificaciones
export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  newBookingNotifications: z.boolean(),
  cancellationNotifications: z.boolean(),
  messageNotifications: z.boolean(),
  reviewNotifications: z.boolean(),
});

export const refundScheduleSchema = z.object({
  daysBeforeCheckIn: z.number()
    .int('Días antes del check-in debe ser un número entero')
    .min(0, 'Días antes del check-in no puede ser negativo')
    .max(365, 'Días antes del check-in máximo es 365'),
  refundPercentage: z.number()
    .min(0, 'Porcentaje de reembolso no puede ser negativo')
    .max(100, 'Porcentaje de reembolso máximo es 100%'),
});

export const cancellationPolicySchema = z.object({
  type: z.nativeEnum(CancellationPolicyType, {
    errorMap: () => ({ message: 'Tipo de política de cancelación inválido' })
  }),
  description: z.string()
    .min(20, 'Descripción debe tener al menos 20 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  refundPercentages: z.array(refundScheduleSchema)
    .min(1, 'Debe tener al menos un cronograma de reembolso')
    .max(10, 'Máximo 10 cronogramas de reembolso'),
  gracePeriodHours: z.number()
    .int('Horas de gracia debe ser un número entero')
    .min(0, 'Horas de gracia no puede ser negativo')
    .max(72, 'Horas de gracia máximo es 72'),
});

export const rentalSettingsSchema = z.object({
  autoAcceptBookings: z.boolean(),
  requireGuestVerification: z.boolean(),
  allowSameDayBookings: z.boolean(),
  sendAutomaticMessages: z.boolean(),
  notificationPreferences: notificationPreferencesSchema,
  cancellationPolicy: cancellationPolicySchema,
});

// Esquema principal para crear alquiler
export const createRentalSchema = z.object({
  propertyId: z.string().uuid('ID de propiedad inválido'),
  title: z.string()
    .min(10, 'Título debe tener al menos 10 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres'),
  description: z.string()
    .min(50, 'Descripción debe tener al menos 50 caracteres')
    .max(2000, 'Descripción no puede exceder 2000 caracteres'),
  rentalType: z.nativeEnum(RentalType, {
    errorMap: () => ({ message: 'Tipo de alquiler inválido' })
  }),
  pricing: rentalPricingSchema,
  availability: rentalAvailabilitySchema,
  rules: rentalRulesSchema,
  amenities: z.array(z.string().uuid('ID de amenidad inválido'))
    .min(1, 'Debe seleccionar al menos 1 amenidad')
    .max(30, 'Máximo 30 amenidades'),
  images: z.array(rentalImageSchema.omit({ id: true }))
    .min(3, 'Debe subir al menos 3 imágenes')
    .max(20, 'Máximo 20 imágenes'),
  settings: rentalSettingsSchema,
});

export const updateRentalSchema = createRentalSchema.partial().extend({
  status: z.nativeEnum(RentalStatus, {
    errorMap: () => ({ message: 'Estado de alquiler inválido' })
  }).optional(),
});

// Esquemas para reservas
export const guestDetailsSchema = z.object({
  adults: z.number()
    .int('Número de adultos debe ser un número entero')
    .min(1, 'Debe haber al menos 1 adulto')
    .max(20, 'Máximo 20 adultos'),
  children: z.number()
    .int('Número de niños debe ser un número entero')
    .min(0, 'Número de niños no puede ser negativo')
    .max(15, 'Máximo 15 niños'),
  infants: z.number()
    .int('Número de bebés debe ser un número entero')
    .min(0, 'Número de bebés no puede ser negativo')
    .max(5, 'Máximo 5 bebés'),
  pets: z.number()
    .int('Número de mascotas debe ser un número entero')
    .min(0, 'Número de mascotas no puede ser negativo')
    .max(5, 'Máximo 5 mascotas'),
  purpose: z.nativeEnum(TravelPurpose, {
    errorMap: () => ({ message: 'Propósito de viaje inválido' })
  }),
  specialNeeds: z.string()
    .max(500, 'Necesidades especiales no pueden exceder 500 caracteres')
    .optional(),
});

export const createBookingSchema = z.object({
  rentalId: z.string().uuid('ID de alquiler inválido'),
  checkInDate: z.date({
    required_error: 'Fecha de entrada es requerida',
    invalid_type_error: 'Fecha de entrada inválida',
  }),
  checkOutDate: z.date({
    required_error: 'Fecha de salida es requerida',
    invalid_type_error: 'Fecha de salida inválida',
  }),
  guests: guestDetailsSchema,
  specialRequests: z.string()
    .max(1000, 'Solicitudes especiales no pueden exceder 1000 caracteres')
    .optional(),
  promoCode: z.string()
    .regex(/^[A-Z0-9]{4,20}$/, 'Código promocional debe ser alfanumérico en mayúsculas (4-20 caracteres)')
    .optional(),
}).refine((data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data.checkInDate >= today;
}, {
  message: 'Fecha de entrada no puede ser en el pasado',
  path: ['checkInDate'],
}).refine((data) => data.checkOutDate > data.checkInDate, {
  message: 'Fecha de salida debe ser posterior a fecha de entrada',
  path: ['checkOutDate'],
});

export const bookingSearchParamsSchema = z.object({
  location: z.string()
    .min(2, 'Ubicación debe tener al menos 2 caracteres')
    .optional(),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  guests: z.number()
    .int('Número de huéspedes debe ser un número entero')
    .min(1, 'Debe haber al menos 1 huésped')
    .max(20, 'Máximo 20 huéspedes')
    .optional(),
  priceMin: priceSchema.optional(),
  priceMax: priceSchema.optional(),
  amenities: z.array(z.string().uuid('ID de amenidad inválido')).optional(),
  rentalType: z.nativeEnum(RentalType).optional(),
  instantBook: z.boolean().optional(),
  hostLanguage: z.string()
    .min(2, 'Idioma debe tener al menos 2 caracteres')
    .max(10, 'Idioma no puede exceder 10 caracteres')
    .optional(),
  sortBy: z.enum(['price_low_to_high', 'price_high_to_low', 'distance', 'rating', 'newest', 'availability'])
    .default('rating'),
  page: z.number()
    .int('Página debe ser un número entero')
    .min(1, 'Página debe ser al menos 1')
    .default(1),
  limit: z.number()
    .int('Límite debe ser un número entero')
    .min(1, 'Límite debe ser al menos 1')
    .max(100, 'Límite máximo es 100')
    .default(20),
}).refine((data) => {
  if (data.priceMin && data.priceMax && data.priceMax < data.priceMin) {
    return false;
  }
  return true;
}, {
  message: 'Precio máximo debe ser mayor que precio mínimo',
  path: ['priceMax'],
}).refine((data) => {
  if (data.checkInDate && data.checkOutDate && data.checkOutDate <= data.checkInDate) {
    return false;
  }
  return true;
}, {
  message: 'Fecha de salida debe ser posterior a fecha de entrada',
  path: ['checkOutDate'],
});

// Esquemas para mensajería
export const messageAttachmentSchema = z.object({
  name: z.string()
    .min(1, 'Nombre del archivo es requerido')
    .max(255, 'Nombre del archivo no puede exceder 255 caracteres'),
  url: z.string().url('URL del archivo inválida'),
  size: z.number()
    .int('Tamaño del archivo debe ser un número entero')
    .min(1, 'Tamaño del archivo debe ser al menos 1 byte')
    .max(50 * 1024 * 1024, 'Tamaño máximo del archivo es 50MB'),
  mimeType: z.string()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_.]*$/, 'Tipo MIME inválido'),
  thumbnailUrl: z.string().url('URL del thumbnail inválida').optional(),
});

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid('ID de conversación inválido').optional(),
  receiverId: z.string().uuid('ID del receptor inválido'),
  content: z.string()
    .min(1, 'Mensaje no puede estar vacío')
    .max(2000, 'Mensaje no puede exceder 2000 caracteres'),
  type: z.nativeEnum(MessageType, {
    errorMap: () => ({ message: 'Tipo de mensaje inválido' })
  }),
  attachments: z.array(messageAttachmentSchema)
    .max(5, 'Máximo 5 archivos adjuntos')
    .optional(),
  bookingId: z.string().uuid('ID de reserva inválido').optional(),
  rentalId: z.string().uuid('ID de alquiler inválido'),
});

// Esquemas para notificaciones
export const notificationDataSchema = z.object({
  bookingId: z.string().uuid('ID de reserva inválido').optional(),
  rentalId: z.string().uuid('ID de alquiler inválido').optional(),
  messageId: z.string().uuid('ID de mensaje inválido').optional(),
  amount: z.number().min(0, 'Monto no puede ser negativo').optional(),
  currency: currencySchema.optional(),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  guestName: z.string()
    .max(100, 'Nombre del huésped no puede exceder 100 caracteres')
    .optional(),
  hostName: z.string()
    .max(100, 'Nombre del anfitrión no puede exceder 100 caracteres')
    .optional(),
  propertyTitle: z.string()
    .max(100, 'Título de la propiedad no puede exceder 100 caracteres')
    .optional(),
  actionUrl: z.string().url('URL de acción inválida').optional(),
  metadata: z.record(z.any()).optional(),
});

export const createNotificationSchema = z.object({
  userId: z.string().uuid('ID de usuario inválido'),
  type: z.nativeEnum(NotificationType, {
    errorMap: () => ({ message: 'Tipo de notificación inválido' })
  }),
  title: z.string()
    .min(5, 'Título debe tener al menos 5 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres'),
  message: z.string()
    .min(10, 'Mensaje debe tener al menos 10 caracteres')
    .max(500, 'Mensaje no puede exceder 500 caracteres'),
  data: notificationDataSchema,
  channels: z.array(z.nativeEnum(NotificationChannel))
    .min(1, 'Debe seleccionar al menos un canal de notificación')
    .max(5, 'Máximo 5 canales de notificación'),
  priority: z.nativeEnum(NotificationPriority, {
    errorMap: () => ({ message: 'Prioridad de notificación inválida' })
  }).default(NotificationPriority.NORMAL),
  scheduledFor: z.date().optional(),
});

// Esquemas para pagos
export const paymentMethodSchema = z.nativeEnum(PaymentMethod, {
  errorMap: () => ({ message: 'Método de pago inválido' })
});

export const paymentProviderSchema = z.nativeEnum(PaymentProvider, {
  errorMap: () => ({ message: 'Proveedor de pago inválido' })
});

export const createPaymentIntentSchema = z.object({
  amount: priceSchema.min(100, 'Monto mínimo es RD$100'),
  currency: currencySchema,
  bookingId: z.string().uuid('ID de reserva inválido'),
  guestId: z.string().uuid('ID de huésped inválido'),
  metadata: z.record(z.string())
    .refine((data) => Object.keys(data).length <= 20, {
      message: 'Máximo 20 campos de metadata'
    })
    .optional(),
});

// Esquemas para calendario
export const calendarDaySchema = z.object({
  date: z.date({
    required_error: 'Fecha es requerida',
    invalid_type_error: 'Fecha inválida',
  }),
  isAvailable: z.boolean(),
  price: priceSchema.optional(),
  minimumStay: z.number()
    .int('Estancia mínima debe ser un número entero')
    .min(1, 'Estancia mínima debe ser al menos 1 día')
    .optional(),
  isBlocked: z.boolean(),
  blockReason: z.string()
    .max(200, 'Razón del bloqueo no puede exceder 200 caracteres')
    .optional(),
  bookingId: z.string().uuid('ID de reserva inválido').optional(),
});

export const updateCalendarSchema = z.object({
  rentalId: z.string().uuid('ID de alquiler inválido'),
  updates: z.array(calendarDaySchema)
    .min(1, 'Debe incluir al menos una actualización')
    .max(365, 'Máximo 365 días para actualizar'),
});

// Esquemas para reportes y estadísticas
export const dateRangeSchema = z.object({
  startDate: z.date({
    required_error: 'Fecha de inicio es requerida',
    invalid_type_error: 'Fecha de inicio inválida',
  }),
  endDate: z.date({
    required_error: 'Fecha de fin es requerida',
    invalid_type_error: 'Fecha de fin inválida',
  }),
}).refine((data) => data.endDate > data.startDate, {
  message: 'Fecha de fin debe ser posterior a fecha de inicio',
  path: ['endDate'],
});

export const rentalReportParamsSchema = z.object({
  rentalId: z.string().uuid('ID de alquiler inválido').optional(),
  dateRange: dateRangeSchema,
  groupBy: z.enum(['day', 'week', 'month'], {
    errorMap: () => ({ message: 'Agrupación debe ser por día, semana o mes' })
  }).default('month'),
  metrics: z.array(z.enum(['revenue', 'bookings', 'occupancy', 'rating']))
    .min(1, 'Debe seleccionar al menos una métrica')
    .default(['revenue', 'bookings']),
});

// Exportar todos los esquemas principales
export const rentalSchemas = {
  // Esquemas principales
  createRental: createRentalSchema,
  updateRental: updateRentalSchema,
  createBooking: createBookingSchema,
  sendMessage: sendMessageSchema,
  createNotification: createNotificationSchema,
  
  // Esquemas de búsqueda
  bookingSearchParams: bookingSearchParamsSchema,
  
  // Esquemas de componentes
  rentalPricing: rentalPricingSchema,
  rentalAvailability: rentalAvailabilitySchema,
  rentalRules: rentalRulesSchema,
  rentalLocation: rentalLocationSchema,
  rentalSettings: rentalSettingsSchema,
  guestDetails: guestDetailsSchema,
  
  // Esquemas de calendario y pagos
  calendarDay: calendarDaySchema,
  updateCalendar: updateCalendarSchema,
  createPaymentIntent: createPaymentIntentSchema,
  
  // Esquemas de reportes
  rentalReportParams: rentalReportParamsSchema,
  dateRange: dateRangeSchema,
};

// =====================================================
// ESQUEMAS PARA VALORACIÓN Y ANÁLISIS DE MERCADO
// =====================================================

// Importar PropertyType para los esquemas
import { PropertyType } from '../types/rental';

// Esquema para solicitar análisis de mercado
export const marketAnalysisSchema = z.object({
  location: z.object({
    city: z.string().min(1, 'Ciudad requerida'),
    radius: z.number().min(1, 'Radio debe ser mayor a 0').max(100, 'Radio máximo 100km')
  }).optional(),
  propertyType: z.nativeEnum(PropertyType, {
    errorMap: () => ({ message: 'Tipo de propiedad inválido' })
  }).optional(),
  dateRange: z.object({
    start: z.string().refine(val => !isNaN(Date.parse(val)), 'Fecha de inicio inválida'),
    end: z.string().refine(val => !isNaN(Date.parse(val)), 'Fecha de fin inválida')
  }).refine(data => new Date(data.start) < new Date(data.end), 'La fecha de inicio debe ser anterior a la fecha de fin'),
  metrics: z.array(z.enum(['price', 'occupancy', 'revenue', 'demand'])).min(1, 'Selecciona al menos una métrica')
});

// Esquema para datos de valoración de propiedad
export const propertyValuationInputSchema = z.object({
  location: z.object({
    address: z.string().min(5, 'Dirección debe tener al menos 5 caracteres'),
    city: z.string().min(2, 'Ciudad requerida'),
    state: z.string().min(2, 'Estado/Provincia requerido'),
    country: z.string().min(2, 'País requerido'),
    coordinates: z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180)
    }).optional()
  }),
  propertyType: z.nativeEnum(PropertyType, {
    errorMap: () => ({ message: 'Tipo de propiedad inválido' })
  }),
  specifications: z.object({
    bedrooms: z.number().min(0, 'Número de dormitorios inválido').max(20, 'Máximo 20 dormitorios'),
    bathrooms: z.number().min(0, 'Número de baños inválido').max(20, 'Máximo 20 baños'),
    squareMeters: z.number().min(10, 'Mínimo 10 metros cuadrados').max(10000, 'Máximo 10,000 metros cuadrados'),
    maxGuests: z.number().min(1, 'Mínimo 1 huésped').max(50, 'Máximo 50 huéspedes'),
    yearBuilt: z.number().min(1800, 'Año de construcción inválido').max(new Date().getFullYear(), 'Año de construcción no puede ser futuro').optional(),
    renovationYear: z.number().min(1800, 'Año de renovación inválido').max(new Date().getFullYear(), 'Año de renovación no puede ser futuro').optional()
  }),
  amenities: z.array(z.string()).min(0, 'Lista de amenidades inválida'),
  features: z.object({
    hasPool: z.boolean(),
    hasGarden: z.boolean(),
    hasParking: z.boolean(),
    hasAirConditioning: z.boolean(),
    hasHeating: z.boolean(),
    hasWifi: z.boolean(),
    hasKitchen: z.boolean(),
    petFriendly: z.boolean(),
    smokingAllowed: z.boolean()
  }),
  condition: z.enum(['excellent', 'good', 'fair', 'needs_renovation'], {
    errorMap: () => ({ message: 'Condición de propiedad inválida' })
  }),
  images: z.array(z.string().url('URL de imagen inválida')).optional()
});

// Esquema para crear valoración
export const createValuationSchema = z.object({
  propertyData: propertyValuationInputSchema,
  includeComparisons: z.boolean().default(true),
  includeRecommendations: z.boolean().default(true)
});

// Esquema para parámetros de reportes
export const reportParametersSchema = z.object({
  dateRange: z.object({
    start: z.string().refine(val => !isNaN(Date.parse(val)), 'Fecha de inicio inválida'),
    end: z.string().refine(val => !isNaN(Date.parse(val)), 'Fecha de fin inválida')
  }).refine(data => new Date(data.start) < new Date(data.end), 'La fecha de inicio debe ser anterior a la fecha de fin'),
  locations: z.array(z.string()).optional(),
  propertyTypes: z.array(z.nativeEnum(PropertyType)).optional(),
  priceRange: z.object({
    min: z.number().min(0, 'Precio mínimo inválido'),
    max: z.number().min(0, 'Precio máximo inválido')
  }).refine(data => data.min < data.max, 'El precio mínimo debe ser menor al máximo').optional(),
  includeComparisons: z.boolean().default(false),
  includeForecasts: z.boolean().default(false),
  includeRecommendations: z.boolean().default(true)
});

// Esquema para crear reportes
export const createReportSchema = z.object({
  title: z.string().min(3, 'Título debe tener al menos 3 caracteres').max(100, 'Título máximo 100 caracteres'),
  type: z.enum(['location', 'property_type', 'comparison', 'valuation', 'comprehensive'], {
    errorMap: () => ({ message: 'Tipo de reporte inválido' })
  }),
  parameters: reportParametersSchema,
  format: z.enum(['pdf', 'csv', 'excel', 'json'], {
    errorMap: () => ({ message: 'Formato de reporte inválido' })
  }).default('pdf')
});

// Esquema para configuración de gráficas
export const chartConfigurationSchema = z.object({
  title: z.string().min(1, 'Título de gráfica requerido'),
  type: z.enum(['line', 'bar', 'pie', 'area', 'scatter', 'heatmap'], {
    errorMap: () => ({ message: 'Tipo de gráfica inválido' })
  }),
  data: z.array(z.any()),
  config: z.object({
    xAxis: z.string().optional(),
    yAxis: z.string().optional(),
    groupBy: z.string().optional(),
    colors: z.array(z.string()).optional(),
    showLegend: z.boolean().default(true),
    showGrid: z.boolean().default(true)
  })
});

// Esquema para filtros de búsqueda de propiedades comparables
export const comparablePropertiesFilterSchema = z.object({
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    radius: z.number().min(0.1, 'Radio mínimo 0.1km').max(50, 'Radio máximo 50km').default(5)
  }),
  propertyType: z.nativeEnum(PropertyType).optional(),
  specifications: z.object({
    bedrooms: z.object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional()
    }).optional(),
    bathrooms: z.object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional()
    }).optional(),
    squareMeters: z.object({
      min: z.number().min(10).optional(),
      max: z.number().min(10).optional()
    }).optional(),
    maxGuests: z.object({
      min: z.number().min(1).optional(),
      max: z.number().min(1).optional()
    }).optional()
  }).optional(),
  priceRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional()
  }).optional(),
  amenities: z.array(z.string()).optional(),
  limit: z.number().min(1, 'Mínimo 1 resultado').max(100, 'Máximo 100 resultados').default(20)
});

// Función helper para validar coordenadas
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

// Función helper para validar rango de fechas
export const validateDateRange = (start: string, end: string): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const now = new Date();
  
  return startDate < endDate && startDate <= now;
};

// Esquema para actualizar estado de reporte
export const updateReportStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'failed'], {
    errorMap: () => ({ message: 'Estado de reporte inválido' })
  }),
  progress: z.number().min(0, 'Progreso mínimo 0%').max(100, 'Progreso máximo 100%').optional(),
  errorMessage: z.string().optional()
});

// Esquemas de valoración de mercado agrupados
export const marketValuationSchemas = {
  marketAnalysis: marketAnalysisSchema,
  propertyValuationInput: propertyValuationInputSchema,
  createValuation: createValuationSchema,
  reportParameters: reportParametersSchema,
  createReport: createReportSchema,
  chartConfiguration: chartConfigurationSchema,
  comparablePropertiesFilter: comparablePropertiesFilterSchema,
  updateReportStatus: updateReportStatusSchema,
};

// Tipos inferidos de los esquemas
export type MarketAnalysisInput = z.infer<typeof marketAnalysisSchema>;
export type PropertyValuationInputData = z.infer<typeof propertyValuationInputSchema>;
export type CreateValuationInput = z.infer<typeof createValuationSchema>;
export type ReportParametersInput = z.infer<typeof reportParametersSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type ChartConfigurationInput = z.infer<typeof chartConfigurationSchema>;
export type ComparablePropertiesFilterInput = z.infer<typeof comparablePropertiesFilterSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;

// =============================================================================
// ESQUEMAS DE VALIDACIÓN PARA PERFILES Y RESEÑAS
// =============================================================================

// Esquema para documento de verificación
export const verificationDocumentSchema = z.object({
  type: z.nativeEnum(DocumentType, {
    errorMap: () => ({ message: 'Tipo de documento inválido' })
  }),
  documentNumber: z.string()
    .min(3, 'Número de documento debe tener al menos 3 caracteres')
    .max(50, 'Número de documento no puede exceder 50 caracteres'),
  expiryDate: z.date().optional(),
  fileUrl: z.string().url('URL del archivo inválida')
});

// Esquema para información de contacto
export const contactInfoSchema = z.object({
  email: z.string().email('Email inválido'),
  phone: z.string()
    .min(10, 'Teléfono debe tener al menos 10 dígitos')
    .max(15, 'Teléfono no puede exceder 15 dígitos')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Formato de teléfono inválido'),
  whatsapp: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Formato de WhatsApp inválido')
    .optional(),
  telegram: z.string().min(5, 'Usuario de Telegram inválido').optional(),
  website: z.string().url('URL del sitio web inválida').optional(),
  socialMedia: z.object({
    facebook: z.string().url('URL de Facebook inválida').optional(),
    instagram: z.string().min(1, 'Usuario de Instagram inválido').optional(),
    linkedin: z.string().url('URL de LinkedIn inválida').optional(),
    twitter: z.string().min(1, 'Usuario de Twitter inválido').optional()
  }).optional()
});

// Esquema para dirección
export const addressSchema = z.object({
  street: z.string().min(5, 'Dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'Ciudad debe tener al menos 2 caracteres'),
  state: z.string().min(2, 'Provincia debe tener al menos 2 caracteres'),
  postalCode: z.string()
    .min(5, 'Código postal debe tener al menos 5 caracteres')
    .max(10, 'Código postal no puede exceder 10 caracteres'),
  country: z.string().min(2, 'País debe tener al menos 2 caracteres'),
  coordinates: z.object({
    latitude: z.number().min(-90, 'Latitud inválida').max(90, 'Latitud inválida'),
    longitude: z.number().min(-180, 'Longitud inválida').max(180, 'Longitud inválida')
  }).optional()
});

// Esquema para preferencias de usuario
export const userPreferencesSchema = z.object({
  language: z.string().min(2, 'Código de idioma inválido'),
  currency: z.string().length(3, 'Código de moneda debe tener 3 caracteres'),
  timezone: z.string().min(3, 'Zona horaria inválida'),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
    marketing: z.boolean()
  }),
  privacy: z.object({
    showContactInfo: z.boolean(),
    showProperties: z.boolean(),
    showReviews: z.boolean(),
    allowMessages: z.boolean()
  })
});

// Esquema para certificación
export const certificationSchema = z.object({
  name: z.string().min(2, 'Nombre de certificación debe tener al menos 2 caracteres'),
  issuingOrganization: z.string().min(2, 'Organización emisora requerida'),
  issueDate: z.date({ errorMap: () => ({ message: 'Fecha de emisión inválida' }) }),
  expiryDate: z.date().optional(),
  certificateNumber: z.string().min(1, 'Número de certificado requerido'),
  certificateUrl: z.string().url('URL del certificado inválida').optional()
});

// Esquema base para perfil de usuario
export const userProfileSchema = z.object({
  userType: z.nativeEnum(UserType, {
    errorMap: () => ({ message: 'Tipo de usuario inválido' })
  }),
  firstName: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  lastName: z.string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(50, 'Apellido no puede exceder 50 caracteres'),
  displayName: z.string()
    .min(2, 'Nombre para mostrar debe tener al menos 2 caracteres')
    .max(100, 'Nombre para mostrar no puede exceder 100 caracteres')
    .optional(),
  avatar: z.string().url('URL del avatar inválida').optional(),
  bio: z.string()
    .max(500, 'Biografía no puede exceder 500 caracteres')
    .optional(),
  contactInfo: contactInfoSchema,
  address: addressSchema.optional(),
  verificationDocuments: z.array(verificationDocumentSchema).optional(),
  preferences: userPreferencesSchema,
  isActive: z.boolean().default(true)
});

// Esquema para perfil de agente
export const agentProfileSchema = userProfileSchema.extend({
  userType: z.literal(UserType.AGENT),
  licenseNumber: z.string()
    .min(5, 'Número de licencia debe tener al menos 5 caracteres')
    .max(50, 'Número de licencia no puede exceder 50 caracteres'),
  agency: z.object({
    name: z.string().min(2, 'Nombre de agencia requerido'),
    logo: z.string().url('URL del logo inválida').optional(),
    website: z.string().url('URL del sitio web inválida').optional(),
    address: addressSchema
  }).optional(),
  specializations: z.array(z.string().min(1, 'Especialización inválida'))
    .min(1, 'Debe tener al menos una especialización'),
  languages: z.array(z.string().min(2, 'Código de idioma inválido'))
    .min(1, 'Debe dominar al menos un idioma'),
  certifications: z.array(certificationSchema).optional(),
  workingHours: z.object({
    monday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    tuesday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    wednesday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    thursday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    friday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    saturday: z.object({ start: z.string(), end: z.string(), available: z.boolean() }),
    sunday: z.object({ start: z.string(), end: z.string(), available: z.boolean() })
  }),
  commission: z.object({
    type: z.enum(['percentage', 'fixed'], {
      errorMap: () => ({ message: 'Tipo de comisión inválido' })
    }),
    value: z.number().min(0, 'Valor de comisión debe ser positivo'),
    currency: z.string().length(3, 'Código de moneda inválido').optional()
  })
});

// Esquema para perfil de propietario
export const ownerProfileSchema = userProfileSchema.extend({
  userType: z.literal(UserType.OWNER),
  propertyTypes: z.array(z.string()).min(1, 'Debe seleccionar al menos un tipo de propiedad'),
  investmentExperience: z.enum(['beginner', 'intermediate', 'expert'], {
    errorMap: () => ({ message: 'Nivel de experiencia inválido' })
  }),
  preferredManagement: z.enum(['self', 'agent', 'company'], {
    errorMap: () => ({ message: 'Tipo de gestión preferida inválido' })
  }),
  taxId: z.string()
    .min(5, 'RNC debe tener al menos 5 caracteres')
    .max(15, 'RNC no puede exceder 15 caracteres')
    .optional(),
  bankingInfo: z.object({
    bankName: z.string().min(2, 'Nombre del banco requerido'),
    accountNumber: z.string().min(8, 'Número de cuenta inválido'),
    routingNumber: z.string().min(6, 'Número de ruta inválido'),
    accountHolder: z.string().min(2, 'Titular de cuenta requerido')
  }).optional(),
  insurance: z.object({
    provider: z.string().min(2, 'Proveedor de seguro requerido'),
    policyNumber: z.string().min(5, 'Número de póliza requerido'),
    expiryDate: z.date({ errorMap: () => ({ message: 'Fecha de vencimiento inválida' }) }),
    coverage: z.number().min(1000, 'Cobertura debe ser al menos RD$1,000')
  }).optional()
});

// Esquema para perfil de cliente
export const clientProfileSchema = userProfileSchema.extend({
  userType: z.enum([UserType.CLIENT, UserType.GUEST]),
  emergencyContact: z.object({
    name: z.string().min(2, 'Nombre del contacto de emergencia requerido'),
    relationship: z.string().min(2, 'Relación con el contacto requerida'),
    phone: z.string()
      .min(10, 'Teléfono debe tener al menos 10 dígitos')
      .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Formato de teléfono inválido'),
    email: z.string().email('Email inválido').optional()
  }).optional(),
  travelPreferences: z.object({
    accommodationType: z.array(z.string()).optional(),
    priceRange: z.object({
      min: z.number().min(0, 'Precio mínimo debe ser positivo'),
      max: z.number().min(0, 'Precio máximo debe ser positivo'),
      currency: z.string().length(3, 'Código de moneda inválido')
    }),
    amenities: z.array(z.string()).optional(),
    maxGuests: z.number().min(1, 'Mínimo 1 huésped').max(20, 'Máximo 20 huéspedes'),
    smokingAllowed: z.boolean(),
    petsAllowed: z.boolean()
  }).optional(),
  identityVerification: z.object({
    documentType: z.nativeEnum(DocumentType),
    documentNumber: z.string().min(8, 'Número de documento inválido'),
    isVerified: z.boolean().default(false),
    verifiedAt: z.date().optional()
  }).optional()
});

// Esquema para criterios de calificación
export const ratingCriteriaSchema = z.object({
  cleanliness: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  accuracy: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  communication: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  location: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  checkIn: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  value: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas')
});

// Esquema para crear reseña
export const createReviewSchema = z.object({
  reviewType: z.nativeEnum(ReviewType, {
    errorMap: () => ({ message: 'Tipo de reseña inválido' })
  }),
  targetId: z.string().min(1, 'ID del objetivo requerido'),
  rating: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas'),
  criteria: ratingCriteriaSchema.optional(),
  title: z.string()
    .min(5, 'Título debe tener al menos 5 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres')
    .optional(),
  comment: z.string()
    .min(10, 'Comentario debe tener al menos 10 caracteres')
    .max(1000, 'Comentario no puede exceder 1000 caracteres'),
  pros: z.array(z.string().min(1, 'Aspecto positivo inválido'))
    .max(5, 'Máximo 5 aspectos positivos')
    .optional(),
  cons: z.array(z.string().min(1, 'Aspecto negativo inválido'))
    .max(5, 'Máximo 5 aspectos negativos')
    .optional(),
  photos: z.array(z.string().url('URL de foto inválida'))
    .max(10, 'Máximo 10 fotos')
    .optional(),
  bookingId: z.string().optional(),
  stayDate: z.date().optional(),
  isAnonymous: z.boolean().default(false)
});

// Esquema para actualizar reseña
export const updateReviewSchema = z.object({
  rating: z.number().min(1, 'Mínimo 1 estrella').max(5, 'Máximo 5 estrellas').optional(),
  criteria: ratingCriteriaSchema.optional(),
  title: z.string()
    .min(5, 'Título debe tener al menos 5 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres')
    .optional(),
  comment: z.string()
    .min(10, 'Comentario debe tener al menos 10 caracteres')
    .max(1000, 'Comentario no puede exceder 1000 caracteres')
    .optional(),
  pros: z.array(z.string().min(1, 'Aspecto positivo inválido'))
    .max(5, 'Máximo 5 aspectos positivos')
    .optional(),
  cons: z.array(z.string().min(1, 'Aspecto negativo inválido'))
    .max(5, 'Máximo 5 aspectos negativos')
    .optional(),
  photos: z.array(z.string().url('URL de foto inválida'))
    .max(10, 'Máximo 10 fotos')
    .optional()
});

// Esquema para reportar reseña
export const reportReviewSchema = z.object({
  reviewId: z.string().min(1, 'ID de reseña requerido'),
  reason: z.nativeEnum(ReportReason, {
    errorMap: () => ({ message: 'Motivo de reporte inválido' })
  }),
  description: z.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres')
    .optional()
});

// Esquema para responder a reseña
export const reviewResponseSchema = z.object({
  reviewId: z.string().min(1, 'ID de reseña requerido'),
  response: z.string()
    .min(10, 'Respuesta debe tener al menos 10 caracteres')
    .max(500, 'Respuesta no puede exceder 500 caracteres'),
  isOfficial: z.boolean().default(false)
});

// Esquema para filtros de reseñas
export const reviewFiltersSchema = z.object({
  rating: z.array(z.number().min(1).max(5)).optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date()
  }).optional(),
  reviewType: z.array(z.nativeEnum(ReviewType)).optional(),
  verified: z.boolean().optional(),
  withPhotos: z.boolean().optional(),
  language: z.string().min(2, 'Código de idioma inválido').optional(),
  sortBy: z.enum(['newest', 'oldest', 'highest_rating', 'lowest_rating', 'most_helpful'], {
    errorMap: () => ({ message: 'Criterio de ordenamiento inválido' })
  }).optional()
});

// Esquema para acción de moderación
export const moderationActionSchema = z.object({
  reviewId: z.string().min(1, 'ID de reseña requerido'),
  action: z.enum(['approve', 'reject', 'flag', 'edit', 'hide', 'warn_user'], {
    errorMap: () => ({ message: 'Acción de moderación inválida' })
  }),
  reason: z.string()
    .min(5, 'Motivo debe tener al menos 5 caracteres')
    .max(200, 'Motivo no puede exceder 200 caracteres')
    .optional(),
  notes: z.string()
    .max(500, 'Notas no pueden exceder 500 caracteres')
    .optional(),
  editedContent: z.string()
    .min(10, 'Contenido editado debe tener al menos 10 caracteres')
    .max(1000, 'Contenido editado no puede exceder 1000 caracteres')
    .optional()
});

// Esquema para configuración de moderación
export const moderationSettingsSchema = z.object({
  autoApprove: z.boolean(),
  requireVerifiedBooking: z.boolean(),
  minimumStayDuration: z.number().min(1, 'Duración mínima debe ser al menos 1 hora'),
  profanityFilter: z.boolean(),
  spamDetection: z.boolean(),
  duplicateDetection: z.boolean(),
  reviewCooldown: z.number().min(0, 'Período de espera debe ser positivo'),
  allowAnonymous: z.boolean(),
  allowPhotos: z.boolean(),
  maxPhotosPerReview: z.number().min(1).max(20),
  moderatorNotifications: z.boolean()
});

// Esquemas agrupados para perfiles y reseñas
export const profileReviewSchemas = {
  // Perfiles
  userProfile: userProfileSchema,
  agentProfile: agentProfileSchema,
  ownerProfile: ownerProfileSchema,
  clientProfile: clientProfileSchema,
  contactInfo: contactInfoSchema,
  address: addressSchema,
  userPreferences: userPreferencesSchema,
  certification: certificationSchema,
  verificationDocument: verificationDocumentSchema,
  
  // Reseñas
  createReview: createReviewSchema,
  updateReview: updateReviewSchema,
  reportReview: reportReviewSchema,
  reviewResponse: reviewResponseSchema,
  reviewFilters: reviewFiltersSchema,
  ratingCriteria: ratingCriteriaSchema,
  
  // Moderación
  moderationAction: moderationActionSchema,
  moderationSettings: moderationSettingsSchema
};

// Tipos inferidos para perfiles y reseñas
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type AgentProfileInput = z.infer<typeof agentProfileSchema>;
export type OwnerProfileInput = z.infer<typeof ownerProfileSchema>;
export type ClientProfileInput = z.infer<typeof clientProfileSchema>;
export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type VerificationDocumentInput = z.infer<typeof verificationDocumentSchema>;

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReportReviewInput = z.infer<typeof reportReviewSchema>;
export type ReviewResponseInput = z.infer<typeof reviewResponseSchema>;
export type ReviewFiltersInput = z.infer<typeof reviewFiltersSchema>;
export type RatingCriteriaInput = z.infer<typeof ratingCriteriaSchema>;

export type ModerationActionInput = z.infer<typeof moderationActionSchema>;
export type ModerationSettingsInput = z.infer<typeof moderationSettingsSchema>;

// =============================================================================
// ESQUEMAS DE VALIDACIÓN PARA ADMINISTRACIÓN Y CMS
// =============================================================================

// Esquema para permiso
export const permissionSchema = z.object({
  type: z.nativeEnum(PermissionType, {
    errorMap: () => ({ message: 'Tipo de permiso inválido' })
  }),
  name: z.string()
    .min(3, 'Nombre del permiso debe tener al menos 3 caracteres')
    .max(100, 'Nombre del permiso no puede exceder 100 caracteres'),
  description: z.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  resource: z.string()
    .min(1, 'Recurso requerido')
    .optional(),
  scope: z.enum(['global', 'own', 'department'], {
    errorMap: () => ({ message: 'Alcance del permiso inválido' })
  }).optional()
});

// Esquema para rol
export const roleSchema = z.object({
  name: z.string()
    .min(3, 'Nombre del rol debe tener al menos 3 caracteres')
    .max(50, 'Nombre del rol no puede exceder 50 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Nombre del rol solo puede contener letras, números, guiones y guiones bajos'),
  displayName: z.string()
    .min(3, 'Nombre para mostrar debe tener al menos 3 caracteres')
    .max(100, 'Nombre para mostrar no puede exceder 100 caracteres'),
  description: z.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  level: z.number()
    .min(1, 'Nivel mínimo es 1')
    .max(10, 'Nivel máximo es 10'),
  permissions: z.array(z.string().min(1, 'ID de permiso inválido'))
    .min(1, 'Debe asignar al menos un permiso'),
  isActive: z.boolean().default(true)
});

// Esquema para usuario administrativo
export const adminUserSchema = z.object({
  username: z.string()
    .min(3, 'Nombre de usuario debe tener al menos 3 caracteres')
    .max(30, 'Nombre de usuario no puede exceder 30 caracteres')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos'),
  email: z.string()
    .email('Email inválido')
    .max(254, 'Email no puede exceder 254 caracteres'),
  firstName: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  lastName: z.string()
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(50, 'Apellido no puede exceder 50 caracteres'),
  avatar: z.string().url('URL del avatar inválida').optional(),
  roles: z.array(z.string().min(1, 'ID de rol inválido'))
    .min(1, 'Debe asignar al menos un rol'),
  status: z.nativeEnum(AdminUserStatus, {
    errorMap: () => ({ message: 'Estado de usuario inválido' })
  }).default(AdminUserStatus.PENDING_ACTIVATION),
  preferences: z.object({
    language: z.string().min(2, 'Código de idioma inválido').default('es'),
    timezone: z.string().min(3, 'Zona horaria inválida').default('America/Santo_Domingo'),
    theme: z.enum(['light', 'dark', 'auto'], {
      errorMap: () => ({ message: 'Tema inválido' })
    }).default('light'),
    notificationsEnabled: z.boolean().default(true),
    emailNotifications: z.boolean().default(true)
  }),
  department: z.string()
    .min(2, 'Departamento debe tener al menos 2 caracteres')
    .max(100, 'Departamento no puede exceder 100 caracteres')
    .optional(),
  position: z.string()
    .min(2, 'Posición debe tener al menos 2 caracteres')
    .max(100, 'Posición no puede exceder 100 caracteres')
    .optional(),
  phone: z.string()
    .min(10, 'Teléfono debe tener al menos 10 dígitos')
    .max(15, 'Teléfono no puede exceder 15 dígitos')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Formato de teléfono inválido')
    .optional()
});

// Esquema para actualizar usuario administrativo
export const updateAdminUserSchema = adminUserSchema.partial().extend({
  suspensionReason: z.string()
    .min(10, 'Motivo de suspensión debe tener al menos 10 caracteres')
    .max(500, 'Motivo de suspensión no puede exceder 500 caracteres')
    .optional()
});

// Esquema para gestión de propiedades
export const propertyManagementSchema = z.object({
  title: z.string()
    .min(10, 'Título debe tener al menos 10 caracteres')
    .max(200, 'Título no puede exceder 200 caracteres'),
  description: z.string()
    .min(50, 'Descripción debe tener al menos 50 caracteres')
    .max(2000, 'Descripción no puede exceder 2000 caracteres'),
  status: z.nativeEnum(PropertyPublicationStatus, {
    errorMap: () => ({ message: 'Estado de propiedad inválido' })
  }),
  reviewNotes: z.string()
    .max(1000, 'Notas de revisión no pueden exceder 1000 caracteres')
    .optional(),
  rejectionReason: z.string()
    .min(10, 'Motivo de rechazo debe tener al menos 10 caracteres')
    .max(500, 'Motivo de rechazo no puede exceder 500 caracteres')
    .optional(),
  priority: z.number()
    .min(1, 'Prioridad mínima es 1')
    .max(10, 'Prioridad máxima es 10')
    .default(5),
  tags: z.array(z.string().min(1, 'Tag inválido'))
    .max(10, 'Máximo 10 tags')
    .optional(),
  categories: z.array(z.string().min(1, 'Categoría inválida'))
    .max(5, 'Máximo 5 categorías')
    .optional(),
  featuredUntil: z.date().optional()
});

// Esquema para log de actividad
export const activityLogSchema = z.object({
  activityType: z.nativeEnum(ActivityType, {
    errorMap: () => ({ message: 'Tipo de actividad inválido' })
  }),
  description: z.string()
    .min(5, 'Descripción debe tener al menos 5 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  resourceType: z.string()
    .min(1, 'Tipo de recurso requerido')
    .optional(),
  resourceId: z.string()
    .min(1, 'ID de recurso requerido')
    .optional(),
  resourceName: z.string()
    .min(1, 'Nombre de recurso requerido')
    .optional(),
  metadata: z.record(z.unknown()).optional(),
  level: z.nativeEnum(LogLevel, {
    errorMap: () => ({ message: 'Nivel de log inválido' })
  }).default(LogLevel.INFO),
  success: z.boolean().default(true),
  errorMessage: z.string()
    .max(1000, 'Mensaje de error no puede exceder 1000 caracteres')
    .optional(),
  duration: z.number()
    .min(0, 'Duración debe ser positiva')
    .optional()
});

// Esquema para configuración del sistema
export const systemConfigSchema = z.object({
  category: z.string()
    .min(2, 'Categoría debe tener al menos 2 caracteres')
    .max(50, 'Categoría no puede exceder 50 caracteres'),
  key: z.string()
    .min(2, 'Clave debe tener al menos 2 caracteres')
    .max(100, 'Clave no puede exceder 100 caracteres')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Clave solo puede contener letras, números, puntos, guiones y guiones bajos'),
  value: z.union([z.string(), z.number(), z.boolean(), z.object({}).passthrough()]),
  type: z.enum(['string', 'number', 'boolean', 'json', 'array'], {
    errorMap: () => ({ message: 'Tipo de configuración inválido' })
  }),
  description: z.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  isPublic: z.boolean().default(false),
  isEditable: z.boolean().default(true),
  validation: z.object({
    required: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    options: z.array(z.string()).optional()
  }).optional()
});

// Esquema para notificación administrativa
export const adminNotificationSchema = z.object({
  type: z.enum(['info', 'warning', 'error', 'success'], {
    errorMap: () => ({ message: 'Tipo de notificación inválido' })
  }),
  title: z.string()
    .min(5, 'Título debe tener al menos 5 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres'),
  message: z.string()
    .min(10, 'Mensaje debe tener al menos 10 caracteres')
    .max(500, 'Mensaje no puede exceder 500 caracteres'),
  actionUrl: z.string().url('URL de acción inválida').optional(),
  actionText: z.string()
    .min(2, 'Texto de acción debe tener al menos 2 caracteres')
    .max(50, 'Texto de acción no puede exceder 50 caracteres')
    .optional(),
  recipientRole: z.nativeEnum(AdminRole).optional(),
  recipientUser: z.string().min(1, 'ID de usuario inválido').optional(),
  isGlobal: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    errorMap: () => ({ message: 'Prioridad inválida' })
  }).default('medium'),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional()
});

// Esquema para reporte del sistema
export const systemReportSchema = z.object({
  name: z.string()
    .min(5, 'Nombre del reporte debe tener al menos 5 caracteres')
    .max(100, 'Nombre del reporte no puede exceder 100 caracteres'),
  description: z.string()
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  type: z.enum(['users', 'properties', 'bookings', 'financial', 'activity', 'custom'], {
    errorMap: () => ({ message: 'Tipo de reporte inválido' })
  }),
  parameters: z.record(z.unknown()).optional(),
  filters: z.record(z.unknown()).optional(),
  dateRange: z.object({
    start: z.date({ errorMap: () => ({ message: 'Fecha de inicio inválida' }) }),
    end: z.date({ errorMap: () => ({ message: 'Fecha de fin inválida' }) })
  }),
  format: z.enum(['json', 'csv', 'xlsx', 'pdf'], {
    errorMap: () => ({ message: 'Formato de reporte inválido' })
  }).default('xlsx'),
  scheduledRun: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly'], {
      errorMap: () => ({ message: 'Frecuencia inválida' })
    }),
    isActive: z.boolean().default(true)
  }).optional()
});

// Esquema para widget del dashboard
export const dashboardWidgetSchema = z.object({
  type: z.enum(['metric', 'chart', 'table', 'list', 'map'], {
    errorMap: () => ({ message: 'Tipo de widget inválido' })
  }),
  title: z.string()
    .min(3, 'Título debe tener al menos 3 caracteres')
    .max(100, 'Título no puede exceder 100 caracteres'),
  description: z.string()
    .max(500, 'Descripción no puede exceder 500 caracteres')
    .optional(),
  size: z.enum(['small', 'medium', 'large', 'full'], {
    errorMap: () => ({ message: 'Tamaño de widget inválido' })
  }).default('medium'),
  position: z.object({
    x: z.number().min(0, 'Posición X debe ser positiva'),
    y: z.number().min(0, 'Posición Y debe ser positiva'),
    width: z.number().min(1, 'Ancho mínimo es 1'),
    height: z.number().min(1, 'Alto mínimo es 1')
  }),
  config: z.record(z.unknown()),
  dataSource: z.string()
    .min(1, 'Fuente de datos requerida'),
  refreshInterval: z.number()
    .min(30, 'Intervalo mínimo de actualización es 30 segundos')
    .max(3600, 'Intervalo máximo de actualización es 1 hora')
    .optional(),
  permissions: z.array(z.nativeEnum(PermissionType))
    .min(1, 'Debe asignar al menos un permiso'),
  isActive: z.boolean().default(true)
});

// Esquema para configuración del dashboard
export const dashboardConfigSchema = z.object({
  name: z.string()
    .min(3, 'Nombre del dashboard debe tener al menos 3 caracteres')
    .max(100, 'Nombre del dashboard no puede exceder 100 caracteres'),
  isDefault: z.boolean().default(false),
  userId: z.string().min(1, 'ID de usuario inválido').optional(),
  role: z.nativeEnum(AdminRole).optional(),
  widgets: z.array(dashboardWidgetSchema),
  layout: z.enum(['grid', 'flexible'], {
    errorMap: () => ({ message: 'Tipo de layout inválido' })
  }).default('grid'),
  theme: z.enum(['light', 'dark'], {
    errorMap: () => ({ message: 'Tema inválido' })
  }).default('light'),
  autoRefresh: z.boolean().default(true),
  refreshInterval: z.number()
    .min(60, 'Intervalo mínimo de actualización es 60 segundos')
    .max(3600, 'Intervalo máximo de actualización es 1 hora')
    .default(300)
});

// Esquema para filtros de reportes
export const reportFiltersSchema = z.object({
  dateRange: z.object({
    start: z.date(),
    end: z.date()
  }).optional(),
  userType: z.array(z.nativeEnum(UserType)).optional(),
  propertyType: z.array(z.string()).optional(),
  location: z.object({
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional()
  }).optional(),
  status: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  minValue: z.number().min(0, 'Valor mínimo debe ser positivo').optional(),
  maxValue: z.number().min(0, 'Valor máximo debe ser positivo').optional(),
  sortBy: z.string().min(1, 'Campo de ordenamiento requerido').optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  limit: z.number().min(1).max(10000).default(1000),
  offset: z.number().min(0).default(0)
});

// Esquemas agrupados para administración
export const adminSchemas = {
  // Usuarios y roles
  permission: permissionSchema,
  role: roleSchema,
  adminUser: adminUserSchema,
  updateAdminUser: updateAdminUserSchema,
  
  // Gestión de propiedades
  propertyManagement: propertyManagementSchema,
  
  // Logs y auditoría
  activityLog: activityLogSchema,
  
  // Configuración
  systemConfig: systemConfigSchema,
  
  // Notificaciones
  adminNotification: adminNotificationSchema,
  
  // Reportes
  systemReport: systemReportSchema,
  reportFilters: reportFiltersSchema,
  
  // Dashboard
  dashboardWidget: dashboardWidgetSchema,
  dashboardConfig: dashboardConfigSchema
};

// Tipos inferidos para administración
export type PermissionInput = z.infer<typeof permissionSchema>;
export type RoleInput = z.infer<typeof roleSchema>;
export type AdminUserInput = z.infer<typeof adminUserSchema>;
export type UpdateAdminUserInput = z.infer<typeof updateAdminUserSchema>;
export type PropertyManagementInput = z.infer<typeof propertyManagementSchema>;
export type ActivityLogInput = z.infer<typeof activityLogSchema>;
export type SystemConfigInput = z.infer<typeof systemConfigSchema>;
export type AdminNotificationInput = z.infer<typeof adminNotificationSchema>;
export type SystemReportInput = z.infer<typeof systemReportSchema>;
export type DashboardWidgetInput = z.infer<typeof dashboardWidgetSchema>;
export type DashboardConfigInput = z.infer<typeof dashboardConfigSchema>;
export type ReportFiltersInput = z.infer<typeof reportFiltersSchema>;

// ============================================================================
// ESQUEMAS DE NOTIFICACIONES Y MÓVIL
// ============================================================================

// Validación de notificación
export const notificationSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  type: z.nativeEnum(NotificationType, {
    errorMap: () => ({ message: 'Tipo de notificación inválido' })
  }),
  title: z.string()
    .min(1, 'Título requerido')
    .max(100, 'Título no puede exceder 100 caracteres'),
  message: z.string()
    .min(1, 'Mensaje requerido')
    .max(500, 'Mensaje no puede exceder 500 caracteres'),
  channel: z.nativeEnum(NotificationChannel, {
    errorMap: () => ({ message: 'Canal de notificación inválido' })
  }),
  priority: z.nativeEnum(NotificationPriority, {
    errorMap: () => ({ message: 'Prioridad inválida' })
  }).default(NotificationPriority.NORMAL),
  
  // Metadatos opcionales
  data: z.record(z.unknown()).optional(),
  imageUrl: z.string().url('URL de imagen inválida').optional(),
  actionUrl: z.string().url('URL de acción inválida').optional(),
  deepLink: z.string().optional(),
  
  // Configuración de entrega
  scheduledFor: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
  maxRetries: z.number()
    .min(0, 'Reintentos no puede ser negativo')
    .max(10, 'Máximo 10 reintentos')
    .default(3),
    
  // Contexto
  sourceId: z.string().optional(),
  sourceType: z.string().optional(),
  relatedEntityId: z.string().optional()
});

// Validación de push notification
export const pushNotificationSchema = z.object({
  notificationId: z.string().min(1, 'ID de notificación requerido'),
  deviceToken: z.string().min(1, 'Token de dispositivo requerido'),
  platform: z.nativeEnum(DevicePlatform, {
    errorMap: () => ({ message: 'Plataforma inválida' })
  }),
  
  // Configuración push
  badge: z.number().min(0, 'Badge no puede ser negativo').optional(),
  sound: z.string().optional(),
  category: z.string().optional(),
  threadId: z.string().optional(),
  
  // Payloads específicos por plataforma
  iosPayload: z.object({
    alert: z.object({
      title: z.string().min(1, 'Título requerido'),
      body: z.string().min(1, 'Cuerpo requerido'),
      subtitle: z.string().optional()
    }),
    badge: z.number().min(0).optional(),
    sound: z.string().optional(),
    'mutable-content': z.number().optional(),
    'content-available': z.number().optional(),
    category: z.string().optional(),
    'thread-id': z.string().optional()
  }).optional(),
  
  androidPayload: z.object({
    notification: z.object({
      title: z.string().min(1, 'Título requerido'),
      body: z.string().min(1, 'Cuerpo requerido'),
      icon: z.string().optional(),
      color: z.string().optional(),
      sound: z.string().optional(),
      tag: z.string().optional(),
      click_action: z.string().optional()
    }),
    data: z.record(z.string()).optional(),
    priority: z.enum(['normal', 'high']).optional(),
    time_to_live: z.number().min(0).optional()
  }).optional(),
  
  webPayload: z.object({
    title: z.string().min(1, 'Título requerido'),
    body: z.string().min(1, 'Cuerpo requerido'),
    icon: z.string().url('URL de icono inválida').optional(),
    image: z.string().url('URL de imagen inválida').optional(),
    badge: z.string().url('URL de badge inválida').optional(),
    tag: z.string().optional(),
    data: z.record(z.unknown()).optional(),
    actions: z.array(z.object({
      action: z.string().min(1, 'Acción requerida'),
      title: z.string().min(1, 'Título de acción requerido'),
      icon: z.string().url('URL de icono inválida').optional()
    })).optional()
  }).optional()
});

// Validación de dispositivo de usuario
export const userDeviceSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  deviceToken: z.string().min(1, 'Token de dispositivo requerido'),
  platform: z.nativeEnum(DevicePlatform, {
    errorMap: () => ({ message: 'Plataforma inválida' })
  }),
  deviceId: z.string().min(1, 'ID de dispositivo requerido'),
  deviceName: z.string()
    .min(1, 'Nombre de dispositivo requerido')
    .max(100, 'Nombre no puede exceder 100 caracteres'),
  appVersion: z.string()
    .min(1, 'Versión de app requerida')
    .max(20, 'Versión no puede exceder 20 caracteres'),
  osVersion: z.string()
    .min(1, 'Versión de OS requerida')
    .max(20, 'Versión no puede exceder 20 caracteres'),
    
  // Configuración push
  pushSettings: z.object({
    soundEnabled: z.boolean().default(true),
    vibrateEnabled: z.boolean().default(true),
    badgeEnabled: z.boolean().default(true),
    alertStyle: z.enum(['banner', 'alert', 'none']).default('banner')
  }),
  
  // Metadatos
  timezone: z.string()
    .min(1, 'Zona horaria requerida')
    .max(50, 'Zona horaria no puede exceder 50 caracteres'),
  language: z.string()
    .min(2, 'Idioma requerido')
    .max(10, 'Idioma no puede exceder 10 caracteres')
});

// Validación de preferencias de notificación
export const userNotificationPreferencesSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  
  // Configuración general
  globalEnabled: z.boolean().default(true),
  quietHoursEnabled: z.boolean().default(false),
  quietHoursStart: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
    .default('22:00'),
  quietHoursEnd: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
    .default('08:00'),
  timezone: z.string()
    .min(1, 'Zona horaria requerida')
    .max(50, 'Zona horaria no puede exceder 50 caracteres'),
    
  // Preferencias por tipo (se pueden personalizar individualmente)
  typePreferences: z.record(
    z.nativeEnum(NotificationType),
    z.object({
      enabled: z.boolean().default(true),
      channels: z.array(z.nativeEnum(NotificationChannel))
        .min(1, 'Al menos un canal requerido'),
      priority: z.nativeEnum(NotificationPriority).default(NotificationPriority.NORMAL),
      frequency: z.enum(['immediate', 'hourly', 'daily', 'weekly']).default('immediate'),
      soundEnabled: z.boolean().default(true)
    })
  ).optional(),
  
  // Preferencias por canal
  channelPreferences: z.record(
    z.nativeEnum(NotificationChannel),
    z.object({
      enabled: z.boolean().default(true),
      maxDailyLimit: z.number()
        .min(1, 'Límite diario debe ser positivo')
        .max(1000, 'Límite diario muy alto')
        .optional(),
      minIntervalMinutes: z.number()
        .min(1, 'Intervalo mínimo debe ser positivo')
        .max(1440, 'Intervalo no puede exceder 24 horas')
        .optional()
    })
  ).optional(),
  
  // Filtros avanzados
  filters: z.object({
    mutedUsers: z.array(z.string()).default([]),
    mutedProperties: z.array(z.string()).default([]),
    mutedKeywords: z.array(z.string()).default([]),
    priorityThreshold: z.nativeEnum(NotificationPriority).default(NotificationPriority.LOW)
  }).optional()
});

// Validación de template de notificación
export const notificationTemplateSchema = z.object({
  type: z.nativeEnum(NotificationType, {
    errorMap: () => ({ message: 'Tipo de notificación inválido' })
  }),
  name: z.string()
    .min(1, 'Nombre requerido')
    .max(100, 'Nombre no puede exceder 100 caracteres'),
  description: z.string()
    .max(500, 'Descripción no puede exceder 500 caracteres')
    .optional(),
    
  // Templates por idioma
  templates: z.record(
    z.string().min(2, 'Código de idioma inválido'),
    z.object({
      title: z.string()
        .min(1, 'Título requerido')
        .max(100, 'Título no puede exceder 100 caracteres'),
      message: z.string()
        .min(1, 'Mensaje requerido')
        .max(500, 'Mensaje no puede exceder 500 caracteres'),
      emailSubject: z.string()
        .max(200, 'Asunto no puede exceder 200 caracteres')
        .optional(),
      emailBody: z.string()
        .max(5000, 'Cuerpo de email no puede exceder 5000 caracteres')
        .optional(),
      smsText: z.string()
        .max(160, 'SMS no puede exceder 160 caracteres')
        .optional()
    })
  ),
  
  // Configuración
  defaultChannel: z.nativeEnum(NotificationChannel),
  defaultPriority: z.nativeEnum(NotificationPriority).default(NotificationPriority.NORMAL),
  expirationHours: z.number()
    .min(1, 'Expiración debe ser positiva')
    .max(8760, 'Expiración no puede exceder un año')
    .optional(),
  maxRetries: z.number()
    .min(0, 'Reintentos no puede ser negativo')
    .max(10, 'Máximo 10 reintentos')
    .default(3),
    
  // Variables disponibles
  variables: z.array(z.object({
    name: z.string()
      .min(1, 'Nombre de variable requerido')
      .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, 'Nombre de variable inválido'),
    type: z.enum(['string', 'number', 'date', 'boolean']),
    required: z.boolean().default(false),
    description: z.string()
      .min(1, 'Descripción requerida')
      .max(200, 'Descripción no puede exceder 200 caracteres')
  })).default([]),
  
  isActive: z.boolean().default(true)
});

// Validación de configuración del sistema de notificaciones
export const notificationSystemConfigSchema = z.object({
  // Configuración de proveedores
  providers: z.object({
    push: z.object({
      firebase: z.object({
        enabled: z.boolean().default(false),
        serverKey: z.string().min(1, 'Server key requerido').optional(),
        senderId: z.string().min(1, 'Sender ID requerido').optional()
      }),
      apns: z.object({
        enabled: z.boolean().default(false),
        keyId: z.string().min(1, 'Key ID requerido').optional(),
        teamId: z.string().min(1, 'Team ID requerido').optional(),
        bundleId: z.string().min(1, 'Bundle ID requerido').optional(),
        certPath: z.string().min(1, 'Ruta de certificado requerida').optional()
      })
    }),
    
    email: z.object({
      smtp: z.object({
        enabled: z.boolean().default(false),
        host: z.string().min(1, 'Host SMTP requerido').optional(),
        port: z.number().min(1, 'Puerto SMTP requerido').max(65535, 'Puerto inválido').optional(),
        secure: z.boolean().default(true),
        user: z.string().email('Email inválido').optional(),
        password: z.string().min(1, 'Contraseña requerida').optional()
      }),
      sendgrid: z.object({
        enabled: z.boolean().default(false),
        apiKey: z.string().min(1, 'API Key requerida').optional()
      })
    }),
    
    sms: z.object({
      twilio: z.object({
        enabled: z.boolean().default(false),
        accountSid: z.string().min(1, 'Account SID requerido').optional(),
        authToken: z.string().min(1, 'Auth Token requerido').optional(),
        fromNumber: z.string().min(1, 'Número de origen requerido').optional()
      })
    }),
    
    whatsapp: z.object({
      twilio: z.object({
        enabled: z.boolean().default(false),
        accountSid: z.string().min(1, 'Account SID requerido').optional(),
        authToken: z.string().min(1, 'Auth Token requerido').optional(),
        fromNumber: z.string().min(1, 'Número de origen requerido').optional()
      })
    })
  }),
  
  // Límites y configuración
  rateLimits: z.object({
    perUser: z.object({
      hourly: z.number().min(1, 'Límite por hora debe ser positivo').default(100),
      daily: z.number().min(1, 'Límite diario debe ser positivo').default(1000),
      monthly: z.number().min(1, 'Límite mensual debe ser positivo').default(10000)
    }),
    global: z.object({
      perSecond: z.number().min(1, 'Límite por segundo debe ser positivo').default(100),
      perMinute: z.number().min(1, 'Límite por minuto debe ser positivo').default(1000),
      perHour: z.number().min(1, 'Límite por hora debe ser positivo').default(10000)
    })
  }),
  
  // Configuración de retry
  retryConfig: z.object({
    maxRetries: z.number().min(0, 'Reintentos no puede ser negativo').max(10, 'Máximo 10 reintentos').default(3),
    initialDelay: z.number().min(100, 'Delay inicial mínimo 100ms').default(1000),
    backoffMultiplier: z.number().min(1, 'Multiplicador debe ser >= 1').default(2),
    maxDelay: z.number().min(1000, 'Delay máximo mínimo 1 segundo').default(60000)
  }),
  
  // Configuración de cleanup
  cleanupConfig: z.object({
    deleteReadAfterDays: z.number().min(1, 'Días para eliminar leídas debe ser positivo').default(30),
    deleteUnreadAfterDays: z.number().min(1, 'Días para eliminar no leídas debe ser positivo').default(90),
    deleteFailedAfterDays: z.number().min(1, 'Días para eliminar fallidas debe ser positivo').default(7),
    archiveAfterDays: z.number().min(1, 'Días para archivar debe ser positivo').default(365)
  }),
  
  // Configuración de features
  features: z.object({
    batchingEnabled: z.boolean().default(true),
    schedulingEnabled: z.boolean().default(true),
    templatingEnabled: z.boolean().default(true),
    analyticsEnabled: z.boolean().default(true),
    a11yEnabled: z.boolean().default(true)
  })
});

// Tipos inferidos para notificaciones
export type NotificationInput = z.infer<typeof notificationSchema>;
export type PushNotificationInput = z.infer<typeof pushNotificationSchema>;
export type UserDeviceInput = z.infer<typeof userDeviceSchema>;
export type UserNotificationPreferencesInput = z.infer<typeof userNotificationPreferencesSchema>;
export type NotificationTemplateInput = z.infer<typeof notificationTemplateSchema>;
export type NotificationSystemConfigInput = z.infer<typeof notificationSystemConfigSchema>;

export default rentalSchemas;