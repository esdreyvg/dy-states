'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  MapPin, 
  AlertCircle, 
  Check,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { 
  Rental, 
  BookingRequest, 
  CalendarDay, 
  Guest,
  PricingBreakdown,
  GuestDetails
} from '../../../../shared/src/types/rental';
import { bookingService, calendarService } from '../../services/rental';

interface BookingFormProps {
  rental: Rental;
  selectedDates: {
    startDate: Date;
    endDate: Date;
  };
  onBookingSuccess: (bookingId: string) => void;
  onCancel: () => void;
  className?: string;
}

interface BookingStep {
  id: 'dates' | 'guests' | 'payment' | 'confirmation';
  title: string;
  description: string;
}

const BOOKING_STEPS: BookingStep[] = [
  {
    id: 'dates',
    title: 'Fechas',
    description: 'Confirmar fechas de reserva'
  },
  {
    id: 'guests',
    title: 'Huéspedes',
    description: 'Información de los huéspedes'
  },
  {
    id: 'payment',
    title: 'Pago',
    description: 'Revisar y confirmar reserva'
  },
  {
    id: 'confirmation',
    title: 'Confirmación',
    description: 'Reserva completada'
  }
];

export const BookingForm: React.FC<BookingFormProps> = ({
  rental,
  selectedDates,
  onBookingSuccess,
  onCancel,
  className = ''
}) => {
  // Estados principales
  const [currentStep, setCurrentStep] = useState<BookingStep['id']>('dates');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<Partial<BookingRequest>>({
    rentalId: rental.id,
    startDate: selectedDates.startDate,
    endDate: selectedDates.endDate,
    numberOfGuests: 1
  });

  // Estados específicos del formulario
  const [guestInfo, setGuestInfo] = useState<Partial<Guest>>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    nationality: '',
    identificationType: 'dni',
    identificationNumber: ''
  });

  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown | null>(null);
  const [availability, setAvailability] = useState<CalendarDay[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Calcular número de noches
  const numberOfNights = Math.ceil(
    (selectedDates.endDate.getTime() - selectedDates.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Cargar pricing y disponibilidad
  useEffect(() => {
    const loadPricingAndAvailability = async () => {
      setLoading(true);
      try {
        // Verificar disponibilidad
        const availabilityResponse = await calendarService.getRentalCalendar(
          rental.id, 
          selectedDates.startDate, 
          selectedDates.endDate
        );

        if (availabilityResponse.success) {
          setAvailability(availabilityResponse.data.availability);
          
          // Verificar que todas las fechas estén disponibles
          const unavailableDates = availabilityResponse.data.availability.filter(
            day => !day.isAvailable || day.isBlocked || day.bookingId
          );

          if (unavailableDates.length > 0) {
            setError('Algunas fechas seleccionadas ya no están disponibles');
            return;
          }
        }

        // Calcular precios
        const pricingResponse = await bookingService.calculatePricing(rental.id, {
          startDate: selectedDates.startDate,
          endDate: selectedDates.endDate,
          numberOfGuests: bookingData.numberOfGuests || 1
        });

        if (pricingResponse.success) {
          setPricingBreakdown(pricingResponse.data);
        } else {
          setError(pricingResponse.error || 'Error al calcular precios');
        }

      } catch (err) {
        console.error('Error loading booking data:', err);
        setError('Error al cargar información de la reserva');
      } finally {
        setLoading(false);
      }
    };

    loadPricingAndAvailability();
  }, [rental.id, selectedDates, bookingData.numberOfGuests]);

  // Validar paso actual
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 'dates':
        return numberOfNights > 0 && availability.length > 0;
      case 'guests':
        return !!(
          guestInfo.email &&
          guestInfo.phone &&
          guestInfo.firstName &&
          guestInfo.lastName &&
          guestInfo.identificationType &&
          guestInfo.identificationNumber &&
          (bookingData.numberOfGuests || 0) >= 1 &&
          (bookingData.numberOfGuests || 0) <= rental.rules.maxGuests
        );
      case 'payment':
        return termsAccepted && !!pricingBreakdown;
      default:
        return true;
    }
  };

  // Navegar entre pasos
  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    const currentIndex = BOOKING_STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex < BOOKING_STEPS.length - 1) {
      setCurrentStep(BOOKING_STEPS[currentIndex + 1].id);
      setError(null);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = BOOKING_STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(BOOKING_STEPS[currentIndex - 1].id);
      setError(null);
    }
  };

  // Procesar reserva
  const handleBookingSubmit = async () => {
    if (!validateCurrentStep() || !pricingBreakdown) {
      setError('Información incompleta para procesar la reserva');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const createBookingDTO = {
        rentalId: rental.id,
        checkInDate: selectedDates.startDate,
        checkOutDate: selectedDates.endDate,
        guests: {
          adults: bookingData.numberOfGuests! || 1,
          children: 0,
          infants: 0,
          pets: 0,
          purpose: 'leisure' as const,
          primaryGuest: guestInfo as Guest
        } as GuestDetails & { primaryGuest: Guest },
        specialRequests: bookingData.specialRequests
      };

      const response = await bookingService.createBooking(createBookingDTO);

      if (response.success) {
        setCurrentStep('confirmation');
        onBookingSuccess(response.data.id);
      } else {
        setError(response.error || 'Error al procesar la reserva');
      }

    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Error de conexión al procesar la reserva');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar número de huéspedes
  const updateGuestCount = (count: number) => {
    if (count >= 1 && count <= rental.rules.maxGuests) {
      setBookingData({ ...bookingData, numberOfGuests: count });
    }
  };

  // Formatear fecha
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Renderizar indicadores de paso
  const renderStepIndicators = () => (
    <div className="flex items-center justify-between mb-8">
      {BOOKING_STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = BOOKING_STEPS.findIndex(s => s.id === currentStep) > index;
        const isLast = index === BOOKING_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
              ${isActive ? 'bg-blue-600 border-blue-600 text-white' : ''}
              ${isCompleted ? 'bg-green-600 border-green-600 text-white' : ''}
              ${!isActive && !isCompleted ? 'border-gray-300 text-gray-500' : ''}
            `}>
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <div className="ml-2 hidden sm:block">
              <div className={`text-sm font-medium ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
            {!isLast && (
              <div className={`w-8 h-0.5 mx-4 ${
                isCompleted ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // Renderizar paso de fechas
  const renderDatesStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Fechas de tu reserva
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm font-medium text-gray-600">Check-in</div>
            <div className="text-lg font-semibold">{formatDate(selectedDates.startDate)}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm font-medium text-gray-600">Check-out</div>
            <div className="text-lg font-semibold">{formatDate(selectedDates.endDate)}</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center text-blue-800">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {numberOfNights} noche{numberOfNights !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {pricingBreakdown && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold mb-3">Resumen de precios</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>€{pricingBreakdown.basePrice} × {numberOfNights} noches</span>
              <span>€{pricingBreakdown.subtotal}</span>
            </div>
            {pricingBreakdown.cleaningFee > 0 && (
              <div className="flex justify-between">
                <span>Tarifa de limpieza</span>
                <span>€{pricingBreakdown.cleaningFee}</span>
              </div>
            )}
            {pricingBreakdown.serviceFee > 0 && (
              <div className="flex justify-between">
                <span>Tarifa de servicio</span>
                <span>€{pricingBreakdown.serviceFee}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>€{pricingBreakdown.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Renderizar paso de huéspedes
  const renderGuestsStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Información de huéspedes
        </h3>

        {/* Número de huéspedes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de huéspedes
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateGuestCount((bookingData.numberOfGuests || 1) - 1)}
              disabled={bookingData.numberOfGuests === 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{bookingData.numberOfGuests}</span>
            <button
              onClick={() => updateGuestCount((bookingData.numberOfGuests || 1) + 1)}
              disabled={bookingData.numberOfGuests === rental.rules.maxGuests}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              +
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Máximo {rental.rules.maxGuests} huéspedes
          </div>
        </div>

        {/* Información del huésped principal */}
        <div className="space-y-4">
          <h4 className="font-medium">Huésped principal</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={guestInfo.firstName || ''}
                onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos *
              </label>
              <input
                type="text"
                value={guestInfo.lastName || ''}
                onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tus apellidos"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={guestInfo.email || ''}
              onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              value={guestInfo.phone || ''}
              onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento *
              </label>
              <select
                value={guestInfo.identificationType || 'dni'}
                onChange={(e) => setGuestInfo({ 
                  ...guestInfo, 
                  identificationType: e.target.value as 'dni' | 'nie' | 'passport' 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dni">DNI</option>
                <option value="nie">NIE</option>
                <option value="passport">Pasaporte</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de documento *
              </label>
              <input
                type="text"
                value={guestInfo.identificationNumber || ''}
                onChange={(e) => setGuestInfo({ ...guestInfo, identificationNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12345678A"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nacionalidad
            </label>
            <input
              type="text"
              value={guestInfo.nationality || ''}
              onChange={(e) => setGuestInfo({ ...guestInfo, nationality: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Española"
            />
          </div>
        </div>

        {/* Peticiones especiales */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Peticiones especiales (opcional)
          </label>
          <textarea
            value={bookingData.specialRequests || ''}
            onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="¿Alguna petición especial para tu estancia?"
          />
        </div>
      </div>
    </div>
  );

  // Renderizar paso de pago
  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
          Revisar y reservar
        </h3>

        {/* Resumen de la reserva */}
        <div className="bg-white rounded-lg p-4 border mb-6">
          <h4 className="font-medium mb-3">Resumen de tu reserva</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <div>
                <div className="font-medium">{rental.title}</div>
                <div className="text-gray-600">{rental.location.address}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <div>
                <div>{formatDate(selectedDates.startDate)} - {formatDate(selectedDates.endDate)}</div>
                <div className="text-gray-600">{numberOfNights} noche{numberOfNights !== 1 ? 's' : ''}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <div>{bookingData.numberOfGuests} huésped{bookingData.numberOfGuests !== 1 ? 'es' : ''}</div>
            </div>
          </div>
        </div>

        {/* Desglose de precios */}
        {pricingBreakdown && (
          <div className="bg-white rounded-lg p-4 border mb-6">
            <h4 className="font-medium mb-3">Desglose de precios</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>€{pricingBreakdown.basePrice} × {numberOfNights} noches</span>
                <span>€{pricingBreakdown.subtotal}</span>
              </div>
              {pricingBreakdown.cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span>Tarifa de limpieza</span>
                  <span>€{pricingBreakdown.cleaningFee}</span>
                </div>
              )}
              {pricingBreakdown.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span>Tarifa de servicio</span>
                  <span>€{pricingBreakdown.serviceFee}</span>
                </div>
              )}
              {pricingBreakdown.taxes > 0 && (
                <div className="flex justify-between">
                  <span>Tasas e impuestos</span>
                  <span>€{pricingBreakdown.taxes}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>€{pricingBreakdown.totalAmount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Términos y condiciones */}
        <div className="bg-white rounded-lg p-4 border">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="text-sm">
              <span>Acepto los </span>
              <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a>
              <span> y la </span>
              <a href="#" className="text-blue-600 hover:underline">política de privacidad</a>
              <span>. También acepto las normas de la casa y las políticas de cancelación.</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  // Renderizar confirmación
  const renderConfirmationStep = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Reserva confirmada!
        </h3>
        <p className="text-gray-600">
          Hemos enviado los detalles de tu reserva por email.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto">
        <h4 className="font-semibold mb-3">Próximos pasos</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Recibirás un email de confirmación</li>
          <li>• El anfitrión te contactará pronto</li>
          <li>• Podrás hacer modificaciones hasta 24h antes</li>
        </ul>
      </div>
    </div>
  );

  // Renderizar contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 'dates':
        return renderDatesStep();
      case 'guests':
        return renderGuestsStep();
      case 'payment':
        return renderPaymentStep();
      case 'confirmation':
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  // Renderizar botones de navegación
  const renderNavigationButtons = () => {
    if (currentStep === 'confirmation') {
      return (
        <div className="flex justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-between">
        <button
          onClick={currentStep === 'dates' ? onCancel : goToPreviousStep}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {currentStep === 'dates' ? 'Cancelar' : 'Anterior'}
        </button>

        {currentStep === 'payment' ? (
          <button
            onClick={handleBookingSubmit}
            disabled={!validateCurrentStep() || loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Procesando...' : 'Confirmar reserva'}
          </button>
        ) : (
          <button
            onClick={goToNextStep}
            disabled={!validateCurrentStep() || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continuar
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`booking-form bg-white ${className}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Indicadores de pasos */}
        {renderStepIndicators()}

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Contenido del paso */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Botones de navegación */}
        {renderNavigationButtons()}
      </div>
    </div>
  );
};

export default BookingForm;