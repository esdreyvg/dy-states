'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Search
} from 'lucide-react';
import { 
  Booking, 
  BookingStatus
} from '../../../../shared/src/types/rental';
import { bookingService } from '../../services/rental';

interface BookingListProps {
  userId: string;
  userType: 'guest' | 'host';
  onBookingSelect?: (booking: Booking) => void;
  className?: string;
}

interface BookingFilters {
  status?: BookingStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  checked_in: 'bg-blue-100 text-blue-800',
  checked_out: 'bg-gray-100 text-gray-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  disputed: 'bg-purple-100 text-purple-800'
};

const STATUS_ICONS: Record<BookingStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  confirmed: <CheckCircle className="h-4 w-4" />,
  checked_in: <Users className="h-4 w-4" />,
  checked_out: <CheckCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
  disputed: <AlertTriangle className="h-4 w-4" />
};

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  checked_in: 'Check-in',
  checked_out: 'Finalizada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  disputed: 'En disputa'
};

export const BookingList: React.FC<BookingListProps> = ({
  userId,
  userType,
  onBookingSelect,
  className = ''
}) => {
  // Estados principales
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros y paginación
  const [filters, setFilters] = useState<BookingFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Cargar reservas
  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookingService.getUserBookings(userId, {
        type: userType,
        status: filters.status,
        page: currentPage,
        limit: 10,
        sortBy: 'checkInDate',
        sortOrder: 'desc'
      });

      if (response.success) {
        setBookings(response.data.bookings);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setError(response.error || 'Error al cargar las reservas');
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Error de conexión al cargar las reservas');
    } finally {
      setLoading(false);
    }
  }, [userId, userType, filters.status, currentPage]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Formatear fecha
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Formatear fecha y hora
  const formatDateTime = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calcular número de noches
  const calculateNights = (checkIn: Date, checkOut: Date): number => {
    const diffTime = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Obtener acciones disponibles según el estado
  const getAvailableActions = (booking: Booking) => {
    const actions = [];
    const today = new Date();
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);

    switch (booking.status) {
      case 'pending':
        if (userType === 'host') {
          actions.push({ id: 'confirm', label: 'Confirmar', color: 'green' });
          actions.push({ id: 'decline', label: 'Rechazar', color: 'red' });
        } else {
          actions.push({ id: 'cancel', label: 'Cancelar', color: 'red' });
        }
        break;
      
      case 'confirmed':
        if (checkInDate <= today && checkOutDate > today) {
          if (userType === 'host') {
            actions.push({ id: 'checkin', label: 'Check-in', color: 'blue' });
          }
        }
        if (checkInDate > today) {
          actions.push({ id: 'modify', label: 'Modificar', color: 'blue' });
          actions.push({ id: 'cancel', label: 'Cancelar', color: 'red' });
        }
        break;
      
      case 'checked_in':
        if (checkOutDate <= today && userType === 'host') {
          actions.push({ id: 'checkout', label: 'Check-out', color: 'green' });
        }
        break;
    }

    actions.push({ id: 'message', label: 'Mensaje', color: 'gray' });
    actions.push({ id: 'details', label: 'Ver detalles', color: 'blue' });

    return actions;
  };

  // Manejar acción de reserva
  const handleBookingAction = async (booking: Booking, action: string) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'confirm':
          await bookingService.confirmBooking(booking.id);
          break;
        case 'decline':
        case 'cancel':
          await bookingService.cancelBooking(booking.id, 'Cancelada por el usuario', userType === 'host' ? 'host' : 'guest');
          break;
        case 'checkin':
          // Simular check-in (en una implementación real habría un método específico)
          console.log('Check-in for booking:', booking.id);
          break;
        case 'checkout':
          // Simular check-out (en una implementación real habría un método específico)
          console.log('Check-out for booking:', booking.id);
          break;
        case 'message':
          // Redirigir a mensajes
          console.log('Open messages for booking:', booking.id);
          break;
        case 'details':
          onBookingSelect?.(booking);
          break;
        case 'modify':
          // Abrir modal de modificación
          console.log('Modify booking:', booking.id);
          break;
      }
      
      // Recargar lista después de la acción
      if (action !== 'message' && action !== 'details' && action !== 'modify' && action !== 'checkin' && action !== 'checkout') {
        await loadBookings();
      }
    } catch (err) {
      console.error('Error handling booking action:', err);
      setError('Error al procesar la acción');
    } finally {
      setLoading(false);
    }
  };

  // Renderizar filtros
  const renderFilters = () => (
    <div className={`bg-gray-50 p-4 border-b transition-all duration-200 ${
      showFilters ? 'block' : 'hidden'
    }`}>
      <div className="flex flex-wrap gap-4">
        {/* Filtro por estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ 
              ...filters, 
              status: e.target.value as BookingStatus || undefined 
            })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Búsqueda */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Buscar por título, huésped..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botón limpiar */}
        <div className="flex items-end">
          <button
            onClick={() => setFilters({})}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar card de reserva
  const renderBookingCard = (booking: Booking) => {
    const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
    const actions = getAvailableActions(booking);

    return (
      <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                Reserva #{booking.id.slice(-8)}
              </h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                STATUS_COLORS[booking.status]
              }`}>
                {STATUS_ICONS[booking.status]}
                <span className="ml-1">{STATUS_LABELS[booking.status]}</span>
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">Rental ID: {booking.rentalId}</span>
            </div>
          </div>

          <div className="ml-4 text-right">
            <div className="text-lg font-bold text-gray-900">
              ${booking.pricing.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {nights} noche{nights !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <div className="font-medium">Check-in</div>
              <div className="text-gray-600">{formatDate(booking.checkInDate)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <div className="font-medium">Check-out</div>
              <div className="text-gray-600">{formatDate(booking.checkOutDate)}</div>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <div>
              <div className="font-medium">Huéspedes</div>
              <div className="text-gray-600">
                {booking.guests.adults + booking.guests.children} huésped{booking.guests.adults + booking.guests.children !== 1 ? 'es' : ''}
              </div>
            </div>
          </div>
        </div>

        {userType === 'host' && booking.guests && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">
              <div className="font-medium mb-1">Huésped principal</div>
              <div className="text-gray-600">
                {booking.guests.adults} adulto{booking.guests.adults !== 1 ? 's' : ''}
                {booking.guests.children > 0 && `, ${booking.guests.children} niño${booking.guests.children !== 1 ? 's' : ''}`}
                {booking.guests.infants > 0 && `, ${booking.guests.infants} bebé${booking.guests.infants !== 1 ? 's' : ''}`}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div>Reservado: {formatDateTime(booking.createdAt)}</div>
            {booking.updatedAt !== booking.createdAt && (
              <div>Actualizado: {formatDateTime(booking.updatedAt)}</div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleBookingAction(booking, action.id)}
                className={`
                  px-3 py-1 text-xs font-medium rounded transition-colors
                  ${action.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                  ${action.color === 'blue' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
                  ${action.color === 'red' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
                  ${action.color === 'gray' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : ''}
                `}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar paginación
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`booking-list bg-white rounded-lg shadow ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {userType === 'host' ? 'Reservas recibidas' : 'Mis reservas'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {bookings.length} reserva{bookings.length !== 1 ? 's' : ''} encontrada{bookings.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </button>
      </div>

      {/* Filtros */}
      {renderFilters()}

      {/* Contenido */}
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Cargando reservas...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay reservas
            </h3>
            <p className="text-gray-600">
              {userType === 'host' 
                ? 'Aún no has recibido ninguna reserva.'
                : 'No tienes ninguna reserva activa.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(renderBookingCard)}
          </div>
        )}
      </div>

      {/* Paginación */}
      {renderPagination()}
    </div>
  );
};

export default BookingList;