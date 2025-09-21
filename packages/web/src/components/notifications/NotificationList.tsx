// Lista de notificaciones con filtros y paginación
// Notification list component with filtering and pagination for DY States

import React, { useState, useMemo } from 'react';
import {
  Bell,
  Filter,
  Search,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { NotificationItem } from './NotificationItem';
import useNotifications from '../../hooks/useNotifications';

// Tipos locales
type NotificationType = 
  | 'message_received' | 'message_replied' | 'conversation_started' | 'conversation_closed'
  | 'booking_confirmed' | 'booking_cancelled' | 'booking_pending' | 'booking_modified'
  | 'booking_reminder' | 'booking_checkin' | 'booking_checkout' | 'booking_review_request'
  | 'property_approved' | 'property_rejected' | 'property_updated' | 'property_featured'
  | 'property_expired' | 'property_maintenance' | 'property_inquiry' | 'property_viewed'
  | 'payment_received' | 'payment_pending' | 'payment_failed' | 'payment_refunded'
  | 'payment_dispute' | 'payout_processed' | 'invoice_generated'
  | 'system' | 'system_maintenance' | 'system_update' | 'backup_completed' | 'backup_failed'
  | 'security_login' | 'security_password_changed' | 'security_account_locked'
  | 'security_suspicious_activity' | 'security_verification_required'
  | 'marketing_promotion' | 'marketing_newsletter' | 'marketing_announcement' | 'marketing_survey'
  | 'user_registered' | 'user_verified' | 'user_suspended' | 'user_reactivated'
  | 'profile_completed' | 'document_uploaded' | 'document_verified' | 'document_rejected';

type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  createdAt: string | Date;
  readAt?: string | Date | null;
  actionUrl?: string;
  imageUrl?: string;
  data?: Record<string, unknown>;
}

interface NotificationListProps {
  userId: string;
  maxHeight?: string;
  showFilters?: boolean;
  showActions?: boolean;
  compact?: boolean;
  enableRealTime?: boolean;
}

interface FilterState {
  search: string;
  type: NotificationType | 'all';
  priority: NotificationPriority | 'all';
  readStatus: 'all' | 'read' | 'unread';
}

// Etiquetas amigables para tipos de notificación
const TYPE_LABELS: Record<NotificationType | 'all', string> = {
  all: 'Todos los tipos',
  // Mensajería
  message_received: 'Mensaje recibido',
  message_replied: 'Mensaje respondido',
  conversation_started: 'Conversación iniciada',
  conversation_closed: 'Conversación cerrada',
  // Reservas
  booking_confirmed: 'Reserva confirmada',
  booking_cancelled: 'Reserva cancelada',
  booking_pending: 'Reserva pendiente',
  booking_modified: 'Reserva modificada',
  booking_reminder: 'Recordatorio de reserva',
  booking_checkin: 'Check-in',
  booking_checkout: 'Check-out',
  booking_review_request: 'Solicitud de reseña',
  // Propiedades
  property_approved: 'Propiedad aprobada',
  property_rejected: 'Propiedad rechazada',
  property_updated: 'Propiedad actualizada',
  property_featured: 'Propiedad destacada',
  property_expired: 'Propiedad expirada',
  property_maintenance: 'Mantenimiento',
  property_inquiry: 'Consulta de propiedad',
  property_viewed: 'Propiedad vista',
  // Pagos
  payment_received: 'Pago recibido',
  payment_pending: 'Pago pendiente',
  payment_failed: 'Pago fallido',
  payment_refunded: 'Pago reembolsado',
  payment_dispute: 'Disputa de pago',
  payout_processed: 'Pago procesado',
  invoice_generated: 'Factura generada',
  // Sistema
  system: 'Sistema',
  system_maintenance: 'Mantenimiento del sistema',
  system_update: 'Actualización del sistema',
  backup_completed: 'Respaldo completado',
  backup_failed: 'Respaldo fallido',
  // Seguridad
  security_login: 'Inicio de sesión',
  security_password_changed: 'Contraseña cambiada',
  security_account_locked: 'Cuenta bloqueada',
  security_suspicious_activity: 'Actividad sospechosa',
  security_verification_required: 'Verificación requerida',
  // Marketing
  marketing_promotion: 'Promoción',
  marketing_newsletter: 'Newsletter',
  marketing_announcement: 'Anuncio',
  marketing_survey: 'Encuesta',
  // Usuarios
  user_registered: 'Usuario registrado',
  user_verified: 'Usuario verificado',
  user_suspended: 'Usuario suspendido',
  user_reactivated: 'Usuario reactivado',
  profile_completed: 'Perfil completado',
  document_uploaded: 'Documento subido',
  document_verified: 'Documento verificado',
  document_rejected: 'Documento rechazado',
};

