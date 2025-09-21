// Hook para gestión de notificaciones en React Native
// React Native notifications management hook for DY States

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import PushNotificationService, { 
  NotificationData, 
  PushNotificationConfig,
  NotificationType,
  NotificationPriority
} from '../services/PushNotificationService';

export interface NotificationHookOptions {
  userId?: string;
  enableAutoInit?: boolean;
  enableAutoRegister?: boolean;
  onNotificationReceived?: (notification: NotificationData) => void;
  onNotificationOpened?: (notification: NotificationData) => void;
}

export interface NotificationState {
  isInitialized: boolean;
  isPermissionGranted: boolean;
  token: string | null;
  config: PushNotificationConfig;
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  lastNotification: NotificationData | null;
  stats: {
    totalReceived: number;
    totalOpened: number;
    lastReceived?: Date;
  };
}

export interface NotificationActions {
  initialize: () => Promise<boolean>;
  requestPermissions: () => Promise<boolean>;
  registerDevice: () => Promise<boolean>;
  unregisterDevice: () => Promise<boolean>;
  updateConfig: (config: Partial<PushNotificationConfig>) => Promise<void>;
  sendTestNotification: () => Promise<void>;
  clearUnreadCount: () => void;
  refreshStats: () => Promise<void>;
  getDebugInfo: () => any;
}

export function useNotifications(options: NotificationHookOptions = {}) {
  const {
    userId,
    enableAutoInit = true,
    enableAutoRegister = true,
    onNotificationReceived,
    onNotificationOpened,
  } = options;

  const [state, setState] = useState<NotificationState>({
    isInitialized: false,
    isPermissionGranted: false,
    token: null,
    config: {
      enableForeground: true,
      enableBackground: true,
      enableSound: true,
      enableVibration: true,
      enableBadge: true,
    },
    isLoading: false,
    error: null,
    unreadCount: 0,
    lastNotification: null,
    stats: {
      totalReceived: 0,
      totalOpened: 0,
    },
  });

  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const initializationAttempted = useRef(false);

  // Función para actualizar estado de manera segura
  const updateState = useCallback((updates: Partial<NotificationState>) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  // Inicializar servicio de notificaciones
  const initialize = useCallback(async (): Promise<boolean> => {
    try {
      updateState({ isLoading: true, error: null });

      const success = await PushNotificationService.initialize();
      
      if (success) {
        const token = PushNotificationService.getCurrentToken();
        const config = PushNotificationService.getConfig();
        
        updateState({
          isInitialized: true,
          token,
          config,
          isLoading: false,
        });

        console.log('Hook de notificaciones inicializado correctamente');
        return true;
      } else {
        throw new Error('Falló la inicialización del servicio');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
      });
      console.error('Error en hook de notificaciones:', error);
      return false;
    }
  }, [updateState]);

  // Solicitar permisos
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      updateState({ isLoading: true, error: null });

      const granted = await PushNotificationService.requestPermissions();
      
      updateState({
        isPermissionGranted: granted,
        isLoading: false,
      });

      return granted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  }, [updateState]);

  // Registrar dispositivo
  const registerDevice = useCallback(async (): Promise<boolean> => {
    if (!userId) {
      console.warn('No se puede registrar dispositivo sin userId');
      return false;
    }

    try {
      updateState({ isLoading: true, error: null });

      const success = await PushNotificationService.registerDevice(userId);
      
      if (success) {
        updateState({ isLoading: false });
        console.log('Dispositivo registrado correctamente');
        return true;
      } else {
        throw new Error('Falló el registro del dispositivo');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  }, [userId, updateState]);

  // Desregistrar dispositivo
  const unregisterDevice = useCallback(async (): Promise<boolean> => {
    try {
      updateState({ isLoading: true, error: null });

      const success = await PushNotificationService.unregisterDevice();
      
      updateState({
        token: null,
        isLoading: false,
      });

      return success;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      updateState({
        error: errorMessage,
        isLoading: false,
      });
      return false;
    }
  }, [updateState]);

  // Actualizar configuración
  const updateConfig = useCallback(async (config: Partial<PushNotificationConfig>): Promise<void> => {
    try {
      await PushNotificationService.updateConfig(config);
      const newConfig = PushNotificationService.getConfig();
      
      updateState({ config: newConfig });
    } catch (error) {
      console.error('Error actualizando configuración:', error);
    }
  }, [updateState]);

  // Enviar notificación de prueba
  const sendTestNotification = useCallback(async (): Promise<void> => {
    try {
      await PushNotificationService.sendTestNotification();
      
      // Simular recepción de notificación
      const testNotification: NotificationData = {
        id: `test_${Date.now()}`,
        title: 'Notificación de Prueba',
        body: 'Esta es una notificación de prueba',
        type: NotificationType.GENERAL_ANNOUNCEMENT,
        priority: NotificationPriority.NORMAL,
        data: { test: true },
      };

      updateState({
        lastNotification: testNotification,
        unreadCount: state.unreadCount + 1,
      });

      onNotificationReceived?.(testNotification);
    } catch (error) {
      console.error('Error enviando notificación de prueba:', error);
    }
  }, [state.unreadCount, updateState, onNotificationReceived]);

  // Limpiar contador de no leídas
  const clearUnreadCount = useCallback(() => {
    updateState({ unreadCount: 0 });
  }, [updateState]);

  // Refrescar estadísticas
  const refreshStats = useCallback(async (): Promise<void> => {
    try {
      const stats = await PushNotificationService.getNotificationStats();
      updateState({ stats });
    } catch (error) {
      console.error('Error refrescando estadísticas:', error);
    }
  }, [updateState]);

  // Obtener información de debug
  const getDebugInfo = useCallback(() => {
    return {
      hookState: state,
      serviceDebug: PushNotificationService.getDebugInfo(),
      options,
    };
  }, [state, options]);

  // Manejar cambios en el estado de la app
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log('App state changed:', appStateRef.current, '->', nextAppState);
      
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App volvió al primer plano');
        // Refrescar estadísticas cuando la app vuelve al primer plano
        refreshStats();
      }
      
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
    };
  }, [refreshStats]);

  // Inicialización automática
  useEffect(() => {
    if (enableAutoInit && !initializationAttempted.current) {
      initializationAttempted.current = true;
      
      const initializeNotifications = async () => {
        console.log('Iniciando inicialización automática de notificaciones...');
        
        const success = await initialize();
        
        if (success) {
          // Solicitar permisos
          const permissionGranted = await requestPermissions();
          
          // Registro automático si hay userId y permisos
          if (enableAutoRegister && userId && permissionGranted) {
            await registerDevice();
          }
          
          // Cargar estadísticas
          await refreshStats();
        }
      };

      initializeNotifications();
    }
  }, [enableAutoInit, enableAutoRegister, userId, initialize, requestPermissions, registerDevice, refreshStats]);

  // Verificar permisos periódicamente
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const status = await PushNotificationService.getPermissionStatus();
        updateState({ isPermissionGranted: status === 'granted' });
      } catch (error) {
        console.error('Error verificando permisos:', error);
      }
    };

    // Verificar al montar y cada 30 segundos
    checkPermissions();
    const interval = setInterval(checkPermissions, 30000);

    return () => clearInterval(interval);
  }, [updateState]);

  // Limpiar error después de 10 segundos
  useEffect(() => {
    if (state.error) {
      const timeout = setTimeout(() => {
        updateState({ error: null });
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [state.error, updateState]);

  // Acciones disponibles
  const actions: NotificationActions = {
    initialize,
    requestPermissions,
    registerDevice,
    unregisterDevice,
    updateConfig,
    sendTestNotification,
    clearUnreadCount,
    refreshStats,
    getDebugInfo,
  };

  return {
    ...state,
    actions,
  };
}

export default useNotifications;