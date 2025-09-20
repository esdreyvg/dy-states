import { File } from '../types/common';
export declare const validateEmail: (email: string) => {
    isValid: boolean;
    message?: string;
};
export declare const validatePassword: (password: string) => {
    isValid: boolean;
    message?: string;
};
export declare const validateName: (name: string) => {
    isValid: boolean;
    message?: string;
};
export declare const validatePhone: (phone: string) => {
    isValid: boolean;
    message?: string;
};
export declare const validatePrice: (price: number | string) => {
    isValid: boolean;
    message?: string;
};
export declare const validateArea: (area: number | string) => {
    isValid: boolean;
    message?: string;
};
export declare const validateYear: (year: number | string) => {
    isValid: boolean;
    message?: string;
};
export declare const validateRequired: (value: any, fieldName?: string) => {
    isValid: boolean;
    message?: string;
};
export declare const validateFileSize: (file: File, maxSize?: number) => {
    isValid: boolean;
    message?: string;
};
interface FileData {
    type: string;
    size: number;
    name?: string;
}
export declare const validateFileType: (file: FileData, allowedTypes: string[]) => {
    isValid: boolean;
    message?: string;
};
export declare const validatePasswordMatch: (password: string, confirmPassword: string) => {
    isValid: boolean;
    message?: string;
};
export {};
