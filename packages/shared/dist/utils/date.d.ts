export declare const dateUtils: {
    format: (date: Date | string, formatStr?: string, locale?: "es" | "en") => string;
    formatRelative: (date: Date | string, locale?: "es" | "en") => string;
    formatShort: (date: Date | string, locale?: "es" | "en") => string;
    formatLong: (date: Date | string, locale?: "es" | "en") => string;
    formatDateTime: (date: Date | string, locale?: "es" | "en") => string;
    isToday: (date: Date | string) => boolean;
    getAge: (birthDate: Date | string) => number;
    parse: (dateString: string) => Date | null;
    isValid: (date: Date | string) => boolean;
};
