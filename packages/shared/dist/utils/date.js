import { format, parseISO, formatDistanceToNow, isValid } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
const locales = {
    es,
    en: enUS,
};
export const dateUtils = {
    // Format date with locale support
    format: (date, formatStr = 'dd/MM/yyyy', locale = 'es') => {
        try {
            const dateObj = typeof date === 'string' ? parseISO(date) : date;
            if (!isValid(dateObj))
                return 'Fecha inválida';
            return format(dateObj, formatStr, { locale: locales[locale] });
        }
        catch (error) {
            return 'Fecha inválida';
        }
    },
    // Format relative time (e.g., "hace 2 horas")
    formatRelative: (date, locale = 'es') => {
        try {
            const dateObj = typeof date === 'string' ? parseISO(date) : date;
            if (!isValid(dateObj))
                return 'Fecha inválida';
            return formatDistanceToNow(dateObj, {
                addSuffix: true,
                locale: locales[locale]
            });
        }
        catch (error) {
            return 'Fecha inválida';
        }
    },
    // Common date formats
    formatShort: (date, locale = 'es') => {
        return dateUtils.format(date, 'dd/MM/yy', locale);
    },
    formatLong: (date, locale = 'es') => {
        return dateUtils.format(date, 'dd \'de\' MMMM \'de\' yyyy', locale);
    },
    formatDateTime: (date, locale = 'es') => {
        return dateUtils.format(date, 'dd/MM/yyyy HH:mm', locale);
    },
    // Check if date is today
    isToday: (date) => {
        try {
            const dateObj = typeof date === 'string' ? parseISO(date) : date;
            const today = new Date();
            return dateObj.toDateString() === today.toDateString();
        }
        catch (error) {
            return false;
        }
    },
    // Get age from birth date
    getAge: (birthDate) => {
        try {
            const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        }
        catch (error) {
            return 0;
        }
    },
    // Parse date string to Date object
    parse: (dateString) => {
        try {
            const date = parseISO(dateString);
            return isValid(date) ? date : null;
        }
        catch (error) {
            return null;
        }
    },
    // Check if date is valid
    isValid: (date) => {
        try {
            const dateObj = typeof date === 'string' ? parseISO(date) : date;
            return isValid(dateObj);
        }
        catch (error) {
            return false;
        }
    },
};
