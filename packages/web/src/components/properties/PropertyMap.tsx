'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Share2, ExternalLink } from 'lucide-react';
import type { Property } from '@dy-estates/shared/src/types/property';

interface PropertyMapProps {
  property: Property;
  showDetails?: boolean;
  height?: string;
  className?: string;
  onDirectionsClick?: (property: Property) => void;
  onShareLocation?: (property: Property) => void;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  property,
  showDetails = true,
  height = 'h-96',
  className = '',
  onDirectionsClick,
  onShareLocation,
}) => {
  // For now, we'll use a placeholder map. In a real implementation,
  // you would integrate with Google Maps, Mapbox, or another mapping service

  const handleDirections = () => {
    if (onDirectionsClick) {
      onDirectionsClick(property);
    } else {
      // Open Google Maps in a new tab with directions
      const address = `${property.location.address}, ${property.location.city}, ${property.location.province}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }
  };

  const handleShareLocation = () => {
    if (onShareLocation) {
      onShareLocation(property);
    } else {
      // Share the location via Web Share API or copy to clipboard
      const address = `${property.location.address}, ${property.location.city}, ${property.location.province}`;
      if (navigator.share) {
        navigator.share({
          title: property.title,
          text: `Ubicación: ${address}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(address);
        // You might want to show a toast notification here
      }
    }
  };

  const openInMaps = () => {
    const address = `${property.location.address}, ${property.location.city}, ${property.location.province}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${height} ${className}`}>
      {/* Map Container */}
      <div className="relative w-full h-full">
        {/* Placeholder map - replace with actual map implementation */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Mapa de la propiedad</p>
            <p className="text-sm text-gray-500">
              {property.location.address}
            </p>
            <p className="text-sm text-gray-500">
              {property.location.city}, {property.location.province}
            </p>
            {property.location.coordinates && (
              <p className="text-xs text-gray-400 mt-1">
                {property.location.coordinates.latitude.toFixed(6)}, {property.location.coordinates.longitude.toFixed(6)}
              </p>
            )}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={handleDirections}
            className="bg-white shadow-md p-2 rounded-md hover:bg-gray-50 transition-colors"
            title="Obtener direcciones"
          >
            <Navigation className="w-5 h-5 text-blue-600" />
          </button>
          
          <button
            onClick={handleShareLocation}
            className="bg-white shadow-md p-2 rounded-md hover:bg-gray-50 transition-colors"
            title="Compartir ubicación"
          >
            <Share2 className="w-5 h-5 text-green-600" />
          </button>
          
          <button
            onClick={openInMaps}
            className="bg-white shadow-md p-2 rounded-md hover:bg-gray-50 transition-colors"
            title="Abrir en Google Maps"
          >
            <ExternalLink className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Property Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-500" />
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-red-500 bg-opacity-20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Property Details Overlay */}
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm p-4 border-t">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                {property.location.address}
              </p>
              <p className="text-sm text-gray-500">
                {property.location.city}, {property.location.province}
              </p>
              
              {property.location.neighborhood && (
                <p className="text-xs text-gray-500 mt-1">
                  Barrio: {property.location.neighborhood}
                </p>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ${property.price.toLocaleString('es-DO')} {property.currency}
              </p>
              <p className="text-xs text-gray-500">
                ${(property.price / property.area).toLocaleString('es-DO')}/m²
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook to load external map libraries (placeholder)
export const useMapLibrary = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This would load Google Maps or other mapping library
    // For now, we'll just simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { isLoaded };
};

// Types for future map integration
export interface MapOptions {
  center?: { lat: number; lng: number };
  zoom?: number;
  mapTypeId?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  disableDefaultUI?: boolean;
  zoomControl?: boolean;
  streetViewControl?: boolean;
  fullscreenControl?: boolean;
}

export interface MarkerOptions {
  position: { lat: number; lng: number };
  title?: string;
  icon?: string;
  draggable?: boolean;
  animation?: 'BOUNCE' | 'DROP';
}