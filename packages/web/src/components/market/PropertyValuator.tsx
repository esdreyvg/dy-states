'use client';

import React, { useState } from 'react';
import {
  Calculator,
  MapPin,
  Home,
  Maximize,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Download,
  Star
} from 'lucide-react';
import { propertyValuationService } from '../../services/rental';
import {
  PropertyValuation,
  PropertyValuationInput,
  PropertyType
} from '../../../../shared/src/types/rental';

interface PropertyValuatorProps {
  className?: string;
}

interface FormData extends Omit<PropertyValuationInput, 'location'> {
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
}

const PropertyValuator: React.FC<PropertyValuatorProps> = ({ className = '' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [valuation, setValuation] = useState<PropertyValuation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    location: {
      address: '',
      city: '',
      state: 'Santo Domingo',
      country: 'República Dominicana'
    },
    propertyType: PropertyType.APARTMENT,
    specifications: {
      bedrooms: 1,
      bathrooms: 1,
      squareMeters: 50,
      maxGuests: 2,
    },
    amenities: [],
    features: {
      hasPool: false,
      hasGarden: false,
      hasParking: false,
      hasAirConditioning: false,
      hasHeating: false,
      hasWifi: false,
      hasKitchen: false,
      petFriendly: false,
      smokingAllowed: false
    },
    condition: 'good'
  });

  const steps = [
    { id: 1, title: 'Ubicación', description: 'Información básica de la propiedad' },
    { id: 2, title: 'Especificaciones', description: 'Detalles técnicos' },
    { id: 3, title: 'Características', description: 'Amenidades y servicios' },
    { id: 4, title: 'Valoración', description: 'Resultado del análisis' }
  ];

  const availableAmenities = [
    'Piscina', 'Jardín', 'Estacionamiento', 'Aire Acondicionado', 'Calefacción',
    'WiFi', 'Cocina Equipada', 'Balcón', 'Terraza', 'Gimnasio', 'Seguridad 24h',
    'Ascensor', 'Lavandería', 'Barbacoa', 'Jacuzzi'
  ];

  // Actualizar datos del formulario
  const updateFormData = <T extends keyof FormData>(section: T, data: Partial<FormData[T]>) => {
    setFormData(prev => {
      const currentSection = prev[section];
      const updatedSection = typeof currentSection === 'object' && currentSection !== null
        ? { ...currentSection, ...data }
        : data;
      
      return {
        ...prev,
        [section]: updatedSection
      };
    });
  };

  // Procesar valoración
  const processValuation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await propertyValuationService.createValuation({
        propertyData: formData,
        includeComparisons: true,
        includeRecommendations: true
      });

      if (response.success) {
        setValuation(response.data);
        setCurrentStep(4);
      } else {
        throw new Error(response.error || 'Error en la valoración');
      }
    } catch (err) {
      setError('Error al calcular la valoración. Por favor, intente nuevamente.');
      console.error('Valuation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Exportar valoración
  const exportValuation = () => {
    if (!valuation) return;
    
    const data = {
      property: formData,
      valuation: valuation.estimatedValue,
      confidence: valuation.confidenceLevel,
      factors: valuation.factors,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valoracion-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-500" />
              Información de Ubicación
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección completa *
                </label>
                <textarea
                  value={formData.location.address}
                  onChange={(e) => updateFormData('location', { address: e.target.value })}
                  placeholder="Ej: Calle Principal 123, Sector Los Rosales"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad *
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => updateFormData('location', { city: e.target.value })}
                  placeholder="Santo Domingo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provincia *
                </label>
                <select
                  value={formData.location.state}
                  onChange={(e) => updateFormData('location', { state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Santo Domingo">Santo Domingo</option>
                  <option value="Santiago">Santiago</option>
                  <option value="La Romana">La Romana</option>
                  <option value="Punta Cana">Punta Cana</option>
                  <option value="Puerto Plata">Puerto Plata</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Propiedad *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateFormData('propertyType', e.target.value as PropertyType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={PropertyType.APARTMENT}>Apartamento</option>
                  <option value={PropertyType.HOUSE}>Casa</option>
                  <option value={PropertyType.VILLA}>Villa</option>
                  <option value={PropertyType.STUDIO}>Estudio</option>
                  <option value={PropertyType.PENTHOUSE}>Penthouse</option>
                  <option value={PropertyType.LOFT}>Loft</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Home className="h-6 w-6 mr-2 text-blue-500" />
              Especificaciones Técnicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dormitorios
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.specifications.bedrooms}
                  onChange={(e) => updateFormData('specifications', { bedrooms: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={formData.specifications.bathrooms}
                  onChange={(e) => updateFormData('specifications', { bathrooms: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metros Cuadrados
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={formData.specifications.squareMeters}
                  onChange={(e) => updateFormData('specifications', { squareMeters: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Huéspedes Máximo
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.specifications.maxGuests}
                  onChange={(e) => updateFormData('specifications', { maxGuests: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año de Construcción
                </label>
                <input
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={formData.specifications.yearBuilt || ''}
                  onChange={(e) => updateFormData('specifications', { 
                    yearBuilt: e.target.value ? parseInt(e.target.value) : undefined 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de la Propiedad
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => updateFormData('condition', e.target.value as FormData['condition'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="excellent">Excelente</option>
                  <option value="good">Bueno</option>
                  <option value="fair">Regular</option>
                  <option value="needs_renovation">Necesita Renovación</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Star className="h-6 w-6 mr-2 text-blue-500" />
              Características y Amenidades
            </h3>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Servicios Básicos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries({
                  hasPool: 'Piscina',
                  hasGarden: 'Jardín',
                  hasParking: 'Estacionamiento',
                  hasAirConditioning: 'Aire Acondicionado',
                  hasHeating: 'Calefacción',
                  hasWifi: 'WiFi',
                  hasKitchen: 'Cocina Equipada',
                  petFriendly: 'Acepta Mascotas',
                  smokingAllowed: 'Permite Fumar'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features[key as keyof FormData['features']]}
                      onChange={(e) => updateFormData('features', { 
                        [key]: e.target.checked 
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Amenidades Adicionales</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableAmenities.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('amenities', [...formData.amenities, amenity]);
                        } else {
                          updateFormData('amenities', formData.amenities.filter(a => a !== amenity));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <Calculator className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calculando Valoración</h3>
                <p className="text-gray-600">Analizando datos de mercado y propiedades similares...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-red-600">Error en la Valoración</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Volver e Intentar Nuevamente
                </button>
              </div>
            ) : valuation ? (
              <div className="space-y-8">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Valoración Completada</h3>
                  <p className="text-gray-600">
                    Nivel de confianza: {valuation.confidenceLevel}%
                  </p>
                </div>

                {/* Resultado Principal */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm opacity-90">Precio Recomendado</p>
                      <p className="text-3xl font-bold">
                        {formatCurrency(valuation.estimatedValue.recommendedPrice)}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm opacity-90">Rango de Precio</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(valuation.estimatedValue.priceRange.min)} - {formatCurrency(valuation.estimatedValue.priceRange.max)}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <Maximize className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm opacity-90">Por m²</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(valuation.estimatedValue.pricePerSquareMeter)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Potencial de Ingresos */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Potencial de Ingresos Mensuales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Conservador</p>
                      <p className="text-xl font-bold text-red-700">
                        {formatCurrency(valuation.estimatedValue.monthlyRevenuePotential.conservative)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Realista</p>
                      <p className="text-xl font-bold text-blue-700">
                        {formatCurrency(valuation.estimatedValue.monthlyRevenuePotential.realistic)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Optimista</p>
                      <p className="text-xl font-bold text-green-700">
                        {formatCurrency(valuation.estimatedValue.monthlyRevenuePotential.optimistic)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Factores de Valoración */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Factores que Afectan la Valoración</h4>
                  <div className="space-y-3">
                    {valuation.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {factor.impact === 'positive' ? (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          ) : factor.impact === 'negative' ? (
                            <TrendingDown className="h-5 w-5 text-red-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-500" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{factor.factor}</p>
                            <p className="text-sm text-gray-600">{factor.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            factor.impact === 'positive' ? 'text-green-600' : 
                            factor.impact === 'negative' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {factor.adjustment > 0 ? '+' : ''}{formatCurrency(factor.adjustment)}
                          </p>
                          <p className="text-xs text-gray-500">Peso: {factor.weight}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={exportValuation}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    <span>Exportar Valoración</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setValuation(null);
                      setError(null);
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Nueva Valoración
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Valorador de Propiedades
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Obtén una valoración automática de tu propiedad basada en datos de mercado,
          propiedades similares y análisis de ubicación.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        {renderStepContent()}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {currentStep === 3 ? (
              <button
                onClick={processValuation}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Calculando...' : 'Calcular Valoración'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Siguiente
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyValuator;