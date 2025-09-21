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

  // Métodos helper para HTTP
  protected async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${this.buildQueryParams(params)}` : '';
    return this.fetchApi<T>(`${this.baseUrl}${endpoint}${queryString}`);
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });
  }

  // Método auxiliar para requests con FormData
  protected async request<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Para FormData, no agregamos Content-Type - el navegador lo establecerá automáticamente
    const defaultHeaders: Record<string, string> = {
      'Accept': 'application/json',
      'Accept-Language': 'es-DO',
    };

    // Agregar token de autenticación si está disponible
    const token = this.getAuthToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Si no es FormData, agregar Content-Type
    if (!(options.body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json';
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

// =====================================================
// SERVICIOS PARA VALORACIÓN Y ANÁLISIS DE MERCADO
// =====================================================

/**
 * Servicio para análisis de estadísticas de mercado
 */
class MarketAnalysisAPI extends BaseApiService {
  constructor() {
    super('/api/market-analysis');
  }

  /**
   * Obtener estadísticas de precios por ubicación
   */
  async getLocationStats(params: {
    city?: string;
    state?: string;
    country?: string;
    radius?: number;
    coordinates?: { latitude: number; longitude: number };
  }): Promise<ApiResponse<LocationPriceStats[]>> {
    return this.get('/locations/stats', params);
  }

  /**
   * Obtener estadísticas por tipo de propiedad
   */
  async getPropertyTypeStats(params: {
    propertyType?: PropertyType;
    location?: string;
    dateRange?: { start: Date; end: Date };
  }): Promise<ApiResponse<PropertyTypePriceStats[]>> {
    return this.get('/property-types/stats', params);
  }

  /**
   * Obtener datos para gráficas de mercado
   */
  async getMarketChartData(params: {
    location?: string;
    propertyType?: PropertyType;
    dateRange: { start: Date; end: Date };
    groupBy: 'month' | 'quarter' | 'year';
    metrics: ('price' | 'occupancy' | 'revenue' | 'demand')[];
  }): Promise<ApiResponse<MarketChartData[]>> {
    return this.get('/chart-data', params);
  }

  /**
   * Obtener tendencias estacionales
   */
  async getSeasonalTrends(params: {
    location?: string;
    propertyType?: PropertyType;
    years?: number[];
  }): Promise<ApiResponse<SeasonalTrend[]>> {
    return this.get('/seasonal-trends', params);
  }

  /**
   * Análisis de mercado personalizado
   */
  async performMarketAnalysis(data: MarketAnalysisDTO): Promise<ApiResponse<{
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
    insights: string[];
  }>> {
    return this.post('/analyze', data);
  }
}

/**
 * Servicio para valoración automática de propiedades
 */
class PropertyValuationAPI extends BaseApiService {
  constructor() {
    super('/api/valuations');
  }

  /**
   * Crear nueva valoración de propiedad
   */
  async createValuation(data: CreateValuationDTO): Promise<ApiResponse<PropertyValuation>> {
    return this.post('/', data);
  }

  /**
   * Obtener valoración por ID
   */
  async getValuation(id: string): Promise<ApiResponse<PropertyValuation>> {
    return this.get(`/${id}`);
  }

  /**
   * Obtener valoraciones del usuario
   */
  async getUserValuations(params: {
    userId?: string;
    page?: number;
    limit?: number;
    sortBy?: 'date' | 'confidence' | 'price';
    order?: 'asc' | 'desc';
  }): Promise<ApiResponse<{
    valuations: PropertyValuation[];
    total: number;
    pages: number;
  }>> {
    return this.get('/', params);
  }

  /**
   * Actualizar valoración existente
   */
  async updateValuation(id: string, data: Partial<CreateValuationDTO>): Promise<ApiResponse<PropertyValuation>> {
    return this.put(`/${id}`, data);
  }

  /**
   * Eliminar valoración
   */
  async deleteValuation(id: string): Promise<ApiResponse<void>> {
    return this.delete(`/${id}`);
  }

  /**
   * Obtener estimación rápida de precio
   */
  async getQuickEstimate(data: {
    location: { city: string; state: string };
    propertyType: PropertyType;
    specifications: {
      bedrooms: number;
      bathrooms: number;
      squareMeters: number;
    };
  }): Promise<ApiResponse<{
    estimatedPrice: number;
    priceRange: { min: number; max: number };
    confidence: number;
  }>> {
    return this.post('/quick-estimate', data);
  }
}

/**
 * Servicio para comparación de propiedades
 */
class PropertyComparisonAPI extends BaseApiService {
  constructor() {
    super('/api/comparisons');
  }

  /**
   * Crear comparación de propiedades
   */
  async createComparison(data: {
    targetPropertyId?: string;
    targetPropertyData?: PropertyValuationInput;
    filters: ComparablePropertiesFilterInput;
  }): Promise<ApiResponse<PropertyComparison>> {
    return this.post('/', data);
  }

  /**
   * Buscar propiedades similares
   */
  async findSimilarProperties(filters: ComparablePropertiesFilterInput): Promise<ApiResponse<PropertyForComparison[]>> {
    return this.get('/similar', filters);
  }

  /**
   * Obtener comparación por ID
   */
  async getComparison(id: string): Promise<ApiResponse<PropertyComparison>> {
    return this.get(`/${id}`);
  }

  /**
   * Calcular métricas de comparación
   */
  async calculateMetrics(data: {
    targetProperty: PropertyForComparison;
    comparableProperties: PropertyForComparison[];
  }): Promise<ApiResponse<ComparisonMetrics>> {
    return this.post('/metrics', data);
  }

  /**
   * Obtener recomendaciones de precios
   */
  async getPriceRecommendations(propertyId: string): Promise<ApiResponse<{
    currentPrice: number;
    recommendedPrice: number;
    reasoning: string[];
    competitorAnalysis: {
      betterPriced: number;
      similarPriced: number;
      overpriced: number;
    };
  }>> {
    return this.get(`/price-recommendations/${propertyId}`);
  }
}

/**
 * Servicio para generación de reportes
 */
class MarketReportAPI extends BaseApiService {
  constructor() {
    super('/api/reports');
  }

  /**
   * Crear nuevo reporte
   */
  async createReport(data: CreateReportDTO): Promise<ApiResponse<{
    reportId: string;
    status: 'pending' | 'processing';
    estimatedCompletion: Date;
  }>> {
    return this.post('/', data);
  }

  /**
   * Obtener reporte por ID
   */
  async getReport(id: string): Promise<ApiResponse<MarketReport>> {
    return this.get(`/${id}`);
  }

  /**
   * Obtener estado de generación del reporte
   */
  async getReportStatus(id: string): Promise<ApiResponse<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    errorMessage?: string;
  }>> {
    return this.get(`/${id}/status`);
  }

  /**
   * Listar reportes del usuario
   */
  async getUserReports(params: {
    userId?: string;
    type?: MarketReport['type'];
    status?: 'pending' | 'processing' | 'completed' | 'failed';
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{
    reports: Omit<MarketReport, 'data'>[];
    total: number;
    pages: number;
  }>> {
    return this.get('/', params);
  }

  /**
   * Descargar reporte en formato específico
   */
  async downloadReport(id: string, format: 'pdf' | 'csv' | 'excel'): Promise<ApiResponse<{
    downloadUrl: string;
    expiresAt: Date;
  }>> {
    return this.get(`/${id}/download`, { format });
  }

  /**
   * Eliminar reporte
   */
  async deleteReport(id: string): Promise<ApiResponse<void>> {
    return this.delete(`/${id}`);
  }

  /**
   * Generar reporte de comparación instantáneo
   */
  async generateInstantComparison(data: {
    properties: string[];
    metrics: string[];
  }): Promise<ApiResponse<{
    reportData: {
      comparisons: PropertyComparison[];
      summary: string[];
    };
    charts: ChartConfiguration[];
  }>> {
    return this.post('/instant-comparison', data);
  }

  /**
   * Programar reporte recurrente
   */
  async scheduleRecurringReport(data: {
    reportTemplate: CreateReportDTO;
    frequency: 'weekly' | 'monthly' | 'quarterly';
    nextRun: Date;
    recipients: string[];
  }): Promise<ApiResponse<{
    scheduleId: string;
    nextRun: Date;
  }>> {
    return this.post('/schedule', data);
  }
}

/**
 * Servicio para gestión de gráficas y visualizaciones
 */
class ChartVisualizationAPI extends BaseApiService {
  constructor() {
    super('/api/charts');
  }

  /**
   * Generar configuración de gráfica
   */
  async generateChartConfig(data: {
    type: ChartConfiguration['type'];
    data: ChartDataPoint[];
    options: {
      title: string;
      xAxis?: string;
      yAxis?: string;
      groupBy?: string;
      colors?: string[];
    };
  }): Promise<ApiResponse<ChartConfiguration>> {
    return this.post('/generate-config', data);
  }

  /**
   * Obtener datos para gráfica de precios
   */
  async getPriceChartData(params: {
    location?: string;
    propertyType?: PropertyType;
    dateRange: { start: Date; end: Date };
    interval: 'daily' | 'weekly' | 'monthly';
  }): Promise<ApiResponse<PriceChartDataPoint[]>> {
    return this.get('/price-data', params);
  }

  /**
   * Obtener datos para gráfica de ocupación
   */
  async getOccupancyChartData(params: {
    location?: string;
    propertyType?: PropertyType;
    dateRange: { start: Date; end: Date };
  }): Promise<ApiResponse<OccupancyChartDataPoint[]>> {
    return this.get('/occupancy-data', params);
  }

  /**
   * Generar mapa de calor de precios
   */
  async generateHeatmapData(params: {
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
    propertyType?: PropertyType;
    zoom: number;
  }): Promise<ApiResponse<HeatmapDataPoint[]>> {
    return this.get('/heatmap-data', params);
  }

  /**
   * Exportar gráfica como imagen
   */
  async exportChart(data: {
    chartConfig: ChartConfiguration;
    format: 'png' | 'svg' | 'pdf';
    width?: number;
    height?: number;
  }): Promise<ApiResponse<{
    imageUrl: string;
    expiresAt: Date;
  }>> {
    return this.post('/export', data);
  }
}

// Tipos auxiliares para gráficas
interface ChartDataPoint {
  [key: string]: string | number | Date;
}

interface PriceChartDataPoint {
  date: string;
  averagePrice: number;
  medianPrice: number;
  propertyCount: number;
}

interface OccupancyChartDataPoint {
  date: string;
  occupancyRate: number;
  totalProperties: number;
  bookedProperties: number;
}

interface HeatmapDataPoint {
  latitude: number;
  longitude: number;
  price: number;
  intensity: number;
}

import {
  LocationPriceStats,
  PropertyTypePriceStats,
  SeasonalTrend,
  MarketChartData,
  PropertyComparison,
  PropertyForComparison,
  ComparisonMetrics,
  PropertyValuation,
  MarketReport,
  ChartConfiguration,
  CreateValuationDTO,
  CreateReportDTO,
  MarketAnalysisDTO,
  PropertyValuationInput,
  PropertyType,
  UserProfile,
  AgentProfile,
  OwnerProfile,
  ClientProfile,
  Review,
  ReviewStats,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ReviewFilters,
  ReviewResponse,
  ReviewReport,
  ModerationAction,
  ModerationQueue,
  ModerationMetrics,
  ModerationSettings,
  UserType,
  ReviewType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ReviewStatus,
  VerificationStatus
} from '../../../shared/src/types/rental';

import {
  ComparablePropertiesFilterInput,
  UserProfileInput,
  AgentProfileInput,
  OwnerProfileInput,
  ClientProfileInput,
  CreateReviewInput,
  UpdateReviewInput,
  ReportReviewInput,
  ReviewResponseInput,
  ReviewFiltersInput,
  ModerationActionInput,
  ModerationSettingsInput
} from '../../../shared/src/schemas/rental';

// Instancias de servicios de valoración
export const marketAnalysisService = new MarketAnalysisAPI();
export const propertyValuationService = new PropertyValuationAPI();
export const propertyComparisonService = new PropertyComparisonAPI();
export const marketReportService = new MarketReportAPI();
export const chartVisualizationService = new ChartVisualizationAPI();

// =============================================================================
// SERVICIOS API PARA PERFILES Y RESEÑAS
// =============================================================================

// Clase base para servicios de perfiles
class ProfilesAPI extends BaseApiService {
  constructor() {
    super('profiles');
  }

  // Obtener perfil por ID
  async getProfile(id: string): Promise<ApiResponse<UserProfile>> {
    return this.get<UserProfile>(`/${id}`);
  }

  // Obtener perfil por tipo de usuario
  async getProfilesByType(userType: UserType): Promise<ApiResponse<UserProfile[]>> {
    return this.get<UserProfile[]>(`/type/${userType}`);
  }

  // Crear perfil de usuario
  async createProfile(profile: UserProfileInput): Promise<ApiResponse<UserProfile>> {
    return this.post<UserProfile>('/', profile);
  }

  // Actualizar perfil
  async updateProfile(id: string, updates: Partial<UserProfileInput>): Promise<ApiResponse<UserProfile>> {
    return this.put<UserProfile>(`/${id}`, updates);
  }

  // Eliminar perfil
  async deleteProfile(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Buscar perfiles
  async searchProfiles(query: string, filters?: {
    userType?: UserType;
    verificationStatus?: VerificationStatus;
    location?: string;
    specializations?: string[];
  }): Promise<ApiResponse<UserProfile[]>> {
    const params = new URLSearchParams({ q: query });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else if (value) {
          params.append(key, value.toString());
        }
      });
    }

    return this.get<UserProfile[]>(`/search?${params.toString()}`);
  }

  // Subir documento de verificación
  async uploadVerificationDocument(
    profileId: string, 
    document: File, 
    documentType: string
  ): Promise<ApiResponse<{ documentId: string; fileUrl: string }>> {
    const formData = new FormData();
    formData.append('document', document);
    formData.append('type', documentType);

    return this.request<{ documentId: string; fileUrl: string }>(`/${profileId}/documents`, {
      method: 'POST',
      body: formData
    });
  }

  // Actualizar estado de verificación
  async updateVerificationStatus(
    profileId: string, 
    status: VerificationStatus, 
    notes?: string
  ): Promise<ApiResponse<UserProfile>> {
    return this.put<UserProfile>(`/${profileId}/verification`, { status, notes });
  }
}

// Servicio específico para agentes
class AgentProfilesAPI extends BaseApiService {
  constructor() {
    super('agents');
  }

  // Crear perfil de agente
  async createAgentProfile(profile: AgentProfileInput): Promise<ApiResponse<AgentProfile>> {
    return this.post<AgentProfile>('/', profile);
  }

  // Actualizar perfil de agente
  async updateAgentProfile(id: string, updates: Partial<AgentProfileInput>): Promise<ApiResponse<AgentProfile>> {
    return this.put<AgentProfile>(`/${id}`, updates);
  }

  // Obtener agentes por especialización
  async getAgentsBySpecialization(specialization: string): Promise<ApiResponse<AgentProfile[]>> {
    return this.get<AgentProfile[]>(`/specialization/${specialization}`);
  }

  // Obtener agentes disponibles
  async getAvailableAgents(date: string, time: string): Promise<ApiResponse<AgentProfile[]>> {
    return this.get<AgentProfile[]>(`/available?date=${date}&time=${time}`);
  }

  // Actualizar horarios de trabajo
  async updateWorkingHours(
    agentId: string, 
    workingHours: AgentProfile['workingHours']
  ): Promise<ApiResponse<AgentProfile>> {
    return this.put<AgentProfile>(`/${agentId}/hours`, { workingHours });
  }

  // Gestionar certificaciones
  async addCertification(
    agentId: string, 
    certification: {
      name: string;
      issuingOrganization: string;
      issueDate: Date;
      expiryDate?: Date;
      certificateNumber: string;
      certificateUrl?: string;
    }
  ): Promise<ApiResponse<AgentProfile>> {
    return this.post<AgentProfile>(`/${agentId}/certifications`, certification);
  }

  async removeCertification(
    agentId: string, 
    certificationId: string
  ): Promise<ApiResponse<AgentProfile>> {
    return this.delete<AgentProfile>(`/${agentId}/certifications/${certificationId}`);
  }
}

// Servicio específico para propietarios
class OwnerProfilesAPI extends BaseApiService {
  constructor() {
    super('owners');
  }

  // Crear perfil de propietario
  async createOwnerProfile(profile: OwnerProfileInput): Promise<ApiResponse<OwnerProfile>> {
    return this.post<OwnerProfile>('/', profile);
  }

  // Actualizar perfil de propietario
  async updateOwnerProfile(id: string, updates: Partial<OwnerProfileInput>): Promise<ApiResponse<OwnerProfile>> {
    return this.put<OwnerProfile>(`/${id}`, updates);
  }

  // Obtener propietarios por tipo de propiedad
  async getOwnersByPropertyType(propertyType: PropertyType): Promise<ApiResponse<OwnerProfile[]>> {
    return this.get<OwnerProfile[]>(`/property-type/${propertyType}`);
  }

  // Actualizar información bancaria
  async updateBankingInfo(
    ownerId: string, 
    bankingInfo: OwnerProfile['bankingInfo']
  ): Promise<ApiResponse<OwnerProfile>> {
    return this.put<OwnerProfile>(`/${ownerId}/banking`, { bankingInfo });
  }

  // Actualizar información de seguro
  async updateInsuranceInfo(
    ownerId: string, 
    insurance: OwnerProfile['insurance']
  ): Promise<ApiResponse<OwnerProfile>> {
    return this.put<OwnerProfile>(`/${ownerId}/insurance`, { insurance });
  }
}

// Servicio específico para clientes
class ClientProfilesAPI extends BaseApiService {
  constructor() {
    super('clients');
  }

  // Crear perfil de cliente
  async createClientProfile(profile: ClientProfileInput): Promise<ApiResponse<ClientProfile>> {
    return this.post<ClientProfile>('/', profile);
  }

  // Actualizar perfil de cliente
  async updateClientProfile(id: string, updates: Partial<ClientProfileInput>): Promise<ApiResponse<ClientProfile>> {
    return this.put<ClientProfile>(`/${id}`, updates);
  }

  // Actualizar preferencias de viaje
  async updateTravelPreferences(
    clientId: string, 
    preferences: ClientProfile['travelPreferences']
  ): Promise<ApiResponse<ClientProfile>> {
    return this.put<ClientProfile>(`/${clientId}/preferences`, { travelPreferences: preferences });
  }

  // Verificar identidad
  async verifyIdentity(
    clientId: string, 
    documentFile: File, 
    documentType: string, 
    documentNumber: string
  ): Promise<ApiResponse<ClientProfile>> {
    const formData = new FormData();
    formData.append('document', documentFile);
    formData.append('type', documentType);
    formData.append('number', documentNumber);

    return this.request<ClientProfile>(`/${clientId}/verify-identity`, {
      method: 'POST',
      body: formData
    });
  }
}

// Servicio para sistema de reseñas
class ReviewsAPI extends BaseApiService {
  constructor() {
    super('reviews');
  }

  // Obtener reseñas con filtros
  async getReviews(filters?: ReviewFiltersInput): Promise<ApiResponse<Review[]>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v.toString()));
        } else if (value) {
          params.append(key, value.toString());
        }
      });
    }

    return this.get<Review[]>(`?${params.toString()}`);
  }

  // Obtener reseña por ID
  async getReview(id: string): Promise<ApiResponse<Review>> {
    return this.get<Review>(`/${id}`);
  }

  // Crear nueva reseña
  async createReview(review: CreateReviewInput): Promise<ApiResponse<Review>> {
    return this.post<Review>('/', review);
  }

  // Actualizar reseña
  async updateReview(id: string, updates: UpdateReviewInput): Promise<ApiResponse<Review>> {
    return this.put<Review>(`/${id}`, updates);
  }

  // Eliminar reseña
  async deleteReview(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Obtener reseñas por objetivo (propiedad, agente, etc.)
  async getReviewsByTarget(targetId: string, targetType: ReviewType): Promise<ApiResponse<Review[]>> {
    return this.get<Review[]>(`/target/${targetType}/${targetId}`);
  }

  // Obtener estadísticas de reseñas
  async getReviewStats(targetId: string, targetType: ReviewType): Promise<ApiResponse<ReviewStats>> {
    return this.get<ReviewStats>(`/stats/${targetType}/${targetId}`);
  }

  // Marcar reseña como útil
  async markReviewHelpful(reviewId: string): Promise<ApiResponse<Review>> {
    return this.post<Review>(`/${reviewId}/helpful`, {});
  }

  // Reportar reseña
  async reportReview(report: ReportReviewInput): Promise<ApiResponse<ReviewReport>> {
    return this.post<ReviewReport>(`/${report.reviewId}/report`, report);
  }

  // Responder a reseña
  async respondToReview(response: ReviewResponseInput): Promise<ApiResponse<ReviewResponse>> {
    return this.post<ReviewResponse>(`/${response.reviewId}/respond`, response);
  }

  // Subir fotos para reseña
  async uploadReviewPhotos(reviewId: string, photos: File[]): Promise<ApiResponse<{ photoUrls: string[] }>> {
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

    return this.request<{ photoUrls: string[] }>(`/${reviewId}/photos`, {
      method: 'POST',
      body: formData
    });
  }
}

// Servicio para moderación de reseñas
class ReviewModerationAPI extends BaseApiService {
  constructor() {
    super('moderation');
  }

  // Obtener cola de moderación
  async getModerationQueue(): Promise<ApiResponse<ModerationQueue[]>> {
    return this.get<ModerationQueue[]>('/queue');
  }

  // Obtener reseñas pendientes de moderación
  async getPendingReviews(): Promise<ApiResponse<Review[]>> {
    return this.get<Review[]>('/pending');
  }

  // Ejecutar acción de moderación
  async executeAction(action: ModerationActionInput): Promise<ApiResponse<ModerationAction>> {
    return this.post<ModerationAction>('/action', action);
  }

  // Obtener métricas de moderación
  async getModerationMetrics(
    dateRange?: { start: Date; end: Date }
  ): Promise<ApiResponse<ModerationMetrics>> {
    const params = new URLSearchParams();
    
    if (dateRange) {
      params.append('start', dateRange.start.toISOString());
      params.append('end', dateRange.end.toISOString());
    }

    return this.get<ModerationMetrics>(`/metrics?${params.toString()}`);
  }

  // Obtener configuración de moderación
  async getModerationSettings(): Promise<ApiResponse<ModerationSettings>> {
    return this.get<ModerationSettings>('/settings');
  }

  // Actualizar configuración de moderación
  async updateModerationSettings(settings: ModerationSettingsInput): Promise<ApiResponse<ModerationSettings>> {
    return this.put<ModerationSettings>('/settings', settings);
  }

  // Asignar moderador a reseña
  async assignModerator(reviewId: string, moderatorId: string): Promise<ApiResponse<ModerationQueue>> {
    return this.post<ModerationQueue>(`/assign`, { reviewId, moderatorId });
  }

  // Escalar reseña a supervisión
  async escalateReview(reviewId: string, reason: string): Promise<ApiResponse<ModerationQueue>> {
    return this.post<ModerationQueue>(`/escalate`, { reviewId, reason });
  }

  // Obtener historial de acciones de moderación
  async getModerationHistory(reviewId: string): Promise<ApiResponse<ModerationAction[]>> {
    return this.get<ModerationAction[]>(`/history/${reviewId}`);
  }
}

// =============================================================================
// SERVICIOS API PARA ADMINISTRACIÓN Y CMS
// =============================================================================

// Importar tipos de administración
import {
  AdminUser,
  AdminUserStatus,
  AdminRole,
  Role,
  Permission,
  PermissionType,
  PropertyManagement,
  PropertyPublicationStatus,
  ActivityLog,
  ActivityType,
  LogLevel,
  PlatformMetrics,
  SystemConfiguration,
  AdminNotification,
  SystemReport,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DashboardWidget,
  DashboardConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SystemBackup,
  AdminSession,
} from '../../../shared/src/types/rental';

import {
  AdminUserInput,
  UpdateAdminUserInput,
  RoleInput,
  PermissionInput,
  PropertyManagementInput,
  ActivityLogInput,
  SystemConfigInput,
  AdminNotificationInput,
  SystemReportInput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DashboardWidgetInput,
  DashboardConfigInput,
  ReportFiltersInput,
} from '../../../shared/src/schemas/rental';

// Servicio para gestión de usuarios administrativos
class AdminUserManagementAPI extends BaseApiService {
  constructor() {
    super('admin/users');
  }

  // Obtener todos los usuarios administrativos
  async getAdminUsers(filters?: {
    status?: AdminUserStatus;
    role?: AdminRole;
    department?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ users: AdminUser[]; total: number; pagination: PaginationParams }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return this.get<{ users: AdminUser[]; total: number; pagination: PaginationParams }>(`?${params.toString()}`);
  }

  // Obtener usuario administrativo por ID
  async getAdminUser(id: string): Promise<ApiResponse<AdminUser>> {
    return this.get<AdminUser>(`/${id}`);
  }

  // Crear nuevo usuario administrativo
  async createAdminUser(userData: AdminUserInput): Promise<ApiResponse<AdminUser>> {
    return this.post<AdminUser>('/', userData);
  }

  // Actualizar usuario administrativo
  async updateAdminUser(id: string, userData: UpdateAdminUserInput): Promise<ApiResponse<AdminUser>> {
    return this.put<AdminUser>(`/${id}`, userData);
  }

  // Suspender usuario administrativo
  async suspendAdminUser(id: string, reason: string): Promise<ApiResponse<AdminUser>> {
    return this.post<AdminUser>(`/${id}/suspend`, { reason });
  }

  // Reactivar usuario administrativo
  async reactivateAdminUser(id: string): Promise<ApiResponse<AdminUser>> {
    return this.post<AdminUser>(`/${id}/reactivate`, {});
  }

  // Eliminar usuario administrativo
  async deleteAdminUser(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Cambiar contraseña
  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.post<{ success: boolean }>(`/${id}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // Resetear contraseña
  async resetPassword(id: string): Promise<ApiResponse<{ temporaryPassword: string }>> {
    return this.post<{ temporaryPassword: string }>(`/${id}/reset-password`, {});
  }

  // Obtener sesiones activas
  async getActiveSessions(userId: string): Promise<ApiResponse<AdminSession[]>> {
    return this.get<AdminSession[]>(`/${userId}/sessions`);
  }

  // Cerrar sesión específica
  async terminateSession(userId: string, sessionId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${userId}/sessions/${sessionId}`);
  }

  // Cerrar todas las sesiones
  async terminateAllSessions(userId: string): Promise<ApiResponse<{ terminated: number }>> {
    return this.delete<{ terminated: number }>(`/${userId}/sessions`);
  }
}

// Servicio para gestión de roles y permisos
class RolePermissionAPI extends BaseApiService {
  constructor() {
    super('admin/roles');
  }

  // Obtener todos los roles
  async getRoles(): Promise<ApiResponse<Role[]>> {
    return this.get<Role[]>('/');
  }

  // Obtener rol por ID
  async getRole(id: string): Promise<ApiResponse<Role>> {
    return this.get<Role>(`/${id}`);
  }

  // Crear nuevo rol
  async createRole(roleData: RoleInput): Promise<ApiResponse<Role>> {
    return this.post<Role>('/', roleData);
  }

  // Actualizar rol
  async updateRole(id: string, roleData: Partial<RoleInput>): Promise<ApiResponse<Role>> {
    return this.put<Role>(`/${id}`, roleData);
  }

  // Eliminar rol
  async deleteRole(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Asignar permisos a rol
  async assignPermissions(roleId: string, permissionIds: string[]): Promise<ApiResponse<Role>> {
    return this.post<Role>(`/${roleId}/permissions`, { permissionIds });
  }

  // Remover permisos de rol
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removePermissions(roleId: string, permissionIds: string[]): Promise<ApiResponse<Role>> {
    return this.delete<Role>(`/${roleId}/permissions`);
  }

  // Obtener todos los permisos
  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return this.get<Permission[]>('/permissions');
  }

  // Crear nuevo permiso
  async createPermission(permissionData: PermissionInput): Promise<ApiResponse<Permission>> {
    return this.post<Permission>('/permissions', permissionData);
  }

  // Actualizar permiso
  async updatePermission(id: string, permissionData: Partial<PermissionInput>): Promise<ApiResponse<Permission>> {
    return this.put<Permission>(`/permissions/${id}`, permissionData);
  }

  // Eliminar permiso
  async deletePermission(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/permissions/${id}`);
  }

  // Verificar permisos de usuario
  async checkUserPermissions(userId: string, permissions: PermissionType[]): Promise<ApiResponse<Record<PermissionType, boolean>>> {
    return this.post<Record<PermissionType, boolean>>('/check-permissions', { userId, permissions });
  }
}

