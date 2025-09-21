// Rental Management Types for DY States
// Dominican Republic Real Estate Platform

export interface Rental {
  id: string;
  propertyId: string;
  ownerId: string; // Usuario propietario
  title: string;
  description: string;
  status: RentalStatus;
  rentalType: RentalType;
  pricing: RentalPricing;
  availability: RentalAvailability;
  rules: RentalRules;
  amenities: RentalAmenity[];
  location: RentalLocation;
  images: RentalImage[];
  calendar: RentalCalendar;
  settings: RentalSettings;
  stats: RentalStats;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export enum RentalStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
  MAINTENANCE = 'maintenance',
}

export enum RentalType {
  SHORT_TERM = 'short_term', // Alquiler por días (Airbnb style)
  MEDIUM_TERM = 'medium_term', // Alquiler por semanas/meses
  LONG_TERM = 'long_term', // Alquiler tradicional anual
  VACATION = 'vacation', // Alquiler vacacional
  CORPORATE = 'corporate', // Alquiler corporativo
}

export interface RentalPricing {
  basePrice: number;
  currency: 'DOP' | 'USD';
  pricingType: PricingType;
  seasonalRates?: SeasonalRate[];
  discounts?: RentalDiscount[];
  fees?: RentalFee[];
  securityDeposit: number;
  cleaningFee?: number;
  minimumStay: number; // días mínimos
  maximumStay?: number; // días máximos
}

export enum PricingType {
  PER_NIGHT = 'per_night',
  PER_WEEK = 'per_week',
  PER_MONTH = 'per_month',
  PER_YEAR = 'per_year',
}

export interface SeasonalRate {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  priceMultiplier: number; // 1.0 = precio base, 1.5 = 50% más caro
  isActive: boolean;
}

export interface RentalDiscount {
  id: string;
  type: DiscountType;
  name: string;
  value: number; // porcentaje o monto fijo
  isPercentage: boolean;
  minimumStay?: number;
  conditions?: string;
  validFrom?: Date;
  validTo?: Date;
  isActive: boolean;
}

export enum DiscountType {
  WEEKLY_DISCOUNT = 'weekly_discount', // Descuento por semana
  MONTHLY_DISCOUNT = 'monthly_discount', // Descuento por mes
  EARLY_BIRD = 'early_bird', // Reserva anticipada
  LAST_MINUTE = 'last_minute', // Última hora
  LONG_STAY = 'long_stay', // Estadía larga
  FIRST_TIME = 'first_time', // Primera vez
  SEASONAL = 'seasonal', // Temporada baja
}

export interface RentalFee {
  id: string;
  name: string;
  amount: number;
  type: FeeType;
  isRequired: boolean;
  description?: string;
}

export enum FeeType {
  CLEANING = 'cleaning',
  PET = 'pet',
  EXTRA_GUEST = 'extra_guest',
  PARKING = 'parking',
  WIFI = 'wifi',
  TOWELS_LINENS = 'towels_linens',
  OTHER = 'other',
}

export interface RentalAvailability {
  isInstantBook: boolean; // Reserva inmediata
  advanceNotice: number; // horas de anticipación mínima
  preparationTime: number; // horas entre reservas
  checkInTime: string; // "15:00"
  checkOutTime: string; // "11:00"
  blockedDates: Date[]; // fechas no disponibles
  minimumAdvanceBooking: number; // días mínimos de anticipación
  maximumAdvanceBooking: number; // días máximos de anticipación
}

export interface RentalRules {
  maxGuests: number;
  allowChildren: boolean;
  allowInfants: boolean;
  allowPets: boolean;
  allowSmoking: boolean;
  allowParties: boolean;
  quietHours?: {
    start: string; // "22:00"
    end: string; // "08:00"
  };
  checkInInstructions?: string;
  houseRules?: string[];
  additionalRules?: string;
}

// Tipos para reservas
export interface Guest {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  identificationType: 'dni' | 'nie' | 'passport';
  identificationNumber: string;
  dateOfBirth?: Date;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface BookingRequest {
  rentalId: string;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  totalAmount: number;
  guest: Guest;
  specialRequests?: string;
  paymentMethod: 'pending' | 'card' | 'transfer' | 'paypal';
  contactPreferences: {
    email: boolean;
    sms: boolean;
  };
}

export interface PricingBreakdown {
  basePrice: number;
  numberOfNights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;
  extraGuestFee?: number;
  petFee?: number;
  discounts?: {
    type: 'weekly' | 'monthly' | 'early_bird' | 'last_minute';
    amount: number;
    description: string;
  }[];
}

export interface RentalAmenity {
  id: string;
  name: string;
  category: AmenityCategory;
  icon?: string;
  isHighlighted: boolean;
}

export enum AmenityCategory {
  BASIC = 'basic',
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
  BEDROOM = 'bedroom',
  ENTERTAINMENT = 'entertainment',
  OUTDOOR = 'outdoor',
  SAFETY = 'safety',
  ACCESSIBILITY = 'accessibility',
}

export interface RentalLocation {
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
  neighborhood?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transportation?: TransportationOption[];
  nearbyAttractions?: NearbyAttraction[];
}

export interface TransportationOption {
  type: TransportationType;
  name: string;
  distance: number; // metros
  walkingTime?: number; // minutos
}

export enum TransportationType {
  METRO = 'metro',
  BUS = 'bus',
  TAXI = 'taxi',
  AIRPORT = 'airport',
  TRAIN = 'train',
  FERRY = 'ferry',
}

export interface NearbyAttraction {
  name: string;
  type: AttractionType;
  distance: number; // metros
  description?: string;
}

export enum AttractionType {
  BEACH = 'beach',
  RESTAURANT = 'restaurant',
  SHOPPING = 'shopping',
  MUSEUM = 'museum',
  PARK = 'park',
  NIGHTLIFE = 'nightlife',
  HOSPITAL = 'hospital',
  SCHOOL = 'school',
  SUPERMARKET = 'supermarket',
}

export interface RentalImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
  isPrimary: boolean;
  room?: string; // sala, cocina, dormitorio, etc.
}

// Calendario de disponibilidad
export interface RentalCalendar {
  id: string;
  rentalId: string;
  availability: CalendarDay[];
  lastUpdated: Date;
}

export interface CalendarDay {
  date: Date;
  isAvailable: boolean;
  price?: number; // precio específico para este día
  minimumStay?: number; // estancia mínima para este día
  isBlocked: boolean; // bloqueado manualmente
  blockReason?: string;
  bookingId?: string; // ID de reserva si está ocupado
}

export interface RentalSettings {
  autoAcceptBookings: boolean;
  requireGuestVerification: boolean;
  allowSameDayBookings: boolean;
  sendAutomaticMessages: boolean;
  notificationPreferences: NotificationPreferences;
  cancellationPolicy: CancellationPolicy;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newBookingNotifications: boolean;
  cancellationNotifications: boolean;
  messageNotifications: boolean;
  reviewNotifications: boolean;
}

export interface CancellationPolicy {
  type: CancellationPolicyType;
  description: string;
  refundPercentages: RefundSchedule[];
  gracePeriodHours: number; // horas gratis para cancelar
}

export enum CancellationPolicyType {
  FLEXIBLE = 'flexible',
  MODERATE = 'moderate',
  STRICT = 'strict',
  SUPER_STRICT = 'super_strict',
  NON_REFUNDABLE = 'non_refundable',
}

export interface RefundSchedule {
  daysBeforeCheckIn: number;
  refundPercentage: number;
}

export interface RentalStats {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  occupancyRate: number; // porcentaje de ocupación
  responseRate: number; // tasa de respuesta a mensajes
  responseTime: number; // tiempo promedio de respuesta en horas
  lastBooked?: Date;
}

// Sistema de Reservas
export interface Booking {
  id: string;
  rentalId: string;
  guestId: string;
  ownerId: string;
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate: Date;
  guests: GuestDetails;
  pricing: BookingPricing;
  payment: BookingPayment;
  communication: BookingCommunication;
  reviews?: BookingReview[];
  cancellation?: BookingCancellation;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
  confirmedAt?: Date;
}

export enum BookingStatus {
  PENDING = 'pending', // Esperando confirmación
  CONFIRMED = 'confirmed', // Confirmada
  CHECKED_IN = 'checked_in', // Guest ha llegado
  CHECKED_OUT = 'checked_out', // Guest se ha ido
  CANCELLED = 'cancelled', // Cancelada
  COMPLETED = 'completed', // Completada con review
  DISPUTED = 'disputed', // En disputa
}

export interface GuestDetails {
  adults: number;
  children: number;
  infants: number;
  pets: number;
  purpose: TravelPurpose;
  specialNeeds?: string;
}

export enum TravelPurpose {
  LEISURE = 'leisure',
  BUSINESS = 'business',
  FAMILY = 'family',
  COUPLE = 'couple',
  FRIENDS = 'friends',
  SOLO = 'solo',
  OTHER = 'other',
}

export interface BookingPricing {
  baseAmount: number;
  nights: number;
  subtotal: number;
  fees: BookingFee[];
  discounts: BookingDiscount[];
  taxes: BookingTax[];
  total: number;
  currency: 'DOP' | 'USD';
  exchangeRate?: number;
}

export interface BookingFee {
  name: string;
  amount: number;
  type: FeeType;
}

export interface BookingDiscount {
  name: string;
  amount: number;
  type: DiscountType;
}

export interface BookingTax {
  name: string;
  rate: number; // porcentaje
  amount: number;
}

export interface BookingPayment {
  totalAmount: number;
  currency: 'DOP' | 'USD';
  status: PaymentStatus;
  method?: PaymentMethod;
  transactions: PaymentTransaction[];
  refunds?: PaymentRefund[];
  securityDeposit: {
    amount: number;
    status: DepositStatus;
    releaseDate?: Date;
  };
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
  CASH = 'cash',
  OTHER = 'other',
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: PaymentStatus;
  method: PaymentMethod;
  gatewayTransactionId?: string;
  gatewayResponse?: any;
  processedAt: Date;
  description?: string;
}

export enum TransactionType {
  PAYMENT = 'payment',
  REFUND = 'refund',
  SECURITY_DEPOSIT = 'security_deposit',
  SECURITY_DEPOSIT_REFUND = 'security_deposit_refund',
  FEE = 'fee',
}

export interface PaymentRefund {
  id: string;
  amount: number;
  reason: RefundReason;
  status: PaymentStatus;
  requestedAt: Date;
  processedAt?: Date;
  gatewayRefundId?: string;
}

