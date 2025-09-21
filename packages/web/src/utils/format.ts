/**
 * Utility functions for formatting data display
 */

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: number, currency: 'DOP' | 'USD' = 'DOP'): string => {
  const currencySymbols = {
    DOP: 'RD$',
    USD: '$',
  };

  const formatter = new Intl.NumberFormat('es-DO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${currencySymbols[currency]}${formatter.format(price)}`;
};

/**
 * Format area in square meters
 */
export const formatArea = (area: number): string => {
  const formatter = new Intl.NumberFormat('es-DO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(area)} m²`;
};

/**
 * Format number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-DO').format(num);
};

/**
 * Format date in Spanish locale
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-DO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format relative time (e.g., "hace 2 días")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Hoy';
  } else if (diffInDays === 1) {
    return 'Ayer';
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} días`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `Hace ${years} año${years > 1 ? 's' : ''}`;
  }
};

/**
 * Format phone number in Dominican Republic format
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  // Return original if not 10 digits
  return phone;
};

/**
 * Format property type for display
 */
export const formatPropertyType = (type: string): string => {
  const typeMap: Record<string, string> = {
    APARTMENT: 'Apartamento',
    HOUSE: 'Casa',
    VILLA: 'Villa',
    TOWNHOUSE: 'Casa Adosada',
    PENTHOUSE: 'Penthouse',
    STUDIO: 'Estudio',
    DUPLEX: 'Dúplex',
    LAND: 'Terreno',
    COMMERCIAL: 'Comercial',
    OFFICE: 'Oficina',
    WAREHOUSE: 'Almacén',
  };

  return typeMap[type] || type;
};

/**
 * Format property status for display
 */
export const formatPropertyStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    FOR_SALE: 'En Venta',
    FOR_RENT: 'En Alquiler',
    SOLD: 'Vendida',
    RENTED: 'Alquilada',
    OFF_MARKET: 'Fuera del Mercado',
    UNDER_CONTRACT: 'En Proceso',
  };

  return statusMap[status] || status;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};