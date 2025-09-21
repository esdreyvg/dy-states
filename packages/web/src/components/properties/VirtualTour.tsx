'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Eye } from 'lucide-react';
import type { VirtualTour, VirtualTourType } from '@dy-estates/shared/src/types/property';

interface VirtualTourProps {
  tour: VirtualTour;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  onTourStart?: () => void;
  onTourEnd?: () => void;
}

export const VirtualTourComponent: React.FC<VirtualTourProps> = ({
  tour,
  autoPlay = false,
  showControls = true,
  className = '',
  onTourStart,
  onTourEnd,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (autoPlay && onTourStart) {
      onTourStart();
    }
  }, [autoPlay, onTourStart]);

  const handlePlayPause = () => {
    if (tour.type === 'video_tour' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        if (!currentTime && onTourStart) {
          onTourStart();
        }
      }
    } else if (tour.type === 'virtual_360') {
      // Handle panoramic tour play/pause logic
      setIsPlaying(!isPlaying);
      if (!isPlaying && onTourStart) {
        onTourStart();
      }
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (onTourEnd) {
      onTourEnd();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    if (tour.type === 'video_tour' && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    } else if (tour.type === 'virtual_360') {
      // Reset panoramic view to initial position
      setIsPlaying(false);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (hasError) {
    return (
      <div className={`bg-gray-200 rounded-lg p-8 text-center ${className}`}>
        <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Tour virtual no disponible</h3>
        <p className="text-gray-500">No se pudo cargar el tour virtual en este momento.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className} ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Cargando tour virtual...</p>
          </div>
        </div>
      )}

      {/* Tour Content */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px]">
        {tour.type === 'video_tour' && (
          <video
            ref={videoRef}
            src={tour.url}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnd}
            onError={handleError}
            muted={isMuted}
            playsInline
          >
            Tu navegador no soporta videos HTML5.
          </video>
        )}

        {tour.type === 'virtual_360' && (
          <iframe
            ref={iframeRef}
            src={tour.url}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleError}
            title={tour.title}
            allowFullScreen
          />
        )}

        {tour.type === 'interactive' && (
          <iframe
            ref={iframeRef}
            src={tour.url}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleError}
            title={tour.title}
            allowFullScreen
          />
        )}
      </div>

      {/* Tour Info Overlay */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
        <h3 className="font-semibold">{tour.title}</h3>
        {tour.description && (
          <p className="text-sm text-gray-300 mt-1">{tour.description}</p>
        )}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Video Progress Bar (only for video tours) */}
          {tour.type === 'video_tour' && duration > 0 && (
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Reiniciar"
              >
                <RotateCcw size={20} />
              </button>

              {/* Mute (only for video tours) */}
              {tour.type === 'video_tour' && (
                <button
                  onClick={handleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {/* Tour Type Badge */}
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {getTourTypeLabel(tour.type)}
              </span>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Pantalla completa"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour Duration Badge */}
      {tour.duration && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm">
          {Math.floor(tour.duration / 60)}:{(tour.duration % 60).toString().padStart(2, '0')} min
        </div>
      )}
    </div>
  );
};

// Helper function to get tour type labels
function getTourTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    video_tour: 'Video Tour',
    virtual_360: '360°',
    interactive: 'Interactivo',
    live_tour: 'Tour en Vivo',
  };
  
  return typeLabels[type] || type;
}

// CSS for custom slider styling (add to your global CSS)
export const tourSliderStyles = `
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
`;