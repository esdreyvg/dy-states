// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
// Application
export const APP_NAME = 'Inmobiliaria Dyxersoft';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Plataforma inmobiliaria moderna para Bolivia';
// Languages
export const SUPPORTED_LANGUAGES = ['es', 'en'];
export const DEFAULT_LANGUAGE = 'es';
// Currencies
export const SUPPORTED_CURRENCIES = ['DOP', 'USD'];
export const DEFAULT_CURRENCY = 'DOP';
// Countries
export const SUPPORTED_COUNTRIES = ['DO']; // Dominican Republic
export const DEFAULT_COUNTRY = 'DO';
// Provinces (Dominican Republic)
export const DOMINICAN_PROVINCES = [
    'Azua',
    'Baoruco',
    'Barahona',
    'Dajabón',
    'Distrito Nacional',
    'Duarte',
    'El Seibo',
    'Elías Piña',
    'Espaillat',
    'Hato Mayor',
    'Hermanas Mirabal',
    'Independencia',
    'La Altagracia',
    'La Romana',
    'La Vega',
    'María Trinidad Sánchez',
    'Monseñor Nouel',
    'Monte Cristi',
    'Monte Plata',
    'Pedernales',
    'Peravia',
    'Puerto Plata',
    'Samaná',
    'San Cristóbal',
    'San José de Ocoa',
    'San Juan',
    'San Pedro de Macorís',
    'Sánchez Ramírez',
    'Santiago',
    'Santiago Rodríguez',
    'Santo Domingo',
    'Valverde',
];
// Major Cities
export const MAJOR_CITIES = [
    'Santo Domingo',
    'Santiago de los Caballeros',
    'La Romana',
    'San Pedro de Macorís',
    'Puerto Plata',
    'La Vega',
    'Barahona',
    'Moca',
    'San Cristóbal',
    'Higüey',
    'Azua',
    'Bonao',
    'Cotuí',
    'Nagua',
    'Mao',
    'Baní',
    'San Juan de la Maguana',
    'Monte Cristi',
    'Samaná',
    'Constanza',
];
// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
// Cache
export const CACHE_DURATION = {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 30 * 60 * 1000, // 30 minutes
    LONG: 2 * 60 * 60 * 1000, // 2 hours
    VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};
// URL Patterns
export const URL_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_DO: /^(\+1)?[89]\d{2}-?\d{3}-?\d{4}$/,
    CEDULA_DO: /^\d{3}-?\d{7}-?\d{1}$/,
    RNC_DO: /^\d{9}$/,
};
