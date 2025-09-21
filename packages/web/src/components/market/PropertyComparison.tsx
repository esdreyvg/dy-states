"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Search, Plus, X, Home, MapPin, Ruler, Users, Car, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { PropertyType } from '../../../../shared/src/types/rental';

interface PropertyComparisonProps {
  className?: string;
}

// Interfaz simplificada para propiedades
interface SimpleProperty {
  id: string;
  title: string;
  type: PropertyType;
  address: string;
  area: number;
  rooms: number;
  bathrooms: number;
  price: number;
  parking: boolean;
  terrace: boolean;
  garden: boolean;
  pool: boolean;
  elevator: boolean;
  description: string;
}

// Interfaz para resultado de comparación
interface SimpleComparisonResult {
  properties: SimpleProperty[];
  averagePrice: number;
  averageArea: number;
  averagePricePerSqm: number;
  recommendations: string[];
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minRooms, setMinRooms] = useState<number | undefined>();
  const [selectedProperties, setSelectedProperties] = useState<SimpleProperty[]>([]);
  const [searchResults, setSearchResults] = useState<SimpleProperty[]>([]);
  const [comparisonResult, setComparisonResult] = useState<SimpleComparisonResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  // Buscar propiedades (simulado)
  const searchProperties = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Simulación de búsqueda de propiedades
      const mockProperties: SimpleProperty[] = [
        {
          id: '1',
          title: 'Apartamento Moderno en Centro',
          type: PropertyType.APARTMENT,
          address: 'Calle Gran Vía, 45, Madrid',
          area: 85,
          rooms: 2,
          bathrooms: 1,
          price: 1800,
          parking: false,
          terrace: true,
          garden: false,
          pool: false,
          elevator: true,
          description: 'Apartamento moderno en el centro'
        },
        {
          id: '2',
          title: 'Casa con Jardín',
          type: PropertyType.HOUSE,
          address: 'Avenida de la Paz, 12, Madrid',
          area: 120,
          rooms: 3,
          bathrooms: 2,
          price: 2200,
          parking: true,
          terrace: false,
          garden: true,
          pool: false,
          elevator: false,
          description: 'Casa familiar con jardín'
        },
        {
          id: '3',
          title: 'Estudio Luminoso',
          type: PropertyType.STUDIO,
          address: 'Plaza Mayor, 8, Madrid',
          area: 45,
          rooms: 1,
          bathrooms: 1,
          price: 1200,
          parking: false,
          terrace: false,
          garden: false,
          pool: false,
          elevator: true,
          description: 'Estudio luminoso'
        }
      ];

      // Filtrar resultados
      let filteredResults = mockProperties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (propertyType !== 'all') {
        filteredResults = filteredResults.filter(p => p.type === propertyType);
      }

      if (maxPrice) {
        filteredResults = filteredResults.filter(p => p.price <= maxPrice);
      }

      if (minRooms) {
        filteredResults = filteredResults.filter(p => p.rooms >= minRooms);
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error buscando propiedades:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Agregar propiedad a la comparación
  const addToComparison = (property: SimpleProperty) => {
    if (selectedProperties.length >= 4) return;
    if (selectedProperties.find(p => p.id === property.id)) return;

    setSelectedProperties(prev => [...prev, property]);
    setSearchResults(prev => prev.filter(p => p.id !== property.id));
  };

  // Remover propiedad de la comparación
  const removeFromComparison = (propertyId: string) => {
    setSelectedProperties(prev => prev.filter(p => p.id !== propertyId));
    setComparisonResult(null);
  };

  // Realizar comparación (simulado)
  const performComparison = async () => {
    if (selectedProperties.length < 2) return;

    setIsComparing(true);
    try {
      // Simulación de comparación
      const averagePrice = selectedProperties.reduce((sum, p) => sum + p.price, 0) / selectedProperties.length;
      const averageArea = selectedProperties.reduce((sum, p) => sum + p.area, 0) / selectedProperties.length;
      const averagePricePerSqm = averagePrice / averageArea;

      const mockResult: SimpleComparisonResult = {
        properties: selectedProperties,
        averagePrice,
        averageArea,
        averagePricePerSqm,
        recommendations: [
          'La propiedad con mejor relación calidad-precio es la que tiene menor coste por m²',
          'Considera las características adicionales como parking y terraza en tu decisión',
          'Verifica la ubicación y transporte público cercano'
        ]
      };

      setComparisonResult(mockResult);
    } catch (error) {
      console.error('Error comparando propiedades:', error);
    } finally {
      setIsComparing(false);
    }
  };

  // Limpiar comparación
  const clearComparison = () => {
    setSelectedProperties([]);
    setComparisonResult(null);
    setSearchResults([]);
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Formatear área
  const formatArea = (area: number) => {
    return `${area.toLocaleString('es-ES')} m²`;
  };

  // Obtener icono de propiedad
  const getPropertyIcon = () => {
    return <Home className="h-4 w-4" />;
  };

  // Obtener color de diferencia de precio
  const getPriceDifferenceColor = (difference: number) => {
    if (difference > 0) return 'text-red-600';
    if (difference < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Buscador de propiedades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Propiedades para Comparar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-1">
                Ubicación o Nombre
              </label>
              <input
                id="search"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Madrid Centro, Barcelona..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && searchProperties()}
              />
            </div>
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium mb-1">
                Tipo de Propiedad
              </label>
              <select
                id="propertyType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={propertyType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPropertyType(e.target.value as PropertyType | 'all')}
              >
                <option value="all">Todos los tipos</option>
                <option value={PropertyType.APARTMENT}>Apartamento</option>
                <option value={PropertyType.HOUSE}>Casa</option>
                <option value={PropertyType.STUDIO}>Estudio</option>
                <option value={PropertyType.LOFT}>Loft</option>
                <option value={PropertyType.VILLA}>Villa</option>
                <option value={PropertyType.PENTHOUSE}>Penthouse</option>
                <option value={PropertyType.TOWNHOUSE}>Townhouse</option>
                <option value={PropertyType.BUNGALOW}>Bungalow</option>
              </select>
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium mb-1">
                Precio Máximo (€)
              </label>
              <input
                id="maxPrice"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 2000"
                value={maxPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div>
              <label htmlFor="minRooms" className="block text-sm font-medium mb-1">
                Habitaciones Mínimas
              </label>
              <input
                id="minRooms"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 2"
                value={minRooms || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinRooms(e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
          <Button onClick={searchProperties} disabled={isSearching || !searchQuery.trim()}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Buscar Propiedades
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resultados de búsqueda */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {searchResults.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getPropertyIcon()}
                      <h3 className="font-medium">{property.title}</h3>
                    </div>
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                      onClick={() => addToComparison(property)}
                      disabled={selectedProperties.length >= 4}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-3 w-3" />
                    {property.address}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        {formatArea(property.area)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {property.rooms} hab.
                      </span>
                      {property.parking && (
                        <span className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          Parking
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Propiedades seleccionadas para comparar */}
      {selectedProperties.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Propiedades Seleccionadas ({selectedProperties.length}/4)
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={performComparison}
                disabled={selectedProperties.length < 2 || isComparing}
              >
                {isComparing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Comparando...
                  </>
                ) : (
                  'Comparar Propiedades'
                )}
              </Button>
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                onClick={clearComparison}
              >
                Limpiar
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {selectedProperties.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 bg-blue-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getPropertyIcon()}
                      <h3 className="font-medium">{property.title}</h3>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeFromComparison(property.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-3 w-3" />
                    {property.address}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        {formatArea(property.area)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {property.rooms} hab.
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resultado de la comparación */}
      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis Comparativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resumen general */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(comparisonResult.averagePrice)}
                </div>
                <div className="text-sm text-gray-600">Precio Promedio</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatArea(comparisonResult.averageArea)}
                </div>
                <div className="text-sm text-gray-600">Área Promedio</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  €{Math.round(comparisonResult.averagePricePerSqm).toLocaleString('es-ES')}
                </div>
                <div className="text-sm text-gray-600">€/m² Promedio</div>
              </div>
            </div>

            {/* Tabla comparativa detallada */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">Característica</th>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <th key={property.id} className="border border-gray-200 p-3 text-center min-w-[150px]">
                        {property.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Precio</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center">
                        <div className="text-lg font-semibold">
                          {formatPrice(property.price)}
                        </div>
                        <div className={`text-sm flex items-center justify-center gap-1 ${getPriceDifferenceColor(property.price - comparisonResult.averagePrice)}`}>
                          {property.price > comparisonResult.averagePrice ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : property.price < comparisonResult.averagePrice ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : null}
                          {Math.abs(property.price - comparisonResult.averagePrice) > 0 && (
                            `${property.price > comparisonResult.averagePrice ? '+' : ''}${formatPrice(property.price - comparisonResult.averagePrice)}`
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-200 p-3 font-medium">Área</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center">
                        {formatArea(property.area)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">€/m²</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center">
                        €{Math.round(property.price / property.area).toLocaleString('es-ES')}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-200 p-3 font-medium">Habitaciones</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center">
                        {property.rooms}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Baños</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center">
                        {property.bathrooms}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-25">
                    <td className="border border-gray-200 p-3 font-medium">Ubicación</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3 text-center text-sm">
                        {property.address}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Características</td>
                    {comparisonResult.properties.map((property: SimpleProperty) => (
                      <td key={property.id} className="border border-gray-200 p-3">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {property.parking && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">Parking</span>
                          )}
                          {property.terrace && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">Terraza</span>
                          )}
                          {property.garden && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">Jardín</span>
                          )}
                          {property.pool && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">Piscina</span>
                          )}
                          {property.elevator && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">Ascensor</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recomendaciones */}
            {comparisonResult.recommendations && comparisonResult.recommendations.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Recomendaciones</h3>
                <div className="space-y-2">
                  {comparisonResult.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <div className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyComparison;
