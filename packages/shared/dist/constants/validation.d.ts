export declare const VALIDATION_RULES: {
    readonly EMAIL: {
        readonly REQUIRED: true;
        readonly MIN_LENGTH: 5;
        readonly MAX_LENGTH: 255;
        readonly PATTERN: RegExp;
    };
    readonly PASSWORD: {
        readonly REQUIRED: true;
        readonly MIN_LENGTH: 8;
        readonly MAX_LENGTH: 128;
        readonly REQUIRE_UPPERCASE: true;
        readonly REQUIRE_LOWERCASE: true;
        readonly REQUIRE_DIGIT: true;
        readonly REQUIRE_SPECIAL: false;
    };
    readonly NAME: {
        readonly REQUIRED: true;
        readonly MIN_LENGTH: 2;
        readonly MAX_LENGTH: 50;
        readonly PATTERN: RegExp;
    };
    readonly PHONE: {
        readonly REQUIRED: false;
        readonly PATTERN: RegExp;
    };
    readonly PROPERTY_TITLE: {
        readonly REQUIRED: true;
        readonly MIN_LENGTH: 10;
        readonly MAX_LENGTH: 200;
    };
    readonly PROPERTY_DESCRIPTION: {
        readonly REQUIRED: true;
        readonly MIN_LENGTH: 50;
        readonly MAX_LENGTH: 2000;
    };
    readonly PRICE: {
        readonly REQUIRED: true;
        readonly MIN: 1;
        readonly MAX: 999999999;
    };
    readonly AREA: {
        readonly REQUIRED: true;
        readonly MIN: 1;
        readonly MAX: 100000;
    };
    readonly BEDROOMS: {
        readonly MIN: 0;
        readonly MAX: 50;
    };
    readonly BATHROOMS: {
        readonly MIN: 0;
        readonly MAX: 50;
    };
    readonly PARKING: {
        readonly MIN: 0;
        readonly MAX: 20;
    };
    readonly YEAR_BUILT: {
        readonly MIN: 1900;
        readonly MAX: number;
    };
};
export declare const USER_ROLES: {
    readonly ADMIN: "admin";
    readonly AGENT: "agent";
    readonly OWNER: "owner";
    readonly CLIENT: "client";
    readonly INVESTOR: "investor";
};
export declare const ROLE_DISPLAY_NAMES: {
    readonly admin: "Administrador";
    readonly agent: "Agente";
    readonly owner: "Propietario";
    readonly client: "Cliente";
    readonly investor: "Inversionista";
};
export declare const ROLE_DESCRIPTIONS: {
    readonly admin: "Acceso completo al sistema";
    readonly agent: "Gestión de propiedades y clientes";
    readonly owner: "Gestión de propiedades propias";
    readonly client: "Búsqueda y consulta de propiedades";
    readonly investor: "Análisis de inversiones inmobiliarias";
};
export declare const VALIDATION_MESSAGES: {
    readonly REQUIRED: "Este campo es requerido";
    readonly EMAIL_INVALID: "Ingrese un email válido";
    readonly PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres";
    readonly PASSWORD_NO_UPPERCASE: "La contraseña debe contener al menos una mayúscula";
    readonly PASSWORD_NO_LOWERCASE: "La contraseña debe contener al menos una minúscula";
    readonly PASSWORD_NO_DIGIT: "La contraseña debe contener al menos un número";
    readonly PASSWORD_NO_SPECIAL: "La contraseña debe contener al menos un carácter especial";
    readonly PASSWORDS_NO_MATCH: "Las contraseñas no coinciden";
    readonly NAME_INVALID: "El nombre solo puede contener letras y espacios";
    readonly PHONE_INVALID: "Ingrese un teléfono válido (ej: 809-123-4567)";
    readonly PRICE_INVALID: "Ingrese un precio válido";
    readonly AREA_INVALID: "Ingrese un área válida en metros cuadrados";
    readonly YEAR_INVALID: "Ingrese un año válido";
    readonly MIN_LENGTH: (min: number) => string;
    readonly MAX_LENGTH: (max: number) => string;
    readonly MIN_VALUE: (min: number) => string;
    readonly MAX_VALUE: (max: number) => string;
    readonly TERMS_REQUIRED: "Debe aceptar los términos y condiciones";
    readonly FILE_TOO_LARGE: "El archivo es demasiado grande";
    readonly FILE_TYPE_INVALID: "Tipo de archivo no válido";
};
export declare const VALIDATION_MESSAGES_EN: {
    readonly REQUIRED: "This field is required";
    readonly EMAIL_INVALID: "Please enter a valid email";
    readonly PASSWORD_TOO_SHORT: "Password must be at least 8 characters";
    readonly PASSWORD_NO_UPPERCASE: "Password must contain at least one uppercase letter";
    readonly PASSWORD_NO_LOWERCASE: "Password must contain at least one lowercase letter";
    readonly PASSWORD_NO_DIGIT: "Password must contain at least one number";
    readonly PASSWORD_NO_SPECIAL: "Password must contain at least one special character";
    readonly PASSWORDS_NO_MATCH: "Passwords do not match";
    readonly NAME_INVALID: "Name can only contain letters and spaces";
    readonly PHONE_INVALID: "Please enter a valid phone number (e.g., 809-123-4567)";
    readonly PRICE_INVALID: "Please enter a valid price";
    readonly AREA_INVALID: "Please enter a valid area in square meters";
    readonly YEAR_INVALID: "Please enter a valid year";
    readonly MIN_LENGTH: (min: number) => string;
    readonly MAX_LENGTH: (max: number) => string;
    readonly MIN_VALUE: (min: number) => string;
    readonly MAX_VALUE: (max: number) => string;
    readonly TERMS_REQUIRED: "You must accept the terms and conditions";
    readonly FILE_TOO_LARGE: "File is too large";
    readonly FILE_TYPE_INVALID: "Invalid file type";
};