export enum RefundReason {
  GUEST_CANCELLATION = 'guest_cancellation',
  HOST_CANCELLATION = 'host_cancellation',
  DISPUTE_RESOLUTION = 'dispute_resolution',
  SECURITY_DEPOSIT_RETURN = 'security_deposit_return',
  SERVICE_ISSUE = 'service_issue',
  OTHER = 'other',
}

export enum DepositStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  RELEASED = 'released',
  FORFEITED = 'forfeited',
}

export interface BookingCommunication {
  hasUnreadMessages: boolean;
  lastMessageAt?: Date;
  totalMessages: number;
  conversationId: string;
}

export interface BookingReview {
  id: string;
  reviewerId: string;
  revieweeId: string;
  type: ReviewType;
  rating: number;
  comment?: string;
  categories: ReviewCategory[];
  isVisible: boolean;
  createdAt: Date;
  response?: ReviewResponse;
}

export enum ReviewType {
  GUEST_TO_HOST = 'guest_to_host',
  HOST_TO_GUEST = 'host_to_guest',
}

export interface ReviewCategory {
  name: string;
  rating: number;
}

export interface ReviewResponse {
  content: string;
  createdAt: Date;
}

export interface BookingCancellation {
  cancelledBy: string; // userId
  reason: CancellationReason;
  description?: string;
  cancelledAt: Date;
  refundAmount: number;
  penalty?: number;
}

export enum CancellationReason {
  GUEST_REQUEST = 'guest_request',
  HOST_REQUEST = 'host_request',
  EMERGENCY = 'emergency',
  FORCE_MAJEURE = 'force_majeure',
  PROPERTY_ISSUE = 'property_issue',
  PAYMENT_FAILED = 'payment_failed',
  VIOLATION = 'violation',
  OTHER = 'other',
}

// Sistema de Mensajería
export interface RentalMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  bookingId?: string;
  rentalId: string;
  content: string;
  type: MessageType;
  attachments?: MessageAttachment[];
  isRead: boolean;
  isSystemMessage: boolean;
  translatedContent?: MessageTranslation[];
  createdAt: Date;
  readAt?: Date;
  editedAt?: Date;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  AUDIO = 'audio',
  SYSTEM = 'system',
  BOOKING_UPDATE = 'booking_update',
  PAYMENT_UPDATE = 'payment_update',
  CHECK_IN_INFO = 'check_in_info',
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  thumbnailUrl?: string;
}

export interface MessageTranslation {
  language: string;
  content: string;
  confidence: number;
}

export interface Conversation {
  id: string;
  rentalId: string;
  bookingId?: string;
  participants: ConversationParticipant[];
  lastMessage?: RentalMessage;
  unreadCount: {
    [userId: string]: number;
  };
  status: ConversationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationParticipant {
  userId: string;
  role: ParticipantRole;
  joinedAt: Date;
  lastSeenAt?: Date;
}

export enum ParticipantRole {
  HOST = 'host',
  GUEST = 'guest',
  ADMIN = 'admin',
}

export enum ConversationStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  BLOCKED = 'blocked',
}

// Sistema de Notificaciones
export interface RentalNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: NotificationData;
  channels: NotificationChannel[];
  status: NotificationStatus;
  priority: NotificationPriority;
  scheduledFor?: Date;
  sentAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

export enum NotificationType {
  NEW_BOOKING = 'new_booking',
  BOOKING_CONFIRMED = 'booking_confirmed',
  BOOKING_CANCELLED = 'booking_cancelled',
  BOOKING_MODIFIED = 'booking_modified',
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
  CHECK_IN_REMINDER = 'check_in_reminder',
  CHECK_OUT_REMINDER = 'check_out_reminder',
  NEW_MESSAGE = 'new_message',
  NEW_REVIEW = 'new_review',
  CALENDAR_UPDATED = 'calendar_updated',
  PRICE_UPDATED = 'price_updated',
  MAINTENANCE_SCHEDULED = 'maintenance_scheduled',
  SYSTEM_ALERT = 'system_alert',
}

