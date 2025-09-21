// Hook para gestión de notificaciones en tiempo real
// Hook personalizado para el sistema de notificaciones de DY States

import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  Notification as NotificationData,
  NotificationStatus,
} from '../../../shared/src/types/rental';
import { NotificationService } from '../services/notification';

export interface NotificationHookOptions {
  userId?: string;
  enableRealTime?: boolean;
  enableBrowserNotifications?: boolean;
  autoMarkAsRead?: boolean;
  pollInterval?: number;
}

export interface NotificationState {
  notifications: NotificationData[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

export interface NotificationActions {
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  showNotification: (notification: NotificationData) => void;
}

export function useNotifications(options: NotificationHookOptions = {}) {
  const {
    userId,
    enableRealTime = true,
    enableBrowserNotifications = true,
    autoMarkAsRead = false,
    pollInterval = 30000, // 30 segundos
  } = options;

  // Estado de las notificaciones
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    isConnected: false,
  });

  // Referencias para cleanup
  const wsRef = useRef<WebSocket | null>(null);
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const permissionRequestedRef = useRef(false);

  // Función para actualizar estado de manera segura
  const updateState = useCallback((updates: Partial<NotificationState>) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  // Solicitar permisos para notificaciones del navegador
  const requestNotificationPermission = useCallback(async () => {
    if (!enableBrowserNotifications || permissionRequestedRef.current) {
      return;
    }

    permissionRequestedRef.current = true;

    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  }, [enableBrowserNotifications]);

  // Mostrar notificación del navegador
  const showBrowserNotification = useCallback((notification: NotificationData) => {
    if (!enableBrowserNotifications || !('Notification' in window) || 
        Notification.permission !== 'granted') {
      return;
    }

    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: notification.imageUrl || '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: notification.id,
        requireInteraction: notification.priority === 'critical',
        data: {
          notificationId: notification.id,
          actionUrl: notification.actionUrl,
        },
      });

      // Manejar clic en la notificación
      browserNotification.onclick = () => {
        window.focus();
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl;
        }
        browserNotification.close();
      };

