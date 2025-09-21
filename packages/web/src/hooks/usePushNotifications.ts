// Hook para gestión de Push Notifications
// Push notification management hook for DY States

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  requestNotificationPermission,
  showLocalNotification,
  registerServiceWorker,
  getDeviceCapabilities,
  generateMockFCMToken,
  getEnvironmentConfig,
  type CustomNotificationOptions,
} from '../lib/firebase';
import { NotificationService } from '../services/notification';
import { DevicePlatform, type Notification } from '../../../shared/src/types/rental';

export interface PushNotificationHookOptions {
  userId?: string;
  enableAutoRegistration?: boolean;
  enableForegroundNotifications?: boolean;
  onTokenReceived?: (token: string) => void;
  onNotificationReceived?: (notification: CustomNotificationOptions) => void;
  onNotificationClicked?: (notification: Notification | CustomNotificationOptions) => void;
}

export interface PushNotificationState {
  isSupported: boolean;
  permission: NotificationPermission;
  token: string | null;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
  capabilities: ReturnType<typeof getDeviceCapabilities>;
}

export interface PushNotificationActions {
  requestPermission: () => Promise<NotificationPermission>;
  registerDevice: () => Promise<boolean>;
  showNotification: (options: CustomNotificationOptions) => void;
  refreshToken: () => Promise<string | null>;
  unregisterDevice: () => Promise<boolean>;
  testNotification: () => void;
}

export function usePushNotifications(options: PushNotificationHookOptions = {}) {
  const {
    userId,
    enableAutoRegistration = true,
    enableForegroundNotifications = true,
    onTokenReceived,
    onNotificationReceived,
    onNotificationClicked,
  } = options;

  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    permission: 'default',
    token: null,
    isRegistered: false,
    isLoading: false,
    error: null,
    capabilities: getDeviceCapabilities(),
  });

  const tokenRef = useRef<string | null>(null);
  const environmentRef = useRef(getEnvironmentConfig());

  // Función para actualizar estado de manera segura
  const updateState = useCallback((updates: Partial<PushNotificationState>) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  // Solicitar permisos de notificación
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    try {
      updateState({ isLoading: true, error: null });
      
      const permission = await requestNotificationPermission();
      
      updateState({ 
        permission,
        isLoading: false,
      });

      return permission;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({ 
        error: errorMessage,
        isLoading: false,
      });
      return 'denied';
    }
  }, [updateState]);

  // Obtener token FCM (o mock en desarrollo)
  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const environment = environmentRef.current;
      
      if (environment.isDev && !environment.useFirebase) {
        // Usar token mock en desarrollo
        const mockToken = generateMockFCMToken();
        console.log('Usando token FCM mock:', mockToken);
        return mockToken;
      }

      // En producción, aquí se obtendría el token real de Firebase
      // return await getFCMToken();
      
      // Por ahora, usar mock
      return generateMockFCMToken();
    } catch (error) {
      console.error('Error obteniendo token FCM:', error);
      return null;
    }
  }, []);

  // Registrar dispositivo para push notifications
  const registerDevice = useCallback(async (): Promise<boolean> => {
    if (!userId) {
      console.warn('No se puede registrar dispositivo sin userId');
      return false;
    }

    try {
      updateState({ isLoading: true, error: null });

      // Verificar permisos
      const permission = await requestPermission();
      if (permission !== 'granted') {
        throw new Error('Permisos de notificación no concedidos');
      }

      // Registrar service worker
      const swRegistered = await registerServiceWorker();
      if (!swRegistered) {
        throw new Error('No se pudo registrar el service worker');
      }

      // Obtener token
      const token = await getToken();
      if (!token) {
        throw new Error('No se pudo obtener el token FCM');
      }

      tokenRef.current = token;

      // Registrar dispositivo en el backend
      const deviceData = {
        userId,
        platform: DevicePlatform.WEB,
        deviceToken: token,
        deviceInfo: {
          model: navigator.userAgent,
          osVersion: navigator.platform,
          appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
          manufacturer: 'Browser',
          isPhysicalDevice: true,
        },
        settings: {
          enablePush: true,
          enableSound: true,
          enableVibration: true,
          enableBadge: true,
        },
      };

      const response = await NotificationService.registerDevice(deviceData);
      
      if (response.success) {
        updateState({
          token,
          isRegistered: true,
          isLoading: false,
        });

        onTokenReceived?.(token);
        return true;
      } else {
        throw new Error(response.error || 'Error registrando dispositivo');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
        isRegistered: false,
      });
      return false;
    }
  }, [userId, requestPermission, getToken, updateState, onTokenReceived]);

  // Desregistrar dispositivo
  const unregisterDevice = useCallback(async (): Promise<boolean> => {
    try {
      updateState({ isLoading: true, error: null });

      // En una implementación real, se desregistraría del backend
      // await NotificationService.deleteDevice(deviceId);

      updateState({
        token: null,
        isRegistered: false,
        isLoading: false,
      });

      tokenRef.current = null;
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  }, [updateState]);

  // Mostrar notificación local
  const showNotification = useCallback((options: CustomNotificationOptions) => {
    try {
      showLocalNotification(options);
      onNotificationReceived?.(options);
    } catch (error) {
      console.error('Error mostrando notificación:', error);
    }
  }, [onNotificationReceived]);

  // Refrescar token
  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      const newToken = await getToken();
      if (newToken && newToken !== tokenRef.current) {
        tokenRef.current = newToken;
        updateState({ token: newToken });
        onTokenReceived?.(newToken);
      }
      return newToken;
    } catch (error) {
      console.error('Error refrescando token:', error);
      return null;
    }
  }, [getToken, updateState, onTokenReceived]);

  // Mostrar notificación de prueba
  const testNotification = useCallback(() => {
    showNotification({
      title: 'Notificación de Prueba - DY States',
      body: 'Esta es una notificación de prueba para verificar que el sistema funciona correctamente.',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'test-notification',
      data: {
        type: 'test',
        timestamp: Date.now(),
      },
      requireInteraction: false,
      vibrate: [200, 100, 200],
    });
  }, [showNotification]);

  // Configurar listeners para Service Worker
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { data } = event;
      
      if (data && data.type) {
        switch (data.type) {
          case 'NOTIFICATION_CLICK':
            console.log('Notificación clickeada:', data);
            onNotificationClicked?.(data.data);
            break;
          
          case 'NOTIFICATION_CLOSE':
            console.log('Notificación cerrada:', data);
            break;
          
          case 'FOREGROUND_MESSAGE':
            console.log('Mensaje en primer plano:', data);
            if (enableForegroundNotifications) {
              showNotification({
                title: data.notification?.title || 'Nueva notificación',
                body: data.notification?.body || 'Tienes una nueva notificación',
                icon: data.notification?.icon,
                data: data.data,
              });
            }
            onNotificationReceived?.(data);
            break;
        }
      }
    };

    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, [enableForegroundNotifications, showNotification, onNotificationReceived, onNotificationClicked]);

  // Inicialización automática
  useEffect(() => {
    const initialize = async () => {
      // Actualizar capacidades
      const capabilities = getDeviceCapabilities();
      updateState({ 
        capabilities,
        isSupported: capabilities.notifications && capabilities.serviceWorker,
        permission: capabilities.permission,
      });

      // Registro automático si está habilitado
      if (enableAutoRegistration && userId && capabilities.notifications) {
        await registerDevice();
      }
    };

    initialize();
  }, [userId, enableAutoRegistration, registerDevice, updateState]);

  // Acciones disponibles
  const actions: PushNotificationActions = {
    requestPermission,
    registerDevice,
    showNotification,
    refreshToken,
    unregisterDevice,
    testNotification,
  };

  return {
    ...state,
    actions,
  };
}

export default usePushNotifications;