export interface NotificationData {
  bookingId?: string;
  rentalId?: string;
  messageId?: string;
  amount?: number;
  currency?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guestName?: string;
  hostName?: string;
  propertyTitle?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  WHATSAPP = 'whatsapp',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

// DTOs para operaciones API
export interface CreateRentalDTO {
  propertyId: string;
  title: string;
  description: string;
  rentalType: RentalType;
  pricing: Omit<RentalPricing, 'seasonalRates' | 'discounts' | 'fees'>;
  availability: RentalAvailability;
  rules: RentalRules;
  amenities: string[]; // IDs de amenities
  images: Omit<RentalImage, 'id'>[];
  settings: RentalSettings;
}

export interface UpdateRentalDTO extends Partial<CreateRentalDTO> {
  status?: RentalStatus;
}

export interface CreateBookingDTO {
  rentalId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guests: GuestDetails;
  specialRequests?: string;
  promoCode?: string;
}

export interface BookingSearchParams {
  location?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  rentalType?: RentalType;
  instantBook?: boolean;
  hostLanguage?: string;
  sortBy?: BookingSortBy;
  page?: number;
  limit?: number;
}

export enum BookingSortBy {
  PRICE_LOW_TO_HIGH = 'price_low_to_high',
  PRICE_HIGH_TO_LOW = 'price_high_to_low',
  DISTANCE = 'distance',
  RATING = 'rating',
  NEWEST = 'newest',
  AVAILABILITY = 'availability',
}

export interface BookingSearchResult {
  rentals: RentalSearchItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: BookingSearchParams;
}

export interface RentalSearchItem {
  id: string;
  title: string;
  images: RentalImage[];
  pricing: {
    basePrice: number;
    currency: string;
    totalPrice?: number;
  };
  location: {
    city: string;
    neighborhood?: string;
    distance?: number;
  };
  stats: {
    rating: number;
    reviewCount: number;
  };
  availability: {
    isAvailable: boolean;
    isInstantBook: boolean;
  };
  amenities: string[];
}

export interface SendMessageDTO {
  conversationId?: string;
  receiverId: string;
  content: string;
  type: MessageType;
  attachments?: Omit<MessageAttachment, 'id'>[];
  bookingId?: string;
  rentalId?: string;
}

export interface CreateNotificationDTO {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: NotificationData;
  channels: NotificationChannel[];
  priority?: NotificationPriority;
  scheduledFor?: Date;
}

// Interfaces para integración con pasarela de pagos
export interface PaymentGatewayConfig {
  provider: PaymentProvider;
  publicKey: string;
  webhookSecret: string;
  supportedMethods: PaymentMethod[];
  currency: string;
  isTestMode: boolean;
}

export enum PaymentProvider {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  MERCADO_PAGO = 'mercado_pago',
  AZUL = 'azul', // Popular en República Dominicana
  BANRESERVAS = 'banreservas',
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  bookingId: string;
  guestId: string;
  status: PaymentIntentStatus;
  clientSecret?: string;
  gatewayIntentId?: string;
  metadata: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

export enum PaymentIntentStatus {
  CREATED = 'created',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export interface WebhookEvent {
  id: string;
  provider: PaymentProvider;
  eventType: string;
  data: any;
  signature?: string;
  processed: boolean;
  processedAt?: Date;
  createdAt: Date;
  retryCount?: number;
  errors?: string[];
}

// =====================================================
// TIPOS PARA VALORACIÓN Y ANÁLISIS DE MERCADO
// =====================================================

// Enum para tipos de propiedad
export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  VILLA = 'villa',
  STUDIO = 'studio',
  LOFT = 'loft',
  TOWNHOUSE = 'townhouse',
  BUNGALOW = 'bungalow',
  CABIN = 'cabin',
  COTTAGE = 'cottage',
  PENTHOUSE = 'penthouse',
  ROOM = 'room',
  SHARED_ROOM = 'shared_room',
  HOSTEL = 'hostel',
  HOTEL = 'hotel',
  RESORT = 'resort',
  CAMPING = 'camping'
}

// Estadísticas de precios por ubicación
export interface LocationPriceStats {
  id: string;
  locationName: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  averagePrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  pricePerSquareMeter: number;
  totalListings: number;
  occupancyRate: number;
  averageRating: number;
  lastUpdated: Date;
}

// Estadísticas por tipo de propiedad
export interface PropertyTypePriceStats {
  propertyType: PropertyType;
  averagePrice: number;
  medianPrice: number;
  priceRange: {
    min: number;
    max: number;
    quartile25: number;
    quartile75: number;
  };
  averageSize: number;
  totalListings: number;
  popularAmenities: string[];
  seasonalTrends: SeasonalTrend[];
  lastUpdated: Date;
}

// Tendencias estacionales
export interface SeasonalTrend {
  month: number;
  year: number;
  averagePrice: number;
  occupancyRate: number;
  demandLevel: 'low' | 'medium' | 'high' | 'peak';
}

// Datos para gráficas de mercado
export interface MarketChartData {
  period: string; // '2024-01', '2024-Q1', etc.
  averagePrice: number;
  listings: number;
  occupancyRate: number;
  revenue: number;
  bookings: number;
}

// Comparación de propiedades
export interface PropertyComparison {
  id: string;
  targetProperty: PropertyForComparison;
  similarProperties: PropertyForComparison[];
  comparisonMetrics: ComparisonMetrics;
  marketPosition: MarketPosition;
  recommendations: ValuationRecommendation[];
  generatedAt: Date;
}

export interface PropertyForComparison {
  id: string;
  title: string;
  propertyType: PropertyType;
  location: {
    address: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    distanceFromTarget?: number; // en km
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    squareMeters: number;
    maxGuests: number;
  };
  amenities: string[];
  pricing: {
    currentPrice: number;
    averagePrice: number;
    pricePerSquareMeter: number;
  };
  performance: {
    rating: number;
    reviewCount: number;
    occupancyRate: number;
    responseRate: number;
  };
  images: string[];
  lastUpdated: Date;
}

export interface ComparisonMetrics {
  priceCompetitiveness: number; // 0-100 score
  amenityScore: number;
  locationScore: number;
  qualityScore: number;
  overallScore: number;
  priceRecommendation: {
    recommended: number;
    current: number;
    difference: number;
    percentageDifference: number;
  };
}

export interface MarketPosition {
  percentile: number; // 0-100
  category: 'budget' | 'standard' | 'premium' | 'luxury';
  competitorAnalysis: {
    betterPriced: number;
    similarPriced: number;
    overpriced: number;
  };
}

// Valoración automática de propiedades
export interface PropertyValuation {
  id: string;
  propertyData: PropertyValuationInput;
  estimatedValue: ValuationResult;
  confidenceLevel: number; // 0-100
  factors: ValuationFactor[];
  comparableProperties: PropertyForComparison[];
  marketContext: MarketContext;
  generatedAt: Date;
  validUntil: Date;
}

export interface PropertyValuationInput {
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  propertyType: PropertyType;
  specifications: {
    bedrooms: number;
    bathrooms: number;
    squareMeters: number;
    maxGuests: number;
    yearBuilt?: number;
    renovationYear?: number;
  };
  amenities: string[];
  features: {
    hasPool: boolean;
    hasGarden: boolean;
    hasParking: boolean;
    hasAirConditioning: boolean;
    hasHeating: boolean;
    hasWifi: boolean;
    hasKitchen: boolean;
    petFriendly: boolean;
    smokingAllowed: boolean;
  };
  condition: 'excellent' | 'good' | 'fair' | 'needs_renovation';
  images?: string[];
}

export interface ValuationResult {
  recommendedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  pricePerSquareMeter: number;
  monthlyRevenuePotential: {
    conservative: number;
    optimistic: number;
    realistic: number;
  };
  roi: {
    annual: number;
    monthly: number;
  };
}

export interface ValuationFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number; // 0-100
  description: string;
  adjustment: number; // precio en €
}

export interface MarketContext {
  localMarketTrend: 'rising' | 'stable' | 'declining';
  seasonality: 'high' | 'medium' | 'low';
  competitionLevel: 'low' | 'medium' | 'high';
  demandSupplyRatio: number;
  averageMarketPrice: number;
  marketGrowth: number; // % anual
}

export interface ValuationRecommendation {
  type: 'pricing' | 'amenity' | 'marketing' | 'improvement';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  estimatedCost?: number;
  timeframe: string;
}

// Reportes de mercado
export interface MarketReport {
  id: string;
  title: string;
  type: 'location' | 'property_type' | 'comparison' | 'valuation' | 'comprehensive';
  parameters: ReportParameters;
  data: MarketReportData;
  charts: ChartConfiguration[];
  summary: ReportSummary;
  recommendations: ValuationRecommendation[];
  generatedAt: Date;
  generatedBy: string;
  format: 'pdf' | 'csv' | 'excel' | 'json';
}

export interface ReportParameters {
  dateRange: {
    start: Date;
    end: Date;
  };
  locations?: string[];
  propertyTypes?: PropertyType[];
  priceRange?: {
    min: number;
    max: number;
  };
  includeComparisons: boolean;
  includeForecasts: boolean;
  includeRecommendations: boolean;
}

export interface MarketReportData {
  overview: {
    totalProperties: number;
    averagePrice: number;
    totalRevenue: number;
    occupancyRate: number;
  };
  trends: MarketChartData[];
  statistics: {
    byLocation: LocationPriceStats[];
    byPropertyType: PropertyTypePriceStats[];
  };
  comparisons?: PropertyComparison[];
  forecasts?: MarketForecast[];
}

export interface ChartConfiguration {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
  data: any[];
  config: {
    xAxis?: string;
    yAxis?: string;
    groupBy?: string;
    colors?: string[];
    showLegend: boolean;
    showGrid: boolean;
  };
}

export interface ReportSummary {
  keyFindings: string[];
  marketInsights: string[];
  opportunities: string[];
  risks: string[];
  conclusion: string;
}

export interface MarketForecast {
  period: string;
  metric: 'price' | 'demand' | 'supply' | 'occupancy';
  predicted: number;
  confidence: number;
  factors: string[];
}

// DTOs para APIs de valoración
export interface CreateValuationDTO {
  propertyData: PropertyValuationInput;
  includeComparisons: boolean;
  includeRecommendations: boolean;
}

export interface CreateReportDTO {
  title: string;
  type: MarketReport['type'];
  parameters: ReportParameters;
  format: MarketReport['format'];
}

export interface MarketAnalysisDTO {
  location?: {
    city: string;
    radius: number; // km
  };
  propertyType?: PropertyType;
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: ('price' | 'occupancy' | 'revenue' | 'demand')[];
}

// =============================================================================
// TIPOS PARA PERFILES Y RESEÑAS
// =============================================================================

// Tipos de usuario
export enum UserType {
  AGENT = 'agent',
  OWNER = 'owner',
  CLIENT = 'client',
  GUEST = 'guest'
}

// Estado de verificación del perfil
export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

// Tipos de documentos de verificación
export enum DocumentType {
  ID_CARD = 'id_card',
  PASSPORT = 'passport',
  DRIVER_LICENSE = 'driver_license',
  PROFESSIONAL_LICENSE = 'professional_license',
  BUSINESS_REGISTRATION = 'business_registration'
}

// Documento de verificación
export interface VerificationDocument {
  id: string;
  type: DocumentType;
  documentNumber: string;
  expiryDate?: Date;
  fileUrl: string;
  uploadedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  status: VerificationStatus;
}

// Información de contacto
export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Dirección
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Estadísticas del perfil
export interface ProfileStats {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  responseRate: number;
  responseTime: number; // en horas
  joinedDate: Date;
  lastActive: Date;
}

// Preferencias y configuración
export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    showContactInfo: boolean;
    showProperties: boolean;
    showReviews: boolean;
    allowMessages: boolean;
  };
}

