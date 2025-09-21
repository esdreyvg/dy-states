// Componente simplificado de configuración de preferencias de notificación
// Simplified user notification preferences configuration component for DY States

'use client';

import React, { useState, useEffect } from 'react';
import { 
  NotificationChannel, 
  NotificationPriority, 
  NotificationType,
  type UserNotificationPreferences,
} from '../../../../shared/src/types/rental';
import usePushNotifications from '../../hooks/usePushNotifications';

interface NotificationPreferencesProps {
  userId: string;
  onPreferencesChange?: (preferences: UserNotificationPreferences) => void;
  className?: string;
}

interface SimplePreferences {
  globalEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  soundEnabled: boolean;
}

const DEFAULT_SIMPLE_PREFERENCES: SimplePreferences = {
  globalEnabled: true,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  emailEnabled: true,
  smsEnabled: false,
  pushEnabled: true,
  inAppEnabled: true,
  soundEnabled: true,
};

export default function NotificationPreferences({
  userId,
  onPreferencesChange,
  className = '',
}: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState<SimplePreferences>(DEFAULT_SIMPLE_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const { isSupported, permission, actions } = usePushNotifications({
    userId,
    enableAutoRegistration: true,
  });

  // Cargar preferencias del usuario
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Por ahora usar las preferencias por defecto
        // En una implementación real se cargarían del backend
        setPreferences(DEFAULT_SIMPLE_PREFERENCES);
      } catch (error) {
        console.error('Error cargando preferencias:', error);
        setError('Error al cargar las preferencias');
        setPreferences(DEFAULT_SIMPLE_PREFERENCES);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadPreferences();
    }
  }, [userId]);

  // Guardar preferencias
  const savePreferences = async (newPreferences: SimplePreferences) => {
    try {
      setIsSaving(true);
      setError(null);

      // Convertir a formato UserNotificationPreferences
      const fullPreferences: UserNotificationPreferences = {
        id: `pref_${userId}`,
        userId,
        globalEnabled: newPreferences.globalEnabled,
        quietHoursEnabled: newPreferences.quietHoursEnabled,
        quietHoursStart: newPreferences.quietHoursStart,
        quietHoursEnd: newPreferences.quietHoursEnd,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        typePreferences: Object.values(NotificationType).reduce((acc, type) => {
          acc[type] = {
            enabled: true,
            channels: [NotificationChannel.IN_APP],
            priority: NotificationPriority.NORMAL,
            frequency: 'immediate' as const,
            soundEnabled: newPreferences.soundEnabled,
          };
          return acc;
        }, {} as UserNotificationPreferences['typePreferences']),
        channelPreferences: {
          [NotificationChannel.EMAIL]: {
            enabled: newPreferences.emailEnabled,
            maxDailyLimit: 50,
            minIntervalMinutes: 5,
          },
          [NotificationChannel.SMS]: {
            enabled: newPreferences.smsEnabled,
            maxDailyLimit: 10,
            minIntervalMinutes: 30,
          },
          [NotificationChannel.PUSH]: {
            enabled: newPreferences.pushEnabled,
            maxDailyLimit: 100,
            minIntervalMinutes: 1,
          },
          [NotificationChannel.IN_APP]: {
            enabled: newPreferences.inAppEnabled,
            maxDailyLimit: 200,
            minIntervalMinutes: 0,
          },
          [NotificationChannel.WEB]: {
            enabled: newPreferences.pushEnabled,
            maxDailyLimit: 100,
            minIntervalMinutes: 1,
          },
          [NotificationChannel.WHATSAPP]: {
            enabled: false,
            maxDailyLimit: 5,
            minIntervalMinutes: 60,
          },
        },
        filters: {
          mutedUsers: [],
          mutedProperties: [],
          mutedKeywords: [],
          priorityThreshold: NotificationPriority.LOW,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // En una implementación real se guardarían en el backend
      // await NotificationService.updateUserPreferences(userId, fullPreferences);
      
      setPreferences(newPreferences);
      onPreferencesChange?.(fullPreferences);
    } catch (error) {
      console.error('Error guardando preferencias:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSaving(false);
    }
  };

  // Actualizar preferencia simple
  const updatePreference = (key: keyof SimplePreferences, value: boolean | string) => {
    const newPreferences = {
      ...preferences,
      [key]: value,
    };
    savePreferences(newPreferences);
  };

  // Enviar notificación de prueba
  const sendTestNotification = () => {
    actions.testNotification();
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  // Solicitar permisos de notificación
  const requestPermissions = async () => {
    await actions.requestPermission();
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando preferencias...</span>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preferencias de Notificación
        </h2>
        <p className="text-gray-600">
          Configura cómo y cuándo quieres recibir notificaciones de DY States.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Estado de permisos de notificación push */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Estado de Notificaciones Push</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              {!isSupported && 'Las notificaciones push no están soportadas en este navegador.'}
              {isSupported && permission === 'granted' && 'Las notificaciones push están habilitadas.'}
              {isSupported && permission === 'denied' && 'Las notificaciones push están bloqueadas.'}
              {isSupported && permission === 'default' && 'Las notificaciones push no han sido configuradas.'}
            </p>
          </div>
          <div className="flex gap-2">
            {isSupported && permission !== 'granted' && (
              <button
                onClick={requestPermissions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Habilitar Notificaciones
              </button>
            )}
            {isSupported && permission === 'granted' && (
              <button
                onClick={sendTestNotification}
                disabled={testNotificationSent}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {testNotificationSent ? 'Enviada ✓' : 'Probar Notificación'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Configuración global */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Configuración General</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Notificaciones Habilitadas</h4>
              <p className="text-sm text-gray-600">
                Activar o desactivar todas las notificaciones
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.globalEnabled}
                onChange={(e) => updatePreference('globalEnabled', e.target.checked)}
                disabled={isSaving}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Canales de notificación */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Canales de Notificación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'pushEnabled' as const,
              title: 'Notificaciones Push',
              description: 'Notificaciones instantáneas en tu dispositivo',
            },
            {
              key: 'emailEnabled' as const,
              title: 'Correo Electrónico',
              description: 'Notificaciones enviadas a tu correo',
            },
            {
              key: 'smsEnabled' as const,
              title: 'SMS',
              description: 'Mensajes de texto a tu teléfono',
            },
            {
              key: 'inAppEnabled' as const,
              title: 'En la Aplicación',
              description: 'Notificaciones dentro de la aplicación',
            },
          ].map((channel) => (
            <div key={channel.key} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{channel.title}</h4>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences[channel.key]}
                    onChange={(e) => updatePreference(channel.key, e.target.checked)}
                    disabled={isSaving || !preferences.globalEnabled}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración de sonido */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Configuración de Sonido</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sonidos de Notificación</h4>
              <p className="text-sm text-gray-600">
                Reproducir sonidos al recibir notificaciones
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => updatePreference('soundEnabled', e.target.checked)}
                disabled={isSaving || !preferences.globalEnabled}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Horario silencioso */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Horario Silencioso</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900">Activar Horario Silencioso</h4>
              <p className="text-sm text-gray-600">
                No recibir notificaciones durante horarios específicos
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.quietHoursEnabled}
                onChange={(e) => updatePreference('quietHoursEnabled', e.target.checked)}
                disabled={isSaving || !preferences.globalEnabled}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
            </label>
          </div>

          {preferences.quietHoursEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de inicio
                </label>
                <input
                  type="time"
                  value={preferences.quietHoursStart}
                  onChange={(e) => updatePreference('quietHoursStart', e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de fin
                </label>
                <input
                  type="time"
                  value={preferences.quietHoursEnd}
                  onChange={(e) => updatePreference('quietHoursEnd', e.target.value)}
                  disabled={isSaving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estado de guardado */}
      {isSaving && (
        <div className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-blue-700">Guardando preferencias...</span>
        </div>
      )}
    </div>
  );
}