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
  NotificationPriority,
  AmenityCategory,
  TransportationType,
  AttractionType,
  PaymentProvider,
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

export default rentalSchemas;