// Certificaciones y licencias
export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateNumber: string;
  certificateUrl?: string;
  isVerified: boolean;
}

// Perfil base de usuario
export interface UserProfile {
  id: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  contactInfo: ContactInfo;
  address?: Address;
  verificationStatus: VerificationStatus;
  verificationDocuments: VerificationDocument[];
  stats: ProfileStats;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Perfil de agente inmobiliario
export interface AgentProfile extends UserProfile {
  userType: UserType.AGENT;
  licenseNumber: string;
  agency?: {
    name: string;
    logo?: string;
    website?: string;
    address: Address;
  };
  specializations: string[]; // ej: "residencial", "comercial", "lujo"
  languages: string[];
  certifications: Certification[];
  workingHours: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  commission: {
    type: 'percentage' | 'fixed';
    value: number;
    currency?: string;
  };
}

// Perfil de propietario
export interface OwnerProfile extends UserProfile {
  userType: UserType.OWNER;
  propertyTypes: PropertyType[];
  investmentExperience: 'beginner' | 'intermediate' | 'expert';
  preferredManagement: 'self' | 'agent' | 'company';
  taxId?: string;
  bankingInfo?: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    accountHolder: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
    coverage: number;
  };
}

// Perfil de cliente/huésped
export interface ClientProfile extends UserProfile {
  userType: UserType.CLIENT | UserType.GUEST;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  travelPreferences?: {
    accommodationType: PropertyType[];
    priceRange: {
      min: number;
      max: number;
      currency: string;
    };
    amenities: string[];
    maxGuests: number;
    smokingAllowed: boolean;
    petsAllowed: boolean;
  };
  identityVerification?: {
    documentType: DocumentType;
    documentNumber: string;
    isVerified: boolean;
    verifiedAt?: Date;
  };
}