const PRIORITY_LABELS: Record<NotificationPriority | 'all', string> = {
  all: 'Todas las prioridades',
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica',
};

const READ_STATUS_LABELS = {
  all: 'Todas',
  read: 'Leídas',
  unread: 'No leídas',
};

export function NotificationList({
  userId,
  maxHeight = '600px',
  showFilters = true,
  showActions = true,
  compact = false,
  enableRealTime = true,
}: NotificationListProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    priority: 'all',
    readStatus: 'all',
  });

  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Hook de notificaciones
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    isConnected,
    actions,
  } = useNotifications({
    userId,
    enableRealTime,
    enableBrowserNotifications: true,
    autoMarkAsRead: false,
  });

  // Filtrar notificaciones
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !notification.title.toLowerCase().includes(searchLower) &&
          !notification.message.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Filtro por tipo
      if (filters.type !== 'all' && notification.type !== filters.type) {
        return false;
      }

      // Filtro por prioridad
      if (filters.priority !== 'all' && notification.priority !== filters.priority) {
        return false;
      }

      // Filtro por estado de lectura
      if (filters.readStatus !== 'all') {
        const isRead = !!notification.readAt;
        if (filters.readStatus === 'read' && !isRead) return false;
        if (filters.readStatus === 'unread' && isRead) return false;
      }

      return true;
    });
  }, [notifications, filters]);

  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      priority: 'all',
      readStatus: 'all',
    });
  };

  const handleNotificationAction = (notification: NotificationData) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </CardTitle>
            
            {isConnected && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                En vivo
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showFilters && (
              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={`p-2 rounded-md transition-colors ${
                  showFiltersPanel 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Filtros"
              >
                <Filter className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={actions.refresh}
              disabled={isLoading}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Actualizar"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {showActions && (
              <>
                <button
                  onClick={actions.markAllAsRead}
                  disabled={unreadCount === 0}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  title="Marcar todas como leídas"
                >
                  <CheckCircle className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && showFiltersPanel && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium mb-1">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleUpdateFilters({ search: e.target.value })}
                    placeholder="Buscar en título o mensaje..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleUpdateFilters({ type: e.target.value as NotificationType | 'all' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {Object.entries(TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Prioridad */}
              <div>
                <label className="block text-sm font-medium mb-1">Prioridad</label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleUpdateFilters({ priority: e.target.value as NotificationPriority | 'all' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado de lectura */}
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                  value={filters.readStatus}
                  onChange={(e) => handleUpdateFilters({ readStatus: e.target.value as 'all' | 'read' | 'unread' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {Object.entries(READ_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredNotifications.length} de {notifications.length} notificaciones
              </div>
              
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div 
          className="space-y-2 overflow-y-auto p-4"
          style={{ maxHeight }}
        >
          {error && (
            <div className="text-center py-8 text-red-600 dark:text-red-400">
              <p>Error al cargar notificaciones:</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={actions.refresh}
                className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {isLoading && notifications.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p>Cargando notificaciones...</p>
            </div>
          )}

          {!isLoading && !error && filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-2" />
              <p>
                {notifications.length === 0 
                  ? 'No tienes notificaciones' 
                  : 'No hay notificaciones que coincidan con los filtros'
                }
              </p>
            </div>
          )}

          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification as unknown as NotificationData}
              onMarkAsRead={actions.markAsRead}
              onDelete={actions.deleteNotification}
              onAction={handleNotificationAction}
              showActions={showActions}
              compact={compact}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default NotificationList;