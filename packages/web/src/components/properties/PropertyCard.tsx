'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Car, Square, Eye, Share2 } from 'lucide-react';
import type { Property } from '@dy-estates/shared/src/types/property';
import { PropertyStatus, ListingType } from '@dy-estates/shared/src/types/property';
import { propertyFavoritesService, propertySharingService } from '@/services/property';
import { formatPrice, formatArea } from '../../utils/format';
import { useAuth } from '@/context/auth-provider';

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
  showFavoriteButton?: boolean;
  showShareButton?: boolean;
  className?: string;
  onFavoriteToggle?: (propertyId: string, isFavorite: boolean) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant = 'grid',
  showFavoriteButton = true,
  showShareButton = true,
  className = '',
  onFavoriteToggle,
}) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const primaryImage = property.images.find(img => img.isPrimary) || property.images[0];
  const propertyUrl = `/properties/${property.id}`;

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        await propertyFavoritesService.removeFavorite(property.id);
        setIsFavorite(false);
      } else {
        await propertyFavoritesService.addFavorite(property.id);
        setIsFavorite(true);
      }
      onFavoriteToggle?.(property.id, !isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
    setIsLoading(false);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const shareUrl = await propertySharingService.getShareUrl(property.id);
      if (navigator.share) {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error('Error sharing property:', error);
    }
  };

  const renderPropertyInfo = () => (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex space-x-2 ml-2">
          {showFavoriteButton && user && (
            <button
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
          {showShareButton && (
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Share2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center text-gray-600 text-sm">
        <MapPin size={16} className="mr-1" />
        <span className="line-clamp-1">
          {property.location.neighborhood && `${property.location.neighborhood}, `}
          {property.location.city}, {property.location.province}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          {formatPrice(property.price, property.currency)}
        </div>
        {property.listingType && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.listingType === ListingType.SALE 
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {property.listingType === ListingType.SALE ? 'Venta' : 'Alquiler'}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <Bed size={16} className="mr-1" />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center">
          <Bath size={16} className="mr-1" />
          <span>{property.bathrooms}</span>
        </div>
        {property.parkingSpaces > 0 && (
          <div className="flex items-center">
            <Car size={16} className="mr-1" />
            <span>{property.parkingSpaces}</span>
          </div>
        )}
        <div className="flex items-center">
          <Square size={16} className="mr-1" />
          <span>{formatArea(property.area)}</span>
        </div>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {feature.name}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{property.features.length - 3} más
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Eye size={14} className="mr-1" />
          <span>{property.viewsCount} vistas</span>
        </div>
        <div className="text-xs">
          Actualizado {new Date(property.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  if (variant === 'list') {
    return (
      <Link href={propertyUrl}>
        <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${className}`}>
          <div className="flex">
            <div className="relative w-1/3 h-48">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}
              {property.isFeatured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Destacada
                </div>
              )}
              {property.status !== PropertyStatus.FOR_SALE && property.status !== PropertyStatus.FOR_RENT && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {property.status === PropertyStatus.SOLD ? 'Vendida' : 
                   property.status === PropertyStatus.RENTED ? 'Alquilada' : 
                   property.status === PropertyStatus.UNDER_CONTRACT ? 'En proceso' : 'No disponible'}
                </div>
              )}
            </div>
            <div className="flex-1 p-4">
              {renderPropertyInfo()}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={propertyUrl}>
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden ${className}`}>
        <div className="relative h-48">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
          {property.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Destacada
            </div>
          )}
          {property.status !== PropertyStatus.FOR_SALE && property.status !== PropertyStatus.FOR_RENT && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {property.status === PropertyStatus.SOLD ? 'Vendida' : 
               property.status === PropertyStatus.RENTED ? 'Alquilada' : 
               property.status === PropertyStatus.UNDER_CONTRACT ? 'En proceso' : 'No disponible'}
            </div>
          )}
          {property.virtualTours && property.virtualTours.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              Tour Virtual
            </div>
          )}
        </div>
        <div className="p-4">
          {renderPropertyInfo()}
        </div>
      </div>
    </Link>
  );
};