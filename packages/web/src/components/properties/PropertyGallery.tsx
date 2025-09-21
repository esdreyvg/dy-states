'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, Download, Share2 } from 'lucide-react';
import type { PropertyImage } from '@dy-estates/shared/src/types/property';

interface PropertyGalleryProps {
  images: PropertyImage[];
  initialImageIndex?: number;
  showThumbnails?: boolean;
  showControls?: boolean;
  className?: string;
  onImageChange?: (index: number) => void;
  onShare?: (imageUrl: string) => void;
  onDownload?: (imageUrl: string) => void;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  initialImageIndex = 0,
  showThumbnails = true,
  showControls = true,
  className = '',
  onImageChange,
  onShare,
  onDownload,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex]);

  useEffect(() => {
    onImageChange?.(currentIndex);
  }, [currentIndex, onImageChange]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            goToPrevious();
            break;
          case 'ArrowRight':
            goToNext();
            break;
          case 'Escape':
            setIsFullscreen(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToPrevious, goToNext]);

  const currentImage = images[currentIndex];

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center h-96 ${className}`}>
        <span className="text-gray-500">No hay imágenes disponibles</span>
      </div>
    );
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleShare = () => {
    if (onShare && currentImage) {
      onShare(currentImage.url);
    }
  };

  const handleDownload = () => {
    if (onDownload && currentImage) {
      onDownload(currentImage.url);
    }
  };

  return (
    <>
      <div className={`relative bg-gray-900 ${className}`}>
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px]">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Cargando...</span>
            </div>
          )}
          
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover cursor-zoom-in"
            onClick={() => setIsFullscreen(true)}
            onLoad={handleImageLoad}
            priority={currentIndex === 0}
          />

          {/* Navigation Controls */}
          {showControls && images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Top Controls */}
          {showControls && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                aria-label="Ver en pantalla completa"
              >
                <ZoomIn size={20} />
              </button>
              
              {onShare && (
                <button
                  onClick={handleShare}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Compartir imagen"
                >
                  <Share2 size={20} />
                </button>
              )}
              
              {onDownload && (
                <button
                  onClick={handleDownload}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Descargar imagen"
                >
                  <Download size={20} />
                </button>
              )}
            </div>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Image Type Badge */}
          {currentImage.type && (
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {getImageTypeLabel(currentImage.type)}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="p-4 bg-gray-100">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentIndex
                      ? 'border-blue-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {image.isPrimary && (
                    <div className="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-1 rounded">
                      Principal
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            {/* Navigation in Fullscreen */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Fullscreen Image */}
            <div className="relative max-w-7xl max-h-full">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                width={1200}
                height={800}
                className="object-contain max-h-full"
                priority
              />
            </div>

            {/* Fullscreen Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to get image type labels
function getImageTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    EXTERIOR: 'Exterior',
    INTERIOR: 'Interior',
    KITCHEN: 'Cocina',
    BATHROOM: 'Baño',
    BEDROOM: 'Habitación',
    LIVING_ROOM: 'Sala',
    POOL: 'Piscina',
    GARDEN: 'Jardín',
    VIEW: 'Vista',
    FLOOR_PLAN: 'Plano',
  };
  
  return typeLabels[type] || type;
}