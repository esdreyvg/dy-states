import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../constants/validation';
// Email validation
export const validateEmail = (email) => {
    if (!email) {
        return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
    }
    if (email.length < VALIDATION_RULES.EMAIL.MIN_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION_RULES.EMAIL.MIN_LENGTH) };
    }
    if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION_RULES.EMAIL.MAX_LENGTH) };
    }
    if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
        return { isValid: false, message: VALIDATION_MESSAGES.EMAIL_INVALID };
    }
    return { isValid: true };
};
// Password validation
export const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
    }
    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
    }
    if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION_RULES.PASSWORD.MAX_LENGTH) };
    }
    if (VALIDATION_RULES.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_NO_UPPERCASE };
    }
    if (VALIDATION_RULES.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_NO_LOWERCASE };
    }
    if (VALIDATION_RULES.PASSWORD.REQUIRE_DIGIT && !/\d/.test(password)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_NO_DIGIT };
    }
    if (VALIDATION_RULES.PASSWORD.REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_NO_SPECIAL };
    }
    return { isValid: true };
};
// Name validation
export const validateName = (name) => {
    if (!name) {
        return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
    }
    if (name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.MIN_LENGTH(VALIDATION_RULES.NAME.MIN_LENGTH) };
    }
    if (name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_LENGTH(VALIDATION_RULES.NAME.MAX_LENGTH) };
    }
    if (!VALIDATION_RULES.NAME.PATTERN.test(name)) {
        return { isValid: false, message: VALIDATION_MESSAGES.NAME_INVALID };
    }
    return { isValid: true };
};
// Phone validation (Dominican Republic format)
export const validatePhone = (phone) => {
    if (!phone) {
        return { isValid: true }; // Phone is optional
    }
    if (!VALIDATION_RULES.PHONE.PATTERN.test(phone)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PHONE_INVALID };
    }
    return { isValid: true };
};
// Price validation
export const validatePrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) {
        return { isValid: false, message: VALIDATION_MESSAGES.PRICE_INVALID };
    }
    if (numPrice < VALIDATION_RULES.PRICE.MIN) {
        return { isValid: false, message: VALIDATION_MESSAGES.MIN_VALUE(VALIDATION_RULES.PRICE.MIN) };
    }
    if (numPrice > VALIDATION_RULES.PRICE.MAX) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_VALUE(VALIDATION_RULES.PRICE.MAX) };
    }
    return { isValid: true };
};
// Area validation
export const validateArea = (area) => {
    const numArea = typeof area === 'string' ? parseFloat(area) : area;
    if (isNaN(numArea)) {
        return { isValid: false, message: VALIDATION_MESSAGES.AREA_INVALID };
    }
    if (numArea < VALIDATION_RULES.AREA.MIN) {
        return { isValid: false, message: VALIDATION_MESSAGES.MIN_VALUE(VALIDATION_RULES.AREA.MIN) };
    }
    if (numArea > VALIDATION_RULES.AREA.MAX) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_VALUE(VALIDATION_RULES.AREA.MAX) };
    }
    return { isValid: true };
};
// Year validation
export const validateYear = (year) => {
    const numYear = typeof year === 'string' ? parseInt(year) : year;
    if (isNaN(numYear)) {
        return { isValid: false, message: VALIDATION_MESSAGES.YEAR_INVALID };
    }
    if (numYear < VALIDATION_RULES.YEAR_BUILT.MIN) {
        return { isValid: false, message: VALIDATION_MESSAGES.MIN_VALUE(VALIDATION_RULES.YEAR_BUILT.MIN) };
    }
    if (numYear > VALIDATION_RULES.YEAR_BUILT.MAX) {
        return { isValid: false, message: VALIDATION_MESSAGES.MAX_VALUE(VALIDATION_RULES.YEAR_BUILT.MAX) };
    }
    return { isValid: true };
};
// Generic required field validation
export const validateRequired = (value, fieldName) => {
    if (value === null || value === undefined || value === '') {
        return {
            isValid: false,
            message: fieldName ? `${fieldName} es requerido` : VALIDATION_MESSAGES.REQUIRED
        };
    }
    return { isValid: true };
};
// File size validation
export const validateFileSize = (file, maxSize = 10 * 1024 * 1024) => {
    if (file.size > maxSize) {
        return { isValid: false, message: VALIDATION_MESSAGES.FILE_TOO_LARGE };
    }
    return { isValid: true };
};
// File type validation
export const validateFileType = (file, allowedTypes) => {
    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, message: VALIDATION_MESSAGES.FILE_TYPE_INVALID };
    }
    return { isValid: true };
};
// Password confirmation validation
export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return { isValid: false, message: VALIDATION_MESSAGES.PASSWORDS_NO_MATCH };
    }
    return { isValid: true };
};
