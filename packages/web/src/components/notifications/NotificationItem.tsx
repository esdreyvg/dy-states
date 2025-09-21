// Componente para mostrar una notificación individual
// Component for displaying individual notifications in DY States

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import {
  Bell,
  MessageSquare,
  Calendar,
  Home,
  CreditCard,
  AlertTriangle,
  Shield,
  User,
  X,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';

// Tipos locales para evitar problemas de importación
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

interface NotificationItemProps {
  notification: NotificationData;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAction?: (notification: NotificationData) => void;
  showActions?: boolean;
  compact?: boolean;
}

// Mapeo de iconos por tipo de notificación
const NOTIFICATION_ICONS: Record<NotificationType, React.ComponentType<{ className?: string }>> = {
  // Mensajería
  'message_received': MessageSquare,
  'message_replied': MessageSquare,
  'conversation_started': MessageSquare,
  'conversation_closed': MessageSquare,
  
  // Reservas
  'booking_confirmed': Calendar,
  'booking_cancelled': Calendar,
  'booking_pending': Calendar,
  'booking_modified': Calendar,
  'booking_reminder': Calendar,
  'booking_checkin': Calendar,
  'booking_checkout': Calendar,
  'booking_review_request': Calendar,
  
  // Propiedades
  'property_approved': Home,
  'property_rejected': Home,
  'property_updated': Home,
  'property_featured': Home,
  'property_expired': Home,
  'property_maintenance': Home,
  'property_inquiry': Home,
  'property_viewed': Home,
  
  // Pagos
  'payment_received': CreditCard,
  'payment_pending': CreditCard,
  'payment_failed': CreditCard,
  'payment_refunded': CreditCard,
  'payment_dispute': CreditCard,
  'payout_processed': CreditCard,
  'invoice_generated': CreditCard,
  
  // Sistema
  'system': Bell,
  'system_maintenance': AlertTriangle,
  'system_update': Bell,
  'backup_completed': Shield,
  'backup_failed': AlertTriangle,
  
  // Seguridad
  'security_login': Shield,
  'security_password_changed': Shield,
  'security_account_locked': AlertTriangle,
  'security_suspicious_activity': AlertTriangle,
  'security_verification_required': Shield,
  
  // Marketing
  'marketing_promotion': Bell,
  'marketing_newsletter': Bell,
  'marketing_announcement': Bell,
  'marketing_survey': Bell,
  
  // Usuarios
  'user_registered': User,
  'user_verified': User,
  'user_suspended': AlertTriangle,
  'user_reactivated': User,
  'profile_completed': User,
  'document_uploaded': User,
  'document_verified': User,
  'document_rejected': AlertTriangle,
};

// Colores por prioridad
const PRIORITY_STYLES: Record<NotificationPriority, {
  border: string;
  background: string;
  text: string;
  icon: string;
}> = {
  low: {
    border: 'border-l-blue-400',
    background: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-900 dark:text-blue-100',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  medium: {
    border: 'border-l-green-400',
    background: 'bg-green-50 dark:bg-green-950/20',
    text: 'text-green-900 dark:text-green-100',
    icon: 'text-green-600 dark:text-green-400',
  },
  high: {
    border: 'border-l-yellow-400',
    background: 'bg-yellow-50 dark:bg-yellow-950/20',
    text: 'text-yellow-900 dark:text-yellow-100',
    icon: 'text-yellow-600 dark:text-yellow-400',
  },
  critical: {
    border: 'border-l-red-400',
    background: 'bg-red-50 dark:bg-red-950/20',
    text: 'text-red-900 dark:text-red-100',
    icon: 'text-red-600 dark:text-red-400',
  },
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onAction,
  showActions = true,
  compact = false,
}: NotificationItemProps) {
  const Icon = NOTIFICATION_ICONS[notification.type] || Bell;
  const priorityStyle = PRIORITY_STYLES[notification.priority];
  const isUnread = !notification.readAt;
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: es,
  });

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead?.(notification.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(notification.id);
  };

  const handleAction = () => {
    onAction?.(notification);
  };

  const cardClasses = `
    transition-all duration-200 hover:shadow-md cursor-pointer
    ${priorityStyle.border} border-l-4
    ${isUnread ? priorityStyle.background : 'bg-white dark:bg-gray-800'}
    ${isUnread ? 'shadow-sm' : 'opacity-75'}
  `.trim();

  return (
    <Card className={cardClasses} onClick={handleAction}>
      <CardContent className={`p-4 ${compact ? 'py-3' : ''}`}>
        <div className="flex items-start gap-3">
          {/* Icono de la notificación */}
          <div className={`flex-shrink-0 mt-1 ${priorityStyle.icon}`}>
            <Icon className={`${compact ? 'h-4 w-4' : 'h-5 w-5'}`} />
          </div>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {/* Título */}
                <h4 className={`
                  font-medium leading-tight
                  ${compact ? 'text-sm' : 'text-base'}
                  ${isUnread ? priorityStyle.text : 'text-gray-700 dark:text-gray-300'}
                `}>
                  {notification.title}
                  {isUnread && (
                    <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </h4>

                {/* Mensaje */}
                <p className={`
                  mt-1 text-gray-600 dark:text-gray-400 leading-relaxed
                  ${compact ? 'text-xs' : 'text-sm'}
                `}>
                  {notification.message}
                </p>

                {/* Metadatos */}
                <div className={`
                  mt-2 flex items-center gap-4 text-gray-500 dark:text-gray-500
                  ${compact ? 'text-xs' : 'text-xs'}
                `}>
                  <span>{timeAgo}</span>
                  {notification.readAt && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Leído
                    </span>
                  )}
                  {notification.actionUrl && (
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      Acción disponible
                    </span>
                  )}
                </div>
              </div>

              {/* Acciones */}
              {showActions && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  {isUnread && onMarkAsRead && (
                    <button
                      onClick={handleMarkAsRead}
                      className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                      title="Marcar como leído"
                    >
                      <EyeOff className="h-4 w-4" />
                    </button>
                  )}
                  
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className="h-8 w-8 p-0 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-600 flex items-center justify-center transition-colors"
                      title="Eliminar notificación"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Imagen opcional */}
        {notification.imageUrl && !compact && (
          <div className="mt-3 ml-8">
            <Image
              src={notification.imageUrl}
              alt=""
              width={200}
              height={128}
              className="rounded-md max-w-xs max-h-32 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Datos adicionales en desarrollo */}
        {process.env.NODE_ENV === 'development' && notification.data && !compact && (
          <details className="mt-3 ml-8">
            <summary className="text-xs text-gray-400 cursor-pointer">
              Datos de desarrollo
            </summary>
            <pre className="mt-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 rounded p-2 overflow-auto max-h-32">
              {JSON.stringify(notification.data, null, 2)}
            </pre>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationItem;