// Configuración base para Push Notifications
// Base configuration for push notifications in DY States

// Configuración de Firebase (estas variables deben estar en .env)
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// VAPID Key para Web Push
export const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// Tipos para mensajes de Firebase
export interface FirebaseMessage {
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: Record<string, string>;
  from?: string;
  messageId?: string;
}

// Configuración de notificaciones personalizadas
export interface CustomNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
}

// Función para registrar el service worker
export const registerServiceWorker = async (): Promise<boolean> => {
  try {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('Service Worker no está disponible');
      return false;
    }

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registrado:', registration);
    return true;
  } catch (error) {
    console.error('Error registrando Service Worker:', error);
    return false;
  }
};

// Función para mostrar notificación local
export const showLocalNotification = (options: CustomNotificationOptions): void => {
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icon-192x192.png',
        badge: options.badge || '/icon-192x192.png',
        tag: options.tag,
        data: options.data,
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false,
      });

      // Simular vibración si está disponible
      if (options.vibrate && 'vibrate' in navigator) {
        navigator.vibrate(options.vibrate);
      }

      // Manejar clic en la notificación
      notification.onclick = () => {
        window.focus();
        if (options.data?.url) {
          window.location.href = options.data.url as string;
        }
        notification.close();
      };

      // Auto-cerrar después de 5 segundos si no es crítica
      if (!options.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
    }
  } catch (error) {
    console.error('Error mostrando notificación local:', error);
  }
};

// Estado de las notificaciones
export const getNotificationPermission = (): NotificationPermission => {
  if ('Notification' in window) {
    return Notification.permission;
  }
  return 'denied';
};

// Función para solicitar permisos de notificación
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  try {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  } catch (error) {
    console.error('Error solicitando permiso de notificación:', error);
    return 'denied';
  }
};

// Función para verificar soporte de notificaciones
export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

// Función para verificar soporte de Service Worker
export const isServiceWorkerSupported = (): boolean => {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator;
};

// Función para verificar soporte de Push API
export const isPushSupported = (): boolean => {
  return typeof window !== 'undefined' && 'PushManager' in window;
};

// Función para obtener capacidades del dispositivo
export const getDeviceCapabilities = () => {
  return {
    notifications: isNotificationSupported(),
    serviceWorker: isServiceWorkerSupported(),
    push: isPushSupported(),
    permission: getNotificationPermission(),
  };
};

// Función para simular token FCM (para desarrollo)
export const generateMockFCMToken = (): string => {
  return `mock_fcm_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Utilidades para configuración de Firebase
export const validateFirebaseConfig = (): boolean => {
  const requiredFields = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  return requiredFields.every(field => !!process.env[field]);
};

// Configuración para diferentes entornos
export const getEnvironmentConfig = () => {
  const isDev = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    isDev,
    isProduction,
    useFirebase: validateFirebaseConfig(),
    debugMode: isDev,
    vapidKey: VAPID_KEY,
  };
};

const pushNotificationUtils = {
  registerServiceWorker,
  showLocalNotification,
  getNotificationPermission,
  requestNotificationPermission,
  isNotificationSupported,
  isServiceWorkerSupported,
  isPushSupported,
  getDeviceCapabilities,
  generateMockFCMToken,
  validateFirebaseConfig,
  getEnvironmentConfig,
};

export default pushNotificationUtils;