// Servicio para gestión de propiedades en CMS
class PropertyManagementAPI extends BaseApiService {
  constructor() {
    super('admin/properties');
  }

  // Obtener todas las propiedades para gestión
  async getProperties(filters?: {
    status?: PropertyPublicationStatus;
    location?: string;
    ownerId?: string;
    search?: string;
    dateRange?: { start: Date; end: Date };
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ properties: PropertyManagement[]; total: number; pagination: PaginationParams }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (typeof value === 'object' && 'start' in value && 'end' in value) {
            params.append('startDate', value.start.toISOString());
            params.append('endDate', value.end.toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    return this.get<{ properties: PropertyManagement[]; total: number; pagination: PaginationParams }>(`?${params.toString()}`);
  }

  // Obtener propiedad específica para gestión
  async getProperty(id: string): Promise<ApiResponse<PropertyManagement>> {
    return this.get<PropertyManagement>(`/${id}`);
  }

  // Actualizar información de gestión de propiedad
  async updatePropertyManagement(id: string, data: Partial<PropertyManagementInput>): Promise<ApiResponse<PropertyManagement>> {
    return this.put<PropertyManagement>(`/${id}`, data);
  }

  // Aprobar propiedad
  async approveProperty(id: string, notes?: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/approve`, { notes });
  }

  // Rechazar propiedad
  async rejectProperty(id: string, reason: string, notes?: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/reject`, { reason, notes });
  }

  // Publicar propiedad
  async publishProperty(id: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/publish`, {});
  }

  // Despublicar propiedad
  async unpublishProperty(id: string, reason?: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/unpublish`, { reason });
  }

  // Suspender propiedad
  async suspendProperty(id: string, reason: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/suspend`, { reason });
  }

  // Archivar propiedad
  async archiveProperty(id: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/archive`, {});
  }

  // Destacar propiedad
  async featureProperty(id: string, featuredUntil: Date): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/feature`, { featuredUntil });
  }

  // Quitar destaque de propiedad
  async unfeatureProperty(id: string): Promise<ApiResponse<PropertyManagement>> {
    return this.post<PropertyManagement>(`/${id}/unfeature`, {});
  }

  // Actualizar prioridad
  async updatePriority(id: string, priority: number): Promise<ApiResponse<PropertyManagement>> {
    return this.put<PropertyManagement>(`/${id}/priority`, { priority });
  }

  // Gestionar tags
  async updateTags(id: string, tags: string[]): Promise<ApiResponse<PropertyManagement>> {
    return this.put<PropertyManagement>(`/${id}/tags`, { tags });
  }

  // Gestionar categorías
  async updateCategories(id: string, categories: string[]): Promise<ApiResponse<PropertyManagement>> {
    return this.put<PropertyManagement>(`/${id}/categories`, { categories });
  }

  // Obtener estadísticas de propiedades
  async getPropertyStats(): Promise<ApiResponse<{
    total: number;
    byStatus: Record<PropertyPublicationStatus, number>;
    byType: Record<string, number>;
    byLocation: Record<string, number>;
    revenue: { total: number; monthly: number };
    performance: { views: number; inquiries: number; bookings: number };
  }>> {
    return this.get<{
      total: number;
      byStatus: Record<PropertyPublicationStatus, number>;
      byType: Record<string, number>;
      byLocation: Record<string, number>;
      revenue: { total: number; monthly: number };
      performance: { views: number; inquiries: number; bookings: number };
    }>('/stats');
  }
}

// Servicio para logs y auditoría
class ActivityLogAPI extends BaseApiService {
  constructor() {
    super('admin/logs');
  }

  // Obtener logs de actividad
  async getActivityLogs(filters?: {
    userId?: string;
    activityType?: ActivityType;
    level?: LogLevel;
    resourceType?: string;
    resourceId?: string;
    dateRange?: { start: Date; end: Date };
    success?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ logs: ActivityLog[]; total: number; pagination: PaginationParams }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          if (typeof value === 'object' && 'start' in value && 'end' in value) {
            params.append('startDate', value.start.toISOString());
            params.append('endDate', value.end.toISOString());
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    return this.get<{ logs: ActivityLog[]; total: number; pagination: PaginationParams }>(`?${params.toString()}`);
  }

  // Crear log de actividad
  async createActivityLog(logData: ActivityLogInput): Promise<ApiResponse<ActivityLog>> {
    return this.post<ActivityLog>('/', logData);
  }

  // Obtener estadísticas de logs
  async getLogStats(dateRange?: { start: Date; end: Date }): Promise<ApiResponse<{
    total: number;
    byLevel: Record<LogLevel, number>;
    byType: Record<ActivityType, number>;
    byUser: Array<{ userId: string; userName: string; count: number }>;
    errorRate: number;
    averageDuration: number;
  }>> {
    const params = new URLSearchParams();
    
    if (dateRange) {
      params.append('start', dateRange.start.toISOString());
      params.append('end', dateRange.end.toISOString());
    }

    return this.get<{
      total: number;
      byLevel: Record<LogLevel, number>;
      byType: Record<ActivityType, number>;
      byUser: Array<{ userId: string; userName: string; count: number }>;
      errorRate: number;
      averageDuration: number;
    }>(`/stats?${params.toString()}`);
  }

  // Exportar logs
  async exportLogs(filters: ReportFiltersInput, format: 'csv' | 'xlsx' | 'json'): Promise<ApiResponse<{ fileUrl: string }>> {
    return this.post<{ fileUrl: string }>('/export', { filters, format });
  }

  // Limpiar logs antiguos
  async cleanupLogs(olderThanDays: number): Promise<ApiResponse<{ deletedCount: number }>> {
    return this.delete<{ deletedCount: number }>(`/cleanup?days=${olderThanDays}`);
  }
}

// Servicio para métricas de la plataforma
class PlatformMetricsAPI extends BaseApiService {
  constructor() {
    super('admin/metrics');
  }

  // Obtener métricas actuales
  async getCurrentMetrics(): Promise<ApiResponse<PlatformMetrics>> {
    return this.get<PlatformMetrics>('/current');
  }

  // Obtener métricas históricas
  async getHistoricalMetrics(
    dateRange: { start: Date; end: Date },
    granularity: 'hour' | 'day' | 'week' | 'month' = 'day'
  ): Promise<ApiResponse<PlatformMetrics[]>> {
    const params = new URLSearchParams({
      start: dateRange.start.toISOString(),
      end: dateRange.end.toISOString(),
      granularity
    });

    return this.get<PlatformMetrics[]>(`/historical?${params.toString()}`);
  }

  // Obtener métricas específicas
  async getSpecificMetrics(
    categories: Array<'users' | 'properties' | 'bookings' | 'reviews' | 'traffic' | 'financial'>,
    dateRange?: { start: Date; end: Date }
  ): Promise<ApiResponse<Partial<PlatformMetrics>>> {
    const params = new URLSearchParams();
    categories.forEach(category => params.append('categories', category));
    
    if (dateRange) {
      params.append('start', dateRange.start.toISOString());
      params.append('end', dateRange.end.toISOString());
    }

    return this.get<Partial<PlatformMetrics>>(`/specific?${params.toString()}`);
  }

  // Generar snapshot de métricas
  async generateSnapshot(): Promise<ApiResponse<PlatformMetrics>> {
    return this.post<PlatformMetrics>('/snapshot', {});
  }
}

// Servicio para configuración del sistema
class SystemConfigAPI extends BaseApiService {
  constructor() {
    super('admin/config');
  }

  // Obtener todas las configuraciones
  async getConfigurations(category?: string): Promise<ApiResponse<SystemConfiguration[]>> {
    const params = category ? `?category=${category}` : '';
    return this.get<SystemConfiguration[]>(`/${params}`);
  }

  // Obtener configuración específica
  async getConfiguration(key: string): Promise<ApiResponse<SystemConfiguration>> {
    return this.get<SystemConfiguration>(`/key/${key}`);
  }

  // Crear/actualizar configuración
  async setConfiguration(configData: SystemConfigInput): Promise<ApiResponse<SystemConfiguration>> {
    return this.post<SystemConfiguration>('/', configData);
  }

  // Actualizar múltiples configuraciones
  async updateConfigurations(configs: SystemConfigInput[]): Promise<ApiResponse<SystemConfiguration[]>> {
    return this.put<SystemConfiguration[]>('/bulk', { configs });
  }

  // Eliminar configuración
  async deleteConfiguration(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Obtener configuraciones públicas (para frontend)
  async getPublicConfigurations(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.get<Record<string, unknown>>('/public');
  }

  // Resetear configuración a valor por defecto
  async resetConfiguration(id: string): Promise<ApiResponse<SystemConfiguration>> {
    return this.post<SystemConfiguration>(`/${id}/reset`, {});
  }

  // Exportar configuraciones
  async exportConfigurations(): Promise<ApiResponse<{ fileUrl: string }>> {
    return this.get<{ fileUrl: string }>('/export');
  }

  // Importar configuraciones
  async importConfigurations(file: File): Promise<ApiResponse<{ imported: number; errors: string[] }>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<{ imported: number; errors: string[] }>('/import', {
      method: 'POST',
      body: formData
    });
  }
}

// Servicio para notificaciones administrativas
class AdminNotificationAPI extends BaseApiService {
  constructor() {
    super('admin/notifications');
  }

  // Obtener notificaciones
  async getNotifications(filters?: {
    isRead?: boolean;
    type?: 'info' | 'warning' | 'error' | 'success';
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    isGlobal?: boolean;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ notifications: AdminNotification[]; total: number; unreadCount: number }>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return this.get<{ notifications: AdminNotification[]; total: number; unreadCount: number }>(`?${params.toString()}`);
  }

  // Crear notificación
  async createNotification(notificationData: AdminNotificationInput): Promise<ApiResponse<AdminNotification>> {
    return this.post<AdminNotification>('/', notificationData);
  }

  // Marcar como leída
  async markAsRead(id: string): Promise<ApiResponse<AdminNotification>> {
    return this.put<AdminNotification>(`/${id}/read`, {});
  }

  // Marcar todas como leídas
  async markAllAsRead(): Promise<ApiResponse<{ updatedCount: number }>> {
    return this.put<{ updatedCount: number }>('/read-all', {});
  }

  // Eliminar notificación
  async deleteNotification(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Limpiar notificaciones expiradas
  async cleanupExpired(): Promise<ApiResponse<{ deletedCount: number }>> {
    return this.delete<{ deletedCount: number }>('/cleanup');
  }
}

// Servicio para reportes del sistema
class SystemReportAPI extends BaseApiService {
  constructor() {
    super('admin/reports');
  }

  // Obtener lista de reportes
  async getReports(): Promise<ApiResponse<SystemReport[]>> {
    return this.get<SystemReport[]>('/');
  }

  // Obtener reporte específico
  async getReport(id: string): Promise<ApiResponse<SystemReport>> {
    return this.get<SystemReport>(`/${id}`);
  }

  // Generar nuevo reporte
  async generateReport(reportData: SystemReportInput): Promise<ApiResponse<SystemReport>> {
    return this.post<SystemReport>('/', reportData);
  }

  // Eliminar reporte
  async deleteReport(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/${id}`);
  }

  // Descargar reporte
  async downloadReport(id: string): Promise<Response> {
    const token = typeof window !== 'undefined' ? 
      localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') : 
      null;
      
    const response = await fetch(`${this.baseUrl}/${id}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al descargar el reporte');
    }
    
    return response;
  }

  // Obtener plantillas de reportes
  async getReportTemplates(): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    parameters: Record<string, unknown>;
  }>>> {
    return this.get<Array<{
      id: string;
      name: string;
      description: string;
      type: string;
      parameters: Record<string, unknown>;
    }>>('/templates');
  }

  // Programar reporte recurrente
  async scheduleReport(id: string, frequency: 'daily' | 'weekly' | 'monthly'): Promise<ApiResponse<SystemReport>> {
    return this.post<SystemReport>(`/${id}/schedule`, { frequency });
  }

  // Cancelar programación de reporte
  async unscheduleReport(id: string): Promise<ApiResponse<SystemReport>> {
    return this.delete<SystemReport>(`/${id}/schedule`);
  }
}

// Servicio para dashboard administrativo
class AdminDashboardAPI extends BaseApiService {
  constructor() {
    super('admin/dashboard');
  }

  // Obtener configuraciones de dashboard
  async getDashboardConfigs(): Promise<ApiResponse<DashboardConfig[]>> {
    return this.get<DashboardConfig[]>('/configs');
  }

  // Obtener configuración específica
  async getDashboardConfig(id: string): Promise<ApiResponse<DashboardConfig>> {
    return this.get<DashboardConfig>(`/configs/${id}`);
  }

  // Crear configuración de dashboard
  async createDashboardConfig(configData: DashboardConfigInput): Promise<ApiResponse<DashboardConfig>> {
    return this.post<DashboardConfig>('/configs', configData);
  }

  // Actualizar configuración de dashboard
  async updateDashboardConfig(id: string, configData: Partial<DashboardConfigInput>): Promise<ApiResponse<DashboardConfig>> {
    return this.put<DashboardConfig>(`/configs/${id}`, configData);
  }

  // Eliminar configuración de dashboard
  async deleteDashboardConfig(id: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.delete<{ success: boolean }>(`/configs/${id}`);
  }

  // Obtener datos para widget específico
  async getWidgetData(widgetId: string, params?: Record<string, unknown>): Promise<ApiResponse<unknown>> {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    return this.get<unknown>(`/widgets/${widgetId}/data${queryParams}`);
  }

  // Obtener resumen del dashboard principal
  async getDashboardSummary(): Promise<ApiResponse<{
    metrics: {
      totalUsers: number;
      totalProperties: number;
      totalBookings: number;
      totalRevenue: number;
      activeUsers: number;
      newUsers: number;
      pendingProperties: number;
      pendingReviews: number;
    };
    alerts: Array<{
      type: 'warning' | 'error' | 'info';
      message: string;
      count: number;
    }>;
    recentActivity: ActivityLog[];
  }>> {
    return this.get<{
      metrics: {
        totalUsers: number;
        totalProperties: number;
        totalBookings: number;
        totalRevenue: number;
        activeUsers: number;
        newUsers: number;
        pendingProperties: number;
        pendingReviews: number;
      };
      alerts: Array<{
        type: 'warning' | 'error' | 'info';
        message: string;
        count: number;
      }>;
      recentActivity: ActivityLog[];
    }>('/summary');
  }
}

// Instancias de servicios para administración
export const adminUserManagementService = new AdminUserManagementAPI();
export const rolePermissionService = new RolePermissionAPI();
export const propertyManagementService = new PropertyManagementAPI();
export const activityLogService = new ActivityLogAPI();
export const platformMetricsService = new PlatformMetricsAPI();
export const systemConfigService = new SystemConfigAPI();
export const adminNotificationService = new AdminNotificationAPI();
export const systemReportService = new SystemReportAPI();
export const adminDashboardService = new AdminDashboardAPI();

// Instancias de servicios para perfiles y reseñas
export const profilesService = new ProfilesAPI();
export const agentProfilesService = new AgentProfilesAPI();
export const ownerProfilesService = new OwnerProfilesAPI();
export const clientProfilesService = new ClientProfilesAPI();
export const reviewsService = new ReviewsAPI();
export const reviewModerationService = new ReviewModerationAPI();