// =============================================================================
// TIPOS PARA SISTEMA DE RESEÑAS
// =============================================================================

// Tipos de reseñas
export enum ReviewType {
  PROPERTY = 'property',
  AGENT = 'agent',
  OWNER = 'owner',
  GUEST = 'guest',
  EXPERIENCE = 'experience'
}

// Estado de la reseña
export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
  HIDDEN = 'hidden'
}

// Motivos de reporte
export enum ReportReason {
  INAPPROPRIATE_LANGUAGE = 'inappropriate_language',
  FALSE_INFORMATION = 'false_information',
  SPAM = 'spam',
  DISCRIMINATION = 'discrimination',
  HARASSMENT = 'harassment',
  OFF_TOPIC = 'off_topic',
  OTHER = 'other'
}

// Criterios de calificación
export interface RatingCriteria {
  cleanliness: number; // 1-5
  accuracy: number; // 1-5
  communication: number; // 1-5
  location: number; // 1-5
  checkIn: number; // 1-5
  value: number; // 1-5
}

// Reseña base
export interface Review {
  id: string;
  reviewType: ReviewType;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  targetId: string; // ID de la propiedad, agente, etc.
  targetType: ReviewType;
  rating: number; // 1-5 calificación general
  criteria?: RatingCriteria; // calificaciones detalladas
  title?: string;
  comment: string;
  pros?: string[];
  cons?: string[];
  photos?: string[];
  bookingId?: string; // para vincular con reserva específica
  stayDate?: Date; // fecha de la estadía/experiencia
  isAnonymous: boolean;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
  moderatedAt?: Date;
  moderatedBy?: string;
  moderationNotes?: string;
  helpfulVotes: number;
  reportCount: number;
  reports?: ReviewReport[];
}

// Reporte de reseña
export interface ReviewReport {
  id: string;
  reviewId: string;
  reporterId: string;
  reason: ReportReason;
  description?: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'dismissed';
  reviewedBy?: string;
  reviewedAt?: Date;
  action?: 'none' | 'warning' | 'remove' | 'edit';
}

// Respuesta a reseña
export interface ReviewResponse {
  id: string;
  reviewId: string;
  responderId: string;
  responderName: string;
  responderType: UserType;
  response: string;
  createdAt: Date;
  updatedAt: Date;
  isOfficial: boolean; // respuesta oficial del propietario/agente
}

// Estadísticas de reseñas
export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  criteriaAverages?: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  recentReviews: Review[];
  topKeywords: {
    positive: string[];
    negative: string[];
  };
}

