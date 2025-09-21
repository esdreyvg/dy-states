// Rental Management API Services for DY States
// Servicios API para gestión de alquileres en República Dominicana

import {
  Rental,
  RentalStatus,
  Booking,
  BookingStatus,
  RentalMessage,
  RentalNotification,
  Conversation,
  RentalCalendar,
  CalendarDay,
  PaymentIntent,
  PaymentTransaction,
  BookingSearchParams,
  BookingSearchResult,
  CreateRentalDTO,
  UpdateRentalDTO,
  CreateBookingDTO,
  PricingBreakdown,
  SendMessageDTO,
  CreateNotificationDTO,
  BookingPricing,
  PaymentProvider,
  NotificationStatus,
  NotificationChannel,
  NotificationType,
} from '../../../shared/src/types/rental';

import { rentalSchemas } from '../../../shared/src/schemas/rental';

// Tipos auxiliares para API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type SortOrder = 'asc' | 'desc';

// Configuración base para las APIs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_VERSION = 'v1';

/**
 * Clase base para servicios API con funcionalidades comunes
 */
abstract class BaseApiService {
  protected baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = `${API_BASE_URL}/${API_VERSION}/${endpoint}`;
  }

  protected async fetchApi<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': 'es-DO',
    };

    // Agregar token de autenticación si está disponible
    const token = this.getAuthToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          `Error HTTP: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || 
             sessionStorage.getItem('auth_token');
    }
    return null;
  }

  protected buildQueryParams(params: Record<string, unknown>): string {
    const cleanParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value.join(',');
        } else if (value instanceof Date) {
          acc[key] = value.toISOString();
        } else {
          acc[key] = value!.toString();
        }
        return acc;
      }, {} as Record<string, string>);

    const urlParams = new URLSearchParams(cleanParams);
    return urlParams.toString();
  }
}

/**
 * Servicio para gestión de alquileres
 */
class RentalAPI extends BaseApiService {
  constructor() {
    super('rentals');
  }

  async createRental(data: CreateRentalDTO): Promise<ApiResponse<Rental>> {
    const validatedData = rentalSchemas.createRental.parse(data);
    return this.fetchApi<Rental>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });
  }

  async getRentalById(id: string): Promise<ApiResponse<Rental>> {
    return this.fetchApi<Rental>(`${this.baseUrl}/${id}`);
  }

  async updateRental(id: string, data: UpdateRentalDTO): Promise<ApiResponse<Rental>> {
    const validatedData = rentalSchemas.updateRental.parse(data);
    return this.fetchApi<Rental>(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(validatedData),
    });
  }

  async updateRentalStatus(id: string, status: RentalStatus): Promise<ApiResponse<Rental>> {
    return this.fetchApi<Rental>(`${this.baseUrl}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteRental(id: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserRentals(
    userId: string,
    params: {
      status?: RentalStatus;
      page?: number;
      limit?: number;
      sortBy?: 'createdAt' | 'updatedAt' | 'title';
      sortOrder?: SortOrder;
    } = {}
  ): Promise<ApiResponse<{
    rentals: Rental[];
    pagination: PaginationParams;
  }>> {
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi<{
      rentals: Rental[];
      pagination: PaginationParams;
    }>(`${this.baseUrl}/user/${userId}?${queryParams}`);
  }

  async getRentalStats(
    id: string,
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<ApiResponse<{
    revenue: number;
    bookings: number;
    occupancyRate: number;
    averageRating: number;
    responseRate: number;
    revenueByMonth: Array<{ month: string; revenue: number; bookings: number }>;
  }>> {
    const queryParams = dateRange ? this.buildQueryParams(dateRange) : '';
    return this.fetchApi(`${this.baseUrl}/${id}/stats?${queryParams}`);
  }

  async syncExternalCalendar(
    id: string,
    provider: string,
    calendarUrl: string
  ): Promise<ApiResponse<{ success: boolean; syncedDates: number }>> {
    return this.fetchApi(`${this.baseUrl}/${id}/sync-calendar`, {
      method: 'POST',
      body: JSON.stringify({ provider, calendarUrl }),
    });
  }
}

/**
 * Servicio para gestión de reservas
 */
class BookingAPI extends BaseApiService {
  constructor() {
    super('bookings');
  }

  async searchRentals(params: BookingSearchParams): Promise<ApiResponse<BookingSearchResult>> {
    const validatedParams = rentalSchemas.bookingSearchParams.parse(params);
    const queryParams = this.buildQueryParams(validatedParams);
    return this.fetchApi<BookingSearchResult>(`${this.baseUrl}/search?${queryParams}`);
  }

  async getAvailability(
    rentalId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<{
    isAvailable: boolean;
    availableDates: Date[];
    blockedDates: Date[];
    pricing: BookingPricing;
  }>> {
    const queryParams = this.buildQueryParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    return this.fetchApi(`${this.baseUrl}/availability/${rentalId}?${queryParams}`);
  }

  async calculateBookingPrice(
    rentalId: string,
    checkInDate: Date,
    checkOutDate: Date,
    guests: number,
    promoCode?: string
  ): Promise<ApiResponse<BookingPricing>> {
    const params = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      guests,
      promoCode,
    };
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi<BookingPricing>(`${this.baseUrl}/calculate-price/${rentalId}?${queryParams}`);
  }

  async calculatePricing(
    rentalId: string,
    params: {
      startDate: Date;
      endDate: Date;
      numberOfGuests: number;
    }
  ): Promise<ApiResponse<PricingBreakdown>> {
    const queryParams = this.buildQueryParams({
      startDate: params.startDate.toISOString(),
      endDate: params.endDate.toISOString(),
      numberOfGuests: params.numberOfGuests,
    });
    return this.fetchApi<PricingBreakdown>(`${this.baseUrl}/pricing/${rentalId}?${queryParams}`);
  }

  async createBooking(data: CreateBookingDTO): Promise<ApiResponse<Booking>> {
    const validatedData = rentalSchemas.createBooking.parse(data);
    return this.fetchApi<Booking>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });
  }

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>(`${this.baseUrl}/${id}`);
  }

  async getUserBookings(
    userId: string,
    params: {
      status?: BookingStatus;
      type?: 'guest' | 'host';
      page?: number;
      limit?: number;
      sortBy?: 'checkInDate' | 'createdAt' | 'status';
      sortOrder?: SortOrder;
    } = {}
  ): Promise<ApiResponse<{
    bookings: Booking[];
    pagination: PaginationParams;
  }>> {
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi(`${this.baseUrl}/user/${userId}?${queryParams}`);
  }

  async confirmBooking(id: string): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>(`${this.baseUrl}/${id}/confirm`, {
      method: 'POST',
    });
  }

  async cancelBooking(
    id: string,
    reason: string,
    cancelledBy: string
  ): Promise<ApiResponse<{
    booking: Booking;
    refundAmount: number;
    penalty: number;
  }>> {
    return this.fetchApi(`${this.baseUrl}/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason, cancelledBy }),
    });
  }

  async checkIn(
    id: string,
    checkInData: {
      actualCheckInTime?: Date;
      guestNotes?: string;
      photos?: string[];
    } = {}
  ): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>(`${this.baseUrl}/${id}/check-in`, {
      method: 'POST',
      body: JSON.stringify(checkInData),
    });
  }

  async checkOut(
    id: string,
    checkOutData: {
      actualCheckOutTime?: Date;
      hostNotes?: string;
      propertyCondition?: string;
      photos?: string[];
    } = {}
  ): Promise<ApiResponse<Booking>> {
    return this.fetchApi<Booking>(`${this.baseUrl}/${id}/check-out`, {
      method: 'POST',
      body: JSON.stringify(checkOutData),
    });
  }

  async modifyBookingDates(
    id: string,
    newCheckInDate: Date,
    newCheckOutDate: Date
  ): Promise<ApiResponse<{
    booking: Booking;
    priceDifference: number;
    requiresHostApproval: boolean;
  }>> {
    return this.fetchApi(`${this.baseUrl}/${id}/modify-dates`, {
      method: 'POST',
      body: JSON.stringify({
        newCheckInDate: newCheckInDate.toISOString(),
        newCheckOutDate: newCheckOutDate.toISOString(),
      }),
    });
  }
}

/**
 * Servicio para gestión de calendario
 */
class CalendarAPI extends BaseApiService {
  constructor() {
    super('calendar');
  }

  async getRentalCalendar(
    rentalId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ApiResponse<RentalCalendar>> {
    const queryParams = this.buildQueryParams({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    return this.fetchApi<RentalCalendar>(`${this.baseUrl}/${rentalId}?${queryParams}`);
  }

  async updateCalendarAvailability(
    rentalId: string,
    updates: Omit<CalendarDay, 'bookingId'>[]
  ): Promise<ApiResponse<RentalCalendar>> {
    const validatedUpdates = rentalSchemas.updateCalendar.parse({
      rentalId,
      updates,
    });
    return this.fetchApi<RentalCalendar>(`${this.baseUrl}/${rentalId}`, {
      method: 'PATCH',
      body: JSON.stringify(validatedUpdates),
    });
  }

  async blockDates(
    rentalId: string,
    dates: Date[],
    reason: string
  ): Promise<ApiResponse<RentalCalendar>> {
    return this.fetchApi<RentalCalendar>(`${this.baseUrl}/${rentalId}/block`, {
      method: 'POST',
      body: JSON.stringify({
        dates: dates.map(d => d.toISOString()),
        reason,
      }),
    });
  }

  async unblockDates(
    rentalId: string,
    dates: Date[]
  ): Promise<ApiResponse<RentalCalendar>> {
    return this.fetchApi<RentalCalendar>(`${this.baseUrl}/${rentalId}/unblock`, {
      method: 'POST',
      body: JSON.stringify({
        dates: dates.map(d => d.toISOString()),
      }),
    });
  }

  async updatePricing(
    rentalId: string,
    pricingUpdates: Array<{
      date: Date;
      price: number;
      minimumStay?: number;
    }>
  ): Promise<ApiResponse<RentalCalendar>> {
    return this.fetchApi<RentalCalendar>(`${this.baseUrl}/${rentalId}/pricing`, {
      method: 'PATCH',
      body: JSON.stringify({
        updates: pricingUpdates.map(update => ({
          ...update,
          date: update.date.toISOString(),
        })),
      }),
    });
  }

  async getOccupancySummary(
    rentalId: string,
    year: number,
    month?: number
  ): Promise<ApiResponse<{
    totalDays: number;
    bookedDays: number;
    blockedDays: number;
    availableDays: number;
    occupancyRate: number;
    revenue: number;
    averageDailyRate: number;
  }>> {
    const queryParams = this.buildQueryParams({ year, month });
    return this.fetchApi(`${this.baseUrl}/${rentalId}/occupancy?${queryParams}`);
  }
}

/**
 * Servicio para mensajería
 */
class MessagingAPI extends BaseApiService {
  constructor() {
    super('messages');
  }

  async getUserConversations(
    userId: string,
    params: {
      status?: 'active' | 'archived';
      hasUnread?: boolean;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<{
    conversations: Conversation[];
    pagination: PaginationParams;
  }>> {
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi(`${this.baseUrl}/conversations/user/${userId}?${queryParams}`);
  }

  async getConversationById(id: string): Promise<ApiResponse<Conversation>> {
    return this.fetchApi<Conversation>(`${this.baseUrl}/conversations/${id}`);
  }

  async getConversationMessages(
    conversationId: string,
    params: {
      page?: number;
      limit?: number;
      before?: Date;
      after?: Date;
    } = {}
  ): Promise<ApiResponse<{
    messages: RentalMessage[];
    pagination: PaginationParams;
  }>> {
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi(`${this.baseUrl}/conversations/${conversationId}/messages?${queryParams}`);
  }

  async sendMessage(data: SendMessageDTO): Promise<ApiResponse<RentalMessage>> {
    const validatedData = rentalSchemas.sendMessage.parse(data);
    return this.fetchApi<RentalMessage>(`${this.baseUrl}/send`, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });
  }

  async markMessagesAsRead(
    conversationId: string,
    messageIds: string[]
  ): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/conversations/${conversationId}/read`, {
      method: 'POST',
      body: JSON.stringify({ messageIds }),
    });
  }

  async archiveConversation(conversationId: string): Promise<ApiResponse<Conversation>> {
    return this.fetchApi<Conversation>(`${this.baseUrl}/conversations/${conversationId}/archive`, {
      method: 'POST',
    });
  }

  async translateMessage(
    messageId: string,
    targetLanguage: string = 'es'
  ): Promise<ApiResponse<{
    originalText: string;
    translatedText: string;
    sourceLanguage: string;
    confidence: number;
  }>> {
    return this.fetchApi(`${this.baseUrl}/${messageId}/translate`, {
      method: 'POST',
      body: JSON.stringify({ targetLanguage }),
    });
  }

  async getMessageTemplates(
    type: 'check_in' | 'check_out' | 'welcome' | 'reminder' | 'custom'
  ): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    content: string;
    variables: string[];
    isActive: boolean;
  }>>> {
    return this.fetchApi(`${this.baseUrl}/templates?type=${type}`);
  }
}

