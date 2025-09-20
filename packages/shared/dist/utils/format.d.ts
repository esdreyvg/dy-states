export declare const formatCurrency: (amount: number, currency?: "DOP" | "USD" | "EUR", locale?: "es-DO" | "en-US") => string;
export declare const formatNumber: (number: number, locale?: "es-DO" | "en-US", options?: Intl.NumberFormatOptions) => string;
export declare const formatPercentage: (value: number, locale?: "es-DO" | "en-US", decimals?: number) => string;
export declare const formatArea: (area: number, unit?: "m\u00B2" | "ft\u00B2", locale?: "es-DO" | "en-US") => string;
export declare const formatPhoneNumber: (phone: string) => string;
export declare const capitalizeWords: (text: string) => string;
export declare const capitalizeFirst: (text: string) => string;
export declare const formatFileSize: (bytes: number) => string;
export declare const formatSlug: (title: string) => string;
export declare const truncateText: (text: string, maxLength: number) => string;
export declare const getInitials: (firstName: string, lastName?: string) => string;
export declare const formatAddress: (address: {
    street?: string;
    city?: string;
    province?: string;
    country?: string;
}) => string;
export declare const formatFeatures: (features: string[]) => string;
export declare const formatRooms: (bedrooms: number, bathrooms: number) => string;
