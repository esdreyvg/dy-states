// Notification API Services for DY States
// Servicios API para gestión de notificaciones en República Dominicana

import {
  Notification,
  PushNotification,
  UserDevice,
  UserNotificationPreferences,
  NotificationTemplate,
  NotificationStats,
  NotificationSystemConfig,
  NotificationType,
  NotificationChannel,
  NotificationStatus,
  NotificationPriority,
  DevicePlatform,
} from '../../../shared/src/types/rental';

import { apiClient } from './api';

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

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationParams;
}

export type SortOrder = 'asc' | 'desc';

// Parámetros de búsqueda para notificaciones
export interface NotificationSearchParams {
  userId?: string;
  type?: NotificationType;
  channel?: NotificationChannel;
  status?: NotificationStatus;
  priority?: NotificationPriority;
  dateFrom?: Date;
  dateTo?: Date;
  read?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'readAt';
  sortOrder?: SortOrder;
}

// DTO para crear notificación
export interface CreateNotificationDTO {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  priority?: NotificationPriority;
  channels?: NotificationChannel[];
  scheduledFor?: Date;
  expiresAt?: Date;
  actionUrl?: string;
  imageUrl?: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
}

// DTO para actualizar notificación
export interface UpdateNotificationDTO {
  status?: NotificationStatus;
  readAt?: Date;
  clickedAt?: Date;
  actionTakenAt?: Date;
}

// DTO para registro de dispositivo
export interface RegisterDeviceDTO {
  userId: string;
  platform: DevicePlatform;
  deviceToken: string;
  deviceInfo: {
    model?: string;
    osVersion?: string;
    appVersion?: string;
    manufacturer?: string;
    isPhysicalDevice?: boolean;
  };
  settings?: {
    enablePush?: boolean;
    enableSound?: boolean;
    enableVibration?: boolean;
    enableBadge?: boolean;
  };
}

// DTO para actualizar preferencias de usuario
export interface UpdateUserPreferencesDTO {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  whatsappNotifications?: boolean;
  webNotifications?: boolean;
  quietHours?: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  notificationTypes?: Record<NotificationType, boolean>;
  channels?: Record<NotificationChannel, boolean>;
  language?: string;
  frequency?: 'immediate' | 'hourly' | 'daily' | 'weekly' | 'never';
}

// Parámetros para estadísticas
export interface NotificationStatsParams {
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  type?: NotificationType;
  channel?: NotificationChannel;
  granularity?: 'hour' | 'day' | 'week' | 'month';
}

/**
 * Servicio principal para gestión de notificaciones
 */
export class NotificationService {
  
  // ============================================================================
  // GESTIÓN DE NOTIFICACIONES
  // ============================================================================

  /**
   * Obtener todas las notificaciones con filtros y paginación
   */
  static async getNotifications(
    params: NotificationSearchParams = {}
  ): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get('/notifications', { params });
    return response.data;
  }

  /**
   * Obtener notificaciones por usuario
   */
  static async getUserNotifications(
    userId: string,
    params: Omit<NotificationSearchParams, 'userId'> = {}
  ): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get(`/notifications/user/${userId}`, { params });
    return response.data;
  }

  /**
   * Obtener una notificación por ID
   */
  static async getNotificationById(id: string): Promise<ApiResponse<Notification>> {
    const response = await apiClient.get(`/notifications/${id}`);
    return response.data;
  }

  /**
   * Crear nueva notificación
   */
  static async createNotification(data: CreateNotificationDTO): Promise<ApiResponse<Notification>> {
    const response = await apiClient.post('/notifications', data);
    return response.data;
  }

  /**
   * Enviar notificación inmediata
   */
  static async sendNotification(data: CreateNotificationDTO): Promise<ApiResponse<Notification>> {
    const response = await apiClient.post('/notifications/send', data);
    return response.data;
  }

  /**
   * Actualizar notificación
   */
  static async updateNotification(
    id: string, 
    data: UpdateNotificationDTO
  ): Promise<ApiResponse<Notification>> {
    const response = await apiClient.patch(`/notifications/${id}`, data);
    return response.data;
  }

  /**
   * Marcar notificación como leída
   */
  static async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  }

  /**
   * Marcar múltiples notificaciones como leídas
   */
  static async markMultipleAsRead(ids: string[]): Promise<ApiResponse<{ updated: number }>> {
    const response = await apiClient.patch('/notifications/mark-read', { ids });
    return response.data;
  }

  /**
   * Marcar todas las notificaciones de un usuario como leídas
   */
  static async markAllAsRead(userId: string): Promise<ApiResponse<{ updated: number }>> {
    const response = await apiClient.patch(`/notifications/user/${userId}/mark-all-read`);
    return response.data;
  }

  /**
   * Eliminar notificación
   */
  static async deleteNotification(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  }

  /**
   * Eliminar múltiples notificaciones
   */
  static async deleteMultipleNotifications(ids: string[]): Promise<ApiResponse<{ deleted: number }>> {
    const response = await apiClient.delete('/notifications/bulk', { data: { ids } });
    return response.data;
  }

  /**
   * Obtener conteo de notificaciones no leídas
   */
  static async getUnreadCount(userId: string): Promise<ApiResponse<{ count: number }>> {
    const response = await apiClient.get(`/notifications/user/${userId}/unread-count`);
    return response.data;
  }

  // ============================================================================
  // GESTIÓN DE DISPOSITIVOS
  // ============================================================================

  /**
   * Registrar dispositivo para push notifications
   */
  static async registerDevice(data: RegisterDeviceDTO): Promise<ApiResponse<UserDevice>> {
    const response = await apiClient.post('/notifications/devices', data);
    return response.data;
  }

  /**
   * Actualizar token de dispositivo
   */
  static async updateDeviceToken(
    deviceId: string, 
    token: string
  ): Promise<ApiResponse<UserDevice>> {
    const response = await apiClient.patch(`/notifications/devices/${deviceId}/token`, { token });
    return response.data;
  }

  /**
   * Obtener dispositivos de usuario
   */
  static async getUserDevices(userId: string): Promise<ApiResponse<UserDevice[]>> {
    const response = await apiClient.get(`/notifications/devices/user/${userId}`);
    return response.data;
  }

  /**
   * Desactivar dispositivo
   */
  static async deactivateDevice(deviceId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.patch(`/notifications/devices/${deviceId}/deactivate`);
    return response.data;
  }

  /**
   * Eliminar dispositivo
   */
  static async deleteDevice(deviceId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/notifications/devices/${deviceId}`);
    return response.data;
  }

  // ============================================================================
  // PREFERENCIAS DE USUARIO
  // ============================================================================

  /**
   * Obtener preferencias de notificación de usuario
   */
  static async getUserPreferences(userId: string): Promise<ApiResponse<UserNotificationPreferences>> {
    const response = await apiClient.get(`/notifications/preferences/${userId}`);
    return response.data;
  }

  /**
   * Actualizar preferencias de notificación
   */
  static async updateUserPreferences(
    userId: string,
    data: UpdateUserPreferencesDTO
  ): Promise<ApiResponse<UserNotificationPreferences>> {
    const response = await apiClient.patch(`/notifications/preferences/${userId}`, data);
    return response.data;
  }

  /**
   * Resetear preferencias a valores por defecto
   */
  static async resetUserPreferences(userId: string): Promise<ApiResponse<UserNotificationPreferences>> {
    const response = await apiClient.post(`/notifications/preferences/${userId}/reset`);
    return response.data;
  }

  // ============================================================================
  // PLANTILLAS DE NOTIFICACIÓN
  // ============================================================================

  /**
   * Obtener todas las plantillas
   */
  static async getTemplates(): Promise<ApiResponse<NotificationTemplate[]>> {
    const response = await apiClient.get('/notifications/templates');
    return response.data;
  }

  /**
   * Obtener plantilla por ID
   */
  static async getTemplateById(id: string): Promise<ApiResponse<NotificationTemplate>> {
    const response = await apiClient.get(`/notifications/templates/${id}`);
    return response.data;
  }

  /**
   * Crear plantilla de notificación
   */
  static async createTemplate(
    data: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<NotificationTemplate>> {
    const response = await apiClient.post('/notifications/templates', data);
    return response.data;
  }

  /**
   * Actualizar plantilla
   */
  static async updateTemplate(
    id: string,
    data: Partial<Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<NotificationTemplate>> {
    const response = await apiClient.patch(`/notifications/templates/${id}`, data);
    return response.data;
  }

  /**
   * Eliminar plantilla
   */
  static async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/notifications/templates/${id}`);
    return response.data;
  }

  // ============================================================================
  // ESTADÍSTICAS Y REPORTES
  // ============================================================================

  /**
   * Obtener estadísticas de notificaciones
   */
  static async getNotificationStats(
    params: NotificationStatsParams = {}
  ): Promise<ApiResponse<NotificationStats>> {
    const response = await apiClient.get('/notifications/stats', { params });
    return response.data;
  }

  /**
   * Obtener estadísticas por usuario
   */
  static async getUserStats(
    userId: string,
    params: Omit<NotificationStatsParams, 'userId'> = {}
  ): Promise<ApiResponse<NotificationStats>> {
    const response = await apiClient.get(`/notifications/stats/user/${userId}`, { params });
    return response.data;
  }

  /**
   * Obtener métricas de rendimiento
   */
  static async getPerformanceMetrics(): Promise<ApiResponse<{
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    avgDeliveryTime: number;
    errorRate: number;
    channelPerformance: Record<NotificationChannel, {
      deliveryRate: number;
      openRate: number;
      clickRate: number;
    }>;
  }>> {
    const response = await apiClient.get('/notifications/metrics');
    return response.data;
  }

  // ============================================================================
  // CONFIGURACIÓN DEL SISTEMA
  // ============================================================================

  /**
   * Obtener configuración del sistema
   */
  static async getSystemConfig(): Promise<ApiResponse<NotificationSystemConfig>> {
    const response = await apiClient.get('/notifications/config');
    return response.data;
  }

  /**
   * Actualizar configuración del sistema
   */
  static async updateSystemConfig(
    data: Partial<Omit<NotificationSystemConfig, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<NotificationSystemConfig>> {
    const response = await apiClient.patch('/notifications/config', data);
    return response.data;
  }

  // ============================================================================
  // UTILIDADES
  // ============================================================================

  /**
   * Probar conectividad con proveedores
   */
  static async testProviders(): Promise<ApiResponse<Record<string, boolean>>> {
    const response = await apiClient.post('/notifications/test-providers');
    return response.data;
  }

  /**
   * Obtener tipos de notificación disponibles
   */
  static async getNotificationTypes(): Promise<ApiResponse<{
    types: NotificationType[];
    channels: NotificationChannel[];
    priorities: NotificationPriority[];
  }>> {
    const response = await apiClient.get('/notifications/types');
    return response.data;
  }
}