      // Auto-cerrar después de 5 segundos para notificaciones no críticas
      if (notification.priority !== 'critical') {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }
    } catch (error) {
      console.error('Error showing browser notification:', error);
    }
  }, [enableBrowserNotifications]);

  // Procesar nueva notificación
  const processNewNotification = useCallback((notification: NotificationData) => {
    // Actualizar lista de notificaciones
    setState(prevState => ({
      ...prevState,
      notifications: [notification, ...prevState.notifications],
      unreadCount: prevState.unreadCount + 1,
    }));

    // Mostrar notificación visual
    showBrowserNotification(notification);

    console.log('Nueva notificación recibida:', notification);
  }, [showBrowserNotification]);

  // Cargar notificaciones desde el servidor
  const loadNotifications = useCallback(async () => {
    if (!userId) return;

    updateState({ isLoading: true, error: null });

    try {
      const [notificationsResponse, countResponse] = await Promise.all([
        NotificationService.getUserNotifications(userId, {
          page: 1,
          limit: 50,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        }),
        NotificationService.getUnreadCount(userId),
      ]);

      if (notificationsResponse.success && countResponse.success) {
        updateState({
          notifications: notificationsResponse.data,
          unreadCount: countResponse.data.count,
          isLoading: false,
        });
      } else {
        throw new Error(notificationsResponse.error || countResponse.error || 'Error loading notifications');
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      updateState({
        error: error instanceof Error ? error.message : 'Error desconocido',
        isLoading: false,
      });
    }
  }, [userId, updateState]);

  // Configurar WebSocket para notificaciones en tiempo real
  const setupWebSocket = useCallback(() => {
    if (!enableRealTime || !userId) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/notifications/${userId}`;
    
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket conectado para notificaciones');
        updateState({ isConnected: true });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'notification') {
            processNewNotification(data.notification);
          } else if (data.type === 'notification_read') {
            // Actualizar notificación como leída
            setState(prevState => ({
              ...prevState,
              notifications: prevState.notifications.map(n =>
                n.id === data.notificationId 
                  ? { ...n, status: 'read' as NotificationStatus, readAt: new Date() }
                  : n
              ),
              unreadCount: Math.max(0, prevState.unreadCount - 1),
            }));
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket desconectado:', event.code, event.reason);
        updateState({ isConnected: false });
        
        // Reconectar después de 5 segundos si no fue cierre intencional
        if (event.code !== 1000) {
          setTimeout(setupWebSocket, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error('Error en WebSocket:', error);
        updateState({ isConnected: false });
      };
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
    }
  }, [enableRealTime, userId, updateState, processNewNotification]);

  // Configurar polling como fallback
  const setupPolling = useCallback(() => {
    if (enableRealTime) return; // No hacer polling si WebSocket está habilitado

    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
    }

    pollTimerRef.current = setInterval(loadNotifications, pollInterval);
  }, [enableRealTime, loadNotifications, pollInterval]);

  // Marcar notificación como leída
  const markAsRead = useCallback(async (id: string) => {
    try {
      const response = await NotificationService.markAsRead(id);
      
      if (response.success) {
        setState(prevState => ({
          ...prevState,
          notifications: prevState.notifications.map(n =>
            n.id === id ? { ...n, status: 'read' as NotificationStatus, readAt: new Date() } : n
          ),
          unreadCount: Math.max(0, prevState.unreadCount - 1),
        }));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await NotificationService.markAllAsRead(userId);
      
      if (response.success) {
        setState(prevState => ({
          ...prevState,
          notifications: prevState.notifications.map(n => ({
            ...n,
            status: 'read' as NotificationStatus,
            readAt: new Date(),
          })),
          unreadCount: 0,
        }));
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [userId]);

  // Eliminar notificación
  const deleteNotification = useCallback(async (id: string) => {
    try {
      const response = await NotificationService.deleteNotification(id);
      
      if (response.success) {
        setState(prevState => {
          const notification = prevState.notifications.find(n => n.id === id);
          const wasUnread = notification && notification.readAt === undefined;
          
          return {
            ...prevState,
            notifications: prevState.notifications.filter(n => n.id !== id),
            unreadCount: wasUnread 
              ? Math.max(0, prevState.unreadCount - 1) 
              : prevState.unreadCount,
          };
        });
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, []);

  // Mostrar notificación manualmente
  const showNotification = useCallback((notification: NotificationData) => {
    if (!enableBrowserNotifications || !('Notification' in window) || 
        Notification.permission !== 'granted') {
      return;
    }

    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: notification.imageUrl || '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: notification.id,
        requireInteraction: notification.priority === 'critical',
        data: {
          notificationId: notification.id,
          actionUrl: notification.actionUrl,
        },
      });

      browserNotification.onclick = () => {
        window.focus();
        if (notification.actionUrl) {
          window.location.href = notification.actionUrl;
        }
        browserNotification.close();
        
        if (autoMarkAsRead) {
          markAsRead(notification.id);
        }
      };

      if (notification.priority !== 'critical') {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }
    } catch (error) {
      console.error('Error showing browser notification:', error);
    }
  }, [enableBrowserNotifications, autoMarkAsRead, markAsRead]);

  // Refrescar notificaciones
  const refresh = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'Component unmounted');
      wsRef.current = null;
    }
    
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  // Effect para inicialización
  useEffect(() => {
    if (!userId) return;

    // Solicitar permisos
    requestNotificationPermission();
    
    // Cargar notificaciones iniciales
    loadNotifications();
    
    // Configurar conexión en tiempo real o polling
    if (enableRealTime) {
      setupWebSocket();
    } else {
      setupPolling();
    }

    return cleanup;
  }, [userId, enableRealTime, requestNotificationPermission, loadNotifications, setupWebSocket, setupPolling, cleanup]);

  // Acciones disponibles
  const actions: NotificationActions = {
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh,
    showNotification,
  };

  return {
    ...state,
    actions,
  };
}

export default useNotifications;