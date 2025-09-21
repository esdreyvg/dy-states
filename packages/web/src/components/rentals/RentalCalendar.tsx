'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar,
  ChevronLeft, 
  ChevronRight,
  DollarSign,
  Lock,
  Eye,
  Save,
  AlertCircle,
  X
} from 'lucide-react';
import { 
  CalendarDay,
  RentalCalendar as RentalCalendarType,
} from '../../../../shared/src/types/rental';
import { calendarService, RentalUtils } from '../../services/rental';

// Tipos para el componente
interface RentalCalendarProps {
  rentalId: string;
  initialCalendar?: RentalCalendarType;
  isOwner?: boolean;
  isReadOnly?: boolean;
  onDateSelect?: (date: Date, dayData: CalendarDay) => void;
  onDateRangeSelect?: (startDate: Date, endDate: Date) => void;
  onPriceChange?: (date: Date, newPrice: number) => void;
  onAvailabilityChange?: (date: Date, isAvailable: boolean) => void;
  className?: string;
}

interface CalendarCell extends CalendarDay {
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isOtherMonth: boolean;
  displayDate: number;
}

interface CalendarViewMode {
  type: 'month' | 'year';
  date: Date;
}

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const AVAILABILITY_COLORS = {
  available: 'bg-green-100 border-green-300 text-green-800',
  booked: 'bg-blue-100 border-blue-300 text-blue-800',
  blocked: 'bg-red-100 border-red-300 text-red-800',
  unavailable: 'bg-gray-100 border-gray-300 text-gray-500',
  today: 'ring-2 ring-blue-500',
  selected: 'bg-blue-500 text-white',
  inRange: 'bg-blue-200 border-blue-400',
  otherMonth: 'text-gray-400'
};

export const RentalCalendar: React.FC<RentalCalendarProps> = ({
  rentalId,
  initialCalendar,
  isOwner = false,
  isReadOnly = false,
  onDateSelect,
  onDateRangeSelect,
  onPriceChange,
  className = ''
}) => {
  // Estados principales
  const [viewMode, setViewMode] = useState<CalendarViewMode>({
    type: 'month',
    date: new Date()
  });
  const [calendar, setCalendar] = useState<RentalCalendarType | null>(initialCalendar || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para selección de fechas
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  // Estados para edición (solo propietarios)
  const [editMode, setEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, Partial<CalendarDay>>>(new Map());
  const [showPriceEditor, setShowPriceEditor] = useState(false);
  const [priceEditDate, setPriceEditDate] = useState<Date | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Estados para operaciones en masa
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [bulkSelectedDates, setBulkSelectedDates] = useState<Set<string>>(new Set());

  // Configuración de vista
  const [showPrices, setShowPrices] = useState(true);
  const [highlightWeekends, setHighlightWeekends] = useState(true);

  // Cargar datos del calendario
  const loadCalendarData = useCallback(async (startDate: Date, endDate: Date) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await calendarService.getRentalCalendar(rentalId, startDate, endDate);
      if (response.success) {
        setCalendar(response.data);
      } else {
        setError(response.error || 'Error al cargar el calendario');
      }
    } catch (err) {
      console.error('Error loading calendar:', err);
      setError('Error de conexión al cargar el calendario');
    } finally {
      setLoading(false);
    }
  }, [rentalId]);

  // Efecto para cargar datos cuando cambia la vista
  useEffect(() => {
    const startOfMonth = new Date(viewMode.date.getFullYear(), viewMode.date.getMonth(), 1);
    const endOfMonth = new Date(viewMode.date.getFullYear(), viewMode.date.getMonth() + 1, 0);
    
    // Ampliar el rango para incluir días de otros meses visibles
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startOfMonth.getDay());
    
    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

    loadCalendarData(startDate, endDate);
  }, [rentalId, viewMode, loadCalendarData]);

  // Generar celdas del calendario
  const calendarCells = useMemo(() => {
    if (!calendar) return [];

    const today = new Date();
    const year = viewMode.date.getFullYear();
    const month = viewMode.date.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
    
    const cells: CalendarCell[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) { // 6 semanas × 7 días
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingDay = calendar.availability.find((day: CalendarDay) => 
        day.date.toISOString().split('T')[0] === dateStr
      );
      
      // Combinar con cambios pendientes
      const pendingChange = pendingChanges.get(dateStr);
      
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected = selectedDate?.toDateString() === currentDate.toDateString();
      const isInRange = selectedRange.start && selectedRange.end &&
        currentDate >= selectedRange.start && currentDate <= selectedRange.end;
      const isRangeStart = selectedRange.start?.toDateString() === currentDate.toDateString();
      const isRangeEnd = selectedRange.end?.toDateString() === currentDate.toDateString();
      const isOtherMonth = currentDate.getMonth() !== month;

      const cell: CalendarCell = {
        date: new Date(currentDate),
        isAvailable: pendingChange?.isAvailable ?? existingDay?.isAvailable ?? true,
        price: pendingChange?.price ?? existingDay?.price,
        minimumStay: pendingChange?.minimumStay ?? existingDay?.minimumStay,
        isBlocked: pendingChange?.isBlocked ?? existingDay?.isBlocked ?? false,
        blockReason: pendingChange?.blockReason ?? existingDay?.blockReason,
        bookingId: existingDay?.bookingId,
        isToday,
        isSelected,
        isInRange: Boolean(isInRange),
        isRangeStart,
        isRangeEnd,
        isOtherMonth,
        displayDate: currentDate.getDate()
      };

      cells.push(cell);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return cells;
  }, [calendar, viewMode, selectedDate, selectedRange, pendingChanges]);

  // Manejar clic en fecha
  const handleDateClick = (cell: CalendarCell) => {
    if (isReadOnly) return;

    if (bulkSelectMode) {
      const dateStr = cell.date.toISOString().split('T')[0];
      const newSelected = new Set(bulkSelectedDates);
      
      if (newSelected.has(dateStr)) {
        newSelected.delete(dateStr);
      } else {
        newSelected.add(dateStr);
      }
      
      setBulkSelectedDates(newSelected);
      return;
    }

    if (isSelectingRange) {
      if (!selectedRange.start) {
        setSelectedRange({ start: cell.date, end: null });
      } else if (!selectedRange.end) {
        const start = selectedRange.start;
        const end = cell.date;
        
        if (end >= start) {
          setSelectedRange({ start, end });
          onDateRangeSelect?.(start, end);
        } else {
          setSelectedRange({ start: end, end: start });
          onDateRangeSelect?.(end, start);
        }
        
        setIsSelectingRange(false);
      } else {
        setSelectedRange({ start: cell.date, end: null });
      }
    } else {
      setSelectedDate(cell.date);
      onDateSelect?.(cell.date, cell);
    }
  };

  // Manejar doble clic para editar precio
  const handleDateDoubleClick = (cell: CalendarCell) => {
    if (!isOwner || isReadOnly || !editMode) return;
    
    setPriceEditDate(cell.date);
    setTempPrice(cell.price?.toString() || '');
    setShowPriceEditor(true);
  };

  // Obtener clase CSS para una celda
  const getCellClassName = (cell: CalendarCell) => {
    const classes = ['calendar-cell'];
    
    // Estado de disponibilidad
    if (cell.bookingId) {
      classes.push(AVAILABILITY_COLORS.booked);
    } else if (cell.isBlocked) {
      classes.push(AVAILABILITY_COLORS.blocked);
    } else if (cell.isAvailable) {
      classes.push(AVAILABILITY_COLORS.available);
    } else {
      classes.push(AVAILABILITY_COLORS.unavailable);
    }
    
    // Estados de selección
    if (cell.isSelected) {
      classes.push(AVAILABILITY_COLORS.selected);
    } else if (cell.isInRange) {
      classes.push(AVAILABILITY_COLORS.inRange);
    }
    
    if (cell.isToday) {
      classes.push(AVAILABILITY_COLORS.today);
    }
    
    if (cell.isOtherMonth) {
      classes.push(AVAILABILITY_COLORS.otherMonth);
    }

    // Destacar fines de semana
    if (highlightWeekends && (cell.date.getDay() === 0 || cell.date.getDay() === 6)) {
      classes.push('weekend');
    }

    // Selección en masa
    const dateStr = cell.date.toISOString().split('T')[0];
    if (bulkSelectedDates.has(dateStr)) {
      classes.push('bulk-selected');
    }
    
    return classes.join(' ');
  };

  // Navegar meses
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewMode.date);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setViewMode({ ...viewMode, date: newDate });
  };

  // Ir a hoy
  const goToToday = () => {
    const today = new Date();
    setViewMode({ ...viewMode, date: today });
    setSelectedDate(today);
  };

  // Activar/desactivar modo de edición
  const toggleEditMode = () => {
    if (editMode && pendingChanges.size > 0) {
      // Confirmar guardar cambios
      if (window.confirm('¿Desea guardar los cambios pendientes?')) {
        savePendingChanges();
      } else {
        setPendingChanges(new Map());
      }
    }
    setEditMode(!editMode);
  };

  // Guardar cambios pendientes
  const savePendingChanges = async () => {
    if (pendingChanges.size === 0) return;

    setLoading(true);
    try {
      const updates = Array.from(pendingChanges.entries()).map(([dateStr, changes]) => ({
        date: new Date(dateStr),
        isAvailable: changes.isAvailable ?? true,
        price: changes.price,
        minimumStay: changes.minimumStay,
        isBlocked: changes.isBlocked ?? false,
        blockReason: changes.blockReason
      })).filter(update => update.isAvailable !== undefined || update.price !== undefined || 
                           update.minimumStay !== undefined || update.isBlocked !== undefined);

      const response = await calendarService.updateCalendarAvailability(rentalId, updates);
      
      if (response.success) {
        setCalendar(response.data);
        setPendingChanges(new Map());
        setError(null);
      } else {
        setError(response.error || 'Error al guardar cambios');
      }
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Error de conexión al guardar cambios');
    } finally {
      setLoading(false);
    }
  };

  // Descartar cambios pendientes
  const discardPendingChanges = () => {
    setPendingChanges(new Map());
    setEditMode(false);
  };

  // Actualizar precio de una fecha
  const updatePrice = (date: Date, price: number) => {
    const dateStr = date.toISOString().split('T')[0];
    const existingChanges = pendingChanges.get(dateStr) || {};
    
    setPendingChanges(new Map(pendingChanges.set(dateStr, {
      ...existingChanges,
      price
    })));
    
    onPriceChange?.(date, price);
  };

  return (
    <div className={`rental-calendar bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header del calendario */}
      <div className="calendar-header p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Calendario de Disponibilidad
            </h3>
          </div>
          
          {isOwner && !isReadOnly && (
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleEditMode}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  editMode 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {editMode ? 'Cancelar' : 'Editar'}
              </button>
              
              {editMode && pendingChanges.size > 0 && (
                <>
                  <button
                    onClick={savePendingChanges}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 inline mr-1" />
                    Guardar ({pendingChanges.size})
                  </button>
                  
                  <button
                    onClick={discardPendingChanges}
                    className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    <X className="h-4 w-4 inline mr-1" />
                    Descartar
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Navegación del calendario */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
              {MONTHS_ES[viewMode.date.getMonth()]} {viewMode.date.getFullYear()}
            </div>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Hoy
            </button>

            {/* Controles de vista */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setShowPrices(!showPrices)}
                className={`p-1 rounded text-xs ${showPrices ? 'bg-white shadow-sm' : ''}`}
                title="Mostrar precios"
              >
                <DollarSign className="h-3 w-3" />
              </button>
              
              <button
                onClick={() => setHighlightWeekends(!highlightWeekends)}
                className={`p-1 rounded text-xs ${highlightWeekends ? 'bg-white shadow-sm' : ''}`}
                title="Destacar fines de semana"
              >
                <Eye className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra de herramientas de edición */}
        {editMode && isOwner && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Modo edición activo</span>
                {pendingChanges.size > 0 && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    {pendingChanges.size} cambio(s) pendiente(s)
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setBulkSelectMode(!bulkSelectMode)}
                  className={`px-2 py-1 text-xs rounded ${
                    bulkSelectMode ? 'bg-blue-600 text-white' : 'bg-white border'
                  }`}
                >
                  Selección masiva
                </button>
                
                {bulkSelectMode && bulkSelectedDates.size > 0 && (
                  <span className="text-xs text-gray-600">
                    {bulkSelectedDates.size} seleccionadas
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Grid del calendario */}
      <div className="calendar-grid p-4">
        {/* Encabezados de días */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_ES.map(day => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 uppercase"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Celdas del calendario */}
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((cell, index) => (
            <div
              key={index}
              className={`calendar-cell h-20 border rounded-md cursor-pointer transition-all duration-150 hover:shadow-md p-1 ${getCellClassName(cell)}`}
              onClick={() => handleDateClick(cell)}
              onDoubleClick={() => handleDateDoubleClick(cell)}
            >
              {/* Número del día */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${cell.isOtherMonth ? 'text-gray-400' : ''}`}>
                  {cell.displayDate}
                </span>
                
                {/* Indicadores de estado */}
                <div className="flex space-x-1">
                  {cell.isBlocked && (
                    <Lock className="h-3 w-3 text-red-500" />
                  )}
                  {cell.bookingId && (
                    <Calendar className="h-3 w-3 text-blue-500" />
                  )}
                </div>
              </div>

              {/* Precio */}
              {showPrices && cell.price && !cell.isOtherMonth && (
                <div className="text-xs font-semibold text-center mt-1">
                  {RentalUtils.formatPrice(cell.price, 'DOP')}
                </div>
              )}

              {/* Estancia mínima */}
              {cell.minimumStay && cell.minimumStay > 1 && !cell.isOtherMonth && (
                <div className="text-xs text-center text-gray-500">
                  {cell.minimumStay}n mín
                </div>
              )}

              {/* Razón de bloqueo */}
              {cell.isBlocked && cell.blockReason && !cell.isOtherMonth && (
                <div className="text-xs text-center text-red-600 truncate" title={cell.blockReason}>
                  {cell.blockReason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="calendar-legend p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
              <span>Reservado</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
              <span>Bloqueado</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
              <span>No disponible</span>
            </div>
          </div>

          {calendar && (
            <div className="text-xs text-gray-500">
              Última actualización: {RentalUtils.formatDate(new Date(calendar.lastUpdated))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de edición de precio */}
      {showPriceEditor && priceEditDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Editar Precio - {RentalUtils.formatDate(priceEditDate)}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio por noche (DOP)
                </label>
                <input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                  step="100"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowPriceEditor(false);
                    setPriceEditDate(null);
                    setTempPrice('');
                  }}
                  className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
                
                <button
                  onClick={() => {
                    const price = parseFloat(tempPrice);
                    if (price >= 0 && priceEditDate) {
                      updatePrice(priceEditDate, price);
                    }
                    setShowPriceEditor(false);
                    setPriceEditDate(null);
                    setTempPrice('');
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalCalendar;