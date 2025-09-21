// Field Validation Rules
export const VALIDATION_RULES = {
    EMAIL: {
        REQUIRED: true,
        MIN_LENGTH: 5,
        MAX_LENGTH: 255,
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    PASSWORD: {
        REQUIRED: true,
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_DIGIT: true,
        REQUIRE_SPECIAL: false,
    },
    NAME: {
        REQUIRED: true,
        MIN_LENGTH: 2,
        MAX_LENGTH: 50,
        PATTERN: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    },
    PHONE: {
        REQUIRED: false,
        PATTERN: /^(\+1)?[89]\d{2}-?\d{3}-?\d{4}$/,
    },
    PROPERTY_TITLE: {
        REQUIRED: true,
        MIN_LENGTH: 10,
        MAX_LENGTH: 200,
    },
    PROPERTY_DESCRIPTION: {
        REQUIRED: true,
        MIN_LENGTH: 50,
        MAX_LENGTH: 2000,
    },
    PRICE: {
        REQUIRED: true,
        MIN: 1,
        MAX: 999999999,
    },
    AREA: {
        REQUIRED: true,
        MIN: 1,
        MAX: 100000,
    },
    BEDROOMS: {
        MIN: 0,
        MAX: 50,
    },
    BATHROOMS: {
        MIN: 0,
        MAX: 50,
    },
    PARKING: {
        MIN: 0,
        MAX: 20,
    },
    YEAR_BUILT: {
        MIN: 1900,
        MAX: new Date().getFullYear() + 5,
    },
};
// User Role Constants
export const USER_ROLES = {
    ADMIN: 'admin',
    AGENT: 'agent',
    OWNER: 'owner',
    CLIENT: 'client',
    INVESTOR: 'investor',
};
export const ROLE_DISPLAY_NAMES = {
    [USER_ROLES.ADMIN]: 'Administrador',
    [USER_ROLES.AGENT]: 'Agente',
    [USER_ROLES.OWNER]: 'Propietario',
    [USER_ROLES.CLIENT]: 'Cliente',
    [USER_ROLES.INVESTOR]: 'Inversionista',
};
export const ROLE_DESCRIPTIONS = {
    [USER_ROLES.ADMIN]: 'Acceso completo al sistema',
    [USER_ROLES.AGENT]: 'Gestión de propiedades y clientes',
    [USER_ROLES.OWNER]: 'Gestión de propiedades propias',
    [USER_ROLES.CLIENT]: 'Búsqueda y consulta de propiedades',
    [USER_ROLES.INVESTOR]: 'Análisis de inversiones inmobiliarias',
};
// Validation Messages
export const VALIDATION_MESSAGES = {
    REQUIRED: 'Este campo es requerido',
    EMAIL_INVALID: 'Ingrese un email válido',
    PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
    PASSWORD_NO_UPPERCASE: 'La contraseña debe contener al menos una mayúscula',
    PASSWORD_NO_LOWERCASE: 'La contraseña debe contener al menos una minúscula',
    PASSWORD_NO_DIGIT: 'La contraseña debe contener al menos un número',
    PASSWORD_NO_SPECIAL: 'La contraseña debe contener al menos un carácter especial',
    PASSWORDS_NO_MATCH: 'Las contraseñas no coinciden',
    NAME_INVALID: 'El nombre solo puede contener letras y espacios',
    PHONE_INVALID: 'Ingrese un teléfono válido (ej: 809-123-4567)',
    PRICE_INVALID: 'Ingrese un precio válido',
    AREA_INVALID: 'Ingrese un área válida en metros cuadrados',
    YEAR_INVALID: 'Ingrese un año válido',
    MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
    MAX_LENGTH: (max) => `No puede exceder ${max} caracteres`,
    MIN_VALUE: (min) => `El valor mínimo es ${min}`,
    MAX_VALUE: (max) => `El valor máximo es ${max}`,
    TERMS_REQUIRED: 'Debe aceptar los términos y condiciones',
    FILE_TOO_LARGE: 'El archivo es demasiado grande',
    FILE_TYPE_INVALID: 'Tipo de archivo no válido',
};
// English Validation Messages
export const VALIDATION_MESSAGES_EN = {
    REQUIRED: 'This field is required',
    EMAIL_INVALID: 'Please enter a valid email',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter',
    PASSWORD_NO_LOWERCASE: 'Password must contain at least one lowercase letter',
    PASSWORD_NO_DIGIT: 'Password must contain at least one number',
    PASSWORD_NO_SPECIAL: 'Password must contain at least one special character',
    PASSWORDS_NO_MATCH: 'Passwords do not match',
    NAME_INVALID: 'Name can only contain letters and spaces',
    PHONE_INVALID: 'Please enter a valid phone number (e.g., 809-123-4567)',
    PRICE_INVALID: 'Please enter a valid price',
    AREA_INVALID: 'Please enter a valid area in square meters',
    YEAR_INVALID: 'Please enter a valid year',
    MIN_LENGTH: (min) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max) => `Cannot exceed ${max} characters`,
    MIN_VALUE: (min) => `Minimum value is ${min}`,
    MAX_VALUE: (max) => `Maximum value is ${max}`,
    TERMS_REQUIRED: 'You must accept the terms and conditions',
    FILE_TOO_LARGE: 'File is too large',
    FILE_TYPE_INVALID: 'Invalid file type',
};