/**
 * Servicio para notificaciones
 */
class NotificationAPI extends BaseApiService {
  constructor() {
    super('notifications');
  }

  async getUserNotifications(
    userId: string,
    params: {
      type?: NotificationType;
      status?: NotificationStatus;
      unreadOnly?: boolean;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<ApiResponse<{
    notifications: RentalNotification[];
    pagination: PaginationParams;
    unreadCount: number;
  }>> {
    const queryParams = this.buildQueryParams(params);
    return this.fetchApi(`${this.baseUrl}/user/${userId}?${queryParams}`);
  }

  async createNotification(data: CreateNotificationDTO): Promise<ApiResponse<RentalNotification>> {
    const validatedData = rentalSchemas.createNotification.parse(data);
    return this.fetchApi<RentalNotification>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });
  }

  async markAsRead(notificationId: string): Promise<ApiResponse<RentalNotification>> {
    return this.fetchApi<RentalNotification>(`${this.baseUrl}/${notificationId}/read`, {
      method: 'POST',
    });
  }

  async markAllAsRead(userId: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/user/${userId}/read-all`, {
      method: 'POST',
    });
  }

  async deleteNotification(notificationId: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/${notificationId}`, {
      method: 'DELETE',
    });
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: {
      emailNotifications?: boolean;
      smsNotifications?: boolean;
      pushNotifications?: boolean;
      channels?: NotificationChannel[];
      types?: NotificationType[];
    }
  ): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/user/${userId}/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  }

  async registerPushSubscription(
    userId: string,
    subscription: {
      endpoint: string;
      keys: {
        p256dh: string;
        auth: string;
      };
    }
  ): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/user/${userId}/push-subscription`, {
      method: 'POST',
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      }),
    });
  }

  async sendTestNotification(
    userId: string,
    channel: NotificationChannel
  ): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`${this.baseUrl}/test`, {
      method: 'POST',
      body: JSON.stringify({ userId, channel }),
    });
  }
}

/**
 * Servicio para pagos
 */
class PaymentAPI extends BaseApiService {
  constructor() {
    super('payments');
  }

  async createPaymentIntent(data: {
    amount: number;
    currency: 'DOP' | 'USD';
    bookingId: string;
    guestId: string;
    metadata?: Record<string, string>;
  }): Promise<ApiResponse<PaymentIntent>> {
    const validatedData = rentalSchemas.createPaymentIntent.parse(data);
    return this.fetchApi<PaymentIntent>(`${this.baseUrl}/intents`, {
      method: 'POST',
      body: JSON.stringify(validatedData),
    });
  }

  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<ApiResponse<{
    paymentIntent: PaymentIntent;
    transaction: PaymentTransaction;
  }>> {
    return this.fetchApi(`${this.baseUrl}/intents/${paymentIntentId}/confirm`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethodId }),
    });
  }

  async getBookingTransactions(bookingId: string): Promise<ApiResponse<PaymentTransaction[]>> {
    return this.fetchApi<PaymentTransaction[]>(`${this.baseUrl}/transactions/booking/${bookingId}`);
  }

  async processRefund(
    transactionId: string,
    amount: number,
    reason: string
  ): Promise<ApiResponse<PaymentTransaction>> {
    return this.fetchApi<PaymentTransaction>(`${this.baseUrl}/transactions/${transactionId}/refund`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
  }

  async getAvailablePaymentMethods(): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    type: string;
    isActive: boolean;
    supportedCurrencies: string[];
    processingFee: number;
  }>>> {
    return this.fetchApi(`${this.baseUrl}/methods`);
  }

  async getPaymentGatewayConfig(provider: PaymentProvider): Promise<ApiResponse<{
    publicKey: string;
    supportedMethods: string[];
    currency: string;
    isTestMode: boolean;
  }>> {
    return this.fetchApi(`${this.baseUrl}/gateway-config/${provider}`);
  }

  async validateWebhook(
    provider: PaymentProvider,
    signature: string,
    payload: Record<string, unknown>
  ): Promise<ApiResponse<{
    isValid: boolean;
    eventType: string;
    paymentIntentId?: string;
  }>> {
    return this.fetchApi(`${this.baseUrl}/webhook/validate`, {
      method: 'POST',
      body: JSON.stringify({ provider, signature, payload }),
    });
  }
}

// Crear y exportar instancias de servicios
export const rentalService = new RentalAPI();
export const bookingService = new BookingAPI();
export const calendarService = new CalendarAPI();
export const messagingService = new MessagingAPI();
export const notificationService = new NotificationAPI();
export const paymentService = new PaymentAPI();

// Exportar tipos de servicios
export type RentalService = RentalAPI;
export type BookingService = BookingAPI;
export type CalendarService = CalendarAPI;
export type MessagingService = MessagingAPI;
export type NotificationService = NotificationAPI;
export type PaymentService = PaymentAPI;

// Utilidades de formateo y cálculo
export const RentalUtils = {
  /**
   * Formatear precio según la moneda dominicana
   */
  formatPrice(amount: number, currency: 'DOP' | 'USD'): string {
    const locale = currency === 'DOP' ? 'es-DO' : 'en-US';
    const currencyCode = currency === 'DOP' ? 'DOP' : 'USD';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  /**
   * Calcular número de noches entre fechas
   */
  calculateNights(checkInDate: Date, checkOutDate: Date): number {
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  },

  /**
   * Verificar si las fechas están disponibles en el calendario
   */
  isDateRangeAvailable(
    calendar: CalendarDay[],
    checkInDate: Date,
    checkOutDate: Date
  ): boolean {
    const dateRange = this.getDateRange(checkInDate, checkOutDate);
    
    return dateRange.every(date => {
      const calendarDay = calendar.find(day => 
        day.date.toDateString() === date.toDateString()
      );
      
      return calendarDay?.isAvailable && !calendarDay.isBlocked;
    });
  },

  /**
   * Generar rango de fechas entre dos fechas
   */
  getDateRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  },

  /**
   * Generar enlace de WhatsApp para contacto directo
   */
  generateWhatsAppLink(
    phoneNumber: string,
    rentalTitle: string,
    checkInDate?: Date,
    checkOutDate?: Date
  ): string {
    let message = `Hola! Estoy interesado en el alquiler: ${rentalTitle}`;
    
    if (checkInDate && checkOutDate) {
      const checkIn = checkInDate.toLocaleDateString('es-DO');
      const checkOut = checkOutDate.toLocaleDateString('es-DO');
      message += ` para las fechas ${checkIn} - ${checkOut}`;
    }
    
    message += '. ¿Está disponible?';
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;
  },

  /**
   * Formatear fecha en español dominicano
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Santo_Domingo',
    });
  },

  /**
   * Calcular precio total de reserva
   */
  calculateTotalPrice(
    basePrice: number,
    nights: number,
    fees: Array<{ amount: number }> = [],
    discounts: Array<{ amount: number }> = []
  ): number {
    const subtotal = basePrice * nights;
    const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalDiscounts = discounts.reduce((sum, discount) => sum + discount.amount, 0);
    
    return subtotal + totalFees - totalDiscounts;
  },

  /**
   * Validar número de teléfono dominicano
   */
  validateDominicanPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    // Formato: 809/829/849 + 7 dígitos
    return /^(809|829|849)\d{7}$/.test(cleanPhone);
  },

  /**
   * Generar código de confirmación de reserva
   */
  generateBookingCode(bookingId: string): string {
    const prefix = 'DY';
    const shortId = bookingId.slice(-8).toUpperCase();
    return `${prefix}${shortId}`;
  },
};