// Filtros para reseñas
export interface ReviewFilters {
  rating?: number[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  reviewType?: ReviewType[];
  verified?: boolean;
  withPhotos?: boolean;
  language?: string;
  sortBy?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating' | 'most_helpful';
}

// Configuración de moderación
export interface ModerationSettings {
  autoApprove: boolean;
  requireVerifiedBooking: boolean;
  minimumStayDuration: number; // horas
  profanityFilter: boolean;
  spamDetection: boolean;
  duplicateDetection: boolean;
  reviewCooldown: number; // días entre reseñas del mismo usuario
  allowAnonymous: boolean;
  allowPhotos: boolean;
  maxPhotosPerReview: number;
  moderatorNotifications: boolean;
}

// =============================================================================
// TIPOS PARA MODERACIÓN
// =============================================================================

// Acción de moderación
export interface ModerationAction {
  id: string;
  reviewId: string;
  moderatorId: string;
  moderatorName: string;
  action: 'approve' | 'reject' | 'flag' | 'edit' | 'hide' | 'warn_user';
  reason?: string;
  notes?: string;
  originalContent?: string;
  editedContent?: string;
  createdAt: Date;
  isAutomatic: boolean;
}

// Queue de moderación
export interface ModerationQueue {
  id: string;
  reviewId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  flags: string[];
  assignedTo?: string;
  createdAt: Date;
  resolvedAt?: Date;
  escalated: boolean;
}

// Métricas de moderación
export interface ModerationMetrics {
  totalPending: number;
  totalProcessed: number;
  averageProcessingTime: number; // en horas
  approvalRate: number;
  rejectionRate: number;
  flaggedRate: number;
  moderatorStats: {
    moderatorId: string;
    moderatorName: string;
    processed: number;
    approved: number;
    rejected: number;
    averageTime: number;
  }[];
}

// Configuración de alertas
export interface AlertSettings {
  highVolumeThreshold: number;
  suspiciousPatternDetection: boolean;
  emergencyEscalation: boolean;
  notificationChannels: {
    email: boolean;
    slack: boolean;
    sms: boolean;
  };
  escalationRules: {
    timeThreshold: number; // horas
    reportThreshold: number;
    severityLevel: 'low' | 'medium' | 'high';
  }[];
}

// =============================================================================
// TIPOS PARA ADMINISTRACIÓN Y CMS
// =============================================================================

// Roles de administración
export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  PROPERTY_MANAGER = 'property_manager',
  USER_MANAGER = 'user_manager',
  CONTENT_MANAGER = 'content_manager',
  REPORT_VIEWER = 'report_viewer'
}

// Estado de usuario administrativo
export enum AdminUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_ACTIVATION = 'pending_activation'
}

// Estados de propiedades en el CMS
export enum PropertyPublicationStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived'
}

// Tipos de permisos del sistema
export enum PermissionType {
  // Gestión de usuarios
  USER_VIEW = 'user_view',
  USER_CREATE = 'user_create',
  USER_EDIT = 'user_edit',
  USER_DELETE = 'user_delete',
  USER_SUSPEND = 'user_suspend',
  
  // Gestión de propiedades
  PROPERTY_VIEW = 'property_view',
  PROPERTY_CREATE = 'property_create',
  PROPERTY_EDIT = 'property_edit',
  PROPERTY_DELETE = 'property_delete',
  PROPERTY_APPROVE = 'property_approve',
  PROPERTY_PUBLISH = 'property_publish',
  PROPERTY_SUSPEND = 'property_suspend',
  
  // Gestión de contenido
  CONTENT_VIEW = 'content_view',
  CONTENT_CREATE = 'content_create',
  CONTENT_EDIT = 'content_edit',
  CONTENT_DELETE = 'content_delete',
  CONTENT_PUBLISH = 'content_publish',
  
  // Reportes y análisis
  REPORTS_VIEW = 'reports_view',
  REPORTS_EXPORT = 'reports_export',
  ANALYTICS_VIEW = 'analytics_view',
  
  // Configuración del sistema
  SYSTEM_CONFIG = 'system_config',
  ROLE_MANAGE = 'role_manage',
  PERMISSION_MANAGE = 'permission_manage',
  
  // Moderación
  MODERATION_VIEW = 'moderation_view',
  MODERATION_ACTION = 'moderation_action',
  
  // Logs y auditoría
  AUDIT_VIEW = 'audit_view',
  LOGS_VIEW = 'logs_view'
}

// Tipos de actividad del sistema
export enum ActivityType {
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_CREATED = 'user_created',
  USER_UPDATED = 'user_updated',
  USER_DELETED = 'user_deleted',
  USER_SUSPENDED = 'user_suspended',
  
  PROPERTY_CREATED = 'property_created',
  PROPERTY_UPDATED = 'property_updated',
  PROPERTY_DELETED = 'property_deleted',
  PROPERTY_APPROVED = 'property_approved',
  PROPERTY_REJECTED = 'property_rejected',
  PROPERTY_PUBLISHED = 'property_published',
  PROPERTY_SUSPENDED = 'property_suspended',
  
  REVIEW_CREATED = 'review_created',
  REVIEW_MODERATED = 'review_moderated',
  REVIEW_DELETED = 'review_deleted',
  
  BOOKING_CREATED = 'booking_created',
  BOOKING_CANCELLED = 'booking_cancelled',
  BOOKING_CONFIRMED = 'booking_confirmed',
  
  SYSTEM_CONFIG_CHANGED = 'system_config_changed',
  ROLE_ASSIGNED = 'role_assigned',
  PERMISSION_GRANTED = 'permission_granted',
  
  DATA_EXPORTED = 'data_exported',
  REPORT_GENERATED = 'report_generated'
}

// Niveles de severidad para logs
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Permiso individual
export interface Permission {
  id: string;
  type: PermissionType;
  name: string;
  description: string;
  resource?: string; // recurso específico al que aplica
  scope?: 'global' | 'own' | 'department'; // alcance del permiso
  createdAt: Date;
  updatedAt: Date;
}

// Rol administrativo
export interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: number; // nivel jerárquico (1 = más alto)
  permissions: Permission[];
  isSystemRole: boolean; // roles del sistema no se pueden eliminar
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Usuario administrativo
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roles: Role[];
  status: AdminUserStatus;
  lastLogin?: Date;
  loginCount: number;
  preferences: {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
    notificationsEnabled: boolean;
    emailNotifications: boolean;
  };
  department?: string;
  position?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  suspendedAt?: Date;
  suspendedBy?: string;
  suspensionReason?: string;
}

