'use client';

import React, { useState, useEffect } from 'react';
import { Search, Home, DollarSign, Bed, Filter, X } from 'lucide-react';
import type { PropertyAdvancedFilters, PropertyType, ListingType } from '@dy-estates/shared/src/types/property';
import { PropertyType as PropertyTypeEnum, ListingType as ListingTypeEnum } from '@dy-estates/shared/src/types/property';
import { propertySearchService } from '@/services/property';
import { formatPrice } from '../../utils/format';

interface PropertyFiltersProps {
  filters: PropertyAdvancedFilters;
  onFiltersChange: (filters: PropertyAdvancedFilters) => void;
  onSearch: (query: string) => void;
  searchQuery?: string;
  className?: string;
}

interface FilterOptions {
  cities: string[];
  neighborhoods: Record<string, string[]>;
  priceRanges: { min: number; max: number; currency: string }[];
  amenities: string[];
  features: string[];
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  searchQuery = '',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<PropertyAdvancedFilters>(filters);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cities: [],
    neighborhoods: {},
    priceRanges: [],
    amenities: [],
    features: [],
  });
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const loadFilterOptions = async () => {
    try {
      const options = await propertySearchService.getFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const updateFilter = (key: keyof PropertyAdvancedFilters, value: unknown) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const clearFilters = () => {
    const emptyFilters: PropertyAdvancedFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
    setLocalQuery('');
    onSearch('');
  };

  const getActiveFiltersCount = () => {
    return Object.keys(localFilters).filter(key => {
      const value = localFilters[key as keyof PropertyAdvancedFilters];
      return value !== undefined && value !== null && 
             (Array.isArray(value) ? value.length > 0 : true);
    }).length;
  };

  const propertyTypes = Object.values(PropertyTypeEnum);
  const listingTypes = Object.values(ListingTypeEnum);

  const formatPropertyType = (type: PropertyType): string => {
    const typeMap: Record<PropertyType, string> = {
      [PropertyTypeEnum.APARTMENT]: 'Apartamento',
      [PropertyTypeEnum.HOUSE]: 'Casa',
      [PropertyTypeEnum.VILLA]: 'Villa',
      [PropertyTypeEnum.TOWNHOUSE]: 'Casa Adosada',
      [PropertyTypeEnum.PENTHOUSE]: 'Penthouse',
      [PropertyTypeEnum.STUDIO]: 'Estudio',
      [PropertyTypeEnum.DUPLEX]: 'Dúplex',
      [PropertyTypeEnum.LAND]: 'Terreno',
      [PropertyTypeEnum.COMMERCIAL]: 'Comercial',
      [PropertyTypeEnum.OFFICE]: 'Oficina',
      [PropertyTypeEnum.WAREHOUSE]: 'Almacén',
    };
    return typeMap[type] || type;
  };

  const formatListingType = (type: ListingType): string => {
    const typeMap: Record<ListingType, string> = {
      [ListingTypeEnum.SALE]: 'Venta',
      [ListingTypeEnum.RENT]: 'Alquiler',
      [ListingTypeEnum.BOTH]: 'Venta y Alquiler',
    };
    return typeMap[type] || type;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar propiedades por ubicación, tipo o características..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Home size={18} className="text-gray-500" />
          <select
            value={localFilters.listingType || ''}
            onChange={(e) => updateFilter('listingType', e.target.value || undefined)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tipo de listado</option>
            {listingTypes.map(type => (
              <option key={type} value={type}>
                {formatListingType(type)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <DollarSign size={18} className="text-gray-500" />
          <select
            value={localFilters.priceMin ? `${localFilters.priceMin}-${localFilters.priceMax || ''}` : ''}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-');
              updateFilter('priceMin', min ? parseInt(min) : undefined);
              updateFilter('priceMax', max ? parseInt(max) : undefined);
            }}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Rango de precio</option>
            {filterOptions.priceRanges.map((range, index) => (
              <option key={index} value={`${range.min}-${range.max}`}>
                {formatPrice(range.min, range.currency as 'DOP' | 'USD')} - {formatPrice(range.max, range.currency as 'DOP' | 'USD')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Bed size={18} className="text-gray-500" />
          <select
            value={localFilters.bedrooms?.[0] || ''}
            onChange={(e) => updateFilter('bedrooms', e.target.value ? [parseInt(e.target.value)] : undefined)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Habitaciones</option>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num}+ habitación{num > 1 ? 'es' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Filter size={18} />
          <span>Filtros avanzados</span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>

        {getActiveFiltersCount() > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
            <span className="text-sm">Limpiar filtros</span>
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t pt-6">
          {/* Property Type */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Tipo de propiedad</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {propertyTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={localFilters.type?.includes(type) || false}
                    onChange={(e) => {
                      const currentTypes = localFilters.type || [];
                      if (e.target.checked) {
                        updateFilter('type', [...currentTypes, type]);
                      } else {
                        updateFilter('type', currentTypes.filter(t => t !== type));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{formatPropertyType(type)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Ubicación</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <select
                  value={localFilters.location?.city || ''}
                  onChange={(e) => updateFilter('location', { 
                    ...localFilters.location, 
                    city: e.target.value || undefined 
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas las ciudades</option>
                  {filterOptions.cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                <select
                  value={localFilters.location?.neighborhood || ''}
                  onChange={(e) => updateFilter('location', { 
                    ...localFilters.location, 
                    neighborhood: e.target.value || undefined 
                  })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  disabled={!localFilters.location?.city}
                >
                  <option value="">Todos los sectores</option>
                  {localFilters.location?.city && filterOptions.neighborhoods[localFilters.location.city]?.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rango de precio</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio mínimo</label>
                <input
                  type="number"
                  placeholder="0"
                  value={localFilters.priceMin || ''}
                  onChange={(e) => updateFilter('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio máximo</label>
                <input
                  type="number"
                  placeholder="Sin límite"
                  value={localFilters.priceMax || ''}
                  onChange={(e) => updateFilter('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                <select
                  value={localFilters.currency || 'DOP'}
                  onChange={(e) => updateFilter('currency', e.target.value as 'DOP' | 'USD')}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DOP">Peso Dominicano (DOP)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Detalles de la propiedad</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                <select
                  value={localFilters.bedrooms?.[0] || ''}
                  onChange={(e) => updateFilter('bedrooms', e.target.value ? [parseInt(e.target.value)] : undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cualquiera</option>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num}+</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                <select
                  value={localFilters.bathrooms?.[0] || ''}
                  onChange={(e) => updateFilter('bathrooms', e.target.value ? [parseInt(e.target.value)] : undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cualquiera</option>
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}+</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parqueos</label>
                <select
                  value={localFilters.parkingSpaces?.[0] || ''}
                  onChange={(e) => updateFilter('parkingSpaces', e.target.value ? [parseInt(e.target.value)] : undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Cualquiera</option>
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}+</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.areaMin || ''}
                    onChange={(e) => updateFilter('areaMin', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.areaMax || ''}
                    onChange={(e) => updateFilter('areaMax', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Opciones adicionales</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.isFeatured || false}
                  onChange={(e) => updateFilter('isFeatured', e.target.checked || undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Solo propiedades destacadas</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.isVerified || false}
                  onChange={(e) => updateFilter('isVerified', e.target.checked || undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Solo propiedades verificadas</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.hasVirtualTour || false}
                  onChange={(e) => updateFilter('hasVirtualTour', e.target.checked || undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Con tour virtual</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localFilters.hasVideo || false}
                  onChange={(e) => updateFilter('hasVideo', e.target.checked || undefined)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Con video</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};