/**
 * Servicio específico para Push Notifications
 */
export class PushNotificationService {

  /**
   * Enviar push notification a dispositivo específico
   */
  static async sendToDevice(
    deviceToken: string,
    notification: Omit<PushNotification, 'id' | 'createdAt' | 'updatedAt' | 'deviceToken'>
  ): Promise<ApiResponse<PushNotification>> {
    const response = await apiClient.post('/notifications/push/device', {
      deviceToken,
      ...notification
    });
    return response.data;
  }

  /**
   * Enviar push notification a usuario (todos sus dispositivos)
   */
  static async sendToUser(
    userId: string,
    notification: Omit<PushNotification, 'id' | 'createdAt' | 'updatedAt' | 'deviceToken'>
  ): Promise<ApiResponse<{ sent: number; failed: number; results: PushNotification[] }>> {
    const response = await apiClient.post(`/notifications/push/user/${userId}`, notification);
    return response.data;
  }

  /**
   * Enviar push notification masiva
   */
  static async sendBroadcast(
    notification: Omit<PushNotification, 'id' | 'createdAt' | 'updatedAt' | 'deviceToken'>,
    filters?: {
      userIds?: string[];
      platform?: DevicePlatform;
      tags?: string[];
    }
  ): Promise<ApiResponse<{ sent: number; failed: number; jobId: string }>> {
    const response = await apiClient.post('/notifications/push/broadcast', {
      notification,
      filters
    });
    return response.data;
  }

  /**
   * Obtener estado de envío masivo
   */
  static async getBroadcastStatus(jobId: string): Promise<ApiResponse<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    sent: number;
    failed: number;
    errors?: string[];
  }>> {
    const response = await apiClient.get(`/notifications/push/broadcast/${jobId}/status`);
    return response.data;
  }

  /**
   * Programar push notification
   */
  static async scheduleNotification(
    scheduledFor: Date,
    notification: Omit<PushNotification, 'id' | 'createdAt' | 'updatedAt' | 'deviceToken'>,
    target: { userId?: string; deviceToken?: string }
  ): Promise<ApiResponse<{ scheduledId: string }>> {
    const response = await apiClient.post('/notifications/push/schedule', {
      scheduledFor: scheduledFor.toISOString(),
      notification,
      target
    });
    return response.data;
  }

  /**
   * Cancelar push notification programada
   */
  static async cancelScheduledNotification(scheduledId: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/notifications/push/schedule/${scheduledId}`);
    return response.data;
  }

  /**
   * Obtener historial de push notifications
   */
  static async getPushHistory(
    params: {
      userId?: string;
      deviceToken?: string;
      dateFrom?: Date;
      dateTo?: Date;
      status?: 'sent' | 'delivered' | 'failed';
      page?: number;
      limit?: number;
    } = {}
  ): Promise<PaginatedResponse<PushNotification>> {
    const response = await apiClient.get('/notifications/push/history', { params });
    return response.data;
  }
}

// Exportar servicios por defecto
export default NotificationService;