// Sesión administrativa
export interface AdminSession {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  startTime: Date;
  lastActivity: Date;
  isActive: boolean;
  permissions: PermissionType[];
  expiresAt: Date;
}

// Gestión de propiedades en CMS
export interface PropertyManagement {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  status: PropertyPublicationStatus;
  publishedAt?: Date;
  unpublishedAt?: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewNotes?: string;
  rejectionReason?: string;
  views: number;
  inquiries: number;
  bookings: number;
  revenue: number;
  rating: number;
  reviewCount: number;
  featuredUntil?: Date;
  priority: number;
  tags: string[];
  categories: string[];
  location: {
    country: string;
    state: string;
    city: string;
    neighborhood?: string;
  };
  pricing: {
    basePrice: number;
    currency: string;
    priceType: 'per_night' | 'per_month' | 'per_year';
  };
  createdAt: Date;
  updatedAt: Date;
  lastModifiedBy: string;
}

// Log de actividad del sistema
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  activityType: ActivityType;
  description: string;
  resourceType?: string; // 'user', 'property', 'booking', etc.
  resourceId?: string;
  resourceName?: string;
  metadata?: Record<string, unknown>; // datos adicionales
  ipAddress: string;
  userAgent: string;
  sessionId?: string;
  level: LogLevel;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
  duration?: number; // tiempo en ms
}

// Métricas de la plataforma
export interface PlatformMetrics {
  timestamp: Date;
  
  // Métricas de usuarios
  users: {
    total: number;
    active: number;
    new: number;
    suspended: number;
    byType: Record<UserType, number>;
    byCountry: Record<string, number>;
  };
  
  // Métricas de propiedades
  properties: {
    total: number;
    published: number;
    pending: number;
    draft: number;
    byType: Record<PropertyType, number>;
    byLocation: Record<string, number>;
    averagePrice: number;
    totalValue: number;
  };
  
  // Métricas de reservas
  bookings: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    totalRevenue: number;
    averageValue: number;
    occupancyRate: number;
  };
  
  // Métricas de reseñas
  reviews: {
    total: number;
    pending: number;
    approved: number;
    averageRating: number;
    byRating: Record<number, number>;
  };
  
  // Métricas de tráfico
  traffic: {
    pageViews: number;
    uniqueVisitors: number;
    sessions: number;
    averageSessionDuration: number;
    bounceRate: number;
    topPages: Array<{ page: string; views: number }>;
  };
  
  // Métricas financieras
  financial: {
    totalRevenue: number;
    commissions: number;
    refunds: number;
    pendingPayments: number;
    monthlyRecurring: number;
  };
}

// Configuración del sistema
export interface SystemConfiguration {
  id: string;
  category: string;
  key: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'json' | 'array';
  description: string;
  isPublic: boolean; // si se puede acceder desde el frontend
  isEditable: boolean; // si se puede modificar desde el CMS
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    options?: string[];
  };
  updatedAt: Date;
  updatedBy: string;
}

// Notificación administrativa
export interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  recipientRole?: AdminRole;
  recipientUser?: string;
  isRead: boolean;
  isGlobal: boolean; // notificación para todos los admins
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expiresAt?: Date;
  createdAt: Date;
  readAt?: Date;
  metadata?: Record<string, unknown>;
}

// Reporte del sistema
export interface SystemReport {
  id: string;
  name: string;
  description: string;
  type: 'users' | 'properties' | 'bookings' | 'financial' | 'activity' | 'custom';
  parameters: Record<string, unknown>;
  filters: Record<string, unknown>;
  dateRange: {
    start: Date;
    end: Date;
  };
  generatedBy: string;
  generatedAt: Date;
  format: 'json' | 'csv' | 'xlsx' | 'pdf';
  status: 'generating' | 'completed' | 'failed';
  fileUrl?: string;
  fileSize?: number;
  recordCount?: number;
  executionTime?: number;
  error?: string;
  scheduledRun?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    nextRun: Date;
    isActive: boolean;
  };
}

// Dashboard widget
export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'map';
  title: string;
  description?: string;
  size: 'small' | 'medium' | 'large' | 'full';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: Record<string, unknown>;
  dataSource: string;
  refreshInterval?: number; // segundos
  permissions: PermissionType[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Configuración del dashboard
export interface DashboardConfig {
  id: string;
  name: string;
  isDefault: boolean;
  userId?: string; // si es personal
  role?: AdminRole; // si es para un rol específico
  widgets: DashboardWidget[];
  layout: 'grid' | 'flexible';
  theme: 'light' | 'dark';
  autoRefresh: boolean;
  refreshInterval: number;
  createdAt: Date;
  updatedAt: Date;
}

// Backup del sistema
export interface SystemBackup {
  id: string;
  name: string;
  description?: string;
  type: 'full' | 'incremental' | 'database' | 'files';
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  size?: number;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  fileCount?: number;
  location: string;
  checksum?: string;
  isEncrypted: boolean;
  isCompressed: boolean;
  retention: number; // días
  createdBy: string;
  error?: string;
  restorePoints?: Array<{
    id: string;
    timestamp: Date;
    description: string;
  }>;
}