// Format currency values
export const formatCurrency = (amount, currency = 'DOP', locale = 'es-DO') => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(amount);
    }
    catch (error) {
        return `${currency} ${amount.toLocaleString()}`;
    }
};
// Format numbers with thousand separators
export const formatNumber = (number, locale = 'es-DO', options) => {
    try {
        return new Intl.NumberFormat(locale, options).format(number);
    }
    catch (error) {
        return number.toLocaleString();
    }
};
// Format percentage
export const formatPercentage = (value, locale = 'es-DO', decimals = 1) => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value / 100);
    }
    catch (error) {
        return `${value.toFixed(decimals)}%`;
    }
};
// Format area with unit
export const formatArea = (area, unit = 'm²', locale = 'es-DO') => {
    const formattedNumber = formatNumber(area, locale);
    return `${formattedNumber} ${unit}`;
};
// Format phone number (Dominican Republic)
export const formatPhoneNumber = (phone) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Check if it's a Dominican number
    if (cleaned.length === 10 && (cleaned.startsWith('809') || cleaned.startsWith('829') || cleaned.startsWith('849'))) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    // Return original if not recognized format
    return phone;
};
// Capitalize first letter of each word
export const capitalizeWords = (text) => {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
// Capitalize first letter only
export const capitalizeFirst = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
// Format file size
export const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
// Format property title for URL (slug)
export const formatSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[áàäâ]/g, 'a')
        .replace(/[éèëê]/g, 'e')
        .replace(/[íìïî]/g, 'i')
        .replace(/[óòöô]/g, 'o')
        .replace(/[úùüû]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};
// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength).trim() + '...';
};
// Extract initials from name
export const getInitials = (firstName, lastName) => {
    const first = firstName.charAt(0).toUpperCase();
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
};
// Format address for display
export const formatAddress = (address) => {
    const parts = [address.street, address.city, address.province, address.country].filter(Boolean);
    return parts.join(', ');
};
// Parse and format property features
export const formatFeatures = (features) => {
    if (features.length === 0)
        return 'Sin características especificadas';
    if (features.length === 1)
        return features[0];
    if (features.length === 2)
        return features.join(' y ');
    const lastFeature = features.pop();
    return features.join(', ') + ' y ' + lastFeature;
};
// Format bedrooms/bathrooms display
export const formatRooms = (bedrooms, bathrooms) => {
    const bedroomText = bedrooms === 1 ? 'habitación' : 'habitaciones';
    const bathroomText = bathrooms === 1 ? 'baño' : 'baños';
    return `${bedrooms} ${bedroomText}, ${bathrooms} ${bathroomText}`;
};
