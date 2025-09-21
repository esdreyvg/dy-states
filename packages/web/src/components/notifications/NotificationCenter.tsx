// Componente principal de notificaciones con botón flotante
// Main notification component with floating button and dropdown for DY States

import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Card } from '../ui/card';
import { NotificationList } from './NotificationList';
import useNotifications from '../../hooks/useNotifications';

interface NotificationCenterProps {
  userId: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  enableRealTime?: boolean;
}

export function NotificationCenter({
  userId,
  position = 'top-right',
  enableRealTime = true,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { unreadCount, isConnected } = useNotifications({
    userId,
    enableRealTime,
    enableBrowserNotifications: true,
    autoMarkAsRead: false,
  });

  // Posiciones del dropdown
  const positionClasses = {
    'top-right': 'right-0 top-12',
    'top-left': 'left-0 top-12',
    'bottom-right': 'right-0 bottom-12',
    'bottom-left': 'left-0 bottom-12',
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Animación de entrada/salida
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`
          relative p-3 rounded-full transition-all duration-200
          ${isOpen 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
          }
          border border-gray-200 dark:border-gray-600
        `}
        title={`Notificaciones${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
      >
        <Bell className="h-5 w-5" />
        
        {/* Badge de notificaciones no leídas */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}

        {/* Indicador de conexión en tiempo real */}
        {isConnected && enableRealTime && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isVisible && (
        <div
          ref={containerRef}
          className={`
            absolute z-50 w-96 transition-all duration-200 transform origin-top
            ${positionClasses[position]}
            ${isOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }
          `}
        >
          <Card className="shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header del dropdown */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h3 className="font-semibold">Notificaciones</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-xs rounded-full px-2 py-1">
                    {unreadCount} nuevas
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Lista de notificaciones */}
            <div className="max-h-96 overflow-hidden">
              <NotificationList
                userId={userId}
                maxHeight="384px"
                showFilters={false}
                showActions={true}
                compact={true}
                enableRealTime={enableRealTime}
              />
            </div>

            {/* Footer con link a ver todas */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Aquí podrías navegar a una página completa de notificaciones
                  console.log('Navegar a todas las notificaciones');
                }}
                className="w-full text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Ver todas las notificaciones
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;