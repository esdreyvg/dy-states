import { z } from 'zod';
import { RentalStatus, RentalType, PricingType, DiscountType, FeeType, TravelPurpose, PaymentMethod, CancellationPolicyType, MessageType, NotificationType, NotificationChannel, NotificationPriority, DevicePlatform, AmenityCategory, TransportationType, AttractionType, PaymentProvider, UserType, DocumentType, ReviewType, ReportReason, AdminRole, AdminUserStatus, PropertyPublicationStatus, PermissionType, ActivityType, LogLevel } from '../types/rental';
export declare const priceSchema: z.ZodNumber;
export declare const currencySchema: z.ZodEnum<["DOP", "USD"]>;
export declare const phoneSchema: z.ZodString;
export declare const coordinatesSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latitude: number;
    longitude: number;
}, {
    latitude: number;
    longitude: number;
}>;
export declare const rentalPricingSchema: z.ZodEffects<z.ZodObject<{
    basePrice: z.ZodNumber;
    currency: z.ZodEnum<["DOP", "USD"]>;
    pricingType: z.ZodNativeEnum<typeof PricingType>;
    securityDeposit: z.ZodNumber;
    cleaningFee: z.ZodOptional<z.ZodNumber>;
    minimumStay: z.ZodNumber;
    maximumStay: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    currency: "DOP" | "USD";
    basePrice: number;
    pricingType: PricingType;
    securityDeposit: number;
    minimumStay: number;
    cleaningFee?: number | undefined;
    maximumStay?: number | undefined;
}, {
    currency: "DOP" | "USD";
    basePrice: number;
    pricingType: PricingType;
    securityDeposit: number;
    minimumStay: number;
    cleaningFee?: number | undefined;
    maximumStay?: number | undefined;
}>, {
    currency: "DOP" | "USD";
    basePrice: number;
    pricingType: PricingType;
    securityDeposit: number;
    minimumStay: number;
    cleaningFee?: number | undefined;
    maximumStay?: number | undefined;
}, {
    currency: "DOP" | "USD";
    basePrice: number;
    pricingType: PricingType;
    securityDeposit: number;
    minimumStay: number;
    cleaningFee?: number | undefined;
    maximumStay?: number | undefined;
}>;
export declare const seasonalRateSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    startDate: z.ZodDate;
    endDate: z.ZodDate;
    priceMultiplier: z.ZodNumber;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    isActive: boolean;
    name: string;
    startDate: Date;
    endDate: Date;
    priceMultiplier: number;
}, {
    id: string;
    isActive: boolean;
    name: string;
    startDate: Date;
    endDate: Date;
    priceMultiplier: number;
}>, {
    id: string;
    isActive: boolean;
    name: string;
    startDate: Date;
    endDate: Date;
    priceMultiplier: number;
}, {
    id: string;
    isActive: boolean;
    name: string;
    startDate: Date;
    endDate: Date;
    priceMultiplier: number;
}>;
export declare const rentalDiscountSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    type: z.ZodNativeEnum<typeof DiscountType>;
    name: z.ZodString;
    value: z.ZodNumber;
    isPercentage: z.ZodBoolean;
    minimumStay: z.ZodOptional<z.ZodNumber>;
    conditions: z.ZodOptional<z.ZodString>;
    validFrom: z.ZodOptional<z.ZodDate>;
    validTo: z.ZodOptional<z.ZodDate>;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: DiscountType;
    isActive: boolean;
    value: number;
    name: string;
    isPercentage: boolean;
    minimumStay?: number | undefined;
    conditions?: string | undefined;
    validFrom?: Date | undefined;
    validTo?: Date | undefined;
}, {
    id: string;
    type: DiscountType;
    isActive: boolean;
    value: number;
    name: string;
    isPercentage: boolean;
    minimumStay?: number | undefined;
    conditions?: string | undefined;
    validFrom?: Date | undefined;
    validTo?: Date | undefined;
}>, {
    id: string;
    type: DiscountType;
    isActive: boolean;
    value: number;
    name: string;
    isPercentage: boolean;
    minimumStay?: number | undefined;
    conditions?: string | undefined;
    validFrom?: Date | undefined;
    validTo?: Date | undefined;
}, {
    id: string;
    type: DiscountType;
    isActive: boolean;
    value: number;
    name: string;
    isPercentage: boolean;
    minimumStay?: number | undefined;
    conditions?: string | undefined;
    validFrom?: Date | undefined;
    validTo?: Date | undefined;
}>;
export declare const rentalFeeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodNativeEnum<typeof FeeType>;
    isRequired: z.ZodBoolean;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: FeeType;
    name: string;
    amount: number;
    isRequired: boolean;
    description?: string | undefined;
}, {
    id: string;
    type: FeeType;
    name: string;
    amount: number;
    isRequired: boolean;
    description?: string | undefined;
}>;
export declare const rentalAvailabilitySchema: z.ZodEffects<z.ZodObject<{
    isInstantBook: z.ZodBoolean;
    advanceNotice: z.ZodNumber;
    preparationTime: z.ZodNumber;
    checkInTime: z.ZodString;
    checkOutTime: z.ZodString;
    blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
    minimumAdvanceBooking: z.ZodNumber;
    maximumAdvanceBooking: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    isInstantBook: boolean;
    advanceNotice: number;
    preparationTime: number;
    checkInTime: string;
    checkOutTime: string;
    blockedDates: Date[];
    minimumAdvanceBooking: number;
    maximumAdvanceBooking: number;
}, {
    isInstantBook: boolean;
    advanceNotice: number;
    preparationTime: number;
    checkInTime: string;
    checkOutTime: string;
    minimumAdvanceBooking: number;
    maximumAdvanceBooking: number;
    blockedDates?: Date[] | undefined;
}>, {
    isInstantBook: boolean;
    advanceNotice: number;
    preparationTime: number;
    checkInTime: string;
    checkOutTime: string;
    blockedDates: Date[];
    minimumAdvanceBooking: number;
    maximumAdvanceBooking: number;
}, {
    isInstantBook: boolean;
    advanceNotice: number;
    preparationTime: number;
    checkInTime: string;
    checkOutTime: string;
    minimumAdvanceBooking: number;
    maximumAdvanceBooking: number;
    blockedDates?: Date[] | undefined;
}>;
export declare const quietHoursSchema: z.ZodObject<{
    start: z.ZodString;
    end: z.ZodString;
}, "strip", z.ZodTypeAny, {
    start: string;
    end: string;
}, {
    start: string;
    end: string;
}>;
export declare const rentalRulesSchema: z.ZodObject<{
    maxGuests: z.ZodNumber;
    allowChildren: z.ZodBoolean;
    allowInfants: z.ZodBoolean;
    allowPets: z.ZodBoolean;
    allowSmoking: z.ZodBoolean;
    allowParties: z.ZodBoolean;
    quietHours: z.ZodOptional<z.ZodObject<{
        start: z.ZodString;
        end: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>>;
    checkInInstructions: z.ZodOptional<z.ZodString>;
    houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    additionalRules: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    maxGuests: number;
    allowChildren: boolean;
    allowInfants: boolean;
    allowPets: boolean;
    allowSmoking: boolean;
    allowParties: boolean;
    quietHours?: {
        start: string;
        end: string;
    } | undefined;
    checkInInstructions?: string | undefined;
    houseRules?: string[] | undefined;
    additionalRules?: string | undefined;
}, {
    maxGuests: number;
    allowChildren: boolean;
    allowInfants: boolean;
    allowPets: boolean;
    allowSmoking: boolean;
    allowParties: boolean;
    quietHours?: {
        start: string;
        end: string;
    } | undefined;
    checkInInstructions?: string | undefined;
    houseRules?: string[] | undefined;
    additionalRules?: string | undefined;
}>;
export declare const rentalAmenitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    category: z.ZodNativeEnum<typeof AmenityCategory>;
    icon: z.ZodOptional<z.ZodString>;
    isHighlighted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    category: AmenityCategory;
    isHighlighted: boolean;
    icon?: string | undefined;
}, {
    id: string;
    name: string;
    category: AmenityCategory;
    isHighlighted: boolean;
    icon?: string | undefined;
}>;
export declare const transportationOptionSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof TransportationType>;
    name: z.ZodString;
    distance: z.ZodNumber;
    walkingTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: TransportationType;
    name: string;
    distance: number;
    walkingTime?: number | undefined;
}, {
    type: TransportationType;
    name: string;
    distance: number;
    walkingTime?: number | undefined;
}>;
export declare const nearbyAttractionSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodNativeEnum<typeof AttractionType>;
    distance: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: AttractionType;
    name: string;
    distance: number;
    description?: string | undefined;
}, {
    type: AttractionType;
    name: string;
    distance: number;
    description?: string | undefined;
}>;
export declare const rentalLocationSchema: z.ZodObject<{
    address: z.ZodString;
    city: z.ZodString;
    province: z.ZodString;
    country: z.ZodDefault<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    neighborhood: z.ZodOptional<z.ZodString>;
    coordinates: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>;
    transportation: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof TransportationType>;
        name: z.ZodString;
        distance: z.ZodNumber;
        walkingTime: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: TransportationType;
        name: string;
        distance: number;
        walkingTime?: number | undefined;
    }, {
        type: TransportationType;
        name: string;
        distance: number;
        walkingTime?: number | undefined;
    }>, "many">>;
    nearbyAttractions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodNativeEnum<typeof AttractionType>;
        distance: z.ZodNumber;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: AttractionType;
        name: string;
        distance: number;
        description?: string | undefined;
    }, {
        type: AttractionType;
        name: string;
        distance: number;
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    address: string;
    city: string;
    province: string;
    country: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    postalCode?: string | undefined;
    neighborhood?: string | undefined;
    transportation?: {
        type: TransportationType;
        name: string;
        distance: number;
        walkingTime?: number | undefined;
    }[] | undefined;
    nearbyAttractions?: {
        type: AttractionType;
        name: string;
        distance: number;
        description?: string | undefined;
    }[] | undefined;
}, {
    address: string;
    city: string;
    province: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    country?: string | undefined;
    postalCode?: string | undefined;
    neighborhood?: string | undefined;
    transportation?: {
        type: TransportationType;
        name: string;
        distance: number;
        walkingTime?: number | undefined;
    }[] | undefined;
    nearbyAttractions?: {
        type: AttractionType;
        name: string;
        distance: number;
        description?: string | undefined;
    }[] | undefined;
}>;
export declare const rentalImageSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    alt: z.ZodString;
    caption: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
    isPrimary: z.ZodBoolean;
    room: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
    caption?: string | undefined;
    room?: string | undefined;
}, {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
    caption?: string | undefined;
    room?: string | undefined;
}>;
export declare const notificationPreferencesSchema: z.ZodObject<{
    emailNotifications: z.ZodBoolean;
    smsNotifications: z.ZodBoolean;
    pushNotifications: z.ZodBoolean;
    newBookingNotifications: z.ZodBoolean;
    cancellationNotifications: z.ZodBoolean;
    messageNotifications: z.ZodBoolean;
    reviewNotifications: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    newBookingNotifications: boolean;
    cancellationNotifications: boolean;
    messageNotifications: boolean;
    reviewNotifications: boolean;
}, {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    newBookingNotifications: boolean;
    cancellationNotifications: boolean;
    messageNotifications: boolean;
    reviewNotifications: boolean;
}>;
export declare const refundScheduleSchema: z.ZodObject<{
    daysBeforeCheckIn: z.ZodNumber;
    refundPercentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    daysBeforeCheckIn: number;
    refundPercentage: number;
}, {
    daysBeforeCheckIn: number;
    refundPercentage: number;
}>;
export declare const cancellationPolicySchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof CancellationPolicyType>;
    description: z.ZodString;
    refundPercentages: z.ZodArray<z.ZodObject<{
        daysBeforeCheckIn: z.ZodNumber;
        refundPercentage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        daysBeforeCheckIn: number;
        refundPercentage: number;
    }, {
        daysBeforeCheckIn: number;
        refundPercentage: number;
    }>, "many">;
    gracePeriodHours: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    description: string;
    type: CancellationPolicyType;
    refundPercentages: {
        daysBeforeCheckIn: number;
        refundPercentage: number;
    }[];
    gracePeriodHours: number;
}, {
    description: string;
    type: CancellationPolicyType;
    refundPercentages: {
        daysBeforeCheckIn: number;
        refundPercentage: number;
    }[];
    gracePeriodHours: number;
}>;
export declare const rentalSettingsSchema: z.ZodObject<{
    autoAcceptBookings: z.ZodBoolean;
    requireGuestVerification: z.ZodBoolean;
    allowSameDayBookings: z.ZodBoolean;
    sendAutomaticMessages: z.ZodBoolean;
    notificationPreferences: z.ZodObject<{
        emailNotifications: z.ZodBoolean;
        smsNotifications: z.ZodBoolean;
        pushNotifications: z.ZodBoolean;
        newBookingNotifications: z.ZodBoolean;
        cancellationNotifications: z.ZodBoolean;
        messageNotifications: z.ZodBoolean;
        reviewNotifications: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        newBookingNotifications: boolean;
        cancellationNotifications: boolean;
        messageNotifications: boolean;
        reviewNotifications: boolean;
    }, {
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        newBookingNotifications: boolean;
        cancellationNotifications: boolean;
        messageNotifications: boolean;
        reviewNotifications: boolean;
    }>;
    cancellationPolicy: z.ZodObject<{
        type: z.ZodNativeEnum<typeof CancellationPolicyType>;
        description: z.ZodString;
        refundPercentages: z.ZodArray<z.ZodObject<{
            daysBeforeCheckIn: z.ZodNumber;
            refundPercentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }, {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }>, "many">;
        gracePeriodHours: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        description: string;
        type: CancellationPolicyType;
        refundPercentages: {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }[];
        gracePeriodHours: number;
    }, {
        description: string;
        type: CancellationPolicyType;
        refundPercentages: {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }[];
        gracePeriodHours: number;
    }>;
}, "strip", z.ZodTypeAny, {
    autoAcceptBookings: boolean;
    requireGuestVerification: boolean;
    allowSameDayBookings: boolean;
    sendAutomaticMessages: boolean;
    notificationPreferences: {
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        newBookingNotifications: boolean;
        cancellationNotifications: boolean;
        messageNotifications: boolean;
        reviewNotifications: boolean;
    };
    cancellationPolicy: {
        description: string;
        type: CancellationPolicyType;
        refundPercentages: {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }[];
        gracePeriodHours: number;
    };
}, {
    autoAcceptBookings: boolean;
    requireGuestVerification: boolean;
    allowSameDayBookings: boolean;
    sendAutomaticMessages: boolean;
    notificationPreferences: {
        emailNotifications: boolean;
        smsNotifications: boolean;
        pushNotifications: boolean;
        newBookingNotifications: boolean;
        cancellationNotifications: boolean;
        messageNotifications: boolean;
        reviewNotifications: boolean;
    };
    cancellationPolicy: {
        description: string;
        type: CancellationPolicyType;
        refundPercentages: {
            daysBeforeCheckIn: number;
            refundPercentage: number;
        }[];
        gracePeriodHours: number;
    };
}>;
export declare const createRentalSchema: z.ZodObject<{
    propertyId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    rentalType: z.ZodNativeEnum<typeof RentalType>;
    pricing: z.ZodEffects<z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodEnum<["DOP", "USD"]>;
        pricingType: z.ZodNativeEnum<typeof PricingType>;
        securityDeposit: z.ZodNumber;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        minimumStay: z.ZodNumber;
        maximumStay: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>;
    availability: z.ZodEffects<z.ZodObject<{
        isInstantBook: z.ZodBoolean;
        advanceNotice: z.ZodNumber;
        preparationTime: z.ZodNumber;
        checkInTime: z.ZodString;
        checkOutTime: z.ZodString;
        blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
        minimumAdvanceBooking: z.ZodNumber;
        maximumAdvanceBooking: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>;
    rules: z.ZodObject<{
        maxGuests: z.ZodNumber;
        allowChildren: z.ZodBoolean;
        allowInfants: z.ZodBoolean;
        allowPets: z.ZodBoolean;
        allowSmoking: z.ZodBoolean;
        allowParties: z.ZodBoolean;
        quietHours: z.ZodOptional<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>>;
        checkInInstructions: z.ZodOptional<z.ZodString>;
        houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        additionalRules: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }>;
    amenities: z.ZodArray<z.ZodString, "many">;
    images: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodString;
        url: z.ZodString;
        alt: z.ZodString;
        caption: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isPrimary: z.ZodBoolean;
        room: z.ZodOptional<z.ZodString>;
    }, "id">, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }, {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }>, "many">;
    settings: z.ZodObject<{
        autoAcceptBookings: z.ZodBoolean;
        requireGuestVerification: z.ZodBoolean;
        allowSameDayBookings: z.ZodBoolean;
        sendAutomaticMessages: z.ZodBoolean;
        notificationPreferences: z.ZodObject<{
            emailNotifications: z.ZodBoolean;
            smsNotifications: z.ZodBoolean;
            pushNotifications: z.ZodBoolean;
            newBookingNotifications: z.ZodBoolean;
            cancellationNotifications: z.ZodBoolean;
            messageNotifications: z.ZodBoolean;
            reviewNotifications: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }>;
        cancellationPolicy: z.ZodObject<{
            type: z.ZodNativeEnum<typeof CancellationPolicyType>;
            description: z.ZodString;
            refundPercentages: z.ZodArray<z.ZodObject<{
                daysBeforeCheckIn: z.ZodNumber;
                refundPercentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }>, "many">;
            gracePeriodHours: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    amenities: string[];
    title: string;
    description: string;
    images: {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }[];
    propertyId: string;
    rentalType: RentalType;
    pricing: {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    };
    availability: {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    };
    rules: {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    };
    settings: {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    };
}, {
    amenities: string[];
    title: string;
    description: string;
    images: {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }[];
    propertyId: string;
    rentalType: RentalType;
    pricing: {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    };
    availability: {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    };
    rules: {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    };
    settings: {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    };
}>;
export declare const updateRentalSchema: z.ZodObject<{
    propertyId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    rentalType: z.ZodOptional<z.ZodNativeEnum<typeof RentalType>>;
    pricing: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodEnum<["DOP", "USD"]>;
        pricingType: z.ZodNativeEnum<typeof PricingType>;
        securityDeposit: z.ZodNumber;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        minimumStay: z.ZodNumber;
        maximumStay: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>>;
    availability: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        isInstantBook: z.ZodBoolean;
        advanceNotice: z.ZodNumber;
        preparationTime: z.ZodNumber;
        checkInTime: z.ZodString;
        checkOutTime: z.ZodString;
        blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
        minimumAdvanceBooking: z.ZodNumber;
        maximumAdvanceBooking: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>>;
    rules: z.ZodOptional<z.ZodObject<{
        maxGuests: z.ZodNumber;
        allowChildren: z.ZodBoolean;
        allowInfants: z.ZodBoolean;
        allowPets: z.ZodBoolean;
        allowSmoking: z.ZodBoolean;
        allowParties: z.ZodBoolean;
        quietHours: z.ZodOptional<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>>;
        checkInInstructions: z.ZodOptional<z.ZodString>;
        houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        additionalRules: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodString;
        url: z.ZodString;
        alt: z.ZodString;
        caption: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        isPrimary: z.ZodBoolean;
        room: z.ZodOptional<z.ZodString>;
    }, "id">, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }, {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }>, "many">>;
    settings: z.ZodOptional<z.ZodObject<{
        autoAcceptBookings: z.ZodBoolean;
        requireGuestVerification: z.ZodBoolean;
        allowSameDayBookings: z.ZodBoolean;
        sendAutomaticMessages: z.ZodBoolean;
        notificationPreferences: z.ZodObject<{
            emailNotifications: z.ZodBoolean;
            smsNotifications: z.ZodBoolean;
            pushNotifications: z.ZodBoolean;
            newBookingNotifications: z.ZodBoolean;
            cancellationNotifications: z.ZodBoolean;
            messageNotifications: z.ZodBoolean;
            reviewNotifications: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }>;
        cancellationPolicy: z.ZodObject<{
            type: z.ZodNativeEnum<typeof CancellationPolicyType>;
            description: z.ZodString;
            refundPercentages: z.ZodArray<z.ZodObject<{
                daysBeforeCheckIn: z.ZodNumber;
                refundPercentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }>, "many">;
            gracePeriodHours: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }>>;
} & {
    status: z.ZodOptional<z.ZodNativeEnum<typeof RentalStatus>>;
}, "strip", z.ZodTypeAny, {
    status?: RentalStatus | undefined;
    amenities?: string[] | undefined;
    title?: string | undefined;
    description?: string | undefined;
    images?: {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }[] | undefined;
    propertyId?: string | undefined;
    rentalType?: RentalType | undefined;
    pricing?: {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    } | undefined;
    availability?: {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    } | undefined;
    rules?: {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    } | undefined;
    settings?: {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    } | undefined;
}, {
    status?: RentalStatus | undefined;
    amenities?: string[] | undefined;
    title?: string | undefined;
    description?: string | undefined;
    images?: {
        url: string;
        alt: string;
        isPrimary: boolean;
        order: number;
        caption?: string | undefined;
        room?: string | undefined;
    }[] | undefined;
    propertyId?: string | undefined;
    rentalType?: RentalType | undefined;
    pricing?: {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    } | undefined;
    availability?: {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    } | undefined;
    rules?: {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    } | undefined;
    settings?: {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    } | undefined;
}>;
export declare const guestDetailsSchema: z.ZodObject<{
    adults: z.ZodNumber;
    children: z.ZodNumber;
    infants: z.ZodNumber;
    pets: z.ZodNumber;
    purpose: z.ZodNativeEnum<typeof TravelPurpose>;
    specialNeeds: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    adults: number;
    children: number;
    infants: number;
    pets: number;
    purpose: TravelPurpose;
    specialNeeds?: string | undefined;
}, {
    adults: number;
    children: number;
    infants: number;
    pets: number;
    purpose: TravelPurpose;
    specialNeeds?: string | undefined;
}>;
export declare const createBookingSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    rentalId: z.ZodString;
    checkInDate: z.ZodDate;
    checkOutDate: z.ZodDate;
    guests: z.ZodObject<{
        adults: z.ZodNumber;
        children: z.ZodNumber;
        infants: z.ZodNumber;
        pets: z.ZodNumber;
        purpose: z.ZodNativeEnum<typeof TravelPurpose>;
        specialNeeds: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    }, {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    }>;
    specialRequests: z.ZodOptional<z.ZodString>;
    promoCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}>, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}>, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}, {
    rentalId: string;
    checkInDate: Date;
    checkOutDate: Date;
    guests: {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    };
    specialRequests?: string | undefined;
    promoCode?: string | undefined;
}>;
export declare const bookingSearchParamsSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    checkInDate: z.ZodOptional<z.ZodDate>;
    checkOutDate: z.ZodOptional<z.ZodDate>;
    guests: z.ZodOptional<z.ZodNumber>;
    priceMin: z.ZodOptional<z.ZodNumber>;
    priceMax: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    rentalType: z.ZodOptional<z.ZodNativeEnum<typeof RentalType>>;
    instantBook: z.ZodOptional<z.ZodBoolean>;
    hostLanguage: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["price_low_to_high", "price_high_to_low", "distance", "rating", "newest", "availability"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}, {
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}>, {
    page: number;
    limit: number;
    sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}, {
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}>, {
    page: number;
    limit: number;
    sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}, {
    amenities?: string[] | undefined;
    location?: string | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
    rentalType?: RentalType | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    guests?: number | undefined;
    instantBook?: boolean | undefined;
    hostLanguage?: string | undefined;
}>;
export declare const messageAttachmentSchema: z.ZodObject<{
    name: z.ZodString;
    url: z.ZodString;
    size: z.ZodNumber;
    mimeType: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    url: string;
    size: number;
    mimeType: string;
    thumbnailUrl?: string | undefined;
}, {
    name: string;
    url: string;
    size: number;
    mimeType: string;
    thumbnailUrl?: string | undefined;
}>;
export declare const sendMessageSchema: z.ZodObject<{
    conversationId: z.ZodOptional<z.ZodString>;
    receiverId: z.ZodString;
    content: z.ZodString;
    type: z.ZodNativeEnum<typeof MessageType>;
    attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        size: z.ZodNumber;
        mimeType: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        size: number;
        mimeType: string;
        thumbnailUrl?: string | undefined;
    }, {
        name: string;
        url: string;
        size: number;
        mimeType: string;
        thumbnailUrl?: string | undefined;
    }>, "many">>;
    bookingId: z.ZodOptional<z.ZodString>;
    rentalId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: MessageType;
    rentalId: string;
    receiverId: string;
    content: string;
    conversationId?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        size: number;
        mimeType: string;
        thumbnailUrl?: string | undefined;
    }[] | undefined;
    bookingId?: string | undefined;
}, {
    type: MessageType;
    rentalId: string;
    receiverId: string;
    content: string;
    conversationId?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        size: number;
        mimeType: string;
        thumbnailUrl?: string | undefined;
    }[] | undefined;
    bookingId?: string | undefined;
}>;
export declare const notificationDataSchema: z.ZodObject<{
    bookingId: z.ZodOptional<z.ZodString>;
    rentalId: z.ZodOptional<z.ZodString>;
    messageId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
    checkInDate: z.ZodOptional<z.ZodDate>;
    checkOutDate: z.ZodOptional<z.ZodDate>;
    guestName: z.ZodOptional<z.ZodString>;
    hostName: z.ZodOptional<z.ZodString>;
    propertyTitle: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    currency?: "DOP" | "USD" | undefined;
    amount?: number | undefined;
    rentalId?: string | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    bookingId?: string | undefined;
    messageId?: string | undefined;
    guestName?: string | undefined;
    hostName?: string | undefined;
    propertyTitle?: string | undefined;
    actionUrl?: string | undefined;
    metadata?: Record<string, any> | undefined;
}, {
    currency?: "DOP" | "USD" | undefined;
    amount?: number | undefined;
    rentalId?: string | undefined;
    checkInDate?: Date | undefined;
    checkOutDate?: Date | undefined;
    bookingId?: string | undefined;
    messageId?: string | undefined;
    guestName?: string | undefined;
    hostName?: string | undefined;
    propertyTitle?: string | undefined;
    actionUrl?: string | undefined;
    metadata?: Record<string, any> | undefined;
}>;
export declare const createNotificationSchema: z.ZodObject<{
    userId: z.ZodString;
    type: z.ZodNativeEnum<typeof NotificationType>;
    title: z.ZodString;
    message: z.ZodString;
    data: z.ZodObject<{
        bookingId: z.ZodOptional<z.ZodString>;
        rentalId: z.ZodOptional<z.ZodString>;
        messageId: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
        checkInDate: z.ZodOptional<z.ZodDate>;
        checkOutDate: z.ZodOptional<z.ZodDate>;
        guestName: z.ZodOptional<z.ZodString>;
        hostName: z.ZodOptional<z.ZodString>;
        propertyTitle: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        currency?: "DOP" | "USD" | undefined;
        amount?: number | undefined;
        rentalId?: string | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        bookingId?: string | undefined;
        messageId?: string | undefined;
        guestName?: string | undefined;
        hostName?: string | undefined;
        propertyTitle?: string | undefined;
        actionUrl?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }, {
        currency?: "DOP" | "USD" | undefined;
        amount?: number | undefined;
        rentalId?: string | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        bookingId?: string | undefined;
        messageId?: string | undefined;
        guestName?: string | undefined;
        hostName?: string | undefined;
        propertyTitle?: string | undefined;
        actionUrl?: string | undefined;
        metadata?: Record<string, any> | undefined;
    }>;
    channels: z.ZodArray<z.ZodNativeEnum<typeof NotificationChannel>, "many">;
    priority: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
    scheduledFor: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: NotificationType;
    message: string;
    userId: string;
    data: {
        currency?: "DOP" | "USD" | undefined;
        amount?: number | undefined;
        rentalId?: string | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        bookingId?: string | undefined;
        messageId?: string | undefined;
        guestName?: string | undefined;
        hostName?: string | undefined;
        propertyTitle?: string | undefined;
        actionUrl?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    channels: NotificationChannel[];
    priority: NotificationPriority;
    scheduledFor?: Date | undefined;
}, {
    title: string;
    type: NotificationType;
    message: string;
    userId: string;
    data: {
        currency?: "DOP" | "USD" | undefined;
        amount?: number | undefined;
        rentalId?: string | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        bookingId?: string | undefined;
        messageId?: string | undefined;
        guestName?: string | undefined;
        hostName?: string | undefined;
        propertyTitle?: string | undefined;
        actionUrl?: string | undefined;
        metadata?: Record<string, any> | undefined;
    };
    channels: NotificationChannel[];
    priority?: NotificationPriority | undefined;
    scheduledFor?: Date | undefined;
}>;
export declare const paymentMethodSchema: z.ZodNativeEnum<typeof PaymentMethod>;
export declare const paymentProviderSchema: z.ZodNativeEnum<typeof PaymentProvider>;
export declare const createPaymentIntentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodEnum<["DOP", "USD"]>;
    bookingId: z.ZodString;
    guestId: z.ZodString;
    metadata: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
}, "strip", z.ZodTypeAny, {
    currency: "DOP" | "USD";
    amount: number;
    bookingId: string;
    guestId: string;
    metadata?: Record<string, string> | undefined;
}, {
    currency: "DOP" | "USD";
    amount: number;
    bookingId: string;
    guestId: string;
    metadata?: Record<string, string> | undefined;
}>;
export declare const calendarDaySchema: z.ZodObject<{
    date: z.ZodDate;
    isAvailable: z.ZodBoolean;
    price: z.ZodOptional<z.ZodNumber>;
    minimumStay: z.ZodOptional<z.ZodNumber>;
    isBlocked: z.ZodBoolean;
    blockReason: z.ZodOptional<z.ZodString>;
    bookingId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    isAvailable: boolean;
    isBlocked: boolean;
    price?: number | undefined;
    minimumStay?: number | undefined;
    bookingId?: string | undefined;
    blockReason?: string | undefined;
}, {
    date: Date;
    isAvailable: boolean;
    isBlocked: boolean;
    price?: number | undefined;
    minimumStay?: number | undefined;
    bookingId?: string | undefined;
    blockReason?: string | undefined;
}>;
export declare const updateCalendarSchema: z.ZodObject<{
    rentalId: z.ZodString;
    updates: z.ZodArray<z.ZodObject<{
        date: z.ZodDate;
        isAvailable: z.ZodBoolean;
        price: z.ZodOptional<z.ZodNumber>;
        minimumStay: z.ZodOptional<z.ZodNumber>;
        isBlocked: z.ZodBoolean;
        blockReason: z.ZodOptional<z.ZodString>;
        bookingId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }, {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    rentalId: string;
    updates: {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }[];
}, {
    rentalId: string;
    updates: {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }[];
}>;
export declare const dateRangeSchema: z.ZodEffects<z.ZodObject<{
    startDate: z.ZodDate;
    endDate: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    startDate: Date;
    endDate: Date;
}, {
    startDate: Date;
    endDate: Date;
}>, {
    startDate: Date;
    endDate: Date;
}, {
    startDate: Date;
    endDate: Date;
}>;
export declare const rentalReportParamsSchema: z.ZodObject<{
    rentalId: z.ZodOptional<z.ZodString>;
    dateRange: z.ZodEffects<z.ZodObject<{
        startDate: z.ZodDate;
        endDate: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        startDate: Date;
        endDate: Date;
    }, {
        startDate: Date;
        endDate: Date;
    }>, {
        startDate: Date;
        endDate: Date;
    }, {
        startDate: Date;
        endDate: Date;
    }>;
    groupBy: z.ZodDefault<z.ZodEnum<["day", "week", "month"]>>;
    metrics: z.ZodDefault<z.ZodArray<z.ZodEnum<["revenue", "bookings", "occupancy", "rating"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
    groupBy: "day" | "week" | "month";
    metrics: ("rating" | "occupancy" | "revenue" | "bookings")[];
    rentalId?: string | undefined;
}, {
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
    rentalId?: string | undefined;
    groupBy?: "day" | "week" | "month" | undefined;
    metrics?: ("rating" | "occupancy" | "revenue" | "bookings")[] | undefined;
}>;
export declare const rentalSchemas: {
    createRental: z.ZodObject<{
        propertyId: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        rentalType: z.ZodNativeEnum<typeof RentalType>;
        pricing: z.ZodEffects<z.ZodObject<{
            basePrice: z.ZodNumber;
            currency: z.ZodEnum<["DOP", "USD"]>;
            pricingType: z.ZodNativeEnum<typeof PricingType>;
            securityDeposit: z.ZodNumber;
            cleaningFee: z.ZodOptional<z.ZodNumber>;
            minimumStay: z.ZodNumber;
            maximumStay: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }>, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }>;
        availability: z.ZodEffects<z.ZodObject<{
            isInstantBook: z.ZodBoolean;
            advanceNotice: z.ZodNumber;
            preparationTime: z.ZodNumber;
            checkInTime: z.ZodString;
            checkOutTime: z.ZodString;
            blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
            minimumAdvanceBooking: z.ZodNumber;
            maximumAdvanceBooking: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        }, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        }>, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        }, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        }>;
        rules: z.ZodObject<{
            maxGuests: z.ZodNumber;
            allowChildren: z.ZodBoolean;
            allowInfants: z.ZodBoolean;
            allowPets: z.ZodBoolean;
            allowSmoking: z.ZodBoolean;
            allowParties: z.ZodBoolean;
            quietHours: z.ZodOptional<z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
            }, {
                start: string;
                end: string;
            }>>;
            checkInInstructions: z.ZodOptional<z.ZodString>;
            houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            additionalRules: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        }, {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        }>;
        amenities: z.ZodArray<z.ZodString, "many">;
        images: z.ZodArray<z.ZodObject<Omit<{
            id: z.ZodString;
            url: z.ZodString;
            alt: z.ZodString;
            caption: z.ZodOptional<z.ZodString>;
            order: z.ZodNumber;
            isPrimary: z.ZodBoolean;
            room: z.ZodOptional<z.ZodString>;
        }, "id">, "strip", z.ZodTypeAny, {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }, {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }>, "many">;
        settings: z.ZodObject<{
            autoAcceptBookings: z.ZodBoolean;
            requireGuestVerification: z.ZodBoolean;
            allowSameDayBookings: z.ZodBoolean;
            sendAutomaticMessages: z.ZodBoolean;
            notificationPreferences: z.ZodObject<{
                emailNotifications: z.ZodBoolean;
                smsNotifications: z.ZodBoolean;
                pushNotifications: z.ZodBoolean;
                newBookingNotifications: z.ZodBoolean;
                cancellationNotifications: z.ZodBoolean;
                messageNotifications: z.ZodBoolean;
                reviewNotifications: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            }, {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            }>;
            cancellationPolicy: z.ZodObject<{
                type: z.ZodNativeEnum<typeof CancellationPolicyType>;
                description: z.ZodString;
                refundPercentages: z.ZodArray<z.ZodObject<{
                    daysBeforeCheckIn: z.ZodNumber;
                    refundPercentage: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }, {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }>, "many">;
                gracePeriodHours: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            }, {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        }, {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        amenities: string[];
        title: string;
        description: string;
        images: {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }[];
        propertyId: string;
        rentalType: RentalType;
        pricing: {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        };
        availability: {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        };
        rules: {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        };
        settings: {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        };
    }, {
        amenities: string[];
        title: string;
        description: string;
        images: {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }[];
        propertyId: string;
        rentalType: RentalType;
        pricing: {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        };
        availability: {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        };
        rules: {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        };
        settings: {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        };
    }>;
    updateRental: z.ZodObject<{
        propertyId: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        rentalType: z.ZodOptional<z.ZodNativeEnum<typeof RentalType>>;
        pricing: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            basePrice: z.ZodNumber;
            currency: z.ZodEnum<["DOP", "USD"]>;
            pricingType: z.ZodNativeEnum<typeof PricingType>;
            securityDeposit: z.ZodNumber;
            cleaningFee: z.ZodOptional<z.ZodNumber>;
            minimumStay: z.ZodNumber;
            maximumStay: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }>, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }, {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        }>>;
        availability: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            isInstantBook: z.ZodBoolean;
            advanceNotice: z.ZodNumber;
            preparationTime: z.ZodNumber;
            checkInTime: z.ZodString;
            checkOutTime: z.ZodString;
            blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
            minimumAdvanceBooking: z.ZodNumber;
            maximumAdvanceBooking: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        }, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        }>, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        }, {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        }>>;
        rules: z.ZodOptional<z.ZodObject<{
            maxGuests: z.ZodNumber;
            allowChildren: z.ZodBoolean;
            allowInfants: z.ZodBoolean;
            allowPets: z.ZodBoolean;
            allowSmoking: z.ZodBoolean;
            allowParties: z.ZodBoolean;
            quietHours: z.ZodOptional<z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
            }, {
                start: string;
                end: string;
            }>>;
            checkInInstructions: z.ZodOptional<z.ZodString>;
            houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            additionalRules: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        }, {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        }>>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        images: z.ZodOptional<z.ZodArray<z.ZodObject<Omit<{
            id: z.ZodString;
            url: z.ZodString;
            alt: z.ZodString;
            caption: z.ZodOptional<z.ZodString>;
            order: z.ZodNumber;
            isPrimary: z.ZodBoolean;
            room: z.ZodOptional<z.ZodString>;
        }, "id">, "strip", z.ZodTypeAny, {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }, {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }>, "many">>;
        settings: z.ZodOptional<z.ZodObject<{
            autoAcceptBookings: z.ZodBoolean;
            requireGuestVerification: z.ZodBoolean;
            allowSameDayBookings: z.ZodBoolean;
            sendAutomaticMessages: z.ZodBoolean;
            notificationPreferences: z.ZodObject<{
                emailNotifications: z.ZodBoolean;
                smsNotifications: z.ZodBoolean;
                pushNotifications: z.ZodBoolean;
                newBookingNotifications: z.ZodBoolean;
                cancellationNotifications: z.ZodBoolean;
                messageNotifications: z.ZodBoolean;
                reviewNotifications: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            }, {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            }>;
            cancellationPolicy: z.ZodObject<{
                type: z.ZodNativeEnum<typeof CancellationPolicyType>;
                description: z.ZodString;
                refundPercentages: z.ZodArray<z.ZodObject<{
                    daysBeforeCheckIn: z.ZodNumber;
                    refundPercentage: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }, {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }>, "many">;
                gracePeriodHours: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            }, {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        }, {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        }>>;
    } & {
        status: z.ZodOptional<z.ZodNativeEnum<typeof RentalStatus>>;
    }, "strip", z.ZodTypeAny, {
        status?: RentalStatus | undefined;
        amenities?: string[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        images?: {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }[] | undefined;
        propertyId?: string | undefined;
        rentalType?: RentalType | undefined;
        pricing?: {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        } | undefined;
        availability?: {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            blockedDates: Date[];
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
        } | undefined;
        rules?: {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        } | undefined;
        settings?: {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        } | undefined;
    }, {
        status?: RentalStatus | undefined;
        amenities?: string[] | undefined;
        title?: string | undefined;
        description?: string | undefined;
        images?: {
            url: string;
            alt: string;
            isPrimary: boolean;
            order: number;
            caption?: string | undefined;
            room?: string | undefined;
        }[] | undefined;
        propertyId?: string | undefined;
        rentalType?: RentalType | undefined;
        pricing?: {
            currency: "DOP" | "USD";
            basePrice: number;
            pricingType: PricingType;
            securityDeposit: number;
            minimumStay: number;
            cleaningFee?: number | undefined;
            maximumStay?: number | undefined;
        } | undefined;
        availability?: {
            isInstantBook: boolean;
            advanceNotice: number;
            preparationTime: number;
            checkInTime: string;
            checkOutTime: string;
            minimumAdvanceBooking: number;
            maximumAdvanceBooking: number;
            blockedDates?: Date[] | undefined;
        } | undefined;
        rules?: {
            maxGuests: number;
            allowChildren: boolean;
            allowInfants: boolean;
            allowPets: boolean;
            allowSmoking: boolean;
            allowParties: boolean;
            quietHours?: {
                start: string;
                end: string;
            } | undefined;
            checkInInstructions?: string | undefined;
            houseRules?: string[] | undefined;
            additionalRules?: string | undefined;
        } | undefined;
        settings?: {
            autoAcceptBookings: boolean;
            requireGuestVerification: boolean;
            allowSameDayBookings: boolean;
            sendAutomaticMessages: boolean;
            notificationPreferences: {
                emailNotifications: boolean;
                smsNotifications: boolean;
                pushNotifications: boolean;
                newBookingNotifications: boolean;
                cancellationNotifications: boolean;
                messageNotifications: boolean;
                reviewNotifications: boolean;
            };
            cancellationPolicy: {
                description: string;
                type: CancellationPolicyType;
                refundPercentages: {
                    daysBeforeCheckIn: number;
                    refundPercentage: number;
                }[];
                gracePeriodHours: number;
            };
        } | undefined;
    }>;
    createBooking: z.ZodEffects<z.ZodEffects<z.ZodObject<{
        rentalId: z.ZodString;
        checkInDate: z.ZodDate;
        checkOutDate: z.ZodDate;
        guests: z.ZodObject<{
            adults: z.ZodNumber;
            children: z.ZodNumber;
            infants: z.ZodNumber;
            pets: z.ZodNumber;
            purpose: z.ZodNativeEnum<typeof TravelPurpose>;
            specialNeeds: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        }, {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        }>;
        specialRequests: z.ZodOptional<z.ZodString>;
        promoCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }>, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }>, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }, {
        rentalId: string;
        checkInDate: Date;
        checkOutDate: Date;
        guests: {
            adults: number;
            children: number;
            infants: number;
            pets: number;
            purpose: TravelPurpose;
            specialNeeds?: string | undefined;
        };
        specialRequests?: string | undefined;
        promoCode?: string | undefined;
    }>;
    sendMessage: z.ZodObject<{
        conversationId: z.ZodOptional<z.ZodString>;
        receiverId: z.ZodString;
        content: z.ZodString;
        type: z.ZodNativeEnum<typeof MessageType>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            size: z.ZodNumber;
            mimeType: z.ZodString;
            thumbnailUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            size: number;
            mimeType: string;
            thumbnailUrl?: string | undefined;
        }, {
            name: string;
            url: string;
            size: number;
            mimeType: string;
            thumbnailUrl?: string | undefined;
        }>, "many">>;
        bookingId: z.ZodOptional<z.ZodString>;
        rentalId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: MessageType;
        rentalId: string;
        receiverId: string;
        content: string;
        conversationId?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            size: number;
            mimeType: string;
            thumbnailUrl?: string | undefined;
        }[] | undefined;
        bookingId?: string | undefined;
    }, {
        type: MessageType;
        rentalId: string;
        receiverId: string;
        content: string;
        conversationId?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            size: number;
            mimeType: string;
            thumbnailUrl?: string | undefined;
        }[] | undefined;
        bookingId?: string | undefined;
    }>;
    createNotification: z.ZodObject<{
        userId: z.ZodString;
        type: z.ZodNativeEnum<typeof NotificationType>;
        title: z.ZodString;
        message: z.ZodString;
        data: z.ZodObject<{
            bookingId: z.ZodOptional<z.ZodString>;
            rentalId: z.ZodOptional<z.ZodString>;
            messageId: z.ZodOptional<z.ZodString>;
            amount: z.ZodOptional<z.ZodNumber>;
            currency: z.ZodOptional<z.ZodEnum<["DOP", "USD"]>>;
            checkInDate: z.ZodOptional<z.ZodDate>;
            checkOutDate: z.ZodOptional<z.ZodDate>;
            guestName: z.ZodOptional<z.ZodString>;
            hostName: z.ZodOptional<z.ZodString>;
            propertyTitle: z.ZodOptional<z.ZodString>;
            actionUrl: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            currency?: "DOP" | "USD" | undefined;
            amount?: number | undefined;
            rentalId?: string | undefined;
            checkInDate?: Date | undefined;
            checkOutDate?: Date | undefined;
            bookingId?: string | undefined;
            messageId?: string | undefined;
            guestName?: string | undefined;
            hostName?: string | undefined;
            propertyTitle?: string | undefined;
            actionUrl?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }, {
            currency?: "DOP" | "USD" | undefined;
            amount?: number | undefined;
            rentalId?: string | undefined;
            checkInDate?: Date | undefined;
            checkOutDate?: Date | undefined;
            bookingId?: string | undefined;
            messageId?: string | undefined;
            guestName?: string | undefined;
            hostName?: string | undefined;
            propertyTitle?: string | undefined;
            actionUrl?: string | undefined;
            metadata?: Record<string, any> | undefined;
        }>;
        channels: z.ZodArray<z.ZodNativeEnum<typeof NotificationChannel>, "many">;
        priority: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
        scheduledFor: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        type: NotificationType;
        message: string;
        userId: string;
        data: {
            currency?: "DOP" | "USD" | undefined;
            amount?: number | undefined;
            rentalId?: string | undefined;
            checkInDate?: Date | undefined;
            checkOutDate?: Date | undefined;
            bookingId?: string | undefined;
            messageId?: string | undefined;
            guestName?: string | undefined;
            hostName?: string | undefined;
            propertyTitle?: string | undefined;
            actionUrl?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        channels: NotificationChannel[];
        priority: NotificationPriority;
        scheduledFor?: Date | undefined;
    }, {
        title: string;
        type: NotificationType;
        message: string;
        userId: string;
        data: {
            currency?: "DOP" | "USD" | undefined;
            amount?: number | undefined;
            rentalId?: string | undefined;
            checkInDate?: Date | undefined;
            checkOutDate?: Date | undefined;
            bookingId?: string | undefined;
            messageId?: string | undefined;
            guestName?: string | undefined;
            hostName?: string | undefined;
            propertyTitle?: string | undefined;
            actionUrl?: string | undefined;
            metadata?: Record<string, any> | undefined;
        };
        channels: NotificationChannel[];
        priority?: NotificationPriority | undefined;
        scheduledFor?: Date | undefined;
    }>;
    bookingSearchParams: z.ZodEffects<z.ZodEffects<z.ZodObject<{
        location: z.ZodOptional<z.ZodString>;
        checkInDate: z.ZodOptional<z.ZodDate>;
        checkOutDate: z.ZodOptional<z.ZodDate>;
        guests: z.ZodOptional<z.ZodNumber>;
        priceMin: z.ZodOptional<z.ZodNumber>;
        priceMax: z.ZodOptional<z.ZodNumber>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        rentalType: z.ZodOptional<z.ZodNativeEnum<typeof RentalType>>;
        instantBook: z.ZodOptional<z.ZodBoolean>;
        hostLanguage: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodDefault<z.ZodEnum<["price_low_to_high", "price_high_to_low", "distance", "rating", "newest", "availability"]>>;
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }, {
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }>, {
        page: number;
        limit: number;
        sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }, {
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }>, {
        page: number;
        limit: number;
        sortBy: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest";
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }, {
        amenities?: string[] | undefined;
        location?: string | undefined;
        priceMin?: number | undefined;
        priceMax?: number | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        sortBy?: "price_low_to_high" | "price_high_to_low" | "distance" | "availability" | "rating" | "newest" | undefined;
        rentalType?: RentalType | undefined;
        checkInDate?: Date | undefined;
        checkOutDate?: Date | undefined;
        guests?: number | undefined;
        instantBook?: boolean | undefined;
        hostLanguage?: string | undefined;
    }>;
    rentalPricing: z.ZodEffects<z.ZodObject<{
        basePrice: z.ZodNumber;
        currency: z.ZodEnum<["DOP", "USD"]>;
        pricingType: z.ZodNativeEnum<typeof PricingType>;
        securityDeposit: z.ZodNumber;
        cleaningFee: z.ZodOptional<z.ZodNumber>;
        minimumStay: z.ZodNumber;
        maximumStay: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }, {
        currency: "DOP" | "USD";
        basePrice: number;
        pricingType: PricingType;
        securityDeposit: number;
        minimumStay: number;
        cleaningFee?: number | undefined;
        maximumStay?: number | undefined;
    }>;
    rentalAvailability: z.ZodEffects<z.ZodObject<{
        isInstantBook: z.ZodBoolean;
        advanceNotice: z.ZodNumber;
        preparationTime: z.ZodNumber;
        checkInTime: z.ZodString;
        checkOutTime: z.ZodString;
        blockedDates: z.ZodDefault<z.ZodArray<z.ZodDate, "many">>;
        minimumAdvanceBooking: z.ZodNumber;
        maximumAdvanceBooking: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        blockedDates: Date[];
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
    }, {
        isInstantBook: boolean;
        advanceNotice: number;
        preparationTime: number;
        checkInTime: string;
        checkOutTime: string;
        minimumAdvanceBooking: number;
        maximumAdvanceBooking: number;
        blockedDates?: Date[] | undefined;
    }>;
    rentalRules: z.ZodObject<{
        maxGuests: z.ZodNumber;
        allowChildren: z.ZodBoolean;
        allowInfants: z.ZodBoolean;
        allowPets: z.ZodBoolean;
        allowSmoking: z.ZodBoolean;
        allowParties: z.ZodBoolean;
        quietHours: z.ZodOptional<z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>>;
        checkInInstructions: z.ZodOptional<z.ZodString>;
        houseRules: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        additionalRules: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }, {
        maxGuests: number;
        allowChildren: boolean;
        allowInfants: boolean;
        allowPets: boolean;
        allowSmoking: boolean;
        allowParties: boolean;
        quietHours?: {
            start: string;
            end: string;
        } | undefined;
        checkInInstructions?: string | undefined;
        houseRules?: string[] | undefined;
        additionalRules?: string | undefined;
    }>;
    rentalLocation: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        province: z.ZodString;
        country: z.ZodDefault<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        neighborhood: z.ZodOptional<z.ZodString>;
        coordinates: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>;
        transportation: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof TransportationType>;
            name: z.ZodString;
            distance: z.ZodNumber;
            walkingTime: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: TransportationType;
            name: string;
            distance: number;
            walkingTime?: number | undefined;
        }, {
            type: TransportationType;
            name: string;
            distance: number;
            walkingTime?: number | undefined;
        }>, "many">>;
        nearbyAttractions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodNativeEnum<typeof AttractionType>;
            distance: z.ZodNumber;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: AttractionType;
            name: string;
            distance: number;
            description?: string | undefined;
        }, {
            type: AttractionType;
            name: string;
            distance: number;
            description?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        province: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
        transportation?: {
            type: TransportationType;
            name: string;
            distance: number;
            walkingTime?: number | undefined;
        }[] | undefined;
        nearbyAttractions?: {
            type: AttractionType;
            name: string;
            distance: number;
            description?: string | undefined;
        }[] | undefined;
    }, {
        address: string;
        city: string;
        province: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        country?: string | undefined;
        postalCode?: string | undefined;
        neighborhood?: string | undefined;
        transportation?: {
            type: TransportationType;
            name: string;
            distance: number;
            walkingTime?: number | undefined;
        }[] | undefined;
        nearbyAttractions?: {
            type: AttractionType;
            name: string;
            distance: number;
            description?: string | undefined;
        }[] | undefined;
    }>;
    rentalSettings: z.ZodObject<{
        autoAcceptBookings: z.ZodBoolean;
        requireGuestVerification: z.ZodBoolean;
        allowSameDayBookings: z.ZodBoolean;
        sendAutomaticMessages: z.ZodBoolean;
        notificationPreferences: z.ZodObject<{
            emailNotifications: z.ZodBoolean;
            smsNotifications: z.ZodBoolean;
            pushNotifications: z.ZodBoolean;
            newBookingNotifications: z.ZodBoolean;
            cancellationNotifications: z.ZodBoolean;
            messageNotifications: z.ZodBoolean;
            reviewNotifications: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }, {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        }>;
        cancellationPolicy: z.ZodObject<{
            type: z.ZodNativeEnum<typeof CancellationPolicyType>;
            description: z.ZodString;
            refundPercentages: z.ZodArray<z.ZodObject<{
                daysBeforeCheckIn: z.ZodNumber;
                refundPercentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }, {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }>, "many">;
            gracePeriodHours: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }, {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }, {
        autoAcceptBookings: boolean;
        requireGuestVerification: boolean;
        allowSameDayBookings: boolean;
        sendAutomaticMessages: boolean;
        notificationPreferences: {
            emailNotifications: boolean;
            smsNotifications: boolean;
            pushNotifications: boolean;
            newBookingNotifications: boolean;
            cancellationNotifications: boolean;
            messageNotifications: boolean;
            reviewNotifications: boolean;
        };
        cancellationPolicy: {
            description: string;
            type: CancellationPolicyType;
            refundPercentages: {
                daysBeforeCheckIn: number;
                refundPercentage: number;
            }[];
            gracePeriodHours: number;
        };
    }>;
    guestDetails: z.ZodObject<{
        adults: z.ZodNumber;
        children: z.ZodNumber;
        infants: z.ZodNumber;
        pets: z.ZodNumber;
        purpose: z.ZodNativeEnum<typeof TravelPurpose>;
        specialNeeds: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    }, {
        adults: number;
        children: number;
        infants: number;
        pets: number;
        purpose: TravelPurpose;
        specialNeeds?: string | undefined;
    }>;
    calendarDay: z.ZodObject<{
        date: z.ZodDate;
        isAvailable: z.ZodBoolean;
        price: z.ZodOptional<z.ZodNumber>;
        minimumStay: z.ZodOptional<z.ZodNumber>;
        isBlocked: z.ZodBoolean;
        blockReason: z.ZodOptional<z.ZodString>;
        bookingId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }, {
        date: Date;
        isAvailable: boolean;
        isBlocked: boolean;
        price?: number | undefined;
        minimumStay?: number | undefined;
        bookingId?: string | undefined;
        blockReason?: string | undefined;
    }>;
    updateCalendar: z.ZodObject<{
        rentalId: z.ZodString;
        updates: z.ZodArray<z.ZodObject<{
            date: z.ZodDate;
            isAvailable: z.ZodBoolean;
            price: z.ZodOptional<z.ZodNumber>;
            minimumStay: z.ZodOptional<z.ZodNumber>;
            isBlocked: z.ZodBoolean;
            blockReason: z.ZodOptional<z.ZodString>;
            bookingId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            date: Date;
            isAvailable: boolean;
            isBlocked: boolean;
            price?: number | undefined;
            minimumStay?: number | undefined;
            bookingId?: string | undefined;
            blockReason?: string | undefined;
        }, {
            date: Date;
            isAvailable: boolean;
            isBlocked: boolean;
            price?: number | undefined;
            minimumStay?: number | undefined;
            bookingId?: string | undefined;
            blockReason?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        rentalId: string;
        updates: {
            date: Date;
            isAvailable: boolean;
            isBlocked: boolean;
            price?: number | undefined;
            minimumStay?: number | undefined;
            bookingId?: string | undefined;
            blockReason?: string | undefined;
        }[];
    }, {
        rentalId: string;
        updates: {
            date: Date;
            isAvailable: boolean;
            isBlocked: boolean;
            price?: number | undefined;
            minimumStay?: number | undefined;
            bookingId?: string | undefined;
            blockReason?: string | undefined;
        }[];
    }>;
    createPaymentIntent: z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodEnum<["DOP", "USD"]>;
        bookingId: z.ZodString;
        guestId: z.ZodString;
        metadata: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
    }, "strip", z.ZodTypeAny, {
        currency: "DOP" | "USD";
        amount: number;
        bookingId: string;
        guestId: string;
        metadata?: Record<string, string> | undefined;
    }, {
        currency: "DOP" | "USD";
        amount: number;
        bookingId: string;
        guestId: string;
        metadata?: Record<string, string> | undefined;
    }>;
    rentalReportParams: z.ZodObject<{
        rentalId: z.ZodOptional<z.ZodString>;
        dateRange: z.ZodEffects<z.ZodObject<{
            startDate: z.ZodDate;
            endDate: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            startDate: Date;
            endDate: Date;
        }, {
            startDate: Date;
            endDate: Date;
        }>, {
            startDate: Date;
            endDate: Date;
        }, {
            startDate: Date;
            endDate: Date;
        }>;
        groupBy: z.ZodDefault<z.ZodEnum<["day", "week", "month"]>>;
        metrics: z.ZodDefault<z.ZodArray<z.ZodEnum<["revenue", "bookings", "occupancy", "rating"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        dateRange: {
            startDate: Date;
            endDate: Date;
        };
        groupBy: "day" | "week" | "month";
        metrics: ("rating" | "occupancy" | "revenue" | "bookings")[];
        rentalId?: string | undefined;
    }, {
        dateRange: {
            startDate: Date;
            endDate: Date;
        };
        rentalId?: string | undefined;
        groupBy?: "day" | "week" | "month" | undefined;
        metrics?: ("rating" | "occupancy" | "revenue" | "bookings")[] | undefined;
    }>;
    dateRange: z.ZodEffects<z.ZodObject<{
        startDate: z.ZodDate;
        endDate: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        startDate: Date;
        endDate: Date;
    }, {
        startDate: Date;
        endDate: Date;
    }>, {
        startDate: Date;
        endDate: Date;
    }, {
        startDate: Date;
        endDate: Date;
    }>;
};
import { PropertyType } from '../types/rental';
export declare const marketAnalysisSchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodObject<{
        city: z.ZodString;
        radius: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        city: string;
        radius: number;
    }, {
        city: string;
        radius: number;
    }>>;
    propertyType: z.ZodOptional<z.ZodNativeEnum<typeof PropertyType>>;
    dateRange: z.ZodEffects<z.ZodObject<{
        start: z.ZodEffects<z.ZodString, string, string>;
        end: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>;
    metrics: z.ZodArray<z.ZodEnum<["price", "occupancy", "revenue", "demand"]>, "many">;
}, "strip", z.ZodTypeAny, {
    dateRange: {
        start: string;
        end: string;
    };
    metrics: ("price" | "demand" | "occupancy" | "revenue")[];
    location?: {
        city: string;
        radius: number;
    } | undefined;
    propertyType?: PropertyType | undefined;
}, {
    dateRange: {
        start: string;
        end: string;
    };
    metrics: ("price" | "demand" | "occupancy" | "revenue")[];
    location?: {
        city: string;
        radius: number;
    } | undefined;
    propertyType?: PropertyType | undefined;
}>;
export declare const propertyValuationInputSchema: z.ZodObject<{
    location: z.ZodObject<{
        address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>;
    propertyType: z.ZodNativeEnum<typeof PropertyType>;
    specifications: z.ZodObject<{
        bedrooms: z.ZodNumber;
        bathrooms: z.ZodNumber;
        squareMeters: z.ZodNumber;
        maxGuests: z.ZodNumber;
        yearBuilt: z.ZodOptional<z.ZodNumber>;
        renovationYear: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        squareMeters: number;
        yearBuilt?: number | undefined;
        renovationYear?: number | undefined;
    }, {
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        squareMeters: number;
        yearBuilt?: number | undefined;
        renovationYear?: number | undefined;
    }>;
    amenities: z.ZodArray<z.ZodString, "many">;
    features: z.ZodObject<{
        hasPool: z.ZodBoolean;
        hasGarden: z.ZodBoolean;
        hasParking: z.ZodBoolean;
        hasAirConditioning: z.ZodBoolean;
        hasHeating: z.ZodBoolean;
        hasWifi: z.ZodBoolean;
        hasKitchen: z.ZodBoolean;
        petFriendly: z.ZodBoolean;
        smokingAllowed: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        hasPool: boolean;
        hasGarden: boolean;
        hasParking: boolean;
        hasAirConditioning: boolean;
        hasHeating: boolean;
        hasWifi: boolean;
        hasKitchen: boolean;
        petFriendly: boolean;
        smokingAllowed: boolean;
    }, {
        hasPool: boolean;
        hasGarden: boolean;
        hasParking: boolean;
        hasAirConditioning: boolean;
        hasHeating: boolean;
        hasWifi: boolean;
        hasKitchen: boolean;
        petFriendly: boolean;
        smokingAllowed: boolean;
    }>;
    condition: z.ZodEnum<["excellent", "good", "fair", "needs_renovation"]>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    amenities: string[];
    features: {
        hasPool: boolean;
        hasGarden: boolean;
        hasParking: boolean;
        hasAirConditioning: boolean;
        hasHeating: boolean;
        hasWifi: boolean;
        hasKitchen: boolean;
        petFriendly: boolean;
        smokingAllowed: boolean;
    };
    location: {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    propertyType: PropertyType;
    specifications: {
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        squareMeters: number;
        yearBuilt?: number | undefined;
        renovationYear?: number | undefined;
    };
    condition: "excellent" | "good" | "fair" | "needs_renovation";
    images?: string[] | undefined;
}, {
    amenities: string[];
    features: {
        hasPool: boolean;
        hasGarden: boolean;
        hasParking: boolean;
        hasAirConditioning: boolean;
        hasHeating: boolean;
        hasWifi: boolean;
        hasKitchen: boolean;
        petFriendly: boolean;
        smokingAllowed: boolean;
    };
    location: {
        address: string;
        city: string;
        country: string;
        state: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    propertyType: PropertyType;
    specifications: {
        bedrooms: number;
        bathrooms: number;
        maxGuests: number;
        squareMeters: number;
        yearBuilt?: number | undefined;
        renovationYear?: number | undefined;
    };
    condition: "excellent" | "good" | "fair" | "needs_renovation";
    images?: string[] | undefined;
}>;
export declare const createValuationSchema: z.ZodObject<{
    propertyData: z.ZodObject<{
        location: z.ZodObject<{
            address: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>;
        propertyType: z.ZodNativeEnum<typeof PropertyType>;
        specifications: z.ZodObject<{
            bedrooms: z.ZodNumber;
            bathrooms: z.ZodNumber;
            squareMeters: z.ZodNumber;
            maxGuests: z.ZodNumber;
            yearBuilt: z.ZodOptional<z.ZodNumber>;
            renovationYear: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        }, {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        }>;
        amenities: z.ZodArray<z.ZodString, "many">;
        features: z.ZodObject<{
            hasPool: z.ZodBoolean;
            hasGarden: z.ZodBoolean;
            hasParking: z.ZodBoolean;
            hasAirConditioning: z.ZodBoolean;
            hasHeating: z.ZodBoolean;
            hasWifi: z.ZodBoolean;
            hasKitchen: z.ZodBoolean;
            petFriendly: z.ZodBoolean;
            smokingAllowed: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        }, {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        }>;
        condition: z.ZodEnum<["excellent", "good", "fair", "needs_renovation"]>;
        images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    }, {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    }>;
    includeComparisons: z.ZodDefault<z.ZodBoolean>;
    includeRecommendations: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    propertyData: {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    };
    includeComparisons: boolean;
    includeRecommendations: boolean;
}, {
    propertyData: {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    };
    includeComparisons?: boolean | undefined;
    includeRecommendations?: boolean | undefined;
}>;
export declare const reportParametersSchema: z.ZodObject<{
    dateRange: z.ZodEffects<z.ZodObject<{
        start: z.ZodEffects<z.ZodString, string, string>;
        end: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>;
    locations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    propertyTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
    priceRange: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>>;
    includeComparisons: z.ZodDefault<z.ZodBoolean>;
    includeForecasts: z.ZodDefault<z.ZodBoolean>;
    includeRecommendations: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    dateRange: {
        start: string;
        end: string;
    };
    includeComparisons: boolean;
    includeRecommendations: boolean;
    includeForecasts: boolean;
    locations?: string[] | undefined;
    propertyTypes?: PropertyType[] | undefined;
    priceRange?: {
        min: number;
        max: number;
    } | undefined;
}, {
    dateRange: {
        start: string;
        end: string;
    };
    includeComparisons?: boolean | undefined;
    includeRecommendations?: boolean | undefined;
    locations?: string[] | undefined;
    propertyTypes?: PropertyType[] | undefined;
    priceRange?: {
        min: number;
        max: number;
    } | undefined;
    includeForecasts?: boolean | undefined;
}>;
export declare const createReportSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<["location", "property_type", "comparison", "valuation", "comprehensive"]>;
    parameters: z.ZodObject<{
        dateRange: z.ZodEffects<z.ZodObject<{
            start: z.ZodEffects<z.ZodString, string, string>;
            end: z.ZodEffects<z.ZodString, string, string>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>;
        locations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        propertyTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
        priceRange: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>>;
        includeComparisons: z.ZodDefault<z.ZodBoolean>;
        includeForecasts: z.ZodDefault<z.ZodBoolean>;
        includeRecommendations: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons: boolean;
        includeRecommendations: boolean;
        includeForecasts: boolean;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
    }, {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons?: boolean | undefined;
        includeRecommendations?: boolean | undefined;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        includeForecasts?: boolean | undefined;
    }>;
    format: z.ZodDefault<z.ZodEnum<["pdf", "csv", "excel", "json"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: "location" | "property_type" | "comparison" | "valuation" | "comprehensive";
    format: "pdf" | "csv" | "excel" | "json";
    parameters: {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons: boolean;
        includeRecommendations: boolean;
        includeForecasts: boolean;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
    };
}, {
    title: string;
    type: "location" | "property_type" | "comparison" | "valuation" | "comprehensive";
    parameters: {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons?: boolean | undefined;
        includeRecommendations?: boolean | undefined;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        includeForecasts?: boolean | undefined;
    };
    format?: "pdf" | "csv" | "excel" | "json" | undefined;
}>;
export declare const chartConfigurationSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<["line", "bar", "pie", "area", "scatter", "heatmap"]>;
    data: z.ZodArray<z.ZodAny, "many">;
    config: z.ZodObject<{
        xAxis: z.ZodOptional<z.ZodString>;
        yAxis: z.ZodOptional<z.ZodString>;
        groupBy: z.ZodOptional<z.ZodString>;
        colors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        showLegend: z.ZodDefault<z.ZodBoolean>;
        showGrid: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        showLegend: boolean;
        showGrid: boolean;
        groupBy?: string | undefined;
        xAxis?: string | undefined;
        yAxis?: string | undefined;
        colors?: string[] | undefined;
    }, {
        groupBy?: string | undefined;
        xAxis?: string | undefined;
        yAxis?: string | undefined;
        colors?: string[] | undefined;
        showLegend?: boolean | undefined;
        showGrid?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: "area" | "line" | "bar" | "pie" | "scatter" | "heatmap";
    data: any[];
    config: {
        showLegend: boolean;
        showGrid: boolean;
        groupBy?: string | undefined;
        xAxis?: string | undefined;
        yAxis?: string | undefined;
        colors?: string[] | undefined;
    };
}, {
    title: string;
    type: "area" | "line" | "bar" | "pie" | "scatter" | "heatmap";
    data: any[];
    config: {
        groupBy?: string | undefined;
        xAxis?: string | undefined;
        yAxis?: string | undefined;
        colors?: string[] | undefined;
        showLegend?: boolean | undefined;
        showGrid?: boolean | undefined;
    };
}>;
export declare const comparablePropertiesFilterSchema: z.ZodObject<{
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        radius: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
        radius: number;
    }, {
        latitude: number;
        longitude: number;
        radius?: number | undefined;
    }>;
    propertyType: z.ZodOptional<z.ZodNativeEnum<typeof PropertyType>>;
    specifications: z.ZodOptional<z.ZodObject<{
        bedrooms: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
        bathrooms: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
        squareMeters: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
        maxGuests: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        bedrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        bathrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        maxGuests?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        squareMeters?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    }, {
        bedrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        bathrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        maxGuests?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        squareMeters?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    }>>;
    priceRange: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    location: {
        latitude: number;
        longitude: number;
        radius: number;
    };
    limit: number;
    amenities?: string[] | undefined;
    propertyType?: PropertyType | undefined;
    specifications?: {
        bedrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        bathrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        maxGuests?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        squareMeters?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    } | undefined;
    priceRange?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
}, {
    location: {
        latitude: number;
        longitude: number;
        radius?: number | undefined;
    };
    amenities?: string[] | undefined;
    limit?: number | undefined;
    propertyType?: PropertyType | undefined;
    specifications?: {
        bedrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        bathrooms?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        maxGuests?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
        squareMeters?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    } | undefined;
    priceRange?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
}>;
export declare const validateCoordinates: (lat: number, lng: number) => boolean;
export declare const validateDateRange: (start: string, end: string) => boolean;
export declare const updateReportStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["pending", "processing", "completed", "failed"]>;
    progress: z.ZodOptional<z.ZodNumber>;
    errorMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "completed" | "failed" | "processing";
    progress?: number | undefined;
    errorMessage?: string | undefined;
}, {
    status: "pending" | "completed" | "failed" | "processing";
    progress?: number | undefined;
    errorMessage?: string | undefined;
}>;
export declare const marketValuationSchemas: {
    marketAnalysis: z.ZodObject<{
        location: z.ZodOptional<z.ZodObject<{
            city: z.ZodString;
            radius: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            city: string;
            radius: number;
        }, {
            city: string;
            radius: number;
        }>>;
        propertyType: z.ZodOptional<z.ZodNativeEnum<typeof PropertyType>>;
        dateRange: z.ZodEffects<z.ZodObject<{
            start: z.ZodEffects<z.ZodString, string, string>;
            end: z.ZodEffects<z.ZodString, string, string>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>;
        metrics: z.ZodArray<z.ZodEnum<["price", "occupancy", "revenue", "demand"]>, "many">;
    }, "strip", z.ZodTypeAny, {
        dateRange: {
            start: string;
            end: string;
        };
        metrics: ("price" | "demand" | "occupancy" | "revenue")[];
        location?: {
            city: string;
            radius: number;
        } | undefined;
        propertyType?: PropertyType | undefined;
    }, {
        dateRange: {
            start: string;
            end: string;
        };
        metrics: ("price" | "demand" | "occupancy" | "revenue")[];
        location?: {
            city: string;
            radius: number;
        } | undefined;
        propertyType?: PropertyType | undefined;
    }>;
    propertyValuationInput: z.ZodObject<{
        location: z.ZodObject<{
            address: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>;
        propertyType: z.ZodNativeEnum<typeof PropertyType>;
        specifications: z.ZodObject<{
            bedrooms: z.ZodNumber;
            bathrooms: z.ZodNumber;
            squareMeters: z.ZodNumber;
            maxGuests: z.ZodNumber;
            yearBuilt: z.ZodOptional<z.ZodNumber>;
            renovationYear: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        }, {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        }>;
        amenities: z.ZodArray<z.ZodString, "many">;
        features: z.ZodObject<{
            hasPool: z.ZodBoolean;
            hasGarden: z.ZodBoolean;
            hasParking: z.ZodBoolean;
            hasAirConditioning: z.ZodBoolean;
            hasHeating: z.ZodBoolean;
            hasWifi: z.ZodBoolean;
            hasKitchen: z.ZodBoolean;
            petFriendly: z.ZodBoolean;
            smokingAllowed: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        }, {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        }>;
        condition: z.ZodEnum<["excellent", "good", "fair", "needs_renovation"]>;
        images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    }, {
        amenities: string[];
        features: {
            hasPool: boolean;
            hasGarden: boolean;
            hasParking: boolean;
            hasAirConditioning: boolean;
            hasHeating: boolean;
            hasWifi: boolean;
            hasKitchen: boolean;
            petFriendly: boolean;
            smokingAllowed: boolean;
        };
        location: {
            address: string;
            city: string;
            country: string;
            state: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        propertyType: PropertyType;
        specifications: {
            bedrooms: number;
            bathrooms: number;
            maxGuests: number;
            squareMeters: number;
            yearBuilt?: number | undefined;
            renovationYear?: number | undefined;
        };
        condition: "excellent" | "good" | "fair" | "needs_renovation";
        images?: string[] | undefined;
    }>;
    createValuation: z.ZodObject<{
        propertyData: z.ZodObject<{
            location: z.ZodObject<{
                address: z.ZodString;
                city: z.ZodString;
                state: z.ZodString;
                country: z.ZodString;
                coordinates: z.ZodOptional<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    latitude: number;
                    longitude: number;
                }, {
                    latitude: number;
                    longitude: number;
                }>>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            }, {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            }>;
            propertyType: z.ZodNativeEnum<typeof PropertyType>;
            specifications: z.ZodObject<{
                bedrooms: z.ZodNumber;
                bathrooms: z.ZodNumber;
                squareMeters: z.ZodNumber;
                maxGuests: z.ZodNumber;
                yearBuilt: z.ZodOptional<z.ZodNumber>;
                renovationYear: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            }, {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            }>;
            amenities: z.ZodArray<z.ZodString, "many">;
            features: z.ZodObject<{
                hasPool: z.ZodBoolean;
                hasGarden: z.ZodBoolean;
                hasParking: z.ZodBoolean;
                hasAirConditioning: z.ZodBoolean;
                hasHeating: z.ZodBoolean;
                hasWifi: z.ZodBoolean;
                hasKitchen: z.ZodBoolean;
                petFriendly: z.ZodBoolean;
                smokingAllowed: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            }, {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            }>;
            condition: z.ZodEnum<["excellent", "good", "fair", "needs_renovation"]>;
            images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            amenities: string[];
            features: {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            };
            location: {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            propertyType: PropertyType;
            specifications: {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            };
            condition: "excellent" | "good" | "fair" | "needs_renovation";
            images?: string[] | undefined;
        }, {
            amenities: string[];
            features: {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            };
            location: {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            propertyType: PropertyType;
            specifications: {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            };
            condition: "excellent" | "good" | "fair" | "needs_renovation";
            images?: string[] | undefined;
        }>;
        includeComparisons: z.ZodDefault<z.ZodBoolean>;
        includeRecommendations: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        propertyData: {
            amenities: string[];
            features: {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            };
            location: {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            propertyType: PropertyType;
            specifications: {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            };
            condition: "excellent" | "good" | "fair" | "needs_renovation";
            images?: string[] | undefined;
        };
        includeComparisons: boolean;
        includeRecommendations: boolean;
    }, {
        propertyData: {
            amenities: string[];
            features: {
                hasPool: boolean;
                hasGarden: boolean;
                hasParking: boolean;
                hasAirConditioning: boolean;
                hasHeating: boolean;
                hasWifi: boolean;
                hasKitchen: boolean;
                petFriendly: boolean;
                smokingAllowed: boolean;
            };
            location: {
                address: string;
                city: string;
                country: string;
                state: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            propertyType: PropertyType;
            specifications: {
                bedrooms: number;
                bathrooms: number;
                maxGuests: number;
                squareMeters: number;
                yearBuilt?: number | undefined;
                renovationYear?: number | undefined;
            };
            condition: "excellent" | "good" | "fair" | "needs_renovation";
            images?: string[] | undefined;
        };
        includeComparisons?: boolean | undefined;
        includeRecommendations?: boolean | undefined;
    }>;
    reportParameters: z.ZodObject<{
        dateRange: z.ZodEffects<z.ZodObject<{
            start: z.ZodEffects<z.ZodString, string, string>;
            end: z.ZodEffects<z.ZodString, string, string>;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>, {
            start: string;
            end: string;
        }, {
            start: string;
            end: string;
        }>;
        locations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        propertyTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
        priceRange: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>>;
        includeComparisons: z.ZodDefault<z.ZodBoolean>;
        includeForecasts: z.ZodDefault<z.ZodBoolean>;
        includeRecommendations: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons: boolean;
        includeRecommendations: boolean;
        includeForecasts: boolean;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
    }, {
        dateRange: {
            start: string;
            end: string;
        };
        includeComparisons?: boolean | undefined;
        includeRecommendations?: boolean | undefined;
        locations?: string[] | undefined;
        propertyTypes?: PropertyType[] | undefined;
        priceRange?: {
            min: number;
            max: number;
        } | undefined;
        includeForecasts?: boolean | undefined;
    }>;
    createReport: z.ZodObject<{
        title: z.ZodString;
        type: z.ZodEnum<["location", "property_type", "comparison", "valuation", "comprehensive"]>;
        parameters: z.ZodObject<{
            dateRange: z.ZodEffects<z.ZodObject<{
                start: z.ZodEffects<z.ZodString, string, string>;
                end: z.ZodEffects<z.ZodString, string, string>;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
            }, {
                start: string;
                end: string;
            }>, {
                start: string;
                end: string;
            }, {
                start: string;
                end: string;
            }>;
            locations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            propertyTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PropertyType>, "many">>;
            priceRange: z.ZodOptional<z.ZodEffects<z.ZodObject<{
                min: z.ZodNumber;
                max: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>, {
                min: number;
                max: number;
            }, {
                min: number;
                max: number;
            }>>;
            includeComparisons: z.ZodDefault<z.ZodBoolean>;
            includeForecasts: z.ZodDefault<z.ZodBoolean>;
            includeRecommendations: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            dateRange: {
                start: string;
                end: string;
            };
            includeComparisons: boolean;
            includeRecommendations: boolean;
            includeForecasts: boolean;
            locations?: string[] | undefined;
            propertyTypes?: PropertyType[] | undefined;
            priceRange?: {
                min: number;
                max: number;
            } | undefined;
        }, {
            dateRange: {
                start: string;
                end: string;
            };
            includeComparisons?: boolean | undefined;
            includeRecommendations?: boolean | undefined;
            locations?: string[] | undefined;
            propertyTypes?: PropertyType[] | undefined;
            priceRange?: {
                min: number;
                max: number;
            } | undefined;
            includeForecasts?: boolean | undefined;
        }>;
        format: z.ZodDefault<z.ZodEnum<["pdf", "csv", "excel", "json"]>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        type: "location" | "property_type" | "comparison" | "valuation" | "comprehensive";
        format: "pdf" | "csv" | "excel" | "json";
        parameters: {
            dateRange: {
                start: string;
                end: string;
            };
            includeComparisons: boolean;
            includeRecommendations: boolean;
            includeForecasts: boolean;
            locations?: string[] | undefined;
            propertyTypes?: PropertyType[] | undefined;
            priceRange?: {
                min: number;
                max: number;
            } | undefined;
        };
    }, {
        title: string;
        type: "location" | "property_type" | "comparison" | "valuation" | "comprehensive";
        parameters: {
            dateRange: {
                start: string;
                end: string;
            };
            includeComparisons?: boolean | undefined;
            includeRecommendations?: boolean | undefined;
            locations?: string[] | undefined;
            propertyTypes?: PropertyType[] | undefined;
            priceRange?: {
                min: number;
                max: number;
            } | undefined;
            includeForecasts?: boolean | undefined;
        };
        format?: "pdf" | "csv" | "excel" | "json" | undefined;
    }>;
    chartConfiguration: z.ZodObject<{
        title: z.ZodString;
        type: z.ZodEnum<["line", "bar", "pie", "area", "scatter", "heatmap"]>;
        data: z.ZodArray<z.ZodAny, "many">;
        config: z.ZodObject<{
            xAxis: z.ZodOptional<z.ZodString>;
            yAxis: z.ZodOptional<z.ZodString>;
            groupBy: z.ZodOptional<z.ZodString>;
            colors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            showLegend: z.ZodDefault<z.ZodBoolean>;
            showGrid: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            showLegend: boolean;
            showGrid: boolean;
            groupBy?: string | undefined;
            xAxis?: string | undefined;
            yAxis?: string | undefined;
            colors?: string[] | undefined;
        }, {
            groupBy?: string | undefined;
            xAxis?: string | undefined;
            yAxis?: string | undefined;
            colors?: string[] | undefined;
            showLegend?: boolean | undefined;
            showGrid?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        type: "area" | "line" | "bar" | "pie" | "scatter" | "heatmap";
        data: any[];
        config: {
            showLegend: boolean;
            showGrid: boolean;
            groupBy?: string | undefined;
            xAxis?: string | undefined;
            yAxis?: string | undefined;
            colors?: string[] | undefined;
        };
    }, {
        title: string;
        type: "area" | "line" | "bar" | "pie" | "scatter" | "heatmap";
        data: any[];
        config: {
            groupBy?: string | undefined;
            xAxis?: string | undefined;
            yAxis?: string | undefined;
            colors?: string[] | undefined;
            showLegend?: boolean | undefined;
            showGrid?: boolean | undefined;
        };
    }>;
    comparablePropertiesFilter: z.ZodObject<{
        location: z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
            radius: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
            radius: number;
        }, {
            latitude: number;
            longitude: number;
            radius?: number | undefined;
        }>;
        propertyType: z.ZodOptional<z.ZodNativeEnum<typeof PropertyType>>;
        specifications: z.ZodOptional<z.ZodObject<{
            bedrooms: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
            }>>;
            bathrooms: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
            }>>;
            squareMeters: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
            }>>;
            maxGuests: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodNumber>;
                max: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                min?: number | undefined;
                max?: number | undefined;
            }, {
                min?: number | undefined;
                max?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            bedrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            bathrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            maxGuests?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            squareMeters?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
        }, {
            bedrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            bathrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            maxGuests?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            squareMeters?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
        }>>;
        priceRange: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            min?: number | undefined;
            max?: number | undefined;
        }, {
            min?: number | undefined;
            max?: number | undefined;
        }>>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        location: {
            latitude: number;
            longitude: number;
            radius: number;
        };
        limit: number;
        amenities?: string[] | undefined;
        propertyType?: PropertyType | undefined;
        specifications?: {
            bedrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            bathrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            maxGuests?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            squareMeters?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
        } | undefined;
        priceRange?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    }, {
        location: {
            latitude: number;
            longitude: number;
            radius?: number | undefined;
        };
        amenities?: string[] | undefined;
        limit?: number | undefined;
        propertyType?: PropertyType | undefined;
        specifications?: {
            bedrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            bathrooms?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            maxGuests?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
            squareMeters?: {
                min?: number | undefined;
                max?: number | undefined;
            } | undefined;
        } | undefined;
        priceRange?: {
            min?: number | undefined;
            max?: number | undefined;
        } | undefined;
    }>;
    updateReportStatus: z.ZodObject<{
        status: z.ZodEnum<["pending", "processing", "completed", "failed"]>;
        progress: z.ZodOptional<z.ZodNumber>;
        errorMessage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "completed" | "failed" | "processing";
        progress?: number | undefined;
        errorMessage?: string | undefined;
    }, {
        status: "pending" | "completed" | "failed" | "processing";
        progress?: number | undefined;
        errorMessage?: string | undefined;
    }>;
};
export type MarketAnalysisInput = z.infer<typeof marketAnalysisSchema>;
export type PropertyValuationInputData = z.infer<typeof propertyValuationInputSchema>;
export type CreateValuationInput = z.infer<typeof createValuationSchema>;
export type ReportParametersInput = z.infer<typeof reportParametersSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type ChartConfigurationInput = z.infer<typeof chartConfigurationSchema>;
export type ComparablePropertiesFilterInput = z.infer<typeof comparablePropertiesFilterSchema>;
export type UpdateReportStatusInput = z.infer<typeof updateReportStatusSchema>;
export declare const verificationDocumentSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof DocumentType>;
    documentNumber: z.ZodString;
    expiryDate: z.ZodOptional<z.ZodDate>;
    fileUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: DocumentType;
    documentNumber: string;
    fileUrl: string;
    expiryDate?: Date | undefined;
}, {
    type: DocumentType;
    documentNumber: string;
    fileUrl: string;
    expiryDate?: Date | undefined;
}>;
export declare const contactInfoSchema: z.ZodObject<{
    email: z.ZodString;
    phone: z.ZodString;
    whatsapp: z.ZodOptional<z.ZodString>;
    telegram: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    socialMedia: z.ZodOptional<z.ZodObject<{
        facebook: z.ZodOptional<z.ZodString>;
        instagram: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodString>;
        twitter: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        facebook?: string | undefined;
        twitter?: string | undefined;
        linkedin?: string | undefined;
        instagram?: string | undefined;
    }, {
        facebook?: string | undefined;
        twitter?: string | undefined;
        linkedin?: string | undefined;
        instagram?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone: string;
    whatsapp?: string | undefined;
    telegram?: string | undefined;
    website?: string | undefined;
    socialMedia?: {
        facebook?: string | undefined;
        twitter?: string | undefined;
        linkedin?: string | undefined;
        instagram?: string | undefined;
    } | undefined;
}, {
    email: string;
    phone: string;
    whatsapp?: string | undefined;
    telegram?: string | undefined;
    website?: string | undefined;
    socialMedia?: {
        facebook?: string | undefined;
        twitter?: string | undefined;
        linkedin?: string | undefined;
        instagram?: string | undefined;
    } | undefined;
}>;
export declare const addressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    coordinates: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    } | undefined;
}, {
    city: string;
    country: string;
    postalCode: string;
    state: string;
    street: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    } | undefined;
}>;
export declare const userPreferencesSchema: z.ZodObject<{
    language: z.ZodString;
    currency: z.ZodString;
    timezone: z.ZodString;
    notifications: z.ZodObject<{
        email: z.ZodBoolean;
        sms: z.ZodBoolean;
        push: z.ZodBoolean;
        marketing: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        email: boolean;
        push: boolean;
        sms: boolean;
        marketing: boolean;
    }, {
        email: boolean;
        push: boolean;
        sms: boolean;
        marketing: boolean;
    }>;
    privacy: z.ZodObject<{
        showContactInfo: z.ZodBoolean;
        showProperties: z.ZodBoolean;
        showReviews: z.ZodBoolean;
        allowMessages: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        showContactInfo: boolean;
        showProperties: boolean;
        showReviews: boolean;
        allowMessages: boolean;
    }, {
        showContactInfo: boolean;
        showProperties: boolean;
        showReviews: boolean;
        allowMessages: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    currency: string;
    language: string;
    timezone: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
        marketing: boolean;
    };
    privacy: {
        showContactInfo: boolean;
        showProperties: boolean;
        showReviews: boolean;
        allowMessages: boolean;
    };
}, {
    currency: string;
    language: string;
    timezone: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
        marketing: boolean;
    };
    privacy: {
        showContactInfo: boolean;
        showProperties: boolean;
        showReviews: boolean;
        allowMessages: boolean;
    };
}>;
export declare const certificationSchema: z.ZodObject<{
    name: z.ZodString;
    issuingOrganization: z.ZodString;
    issueDate: z.ZodDate;
    expiryDate: z.ZodOptional<z.ZodDate>;
    certificateNumber: z.ZodString;
    certificateUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    issuingOrganization: string;
    issueDate: Date;
    certificateNumber: string;
    expiryDate?: Date | undefined;
    certificateUrl?: string | undefined;
}, {
    name: string;
    issuingOrganization: string;
    issueDate: Date;
    certificateNumber: string;
    expiryDate?: Date | undefined;
    certificateUrl?: string | undefined;
}>;
export declare const userProfileSchema: z.ZodObject<{
    userType: z.ZodNativeEnum<typeof UserType>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialMedia: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>>;
    verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodDate>;
        fileUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }>, "many">>;
    preferences: z.ZodObject<{
        language: z.ZodString;
        currency: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodBoolean;
            sms: z.ZodBoolean;
            push: z.ZodBoolean;
            marketing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }>;
        privacy: z.ZodObject<{
            showContactInfo: z.ZodBoolean;
            showProperties: z.ZodBoolean;
            showReviews: z.ZodBoolean;
            allowMessages: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    isActive: boolean;
    userType: UserType;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    userType: UserType;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    isActive?: boolean | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
}>;
export declare const agentProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialMedia: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>>;
    verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodDate>;
        fileUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }>, "many">>;
    preferences: z.ZodObject<{
        language: z.ZodString;
        currency: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodBoolean;
            sms: z.ZodBoolean;
            push: z.ZodBoolean;
            marketing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }>;
        privacy: z.ZodObject<{
            showContactInfo: z.ZodBoolean;
            showProperties: z.ZodBoolean;
            showReviews: z.ZodBoolean;
            allowMessages: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }>;
    isActive: z.ZodDefault<z.ZodBoolean>;
} & {
    userType: z.ZodLiteral<UserType.AGENT>;
    licenseNumber: z.ZodString;
    agency: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        logo: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        address: z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        address: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        name: string;
        website?: string | undefined;
        logo?: string | undefined;
    }, {
        address: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        name: string;
        website?: string | undefined;
        logo?: string | undefined;
    }>>;
    specializations: z.ZodArray<z.ZodString, "many">;
    languages: z.ZodArray<z.ZodString, "many">;
    certifications: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        issuingOrganization: z.ZodString;
        issueDate: z.ZodDate;
        expiryDate: z.ZodOptional<z.ZodDate>;
        certificateNumber: z.ZodString;
        certificateUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }, {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }>, "many">>;
    workingHours: z.ZodObject<{
        monday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        tuesday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        wednesday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        thursday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        friday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        saturday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
        sunday: z.ZodObject<{
            start: z.ZodString;
            end: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            start: string;
            end: string;
            available: boolean;
        }, {
            start: string;
            end: string;
            available: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        monday: {
            start: string;
            end: string;
            available: boolean;
        };
        tuesday: {
            start: string;
            end: string;
            available: boolean;
        };
        wednesday: {
            start: string;
            end: string;
            available: boolean;
        };
        thursday: {
            start: string;
            end: string;
            available: boolean;
        };
        friday: {
            start: string;
            end: string;
            available: boolean;
        };
        saturday: {
            start: string;
            end: string;
            available: boolean;
        };
        sunday: {
            start: string;
            end: string;
            available: boolean;
        };
    }, {
        monday: {
            start: string;
            end: string;
            available: boolean;
        };
        tuesday: {
            start: string;
            end: string;
            available: boolean;
        };
        wednesday: {
            start: string;
            end: string;
            available: boolean;
        };
        thursday: {
            start: string;
            end: string;
            available: boolean;
        };
        friday: {
            start: string;
            end: string;
            available: boolean;
        };
        saturday: {
            start: string;
            end: string;
            available: boolean;
        };
        sunday: {
            start: string;
            end: string;
            available: boolean;
        };
    }>;
    commission: z.ZodObject<{
        type: z.ZodEnum<["percentage", "fixed"]>;
        value: z.ZodNumber;
        currency: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "percentage" | "fixed";
        value: number;
        currency?: string | undefined;
    }, {
        type: "percentage" | "fixed";
        value: number;
        currency?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    isActive: boolean;
    userType: UserType.AGENT;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    licenseNumber: string;
    specializations: string[];
    languages: string[];
    workingHours: {
        monday: {
            start: string;
            end: string;
            available: boolean;
        };
        tuesday: {
            start: string;
            end: string;
            available: boolean;
        };
        wednesday: {
            start: string;
            end: string;
            available: boolean;
        };
        thursday: {
            start: string;
            end: string;
            available: boolean;
        };
        friday: {
            start: string;
            end: string;
            available: boolean;
        };
        saturday: {
            start: string;
            end: string;
            available: boolean;
        };
        sunday: {
            start: string;
            end: string;
            available: boolean;
        };
    };
    commission: {
        type: "percentage" | "fixed";
        value: number;
        currency?: string | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    agency?: {
        address: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        name: string;
        website?: string | undefined;
        logo?: string | undefined;
    } | undefined;
    certifications?: {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }[] | undefined;
}, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    userType: UserType.AGENT;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    licenseNumber: string;
    specializations: string[];
    languages: string[];
    workingHours: {
        monday: {
            start: string;
            end: string;
            available: boolean;
        };
        tuesday: {
            start: string;
            end: string;
            available: boolean;
        };
        wednesday: {
            start: string;
            end: string;
            available: boolean;
        };
        thursday: {
            start: string;
            end: string;
            available: boolean;
        };
        friday: {
            start: string;
            end: string;
            available: boolean;
        };
        saturday: {
            start: string;
            end: string;
            available: boolean;
        };
        sunday: {
            start: string;
            end: string;
            available: boolean;
        };
    };
    commission: {
        type: "percentage" | "fixed";
        value: number;
        currency?: string | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    isActive?: boolean | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    agency?: {
        address: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        };
        name: string;
        website?: string | undefined;
        logo?: string | undefined;
    } | undefined;
    certifications?: {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }[] | undefined;
}>;
export declare const ownerProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialMedia: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>>;
    verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodDate>;
        fileUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }>, "many">>;
    preferences: z.ZodObject<{
        language: z.ZodString;
        currency: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodBoolean;
            sms: z.ZodBoolean;
            push: z.ZodBoolean;
            marketing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }>;
        privacy: z.ZodObject<{
            showContactInfo: z.ZodBoolean;
            showProperties: z.ZodBoolean;
            showReviews: z.ZodBoolean;
            allowMessages: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }>;
    isActive: z.ZodDefault<z.ZodBoolean>;
} & {
    userType: z.ZodLiteral<UserType.OWNER>;
    propertyTypes: z.ZodArray<z.ZodString, "many">;
    investmentExperience: z.ZodEnum<["beginner", "intermediate", "expert"]>;
    preferredManagement: z.ZodEnum<["self", "agent", "company"]>;
    taxId: z.ZodOptional<z.ZodString>;
    bankingInfo: z.ZodOptional<z.ZodObject<{
        bankName: z.ZodString;
        accountNumber: z.ZodString;
        routingNumber: z.ZodString;
        accountHolder: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        bankName: string;
        accountNumber: string;
        routingNumber: string;
        accountHolder: string;
    }, {
        bankName: string;
        accountNumber: string;
        routingNumber: string;
        accountHolder: string;
    }>>;
    insurance: z.ZodOptional<z.ZodObject<{
        provider: z.ZodString;
        policyNumber: z.ZodString;
        expiryDate: z.ZodDate;
        coverage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        expiryDate: Date;
        provider: string;
        policyNumber: string;
        coverage: number;
    }, {
        expiryDate: Date;
        provider: string;
        policyNumber: string;
        coverage: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    isActive: boolean;
    propertyTypes: string[];
    userType: UserType.OWNER;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    investmentExperience: "beginner" | "intermediate" | "expert";
    preferredManagement: "agent" | "company" | "self";
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    taxId?: string | undefined;
    bankingInfo?: {
        bankName: string;
        accountNumber: string;
        routingNumber: string;
        accountHolder: string;
    } | undefined;
    insurance?: {
        expiryDate: Date;
        provider: string;
        policyNumber: string;
        coverage: number;
    } | undefined;
}, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    propertyTypes: string[];
    userType: UserType.OWNER;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    investmentExperience: "beginner" | "intermediate" | "expert";
    preferredManagement: "agent" | "company" | "self";
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    isActive?: boolean | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    taxId?: string | undefined;
    bankingInfo?: {
        bankName: string;
        accountNumber: string;
        routingNumber: string;
        accountHolder: string;
    } | undefined;
    insurance?: {
        expiryDate: Date;
        provider: string;
        policyNumber: string;
        coverage: number;
    } | undefined;
}>;
export declare const clientProfileSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialMedia: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>>;
    verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodDate>;
        fileUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }>, "many">>;
    preferences: z.ZodObject<{
        language: z.ZodString;
        currency: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodBoolean;
            sms: z.ZodBoolean;
            push: z.ZodBoolean;
            marketing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }>;
        privacy: z.ZodObject<{
            showContactInfo: z.ZodBoolean;
            showProperties: z.ZodBoolean;
            showReviews: z.ZodBoolean;
            allowMessages: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }>;
    isActive: z.ZodDefault<z.ZodBoolean>;
} & {
    userType: z.ZodEnum<[UserType.CLIENT, UserType.GUEST]>;
    emergencyContact: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        relationship: z.ZodString;
        phone: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        name: string;
        relationship: string;
        email?: string | undefined;
    }, {
        phone: string;
        name: string;
        relationship: string;
        email?: string | undefined;
    }>>;
    travelPreferences: z.ZodOptional<z.ZodObject<{
        accommodationType: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        priceRange: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            currency: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            min: number;
            max: number;
        }, {
            currency: string;
            min: number;
            max: number;
        }>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        maxGuests: z.ZodNumber;
        smokingAllowed: z.ZodBoolean;
        petsAllowed: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        maxGuests: number;
        smokingAllowed: boolean;
        priceRange: {
            currency: string;
            min: number;
            max: number;
        };
        petsAllowed: boolean;
        amenities?: string[] | undefined;
        accommodationType?: string[] | undefined;
    }, {
        maxGuests: number;
        smokingAllowed: boolean;
        priceRange: {
            currency: string;
            min: number;
            max: number;
        };
        petsAllowed: boolean;
        amenities?: string[] | undefined;
        accommodationType?: string[] | undefined;
    }>>;
    identityVerification: z.ZodOptional<z.ZodObject<{
        documentType: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        isVerified: z.ZodDefault<z.ZodBoolean>;
        verifiedAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        isVerified: boolean;
        documentNumber: string;
        documentType: DocumentType;
        verifiedAt?: Date | undefined;
    }, {
        documentNumber: string;
        documentType: DocumentType;
        isVerified?: boolean | undefined;
        verifiedAt?: Date | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    isActive: boolean;
    userType: UserType.CLIENT | UserType.GUEST;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    emergencyContact?: {
        phone: string;
        name: string;
        relationship: string;
        email?: string | undefined;
    } | undefined;
    travelPreferences?: {
        maxGuests: number;
        smokingAllowed: boolean;
        priceRange: {
            currency: string;
            min: number;
            max: number;
        };
        petsAllowed: boolean;
        amenities?: string[] | undefined;
        accommodationType?: string[] | undefined;
    } | undefined;
    identityVerification?: {
        isVerified: boolean;
        documentNumber: string;
        documentType: DocumentType;
        verifiedAt?: Date | undefined;
    } | undefined;
}, {
    firstName: string;
    lastName: string;
    preferences: {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    };
    userType: UserType.CLIENT | UserType.GUEST;
    contactInfo: {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    };
    avatar?: string | undefined;
    address?: {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    } | undefined;
    isActive?: boolean | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    verificationDocuments?: {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }[] | undefined;
    emergencyContact?: {
        phone: string;
        name: string;
        relationship: string;
        email?: string | undefined;
    } | undefined;
    travelPreferences?: {
        maxGuests: number;
        smokingAllowed: boolean;
        priceRange: {
            currency: string;
            min: number;
            max: number;
        };
        petsAllowed: boolean;
        amenities?: string[] | undefined;
        accommodationType?: string[] | undefined;
    } | undefined;
    identityVerification?: {
        documentNumber: string;
        documentType: DocumentType;
        isVerified?: boolean | undefined;
        verifiedAt?: Date | undefined;
    } | undefined;
}>;
export declare const ratingCriteriaSchema: z.ZodObject<{
    cleanliness: z.ZodNumber;
    accuracy: z.ZodNumber;
    communication: z.ZodNumber;
    location: z.ZodNumber;
    checkIn: z.ZodNumber;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    location: number;
    value: number;
    cleanliness: number;
    accuracy: number;
    communication: number;
    checkIn: number;
}, {
    location: number;
    value: number;
    cleanliness: number;
    accuracy: number;
    communication: number;
    checkIn: number;
}>;
export declare const createReviewSchema: z.ZodObject<{
    reviewType: z.ZodNativeEnum<typeof ReviewType>;
    targetId: z.ZodString;
    rating: z.ZodNumber;
    criteria: z.ZodOptional<z.ZodObject<{
        cleanliness: z.ZodNumber;
        accuracy: z.ZodNumber;
        communication: z.ZodNumber;
        location: z.ZodNumber;
        checkIn: z.ZodNumber;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }>>;
    title: z.ZodOptional<z.ZodString>;
    comment: z.ZodString;
    pros: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cons: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    photos: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    bookingId: z.ZodOptional<z.ZodString>;
    stayDate: z.ZodOptional<z.ZodDate>;
    isAnonymous: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    rating: number;
    reviewType: ReviewType;
    targetId: string;
    comment: string;
    isAnonymous: boolean;
    title?: string | undefined;
    bookingId?: string | undefined;
    criteria?: {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    } | undefined;
    pros?: string[] | undefined;
    cons?: string[] | undefined;
    photos?: string[] | undefined;
    stayDate?: Date | undefined;
}, {
    rating: number;
    reviewType: ReviewType;
    targetId: string;
    comment: string;
    title?: string | undefined;
    bookingId?: string | undefined;
    criteria?: {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    } | undefined;
    pros?: string[] | undefined;
    cons?: string[] | undefined;
    photos?: string[] | undefined;
    stayDate?: Date | undefined;
    isAnonymous?: boolean | undefined;
}>;
export declare const updateReviewSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    criteria: z.ZodOptional<z.ZodObject<{
        cleanliness: z.ZodNumber;
        accuracy: z.ZodNumber;
        communication: z.ZodNumber;
        location: z.ZodNumber;
        checkIn: z.ZodNumber;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }>>;
    title: z.ZodOptional<z.ZodString>;
    comment: z.ZodOptional<z.ZodString>;
    pros: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cons: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    photos: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    rating?: number | undefined;
    criteria?: {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    } | undefined;
    comment?: string | undefined;
    pros?: string[] | undefined;
    cons?: string[] | undefined;
    photos?: string[] | undefined;
}, {
    title?: string | undefined;
    rating?: number | undefined;
    criteria?: {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    } | undefined;
    comment?: string | undefined;
    pros?: string[] | undefined;
    cons?: string[] | undefined;
    photos?: string[] | undefined;
}>;
export declare const reportReviewSchema: z.ZodObject<{
    reviewId: z.ZodString;
    reason: z.ZodNativeEnum<typeof ReportReason>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reviewId: string;
    reason: ReportReason;
    description?: string | undefined;
}, {
    reviewId: string;
    reason: ReportReason;
    description?: string | undefined;
}>;
export declare const reviewResponseSchema: z.ZodObject<{
    reviewId: z.ZodString;
    response: z.ZodString;
    isOfficial: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    reviewId: string;
    response: string;
    isOfficial: boolean;
}, {
    reviewId: string;
    response: string;
    isOfficial?: boolean | undefined;
}>;
export declare const reviewFiltersSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    dateRange: z.ZodOptional<z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        start: Date;
        end: Date;
    }, {
        start: Date;
        end: Date;
    }>>;
    reviewType: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof ReviewType>, "many">>;
    verified: z.ZodOptional<z.ZodBoolean>;
    withPhotos: z.ZodOptional<z.ZodBoolean>;
    language: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<["newest", "oldest", "highest_rating", "lowest_rating", "most_helpful"]>>;
}, "strip", z.ZodTypeAny, {
    sortBy?: "newest" | "oldest" | "highest_rating" | "lowest_rating" | "most_helpful" | undefined;
    rating?: number[] | undefined;
    verified?: boolean | undefined;
    dateRange?: {
        start: Date;
        end: Date;
    } | undefined;
    language?: string | undefined;
    reviewType?: ReviewType[] | undefined;
    withPhotos?: boolean | undefined;
}, {
    sortBy?: "newest" | "oldest" | "highest_rating" | "lowest_rating" | "most_helpful" | undefined;
    rating?: number[] | undefined;
    verified?: boolean | undefined;
    dateRange?: {
        start: Date;
        end: Date;
    } | undefined;
    language?: string | undefined;
    reviewType?: ReviewType[] | undefined;
    withPhotos?: boolean | undefined;
}>;
export declare const moderationActionSchema: z.ZodObject<{
    reviewId: z.ZodString;
    action: z.ZodEnum<["approve", "reject", "flag", "edit", "hide", "warn_user"]>;
    reason: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    editedContent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reviewId: string;
    action: "edit" | "approve" | "reject" | "flag" | "hide" | "warn_user";
    notes?: string | undefined;
    reason?: string | undefined;
    editedContent?: string | undefined;
}, {
    reviewId: string;
    action: "edit" | "approve" | "reject" | "flag" | "hide" | "warn_user";
    notes?: string | undefined;
    reason?: string | undefined;
    editedContent?: string | undefined;
}>;
export declare const moderationSettingsSchema: z.ZodObject<{
    autoApprove: z.ZodBoolean;
    requireVerifiedBooking: z.ZodBoolean;
    minimumStayDuration: z.ZodNumber;
    profanityFilter: z.ZodBoolean;
    spamDetection: z.ZodBoolean;
    duplicateDetection: z.ZodBoolean;
    reviewCooldown: z.ZodNumber;
    allowAnonymous: z.ZodBoolean;
    allowPhotos: z.ZodBoolean;
    maxPhotosPerReview: z.ZodNumber;
    moderatorNotifications: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    autoApprove: boolean;
    requireVerifiedBooking: boolean;
    minimumStayDuration: number;
    profanityFilter: boolean;
    spamDetection: boolean;
    duplicateDetection: boolean;
    reviewCooldown: number;
    allowAnonymous: boolean;
    allowPhotos: boolean;
    maxPhotosPerReview: number;
    moderatorNotifications: boolean;
}, {
    autoApprove: boolean;
    requireVerifiedBooking: boolean;
    minimumStayDuration: number;
    profanityFilter: boolean;
    spamDetection: boolean;
    duplicateDetection: boolean;
    reviewCooldown: number;
    allowAnonymous: boolean;
    allowPhotos: boolean;
    maxPhotosPerReview: number;
    moderatorNotifications: boolean;
}>;
export declare const profileReviewSchemas: {
    userProfile: z.ZodObject<{
        userType: z.ZodNativeEnum<typeof UserType>;
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        contactInfo: z.ZodObject<{
            email: z.ZodString;
            phone: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            telegram: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            socialMedia: z.ZodOptional<z.ZodObject<{
                facebook: z.ZodOptional<z.ZodString>;
                instagram: z.ZodOptional<z.ZodString>;
                linkedin: z.ZodOptional<z.ZodString>;
                twitter: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>>;
        verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof DocumentType>;
            documentNumber: z.ZodString;
            expiryDate: z.ZodOptional<z.ZodDate>;
            fileUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }>, "many">>;
        preferences: z.ZodObject<{
            language: z.ZodString;
            currency: z.ZodString;
            timezone: z.ZodString;
            notifications: z.ZodObject<{
                email: z.ZodBoolean;
                sms: z.ZodBoolean;
                push: z.ZodBoolean;
                marketing: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }>;
            privacy: z.ZodObject<{
                showContactInfo: z.ZodBoolean;
                showProperties: z.ZodBoolean;
                showReviews: z.ZodBoolean;
                allowMessages: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        isActive: boolean;
        userType: UserType;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
    }, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        userType: UserType;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        isActive?: boolean | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
    }>;
    agentProfile: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        contactInfo: z.ZodObject<{
            email: z.ZodString;
            phone: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            telegram: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            socialMedia: z.ZodOptional<z.ZodObject<{
                facebook: z.ZodOptional<z.ZodString>;
                instagram: z.ZodOptional<z.ZodString>;
                linkedin: z.ZodOptional<z.ZodString>;
                twitter: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>>;
        verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof DocumentType>;
            documentNumber: z.ZodString;
            expiryDate: z.ZodOptional<z.ZodDate>;
            fileUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }>, "many">>;
        preferences: z.ZodObject<{
            language: z.ZodString;
            currency: z.ZodString;
            timezone: z.ZodString;
            notifications: z.ZodObject<{
                email: z.ZodBoolean;
                sms: z.ZodBoolean;
                push: z.ZodBoolean;
                marketing: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }>;
            privacy: z.ZodObject<{
                showContactInfo: z.ZodBoolean;
                showProperties: z.ZodBoolean;
                showReviews: z.ZodBoolean;
                allowMessages: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    } & {
        userType: z.ZodLiteral<UserType.AGENT>;
        licenseNumber: z.ZodString;
        agency: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            logo: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            address: z.ZodObject<{
                street: z.ZodString;
                city: z.ZodString;
                state: z.ZodString;
                postalCode: z.ZodString;
                country: z.ZodString;
                coordinates: z.ZodOptional<z.ZodObject<{
                    latitude: z.ZodNumber;
                    longitude: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    latitude: number;
                    longitude: number;
                }, {
                    latitude: number;
                    longitude: number;
                }>>;
            }, "strip", z.ZodTypeAny, {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            }, {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            address: {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            name: string;
            website?: string | undefined;
            logo?: string | undefined;
        }, {
            address: {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            name: string;
            website?: string | undefined;
            logo?: string | undefined;
        }>>;
        specializations: z.ZodArray<z.ZodString, "many">;
        languages: z.ZodArray<z.ZodString, "many">;
        certifications: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            issuingOrganization: z.ZodString;
            issueDate: z.ZodDate;
            expiryDate: z.ZodOptional<z.ZodDate>;
            certificateNumber: z.ZodString;
            certificateUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            issuingOrganization: string;
            issueDate: Date;
            certificateNumber: string;
            expiryDate?: Date | undefined;
            certificateUrl?: string | undefined;
        }, {
            name: string;
            issuingOrganization: string;
            issueDate: Date;
            certificateNumber: string;
            expiryDate?: Date | undefined;
            certificateUrl?: string | undefined;
        }>, "many">>;
        workingHours: z.ZodObject<{
            monday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            tuesday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            wednesday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            thursday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            friday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            saturday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
            sunday: z.ZodObject<{
                start: z.ZodString;
                end: z.ZodString;
                available: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                start: string;
                end: string;
                available: boolean;
            }, {
                start: string;
                end: string;
                available: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            monday: {
                start: string;
                end: string;
                available: boolean;
            };
            tuesday: {
                start: string;
                end: string;
                available: boolean;
            };
            wednesday: {
                start: string;
                end: string;
                available: boolean;
            };
            thursday: {
                start: string;
                end: string;
                available: boolean;
            };
            friday: {
                start: string;
                end: string;
                available: boolean;
            };
            saturday: {
                start: string;
                end: string;
                available: boolean;
            };
            sunday: {
                start: string;
                end: string;
                available: boolean;
            };
        }, {
            monday: {
                start: string;
                end: string;
                available: boolean;
            };
            tuesday: {
                start: string;
                end: string;
                available: boolean;
            };
            wednesday: {
                start: string;
                end: string;
                available: boolean;
            };
            thursday: {
                start: string;
                end: string;
                available: boolean;
            };
            friday: {
                start: string;
                end: string;
                available: boolean;
            };
            saturday: {
                start: string;
                end: string;
                available: boolean;
            };
            sunday: {
                start: string;
                end: string;
                available: boolean;
            };
        }>;
        commission: z.ZodObject<{
            type: z.ZodEnum<["percentage", "fixed"]>;
            value: z.ZodNumber;
            currency: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "percentage" | "fixed";
            value: number;
            currency?: string | undefined;
        }, {
            type: "percentage" | "fixed";
            value: number;
            currency?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        isActive: boolean;
        userType: UserType.AGENT;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        licenseNumber: string;
        specializations: string[];
        languages: string[];
        workingHours: {
            monday: {
                start: string;
                end: string;
                available: boolean;
            };
            tuesday: {
                start: string;
                end: string;
                available: boolean;
            };
            wednesday: {
                start: string;
                end: string;
                available: boolean;
            };
            thursday: {
                start: string;
                end: string;
                available: boolean;
            };
            friday: {
                start: string;
                end: string;
                available: boolean;
            };
            saturday: {
                start: string;
                end: string;
                available: boolean;
            };
            sunday: {
                start: string;
                end: string;
                available: boolean;
            };
        };
        commission: {
            type: "percentage" | "fixed";
            value: number;
            currency?: string | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        agency?: {
            address: {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            name: string;
            website?: string | undefined;
            logo?: string | undefined;
        } | undefined;
        certifications?: {
            name: string;
            issuingOrganization: string;
            issueDate: Date;
            certificateNumber: string;
            expiryDate?: Date | undefined;
            certificateUrl?: string | undefined;
        }[] | undefined;
    }, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        userType: UserType.AGENT;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        licenseNumber: string;
        specializations: string[];
        languages: string[];
        workingHours: {
            monday: {
                start: string;
                end: string;
                available: boolean;
            };
            tuesday: {
                start: string;
                end: string;
                available: boolean;
            };
            wednesday: {
                start: string;
                end: string;
                available: boolean;
            };
            thursday: {
                start: string;
                end: string;
                available: boolean;
            };
            friday: {
                start: string;
                end: string;
                available: boolean;
            };
            saturday: {
                start: string;
                end: string;
                available: boolean;
            };
            sunday: {
                start: string;
                end: string;
                available: boolean;
            };
        };
        commission: {
            type: "percentage" | "fixed";
            value: number;
            currency?: string | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        isActive?: boolean | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        agency?: {
            address: {
                city: string;
                country: string;
                postalCode: string;
                state: string;
                street: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
            };
            name: string;
            website?: string | undefined;
            logo?: string | undefined;
        } | undefined;
        certifications?: {
            name: string;
            issuingOrganization: string;
            issueDate: Date;
            certificateNumber: string;
            expiryDate?: Date | undefined;
            certificateUrl?: string | undefined;
        }[] | undefined;
    }>;
    ownerProfile: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        contactInfo: z.ZodObject<{
            email: z.ZodString;
            phone: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            telegram: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            socialMedia: z.ZodOptional<z.ZodObject<{
                facebook: z.ZodOptional<z.ZodString>;
                instagram: z.ZodOptional<z.ZodString>;
                linkedin: z.ZodOptional<z.ZodString>;
                twitter: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>>;
        verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof DocumentType>;
            documentNumber: z.ZodString;
            expiryDate: z.ZodOptional<z.ZodDate>;
            fileUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }>, "many">>;
        preferences: z.ZodObject<{
            language: z.ZodString;
            currency: z.ZodString;
            timezone: z.ZodString;
            notifications: z.ZodObject<{
                email: z.ZodBoolean;
                sms: z.ZodBoolean;
                push: z.ZodBoolean;
                marketing: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }>;
            privacy: z.ZodObject<{
                showContactInfo: z.ZodBoolean;
                showProperties: z.ZodBoolean;
                showReviews: z.ZodBoolean;
                allowMessages: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    } & {
        userType: z.ZodLiteral<UserType.OWNER>;
        propertyTypes: z.ZodArray<z.ZodString, "many">;
        investmentExperience: z.ZodEnum<["beginner", "intermediate", "expert"]>;
        preferredManagement: z.ZodEnum<["self", "agent", "company"]>;
        taxId: z.ZodOptional<z.ZodString>;
        bankingInfo: z.ZodOptional<z.ZodObject<{
            bankName: z.ZodString;
            accountNumber: z.ZodString;
            routingNumber: z.ZodString;
            accountHolder: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            bankName: string;
            accountNumber: string;
            routingNumber: string;
            accountHolder: string;
        }, {
            bankName: string;
            accountNumber: string;
            routingNumber: string;
            accountHolder: string;
        }>>;
        insurance: z.ZodOptional<z.ZodObject<{
            provider: z.ZodString;
            policyNumber: z.ZodString;
            expiryDate: z.ZodDate;
            coverage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            expiryDate: Date;
            provider: string;
            policyNumber: string;
            coverage: number;
        }, {
            expiryDate: Date;
            provider: string;
            policyNumber: string;
            coverage: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        isActive: boolean;
        propertyTypes: string[];
        userType: UserType.OWNER;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        investmentExperience: "beginner" | "intermediate" | "expert";
        preferredManagement: "agent" | "company" | "self";
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        taxId?: string | undefined;
        bankingInfo?: {
            bankName: string;
            accountNumber: string;
            routingNumber: string;
            accountHolder: string;
        } | undefined;
        insurance?: {
            expiryDate: Date;
            provider: string;
            policyNumber: string;
            coverage: number;
        } | undefined;
    }, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        propertyTypes: string[];
        userType: UserType.OWNER;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        investmentExperience: "beginner" | "intermediate" | "expert";
        preferredManagement: "agent" | "company" | "self";
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        isActive?: boolean | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        taxId?: string | undefined;
        bankingInfo?: {
            bankName: string;
            accountNumber: string;
            routingNumber: string;
            accountHolder: string;
        } | undefined;
        insurance?: {
            expiryDate: Date;
            provider: string;
            policyNumber: string;
            coverage: number;
        } | undefined;
    }>;
    clientProfile: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        contactInfo: z.ZodObject<{
            email: z.ZodString;
            phone: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            telegram: z.ZodOptional<z.ZodString>;
            website: z.ZodOptional<z.ZodString>;
            socialMedia: z.ZodOptional<z.ZodObject<{
                facebook: z.ZodOptional<z.ZodString>;
                instagram: z.ZodOptional<z.ZodString>;
                linkedin: z.ZodOptional<z.ZodString>;
                twitter: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }, {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }, {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        }>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                latitude: z.ZodNumber;
                longitude: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                latitude: number;
                longitude: number;
            }, {
                latitude: number;
                longitude: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }, {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        }>>;
        verificationDocuments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof DocumentType>;
            documentNumber: z.ZodString;
            expiryDate: z.ZodOptional<z.ZodDate>;
            fileUrl: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }, {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }>, "many">>;
        preferences: z.ZodObject<{
            language: z.ZodString;
            currency: z.ZodString;
            timezone: z.ZodString;
            notifications: z.ZodObject<{
                email: z.ZodBoolean;
                sms: z.ZodBoolean;
                push: z.ZodBoolean;
                marketing: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }, {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            }>;
            privacy: z.ZodObject<{
                showContactInfo: z.ZodBoolean;
                showProperties: z.ZodBoolean;
                showReviews: z.ZodBoolean;
                allowMessages: z.ZodBoolean;
            }, "strip", z.ZodTypeAny, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }, {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            }>;
        }, "strip", z.ZodTypeAny, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }, {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        }>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    } & {
        userType: z.ZodEnum<[UserType.CLIENT, UserType.GUEST]>;
        emergencyContact: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            relationship: z.ZodString;
            phone: z.ZodString;
            email: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            phone: string;
            name: string;
            relationship: string;
            email?: string | undefined;
        }, {
            phone: string;
            name: string;
            relationship: string;
            email?: string | undefined;
        }>>;
        travelPreferences: z.ZodOptional<z.ZodObject<{
            accommodationType: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            priceRange: z.ZodObject<{
                min: z.ZodNumber;
                max: z.ZodNumber;
                currency: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                currency: string;
                min: number;
                max: number;
            }, {
                currency: string;
                min: number;
                max: number;
            }>;
            amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            maxGuests: z.ZodNumber;
            smokingAllowed: z.ZodBoolean;
            petsAllowed: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            maxGuests: number;
            smokingAllowed: boolean;
            priceRange: {
                currency: string;
                min: number;
                max: number;
            };
            petsAllowed: boolean;
            amenities?: string[] | undefined;
            accommodationType?: string[] | undefined;
        }, {
            maxGuests: number;
            smokingAllowed: boolean;
            priceRange: {
                currency: string;
                min: number;
                max: number;
            };
            petsAllowed: boolean;
            amenities?: string[] | undefined;
            accommodationType?: string[] | undefined;
        }>>;
        identityVerification: z.ZodOptional<z.ZodObject<{
            documentType: z.ZodNativeEnum<typeof DocumentType>;
            documentNumber: z.ZodString;
            isVerified: z.ZodDefault<z.ZodBoolean>;
            verifiedAt: z.ZodOptional<z.ZodDate>;
        }, "strip", z.ZodTypeAny, {
            isVerified: boolean;
            documentNumber: string;
            documentType: DocumentType;
            verifiedAt?: Date | undefined;
        }, {
            documentNumber: string;
            documentType: DocumentType;
            isVerified?: boolean | undefined;
            verifiedAt?: Date | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        isActive: boolean;
        userType: UserType.CLIENT | UserType.GUEST;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        emergencyContact?: {
            phone: string;
            name: string;
            relationship: string;
            email?: string | undefined;
        } | undefined;
        travelPreferences?: {
            maxGuests: number;
            smokingAllowed: boolean;
            priceRange: {
                currency: string;
                min: number;
                max: number;
            };
            petsAllowed: boolean;
            amenities?: string[] | undefined;
            accommodationType?: string[] | undefined;
        } | undefined;
        identityVerification?: {
            isVerified: boolean;
            documentNumber: string;
            documentType: DocumentType;
            verifiedAt?: Date | undefined;
        } | undefined;
    }, {
        firstName: string;
        lastName: string;
        preferences: {
            currency: string;
            language: string;
            timezone: string;
            notifications: {
                email: boolean;
                push: boolean;
                sms: boolean;
                marketing: boolean;
            };
            privacy: {
                showContactInfo: boolean;
                showProperties: boolean;
                showReviews: boolean;
                allowMessages: boolean;
            };
        };
        userType: UserType.CLIENT | UserType.GUEST;
        contactInfo: {
            email: string;
            phone: string;
            whatsapp?: string | undefined;
            telegram?: string | undefined;
            website?: string | undefined;
            socialMedia?: {
                facebook?: string | undefined;
                twitter?: string | undefined;
                linkedin?: string | undefined;
                instagram?: string | undefined;
            } | undefined;
        };
        avatar?: string | undefined;
        address?: {
            city: string;
            country: string;
            postalCode: string;
            state: string;
            street: string;
            coordinates?: {
                latitude: number;
                longitude: number;
            } | undefined;
        } | undefined;
        isActive?: boolean | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        verificationDocuments?: {
            type: DocumentType;
            documentNumber: string;
            fileUrl: string;
            expiryDate?: Date | undefined;
        }[] | undefined;
        emergencyContact?: {
            phone: string;
            name: string;
            relationship: string;
            email?: string | undefined;
        } | undefined;
        travelPreferences?: {
            maxGuests: number;
            smokingAllowed: boolean;
            priceRange: {
                currency: string;
                min: number;
                max: number;
            };
            petsAllowed: boolean;
            amenities?: string[] | undefined;
            accommodationType?: string[] | undefined;
        } | undefined;
        identityVerification?: {
            documentNumber: string;
            documentType: DocumentType;
            isVerified?: boolean | undefined;
            verifiedAt?: Date | undefined;
        } | undefined;
    }>;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        telegram: z.ZodOptional<z.ZodString>;
        website: z.ZodOptional<z.ZodString>;
        socialMedia: z.ZodOptional<z.ZodObject<{
            facebook: z.ZodOptional<z.ZodString>;
            instagram: z.ZodOptional<z.ZodString>;
            linkedin: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }, {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }, {
        email: string;
        phone: string;
        whatsapp?: string | undefined;
        telegram?: string | undefined;
        website?: string | undefined;
        socialMedia?: {
            facebook?: string | undefined;
            twitter?: string | undefined;
            linkedin?: string | undefined;
            instagram?: string | undefined;
        } | undefined;
    }>;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        city: string;
        country: string;
        postalCode: string;
        state: string;
        street: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>;
    userPreferences: z.ZodObject<{
        language: z.ZodString;
        currency: z.ZodString;
        timezone: z.ZodString;
        notifications: z.ZodObject<{
            email: z.ZodBoolean;
            sms: z.ZodBoolean;
            push: z.ZodBoolean;
            marketing: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }, {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        }>;
        privacy: z.ZodObject<{
            showContactInfo: z.ZodBoolean;
            showProperties: z.ZodBoolean;
            showReviews: z.ZodBoolean;
            allowMessages: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }, {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }, {
        currency: string;
        language: string;
        timezone: string;
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
            marketing: boolean;
        };
        privacy: {
            showContactInfo: boolean;
            showProperties: boolean;
            showReviews: boolean;
            allowMessages: boolean;
        };
    }>;
    certification: z.ZodObject<{
        name: z.ZodString;
        issuingOrganization: z.ZodString;
        issueDate: z.ZodDate;
        expiryDate: z.ZodOptional<z.ZodDate>;
        certificateNumber: z.ZodString;
        certificateUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }, {
        name: string;
        issuingOrganization: string;
        issueDate: Date;
        certificateNumber: string;
        expiryDate?: Date | undefined;
        certificateUrl?: string | undefined;
    }>;
    verificationDocument: z.ZodObject<{
        type: z.ZodNativeEnum<typeof DocumentType>;
        documentNumber: z.ZodString;
        expiryDate: z.ZodOptional<z.ZodDate>;
        fileUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }, {
        type: DocumentType;
        documentNumber: string;
        fileUrl: string;
        expiryDate?: Date | undefined;
    }>;
    createReview: z.ZodObject<{
        reviewType: z.ZodNativeEnum<typeof ReviewType>;
        targetId: z.ZodString;
        rating: z.ZodNumber;
        criteria: z.ZodOptional<z.ZodObject<{
            cleanliness: z.ZodNumber;
            accuracy: z.ZodNumber;
            communication: z.ZodNumber;
            location: z.ZodNumber;
            checkIn: z.ZodNumber;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        }, {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        }>>;
        title: z.ZodOptional<z.ZodString>;
        comment: z.ZodString;
        pros: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        cons: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        photos: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        bookingId: z.ZodOptional<z.ZodString>;
        stayDate: z.ZodOptional<z.ZodDate>;
        isAnonymous: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        rating: number;
        reviewType: ReviewType;
        targetId: string;
        comment: string;
        isAnonymous: boolean;
        title?: string | undefined;
        bookingId?: string | undefined;
        criteria?: {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        } | undefined;
        pros?: string[] | undefined;
        cons?: string[] | undefined;
        photos?: string[] | undefined;
        stayDate?: Date | undefined;
    }, {
        rating: number;
        reviewType: ReviewType;
        targetId: string;
        comment: string;
        title?: string | undefined;
        bookingId?: string | undefined;
        criteria?: {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        } | undefined;
        pros?: string[] | undefined;
        cons?: string[] | undefined;
        photos?: string[] | undefined;
        stayDate?: Date | undefined;
        isAnonymous?: boolean | undefined;
    }>;
    updateReview: z.ZodObject<{
        rating: z.ZodOptional<z.ZodNumber>;
        criteria: z.ZodOptional<z.ZodObject<{
            cleanliness: z.ZodNumber;
            accuracy: z.ZodNumber;
            communication: z.ZodNumber;
            location: z.ZodNumber;
            checkIn: z.ZodNumber;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        }, {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        }>>;
        title: z.ZodOptional<z.ZodString>;
        comment: z.ZodOptional<z.ZodString>;
        pros: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        cons: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        photos: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        rating?: number | undefined;
        criteria?: {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        } | undefined;
        comment?: string | undefined;
        pros?: string[] | undefined;
        cons?: string[] | undefined;
        photos?: string[] | undefined;
    }, {
        title?: string | undefined;
        rating?: number | undefined;
        criteria?: {
            location: number;
            value: number;
            cleanliness: number;
            accuracy: number;
            communication: number;
            checkIn: number;
        } | undefined;
        comment?: string | undefined;
        pros?: string[] | undefined;
        cons?: string[] | undefined;
        photos?: string[] | undefined;
    }>;
    reportReview: z.ZodObject<{
        reviewId: z.ZodString;
        reason: z.ZodNativeEnum<typeof ReportReason>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
        reason: ReportReason;
        description?: string | undefined;
    }, {
        reviewId: string;
        reason: ReportReason;
        description?: string | undefined;
    }>;
    reviewResponse: z.ZodObject<{
        reviewId: z.ZodString;
        response: z.ZodString;
        isOfficial: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
        response: string;
        isOfficial: boolean;
    }, {
        reviewId: string;
        response: string;
        isOfficial?: boolean | undefined;
    }>;
    reviewFilters: z.ZodObject<{
        rating: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        dateRange: z.ZodOptional<z.ZodObject<{
            start: z.ZodDate;
            end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            start: Date;
            end: Date;
        }, {
            start: Date;
            end: Date;
        }>>;
        reviewType: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof ReviewType>, "many">>;
        verified: z.ZodOptional<z.ZodBoolean>;
        withPhotos: z.ZodOptional<z.ZodBoolean>;
        language: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodEnum<["newest", "oldest", "highest_rating", "lowest_rating", "most_helpful"]>>;
    }, "strip", z.ZodTypeAny, {
        sortBy?: "newest" | "oldest" | "highest_rating" | "lowest_rating" | "most_helpful" | undefined;
        rating?: number[] | undefined;
        verified?: boolean | undefined;
        dateRange?: {
            start: Date;
            end: Date;
        } | undefined;
        language?: string | undefined;
        reviewType?: ReviewType[] | undefined;
        withPhotos?: boolean | undefined;
    }, {
        sortBy?: "newest" | "oldest" | "highest_rating" | "lowest_rating" | "most_helpful" | undefined;
        rating?: number[] | undefined;
        verified?: boolean | undefined;
        dateRange?: {
            start: Date;
            end: Date;
        } | undefined;
        language?: string | undefined;
        reviewType?: ReviewType[] | undefined;
        withPhotos?: boolean | undefined;
    }>;
    ratingCriteria: z.ZodObject<{
        cleanliness: z.ZodNumber;
        accuracy: z.ZodNumber;
        communication: z.ZodNumber;
        location: z.ZodNumber;
        checkIn: z.ZodNumber;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }, {
        location: number;
        value: number;
        cleanliness: number;
        accuracy: number;
        communication: number;
        checkIn: number;
    }>;
    moderationAction: z.ZodObject<{
        reviewId: z.ZodString;
        action: z.ZodEnum<["approve", "reject", "flag", "edit", "hide", "warn_user"]>;
        reason: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        editedContent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
        action: "edit" | "approve" | "reject" | "flag" | "hide" | "warn_user";
        notes?: string | undefined;
        reason?: string | undefined;
        editedContent?: string | undefined;
    }, {
        reviewId: string;
        action: "edit" | "approve" | "reject" | "flag" | "hide" | "warn_user";
        notes?: string | undefined;
        reason?: string | undefined;
        editedContent?: string | undefined;
    }>;
    moderationSettings: z.ZodObject<{
        autoApprove: z.ZodBoolean;
        requireVerifiedBooking: z.ZodBoolean;
        minimumStayDuration: z.ZodNumber;
        profanityFilter: z.ZodBoolean;
        spamDetection: z.ZodBoolean;
        duplicateDetection: z.ZodBoolean;
        reviewCooldown: z.ZodNumber;
        allowAnonymous: z.ZodBoolean;
        allowPhotos: z.ZodBoolean;
        maxPhotosPerReview: z.ZodNumber;
        moderatorNotifications: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        autoApprove: boolean;
        requireVerifiedBooking: boolean;
        minimumStayDuration: number;
        profanityFilter: boolean;
        spamDetection: boolean;
        duplicateDetection: boolean;
        reviewCooldown: number;
        allowAnonymous: boolean;
        allowPhotos: boolean;
        maxPhotosPerReview: number;
        moderatorNotifications: boolean;
    }, {
        autoApprove: boolean;
        requireVerifiedBooking: boolean;
        minimumStayDuration: number;
        profanityFilter: boolean;
        spamDetection: boolean;
        duplicateDetection: boolean;
        reviewCooldown: number;
        allowAnonymous: boolean;
        allowPhotos: boolean;
        maxPhotosPerReview: number;
        moderatorNotifications: boolean;
    }>;
};
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type AgentProfileInput = z.infer<typeof agentProfileSchema>;
export type OwnerProfileInput = z.infer<typeof ownerProfileSchema>;
export type ClientProfileInput = z.infer<typeof clientProfileSchema>;
export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type VerificationDocumentInput = z.infer<typeof verificationDocumentSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReportReviewInput = z.infer<typeof reportReviewSchema>;
export type ReviewResponseInput = z.infer<typeof reviewResponseSchema>;
export type ReviewFiltersInput = z.infer<typeof reviewFiltersSchema>;
export type RatingCriteriaInput = z.infer<typeof ratingCriteriaSchema>;
export type ModerationActionInput = z.infer<typeof moderationActionSchema>;
export type ModerationSettingsInput = z.infer<typeof moderationSettingsSchema>;
export declare const permissionSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof PermissionType>;
    name: z.ZodString;
    description: z.ZodString;
    resource: z.ZodOptional<z.ZodString>;
    scope: z.ZodOptional<z.ZodEnum<["global", "own", "department"]>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    type: PermissionType;
    name: string;
    resource?: string | undefined;
    scope?: "global" | "own" | "department" | undefined;
}, {
    description: string;
    type: PermissionType;
    name: string;
    resource?: string | undefined;
    scope?: "global" | "own" | "department" | undefined;
}>;
export declare const roleSchema: z.ZodObject<{
    name: z.ZodString;
    displayName: z.ZodString;
    description: z.ZodString;
    level: z.ZodNumber;
    permissions: z.ZodArray<z.ZodString, "many">;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    permissions: string[];
    description: string;
    isActive: boolean;
    name: string;
    displayName: string;
    level: number;
}, {
    permissions: string[];
    description: string;
    name: string;
    displayName: string;
    level: number;
    isActive?: boolean | undefined;
}>;
export declare const adminUserSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    roles: z.ZodArray<z.ZodString, "many">;
    status: z.ZodDefault<z.ZodNativeEnum<typeof AdminUserStatus>>;
    preferences: z.ZodObject<{
        language: z.ZodDefault<z.ZodString>;
        timezone: z.ZodDefault<z.ZodString>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
        notificationsEnabled: z.ZodDefault<z.ZodBoolean>;
        emailNotifications: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        emailNotifications: boolean;
        language: string;
        timezone: string;
        theme: "light" | "dark" | "auto";
        notificationsEnabled: boolean;
    }, {
        emailNotifications?: boolean | undefined;
        language?: string | undefined;
        timezone?: string | undefined;
        theme?: "light" | "dark" | "auto" | undefined;
        notificationsEnabled?: boolean | undefined;
    }>;
    department: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    status: AdminUserStatus;
    preferences: {
        emailNotifications: boolean;
        language: string;
        timezone: string;
        theme: "light" | "dark" | "auto";
        notificationsEnabled: boolean;
    };
    username: string;
    roles: string[];
    phone?: string | undefined;
    avatar?: string | undefined;
    department?: string | undefined;
    position?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    preferences: {
        emailNotifications?: boolean | undefined;
        language?: string | undefined;
        timezone?: string | undefined;
        theme?: "light" | "dark" | "auto" | undefined;
        notificationsEnabled?: boolean | undefined;
    };
    username: string;
    roles: string[];
    phone?: string | undefined;
    avatar?: string | undefined;
    status?: AdminUserStatus | undefined;
    department?: string | undefined;
    position?: string | undefined;
}>;
export declare const updateAdminUserSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    status: z.ZodOptional<z.ZodDefault<z.ZodNativeEnum<typeof AdminUserStatus>>>;
    preferences: z.ZodOptional<z.ZodObject<{
        language: z.ZodDefault<z.ZodString>;
        timezone: z.ZodDefault<z.ZodString>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
        notificationsEnabled: z.ZodDefault<z.ZodBoolean>;
        emailNotifications: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        emailNotifications: boolean;
        language: string;
        timezone: string;
        theme: "light" | "dark" | "auto";
        notificationsEnabled: boolean;
    }, {
        emailNotifications?: boolean | undefined;
        language?: string | undefined;
        timezone?: string | undefined;
        theme?: "light" | "dark" | "auto" | undefined;
        notificationsEnabled?: boolean | undefined;
    }>>;
    department: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    position: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    suspensionReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
    status?: AdminUserStatus | undefined;
    preferences?: {
        emailNotifications: boolean;
        language: string;
        timezone: string;
        theme: "light" | "dark" | "auto";
        notificationsEnabled: boolean;
    } | undefined;
    department?: string | undefined;
    username?: string | undefined;
    roles?: string[] | undefined;
    position?: string | undefined;
    suspensionReason?: string | undefined;
}, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
    status?: AdminUserStatus | undefined;
    preferences?: {
        emailNotifications?: boolean | undefined;
        language?: string | undefined;
        timezone?: string | undefined;
        theme?: "light" | "dark" | "auto" | undefined;
        notificationsEnabled?: boolean | undefined;
    } | undefined;
    department?: string | undefined;
    username?: string | undefined;
    roles?: string[] | undefined;
    position?: string | undefined;
    suspensionReason?: string | undefined;
}>;
export declare const propertyManagementSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodNativeEnum<typeof PropertyPublicationStatus>;
    reviewNotes: z.ZodOptional<z.ZodString>;
    rejectionReason: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    featuredUntil: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status: PropertyPublicationStatus;
    title: string;
    description: string;
    priority: number;
    tags?: string[] | undefined;
    reviewNotes?: string | undefined;
    rejectionReason?: string | undefined;
    categories?: string[] | undefined;
    featuredUntil?: Date | undefined;
}, {
    status: PropertyPublicationStatus;
    title: string;
    description: string;
    tags?: string[] | undefined;
    priority?: number | undefined;
    reviewNotes?: string | undefined;
    rejectionReason?: string | undefined;
    categories?: string[] | undefined;
    featuredUntil?: Date | undefined;
}>;
export declare const activityLogSchema: z.ZodObject<{
    activityType: z.ZodNativeEnum<typeof ActivityType>;
    description: z.ZodString;
    resourceType: z.ZodOptional<z.ZodString>;
    resourceId: z.ZodOptional<z.ZodString>;
    resourceName: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    level: z.ZodDefault<z.ZodNativeEnum<typeof LogLevel>>;
    success: z.ZodDefault<z.ZodBoolean>;
    errorMessage: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description: string;
    success: boolean;
    level: LogLevel;
    activityType: ActivityType;
    duration?: number | undefined;
    metadata?: Record<string, unknown> | undefined;
    errorMessage?: string | undefined;
    resourceType?: string | undefined;
    resourceId?: string | undefined;
    resourceName?: string | undefined;
}, {
    description: string;
    activityType: ActivityType;
    duration?: number | undefined;
    success?: boolean | undefined;
    metadata?: Record<string, unknown> | undefined;
    errorMessage?: string | undefined;
    level?: LogLevel | undefined;
    resourceType?: string | undefined;
    resourceId?: string | undefined;
    resourceName?: string | undefined;
}>;
export declare const systemConfigSchema: z.ZodObject<{
    category: z.ZodString;
    key: z.ZodString;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>]>;
    type: z.ZodEnum<["string", "number", "boolean", "json", "array"]>;
    description: z.ZodString;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    isEditable: z.ZodDefault<z.ZodBoolean>;
    validation: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
        pattern: z.ZodOptional<z.ZodString>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        options?: string[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
        required?: boolean | undefined;
        pattern?: string | undefined;
    }, {
        options?: string[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
        required?: boolean | undefined;
        pattern?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    type: "string" | "number" | "boolean" | "array" | "json";
    value: string | number | boolean | z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
    category: string;
    key: string;
    isPublic: boolean;
    isEditable: boolean;
    validation?: {
        options?: string[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
        required?: boolean | undefined;
        pattern?: string | undefined;
    } | undefined;
}, {
    description: string;
    type: "string" | "number" | "boolean" | "array" | "json";
    value: string | number | boolean | z.objectInputType<{}, z.ZodTypeAny, "passthrough">;
    category: string;
    key: string;
    validation?: {
        options?: string[] | undefined;
        min?: number | undefined;
        max?: number | undefined;
        required?: boolean | undefined;
        pattern?: string | undefined;
    } | undefined;
    isPublic?: boolean | undefined;
    isEditable?: boolean | undefined;
}>;
export declare const adminNotificationSchema: z.ZodObject<{
    type: z.ZodEnum<["info", "warning", "error", "success"]>;
    title: z.ZodString;
    message: z.ZodString;
    actionUrl: z.ZodOptional<z.ZodString>;
    actionText: z.ZodOptional<z.ZodString>;
    recipientRole: z.ZodOptional<z.ZodNativeEnum<typeof AdminRole>>;
    recipientUser: z.ZodOptional<z.ZodString>;
    isGlobal: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: "warning" | "info" | "error" | "success";
    message: string;
    priority: "low" | "high" | "urgent" | "medium";
    isGlobal: boolean;
    actionUrl?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    actionText?: string | undefined;
    recipientRole?: AdminRole | undefined;
    recipientUser?: string | undefined;
    expiresAt?: Date | undefined;
}, {
    title: string;
    type: "warning" | "info" | "error" | "success";
    message: string;
    actionUrl?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    priority?: "low" | "high" | "urgent" | "medium" | undefined;
    actionText?: string | undefined;
    recipientRole?: AdminRole | undefined;
    recipientUser?: string | undefined;
    isGlobal?: boolean | undefined;
    expiresAt?: Date | undefined;
}>;
export declare const systemReportSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<["users", "properties", "bookings", "financial", "activity", "custom"]>;
    parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    dateRange: z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        start: Date;
        end: Date;
    }, {
        start: Date;
        end: Date;
    }>;
    format: z.ZodDefault<z.ZodEnum<["json", "csv", "xlsx", "pdf"]>>;
    scheduledRun: z.ZodOptional<z.ZodObject<{
        frequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isActive: boolean;
        frequency: "weekly" | "monthly" | "daily";
    }, {
        frequency: "weekly" | "monthly" | "daily";
        isActive?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    type: "custom" | "users" | "properties" | "bookings" | "financial" | "activity";
    name: string;
    format: "pdf" | "csv" | "json" | "xlsx";
    dateRange: {
        start: Date;
        end: Date;
    };
    filters?: Record<string, unknown> | undefined;
    parameters?: Record<string, unknown> | undefined;
    scheduledRun?: {
        isActive: boolean;
        frequency: "weekly" | "monthly" | "daily";
    } | undefined;
}, {
    description: string;
    type: "custom" | "users" | "properties" | "bookings" | "financial" | "activity";
    name: string;
    dateRange: {
        start: Date;
        end: Date;
    };
    filters?: Record<string, unknown> | undefined;
    format?: "pdf" | "csv" | "json" | "xlsx" | undefined;
    parameters?: Record<string, unknown> | undefined;
    scheduledRun?: {
        frequency: "weekly" | "monthly" | "daily";
        isActive?: boolean | undefined;
    } | undefined;
}>;
export declare const dashboardWidgetSchema: z.ZodObject<{
    type: z.ZodEnum<["metric", "chart", "table", "list", "map"]>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    size: z.ZodDefault<z.ZodEnum<["small", "medium", "large", "full"]>>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
        width: number;
        height: number;
    }, {
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    dataSource: z.ZodString;
    refreshInterval: z.ZodOptional<z.ZodNumber>;
    permissions: z.ZodArray<z.ZodNativeEnum<typeof PermissionType>, "many">;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    permissions: PermissionType[];
    title: string;
    type: "map" | "metric" | "chart" | "table" | "list";
    isActive: boolean;
    size: "medium" | "small" | "large" | "full";
    config: Record<string, unknown>;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    dataSource: string;
    description?: string | undefined;
    refreshInterval?: number | undefined;
}, {
    permissions: PermissionType[];
    title: string;
    type: "map" | "metric" | "chart" | "table" | "list";
    config: Record<string, unknown>;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    dataSource: string;
    description?: string | undefined;
    isActive?: boolean | undefined;
    size?: "medium" | "small" | "large" | "full" | undefined;
    refreshInterval?: number | undefined;
}>;
export declare const dashboardConfigSchema: z.ZodObject<{
    name: z.ZodString;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    userId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<typeof AdminRole>>;
    widgets: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["metric", "chart", "table", "list", "map"]>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        size: z.ZodDefault<z.ZodEnum<["small", "medium", "large", "full"]>>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            width: number;
            height: number;
        }, {
            x: number;
            y: number;
            width: number;
            height: number;
        }>;
        config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        dataSource: z.ZodString;
        refreshInterval: z.ZodOptional<z.ZodNumber>;
        permissions: z.ZodArray<z.ZodNativeEnum<typeof PermissionType>, "many">;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        isActive: boolean;
        size: "medium" | "small" | "large" | "full";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        refreshInterval?: number | undefined;
    }, {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        isActive?: boolean | undefined;
        size?: "medium" | "small" | "large" | "full" | undefined;
        refreshInterval?: number | undefined;
    }>, "many">;
    layout: z.ZodDefault<z.ZodEnum<["grid", "flexible"]>>;
    theme: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
    autoRefresh: z.ZodDefault<z.ZodBoolean>;
    refreshInterval: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    theme: "light" | "dark";
    refreshInterval: number;
    isDefault: boolean;
    widgets: {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        isActive: boolean;
        size: "medium" | "small" | "large" | "full";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        refreshInterval?: number | undefined;
    }[];
    layout: "flexible" | "grid";
    autoRefresh: boolean;
    role?: AdminRole | undefined;
    userId?: string | undefined;
}, {
    name: string;
    widgets: {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        isActive?: boolean | undefined;
        size?: "medium" | "small" | "large" | "full" | undefined;
        refreshInterval?: number | undefined;
    }[];
    role?: AdminRole | undefined;
    userId?: string | undefined;
    theme?: "light" | "dark" | undefined;
    refreshInterval?: number | undefined;
    isDefault?: boolean | undefined;
    layout?: "flexible" | "grid" | undefined;
    autoRefresh?: boolean | undefined;
}>;
export declare const reportFiltersSchema: z.ZodObject<{
    dateRange: z.ZodOptional<z.ZodObject<{
        start: z.ZodDate;
        end: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        start: Date;
        end: Date;
    }, {
        start: Date;
        end: Date;
    }>>;
    userType: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof UserType>, "many">>;
    propertyType: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    location: z.ZodOptional<z.ZodObject<{
        country: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        city?: string | undefined;
        country?: string | undefined;
        state?: string | undefined;
    }, {
        city?: string | undefined;
        country?: string | undefined;
        state?: string | undefined;
    }>>;
    status: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    minValue: z.ZodOptional<z.ZodNumber>;
    maxValue: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    sortOrder: "asc" | "desc";
    offset: number;
    status?: string[] | undefined;
    location?: {
        city?: string | undefined;
        country?: string | undefined;
        state?: string | undefined;
    } | undefined;
    tags?: string[] | undefined;
    sortBy?: string | undefined;
    dateRange?: {
        start: Date;
        end: Date;
    } | undefined;
    propertyType?: string[] | undefined;
    userType?: UserType[] | undefined;
    minValue?: number | undefined;
    maxValue?: number | undefined;
}, {
    status?: string[] | undefined;
    location?: {
        city?: string | undefined;
        country?: string | undefined;
        state?: string | undefined;
    } | undefined;
    tags?: string[] | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    dateRange?: {
        start: Date;
        end: Date;
    } | undefined;
    propertyType?: string[] | undefined;
    userType?: UserType[] | undefined;
    minValue?: number | undefined;
    maxValue?: number | undefined;
    offset?: number | undefined;
}>;
export declare const adminSchemas: {
    permission: z.ZodObject<{
        type: z.ZodNativeEnum<typeof PermissionType>;
        name: z.ZodString;
        description: z.ZodString;
        resource: z.ZodOptional<z.ZodString>;
        scope: z.ZodOptional<z.ZodEnum<["global", "own", "department"]>>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        type: PermissionType;
        name: string;
        resource?: string | undefined;
        scope?: "global" | "own" | "department" | undefined;
    }, {
        description: string;
        type: PermissionType;
        name: string;
        resource?: string | undefined;
        scope?: "global" | "own" | "department" | undefined;
    }>;
    role: z.ZodObject<{
        name: z.ZodString;
        displayName: z.ZodString;
        description: z.ZodString;
        level: z.ZodNumber;
        permissions: z.ZodArray<z.ZodString, "many">;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        permissions: string[];
        description: string;
        isActive: boolean;
        name: string;
        displayName: string;
        level: number;
    }, {
        permissions: string[];
        description: string;
        name: string;
        displayName: string;
        level: number;
        isActive?: boolean | undefined;
    }>;
    adminUser: z.ZodObject<{
        username: z.ZodString;
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
        roles: z.ZodArray<z.ZodString, "many">;
        status: z.ZodDefault<z.ZodNativeEnum<typeof AdminUserStatus>>;
        preferences: z.ZodObject<{
            language: z.ZodDefault<z.ZodString>;
            timezone: z.ZodDefault<z.ZodString>;
            theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
            notificationsEnabled: z.ZodDefault<z.ZodBoolean>;
            emailNotifications: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            emailNotifications: boolean;
            language: string;
            timezone: string;
            theme: "light" | "dark" | "auto";
            notificationsEnabled: boolean;
        }, {
            emailNotifications?: boolean | undefined;
            language?: string | undefined;
            timezone?: string | undefined;
            theme?: "light" | "dark" | "auto" | undefined;
            notificationsEnabled?: boolean | undefined;
        }>;
        department: z.ZodOptional<z.ZodString>;
        position: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        firstName: string;
        lastName: string;
        status: AdminUserStatus;
        preferences: {
            emailNotifications: boolean;
            language: string;
            timezone: string;
            theme: "light" | "dark" | "auto";
            notificationsEnabled: boolean;
        };
        username: string;
        roles: string[];
        phone?: string | undefined;
        avatar?: string | undefined;
        department?: string | undefined;
        position?: string | undefined;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        preferences: {
            emailNotifications?: boolean | undefined;
            language?: string | undefined;
            timezone?: string | undefined;
            theme?: "light" | "dark" | "auto" | undefined;
            notificationsEnabled?: boolean | undefined;
        };
        username: string;
        roles: string[];
        phone?: string | undefined;
        avatar?: string | undefined;
        status?: AdminUserStatus | undefined;
        department?: string | undefined;
        position?: string | undefined;
    }>;
    updateAdminUser: z.ZodObject<{
        username: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodOptional<z.ZodDefault<z.ZodNativeEnum<typeof AdminUserStatus>>>;
        preferences: z.ZodOptional<z.ZodObject<{
            language: z.ZodDefault<z.ZodString>;
            timezone: z.ZodDefault<z.ZodString>;
            theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
            notificationsEnabled: z.ZodDefault<z.ZodBoolean>;
            emailNotifications: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            emailNotifications: boolean;
            language: string;
            timezone: string;
            theme: "light" | "dark" | "auto";
            notificationsEnabled: boolean;
        }, {
            emailNotifications?: boolean | undefined;
            language?: string | undefined;
            timezone?: string | undefined;
            theme?: "light" | "dark" | "auto" | undefined;
            notificationsEnabled?: boolean | undefined;
        }>>;
        department: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        position: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    } & {
        suspensionReason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
        status?: AdminUserStatus | undefined;
        preferences?: {
            emailNotifications: boolean;
            language: string;
            timezone: string;
            theme: "light" | "dark" | "auto";
            notificationsEnabled: boolean;
        } | undefined;
        department?: string | undefined;
        username?: string | undefined;
        roles?: string[] | undefined;
        position?: string | undefined;
        suspensionReason?: string | undefined;
    }, {
        email?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        avatar?: string | undefined;
        status?: AdminUserStatus | undefined;
        preferences?: {
            emailNotifications?: boolean | undefined;
            language?: string | undefined;
            timezone?: string | undefined;
            theme?: "light" | "dark" | "auto" | undefined;
            notificationsEnabled?: boolean | undefined;
        } | undefined;
        department?: string | undefined;
        username?: string | undefined;
        roles?: string[] | undefined;
        position?: string | undefined;
        suspensionReason?: string | undefined;
    }>;
    propertyManagement: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        status: z.ZodNativeEnum<typeof PropertyPublicationStatus>;
        reviewNotes: z.ZodOptional<z.ZodString>;
        rejectionReason: z.ZodOptional<z.ZodString>;
        priority: z.ZodDefault<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        featuredUntil: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        status: PropertyPublicationStatus;
        title: string;
        description: string;
        priority: number;
        tags?: string[] | undefined;
        reviewNotes?: string | undefined;
        rejectionReason?: string | undefined;
        categories?: string[] | undefined;
        featuredUntil?: Date | undefined;
    }, {
        status: PropertyPublicationStatus;
        title: string;
        description: string;
        tags?: string[] | undefined;
        priority?: number | undefined;
        reviewNotes?: string | undefined;
        rejectionReason?: string | undefined;
        categories?: string[] | undefined;
        featuredUntil?: Date | undefined;
    }>;
    activityLog: z.ZodObject<{
        activityType: z.ZodNativeEnum<typeof ActivityType>;
        description: z.ZodString;
        resourceType: z.ZodOptional<z.ZodString>;
        resourceId: z.ZodOptional<z.ZodString>;
        resourceName: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        level: z.ZodDefault<z.ZodNativeEnum<typeof LogLevel>>;
        success: z.ZodDefault<z.ZodBoolean>;
        errorMessage: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        success: boolean;
        level: LogLevel;
        activityType: ActivityType;
        duration?: number | undefined;
        metadata?: Record<string, unknown> | undefined;
        errorMessage?: string | undefined;
        resourceType?: string | undefined;
        resourceId?: string | undefined;
        resourceName?: string | undefined;
    }, {
        description: string;
        activityType: ActivityType;
        duration?: number | undefined;
        success?: boolean | undefined;
        metadata?: Record<string, unknown> | undefined;
        errorMessage?: string | undefined;
        level?: LogLevel | undefined;
        resourceType?: string | undefined;
        resourceId?: string | undefined;
        resourceName?: string | undefined;
    }>;
    systemConfig: z.ZodObject<{
        category: z.ZodString;
        key: z.ZodString;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>]>;
        type: z.ZodEnum<["string", "number", "boolean", "json", "array"]>;
        description: z.ZodString;
        isPublic: z.ZodDefault<z.ZodBoolean>;
        isEditable: z.ZodDefault<z.ZodBoolean>;
        validation: z.ZodOptional<z.ZodObject<{
            required: z.ZodOptional<z.ZodBoolean>;
            min: z.ZodOptional<z.ZodNumber>;
            max: z.ZodOptional<z.ZodNumber>;
            pattern: z.ZodOptional<z.ZodString>;
            options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            options?: string[] | undefined;
            min?: number | undefined;
            max?: number | undefined;
            required?: boolean | undefined;
            pattern?: string | undefined;
        }, {
            options?: string[] | undefined;
            min?: number | undefined;
            max?: number | undefined;
            required?: boolean | undefined;
            pattern?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        type: "string" | "number" | "boolean" | "array" | "json";
        value: string | number | boolean | z.objectOutputType<{}, z.ZodTypeAny, "passthrough">;
        category: string;
        key: string;
        isPublic: boolean;
        isEditable: boolean;
        validation?: {
            options?: string[] | undefined;
            min?: number | undefined;
            max?: number | undefined;
            required?: boolean | undefined;
            pattern?: string | undefined;
        } | undefined;
    }, {
        description: string;
        type: "string" | "number" | "boolean" | "array" | "json";
        value: string | number | boolean | z.objectInputType<{}, z.ZodTypeAny, "passthrough">;
        category: string;
        key: string;
        validation?: {
            options?: string[] | undefined;
            min?: number | undefined;
            max?: number | undefined;
            required?: boolean | undefined;
            pattern?: string | undefined;
        } | undefined;
        isPublic?: boolean | undefined;
        isEditable?: boolean | undefined;
    }>;
    adminNotification: z.ZodObject<{
        type: z.ZodEnum<["info", "warning", "error", "success"]>;
        title: z.ZodString;
        message: z.ZodString;
        actionUrl: z.ZodOptional<z.ZodString>;
        actionText: z.ZodOptional<z.ZodString>;
        recipientRole: z.ZodOptional<z.ZodNativeEnum<typeof AdminRole>>;
        recipientUser: z.ZodOptional<z.ZodString>;
        isGlobal: z.ZodDefault<z.ZodBoolean>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
        expiresAt: z.ZodOptional<z.ZodDate>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        type: "warning" | "info" | "error" | "success";
        message: string;
        priority: "low" | "high" | "urgent" | "medium";
        isGlobal: boolean;
        actionUrl?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        actionText?: string | undefined;
        recipientRole?: AdminRole | undefined;
        recipientUser?: string | undefined;
        expiresAt?: Date | undefined;
    }, {
        title: string;
        type: "warning" | "info" | "error" | "success";
        message: string;
        actionUrl?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        priority?: "low" | "high" | "urgent" | "medium" | undefined;
        actionText?: string | undefined;
        recipientRole?: AdminRole | undefined;
        recipientUser?: string | undefined;
        isGlobal?: boolean | undefined;
        expiresAt?: Date | undefined;
    }>;
    systemReport: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        type: z.ZodEnum<["users", "properties", "bookings", "financial", "activity", "custom"]>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        dateRange: z.ZodObject<{
            start: z.ZodDate;
            end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            start: Date;
            end: Date;
        }, {
            start: Date;
            end: Date;
        }>;
        format: z.ZodDefault<z.ZodEnum<["json", "csv", "xlsx", "pdf"]>>;
        scheduledRun: z.ZodOptional<z.ZodObject<{
            frequency: z.ZodEnum<["daily", "weekly", "monthly"]>;
            isActive: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            isActive: boolean;
            frequency: "weekly" | "monthly" | "daily";
        }, {
            frequency: "weekly" | "monthly" | "daily";
            isActive?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        type: "custom" | "users" | "properties" | "bookings" | "financial" | "activity";
        name: string;
        format: "pdf" | "csv" | "json" | "xlsx";
        dateRange: {
            start: Date;
            end: Date;
        };
        filters?: Record<string, unknown> | undefined;
        parameters?: Record<string, unknown> | undefined;
        scheduledRun?: {
            isActive: boolean;
            frequency: "weekly" | "monthly" | "daily";
        } | undefined;
    }, {
        description: string;
        type: "custom" | "users" | "properties" | "bookings" | "financial" | "activity";
        name: string;
        dateRange: {
            start: Date;
            end: Date;
        };
        filters?: Record<string, unknown> | undefined;
        format?: "pdf" | "csv" | "json" | "xlsx" | undefined;
        parameters?: Record<string, unknown> | undefined;
        scheduledRun?: {
            frequency: "weekly" | "monthly" | "daily";
            isActive?: boolean | undefined;
        } | undefined;
    }>;
    reportFilters: z.ZodObject<{
        dateRange: z.ZodOptional<z.ZodObject<{
            start: z.ZodDate;
            end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            start: Date;
            end: Date;
        }, {
            start: Date;
            end: Date;
        }>>;
        userType: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof UserType>, "many">>;
        propertyType: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        location: z.ZodOptional<z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            country?: string | undefined;
            state?: string | undefined;
        }, {
            city?: string | undefined;
            country?: string | undefined;
            state?: string | undefined;
        }>>;
        status: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        minValue: z.ZodOptional<z.ZodNumber>;
        maxValue: z.ZodOptional<z.ZodNumber>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        sortOrder: "asc" | "desc";
        offset: number;
        status?: string[] | undefined;
        location?: {
            city?: string | undefined;
            country?: string | undefined;
            state?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        sortBy?: string | undefined;
        dateRange?: {
            start: Date;
            end: Date;
        } | undefined;
        propertyType?: string[] | undefined;
        userType?: UserType[] | undefined;
        minValue?: number | undefined;
        maxValue?: number | undefined;
    }, {
        status?: string[] | undefined;
        location?: {
            city?: string | undefined;
            country?: string | undefined;
            state?: string | undefined;
        } | undefined;
        tags?: string[] | undefined;
        limit?: number | undefined;
        sortBy?: string | undefined;
        sortOrder?: "asc" | "desc" | undefined;
        dateRange?: {
            start: Date;
            end: Date;
        } | undefined;
        propertyType?: string[] | undefined;
        userType?: UserType[] | undefined;
        minValue?: number | undefined;
        maxValue?: number | undefined;
        offset?: number | undefined;
    }>;
    dashboardWidget: z.ZodObject<{
        type: z.ZodEnum<["metric", "chart", "table", "list", "map"]>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        size: z.ZodDefault<z.ZodEnum<["small", "medium", "large", "full"]>>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            width: number;
            height: number;
        }, {
            x: number;
            y: number;
            width: number;
            height: number;
        }>;
        config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        dataSource: z.ZodString;
        refreshInterval: z.ZodOptional<z.ZodNumber>;
        permissions: z.ZodArray<z.ZodNativeEnum<typeof PermissionType>, "many">;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        isActive: boolean;
        size: "medium" | "small" | "large" | "full";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        refreshInterval?: number | undefined;
    }, {
        permissions: PermissionType[];
        title: string;
        type: "map" | "metric" | "chart" | "table" | "list";
        config: Record<string, unknown>;
        position: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        dataSource: string;
        description?: string | undefined;
        isActive?: boolean | undefined;
        size?: "medium" | "small" | "large" | "full" | undefined;
        refreshInterval?: number | undefined;
    }>;
    dashboardConfig: z.ZodObject<{
        name: z.ZodString;
        isDefault: z.ZodDefault<z.ZodBoolean>;
        userId: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodNativeEnum<typeof AdminRole>>;
        widgets: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["metric", "chart", "table", "list", "map"]>;
            title: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            size: z.ZodDefault<z.ZodEnum<["small", "medium", "large", "full"]>>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                width: number;
                height: number;
            }, {
                x: number;
                y: number;
                width: number;
                height: number;
            }>;
            config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            dataSource: z.ZodString;
            refreshInterval: z.ZodOptional<z.ZodNumber>;
            permissions: z.ZodArray<z.ZodNativeEnum<typeof PermissionType>, "many">;
            isActive: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            permissions: PermissionType[];
            title: string;
            type: "map" | "metric" | "chart" | "table" | "list";
            isActive: boolean;
            size: "medium" | "small" | "large" | "full";
            config: Record<string, unknown>;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            dataSource: string;
            description?: string | undefined;
            refreshInterval?: number | undefined;
        }, {
            permissions: PermissionType[];
            title: string;
            type: "map" | "metric" | "chart" | "table" | "list";
            config: Record<string, unknown>;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            dataSource: string;
            description?: string | undefined;
            isActive?: boolean | undefined;
            size?: "medium" | "small" | "large" | "full" | undefined;
            refreshInterval?: number | undefined;
        }>, "many">;
        layout: z.ZodDefault<z.ZodEnum<["grid", "flexible"]>>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark"]>>;
        autoRefresh: z.ZodDefault<z.ZodBoolean>;
        refreshInterval: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        theme: "light" | "dark";
        refreshInterval: number;
        isDefault: boolean;
        widgets: {
            permissions: PermissionType[];
            title: string;
            type: "map" | "metric" | "chart" | "table" | "list";
            isActive: boolean;
            size: "medium" | "small" | "large" | "full";
            config: Record<string, unknown>;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            dataSource: string;
            description?: string | undefined;
            refreshInterval?: number | undefined;
        }[];
        layout: "flexible" | "grid";
        autoRefresh: boolean;
        role?: AdminRole | undefined;
        userId?: string | undefined;
    }, {
        name: string;
        widgets: {
            permissions: PermissionType[];
            title: string;
            type: "map" | "metric" | "chart" | "table" | "list";
            config: Record<string, unknown>;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            dataSource: string;
            description?: string | undefined;
            isActive?: boolean | undefined;
            size?: "medium" | "small" | "large" | "full" | undefined;
            refreshInterval?: number | undefined;
        }[];
        role?: AdminRole | undefined;
        userId?: string | undefined;
        theme?: "light" | "dark" | undefined;
        refreshInterval?: number | undefined;
        isDefault?: boolean | undefined;
        layout?: "flexible" | "grid" | undefined;
        autoRefresh?: boolean | undefined;
    }>;
};
export type PermissionInput = z.infer<typeof permissionSchema>;
export type RoleInput = z.infer<typeof roleSchema>;
export type AdminUserInput = z.infer<typeof adminUserSchema>;
export type UpdateAdminUserInput = z.infer<typeof updateAdminUserSchema>;
export type PropertyManagementInput = z.infer<typeof propertyManagementSchema>;
export type ActivityLogInput = z.infer<typeof activityLogSchema>;
export type SystemConfigInput = z.infer<typeof systemConfigSchema>;
export type AdminNotificationInput = z.infer<typeof adminNotificationSchema>;
export type SystemReportInput = z.infer<typeof systemReportSchema>;
export type DashboardWidgetInput = z.infer<typeof dashboardWidgetSchema>;
export type DashboardConfigInput = z.infer<typeof dashboardConfigSchema>;
export type ReportFiltersInput = z.infer<typeof reportFiltersSchema>;
export declare const notificationSchema: z.ZodObject<{
    userId: z.ZodString;
    type: z.ZodNativeEnum<typeof NotificationType>;
    title: z.ZodString;
    message: z.ZodString;
    channel: z.ZodNativeEnum<typeof NotificationChannel>;
    priority: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    imageUrl: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    deepLink: z.ZodOptional<z.ZodString>;
    scheduledFor: z.ZodOptional<z.ZodDate>;
    expiresAt: z.ZodOptional<z.ZodDate>;
    maxRetries: z.ZodDefault<z.ZodNumber>;
    sourceId: z.ZodOptional<z.ZodString>;
    sourceType: z.ZodOptional<z.ZodString>;
    relatedEntityId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: NotificationType;
    message: string;
    userId: string;
    priority: NotificationPriority;
    channel: NotificationChannel;
    maxRetries: number;
    actionUrl?: string | undefined;
    data?: Record<string, unknown> | undefined;
    scheduledFor?: Date | undefined;
    expiresAt?: Date | undefined;
    imageUrl?: string | undefined;
    deepLink?: string | undefined;
    sourceId?: string | undefined;
    sourceType?: string | undefined;
    relatedEntityId?: string | undefined;
}, {
    title: string;
    type: NotificationType;
    message: string;
    userId: string;
    channel: NotificationChannel;
    actionUrl?: string | undefined;
    data?: Record<string, unknown> | undefined;
    priority?: NotificationPriority | undefined;
    scheduledFor?: Date | undefined;
    expiresAt?: Date | undefined;
    imageUrl?: string | undefined;
    deepLink?: string | undefined;
    maxRetries?: number | undefined;
    sourceId?: string | undefined;
    sourceType?: string | undefined;
    relatedEntityId?: string | undefined;
}>;
export declare const pushNotificationSchema: z.ZodObject<{
    notificationId: z.ZodString;
    deviceToken: z.ZodString;
    platform: z.ZodNativeEnum<typeof DevicePlatform>;
    badge: z.ZodOptional<z.ZodNumber>;
    sound: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    threadId: z.ZodOptional<z.ZodString>;
    iosPayload: z.ZodOptional<z.ZodObject<{
        alert: z.ZodObject<{
            title: z.ZodString;
            body: z.ZodString;
            subtitle: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            body: string;
            subtitle?: string | undefined;
        }, {
            title: string;
            body: string;
            subtitle?: string | undefined;
        }>;
        badge: z.ZodOptional<z.ZodNumber>;
        sound: z.ZodOptional<z.ZodString>;
        'mutable-content': z.ZodOptional<z.ZodNumber>;
        'content-available': z.ZodOptional<z.ZodNumber>;
        category: z.ZodOptional<z.ZodString>;
        'thread-id': z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        alert: {
            title: string;
            body: string;
            subtitle?: string | undefined;
        };
        category?: string | undefined;
        badge?: number | undefined;
        sound?: string | undefined;
        'mutable-content'?: number | undefined;
        'content-available'?: number | undefined;
        'thread-id'?: string | undefined;
    }, {
        alert: {
            title: string;
            body: string;
            subtitle?: string | undefined;
        };
        category?: string | undefined;
        badge?: number | undefined;
        sound?: string | undefined;
        'mutable-content'?: number | undefined;
        'content-available'?: number | undefined;
        'thread-id'?: string | undefined;
    }>>;
    androidPayload: z.ZodOptional<z.ZodObject<{
        notification: z.ZodObject<{
            title: z.ZodString;
            body: z.ZodString;
            icon: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
            sound: z.ZodOptional<z.ZodString>;
            tag: z.ZodOptional<z.ZodString>;
            click_action: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        }, {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        }>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        priority: z.ZodOptional<z.ZodEnum<["normal", "high"]>>;
        time_to_live: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        notification: {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        };
        data?: Record<string, string> | undefined;
        priority?: "normal" | "high" | undefined;
        time_to_live?: number | undefined;
    }, {
        notification: {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        };
        data?: Record<string, string> | undefined;
        priority?: "normal" | "high" | undefined;
        time_to_live?: number | undefined;
    }>>;
    webPayload: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        badge: z.ZodOptional<z.ZodString>;
        tag: z.ZodOptional<z.ZodString>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            action: z.ZodString;
            title: z.ZodString;
            icon: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            action: string;
            icon?: string | undefined;
        }, {
            title: string;
            action: string;
            icon?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        body: string;
        icon?: string | undefined;
        image?: string | undefined;
        data?: Record<string, unknown> | undefined;
        badge?: string | undefined;
        tag?: string | undefined;
        actions?: {
            title: string;
            action: string;
            icon?: string | undefined;
        }[] | undefined;
    }, {
        title: string;
        body: string;
        icon?: string | undefined;
        image?: string | undefined;
        data?: Record<string, unknown> | undefined;
        badge?: string | undefined;
        tag?: string | undefined;
        actions?: {
            title: string;
            action: string;
            icon?: string | undefined;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    platform: DevicePlatform;
    notificationId: string;
    deviceToken: string;
    category?: string | undefined;
    badge?: number | undefined;
    sound?: string | undefined;
    threadId?: string | undefined;
    iosPayload?: {
        alert: {
            title: string;
            body: string;
            subtitle?: string | undefined;
        };
        category?: string | undefined;
        badge?: number | undefined;
        sound?: string | undefined;
        'mutable-content'?: number | undefined;
        'content-available'?: number | undefined;
        'thread-id'?: string | undefined;
    } | undefined;
    androidPayload?: {
        notification: {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        };
        data?: Record<string, string> | undefined;
        priority?: "normal" | "high" | undefined;
        time_to_live?: number | undefined;
    } | undefined;
    webPayload?: {
        title: string;
        body: string;
        icon?: string | undefined;
        image?: string | undefined;
        data?: Record<string, unknown> | undefined;
        badge?: string | undefined;
        tag?: string | undefined;
        actions?: {
            title: string;
            action: string;
            icon?: string | undefined;
        }[] | undefined;
    } | undefined;
}, {
    platform: DevicePlatform;
    notificationId: string;
    deviceToken: string;
    category?: string | undefined;
    badge?: number | undefined;
    sound?: string | undefined;
    threadId?: string | undefined;
    iosPayload?: {
        alert: {
            title: string;
            body: string;
            subtitle?: string | undefined;
        };
        category?: string | undefined;
        badge?: number | undefined;
        sound?: string | undefined;
        'mutable-content'?: number | undefined;
        'content-available'?: number | undefined;
        'thread-id'?: string | undefined;
    } | undefined;
    androidPayload?: {
        notification: {
            title: string;
            body: string;
            icon?: string | undefined;
            sound?: string | undefined;
            color?: string | undefined;
            tag?: string | undefined;
            click_action?: string | undefined;
        };
        data?: Record<string, string> | undefined;
        priority?: "normal" | "high" | undefined;
        time_to_live?: number | undefined;
    } | undefined;
    webPayload?: {
        title: string;
        body: string;
        icon?: string | undefined;
        image?: string | undefined;
        data?: Record<string, unknown> | undefined;
        badge?: string | undefined;
        tag?: string | undefined;
        actions?: {
            title: string;
            action: string;
            icon?: string | undefined;
        }[] | undefined;
    } | undefined;
}>;
export declare const userDeviceSchema: z.ZodObject<{
    userId: z.ZodString;
    deviceToken: z.ZodString;
    platform: z.ZodNativeEnum<typeof DevicePlatform>;
    deviceId: z.ZodString;
    deviceName: z.ZodString;
    appVersion: z.ZodString;
    osVersion: z.ZodString;
    pushSettings: z.ZodObject<{
        soundEnabled: z.ZodDefault<z.ZodBoolean>;
        vibrateEnabled: z.ZodDefault<z.ZodBoolean>;
        badgeEnabled: z.ZodDefault<z.ZodBoolean>;
        alertStyle: z.ZodDefault<z.ZodEnum<["banner", "alert", "none"]>>;
    }, "strip", z.ZodTypeAny, {
        soundEnabled: boolean;
        vibrateEnabled: boolean;
        badgeEnabled: boolean;
        alertStyle: "none" | "banner" | "alert";
    }, {
        soundEnabled?: boolean | undefined;
        vibrateEnabled?: boolean | undefined;
        badgeEnabled?: boolean | undefined;
        alertStyle?: "none" | "banner" | "alert" | undefined;
    }>;
    timezone: z.ZodString;
    language: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    platform: DevicePlatform;
    language: string;
    timezone: string;
    deviceToken: string;
    deviceId: string;
    deviceName: string;
    appVersion: string;
    osVersion: string;
    pushSettings: {
        soundEnabled: boolean;
        vibrateEnabled: boolean;
        badgeEnabled: boolean;
        alertStyle: "none" | "banner" | "alert";
    };
}, {
    userId: string;
    platform: DevicePlatform;
    language: string;
    timezone: string;
    deviceToken: string;
    deviceId: string;
    deviceName: string;
    appVersion: string;
    osVersion: string;
    pushSettings: {
        soundEnabled?: boolean | undefined;
        vibrateEnabled?: boolean | undefined;
        badgeEnabled?: boolean | undefined;
        alertStyle?: "none" | "banner" | "alert" | undefined;
    };
}>;
export declare const userNotificationPreferencesSchema: z.ZodObject<{
    userId: z.ZodString;
    globalEnabled: z.ZodDefault<z.ZodBoolean>;
    quietHoursEnabled: z.ZodDefault<z.ZodBoolean>;
    quietHoursStart: z.ZodDefault<z.ZodString>;
    quietHoursEnd: z.ZodDefault<z.ZodString>;
    timezone: z.ZodString;
    typePreferences: z.ZodOptional<z.ZodRecord<z.ZodNativeEnum<typeof NotificationType>, z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        channels: z.ZodArray<z.ZodNativeEnum<typeof NotificationChannel>, "many">;
        priority: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
        frequency: z.ZodDefault<z.ZodEnum<["immediate", "hourly", "daily", "weekly"]>>;
        soundEnabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        channels: NotificationChannel[];
        priority: NotificationPriority;
        frequency: "weekly" | "daily" | "immediate" | "hourly";
        soundEnabled: boolean;
        enabled: boolean;
    }, {
        channels: NotificationChannel[];
        priority?: NotificationPriority | undefined;
        frequency?: "weekly" | "daily" | "immediate" | "hourly" | undefined;
        soundEnabled?: boolean | undefined;
        enabled?: boolean | undefined;
    }>>>;
    channelPreferences: z.ZodOptional<z.ZodRecord<z.ZodNativeEnum<typeof NotificationChannel>, z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        maxDailyLimit: z.ZodOptional<z.ZodNumber>;
        minIntervalMinutes: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        maxDailyLimit?: number | undefined;
        minIntervalMinutes?: number | undefined;
    }, {
        enabled?: boolean | undefined;
        maxDailyLimit?: number | undefined;
        minIntervalMinutes?: number | undefined;
    }>>>;
    filters: z.ZodOptional<z.ZodObject<{
        mutedUsers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        mutedProperties: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        mutedKeywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        priorityThreshold: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
    }, "strip", z.ZodTypeAny, {
        mutedUsers: string[];
        mutedProperties: string[];
        mutedKeywords: string[];
        priorityThreshold: NotificationPriority;
    }, {
        mutedUsers?: string[] | undefined;
        mutedProperties?: string[] | undefined;
        mutedKeywords?: string[] | undefined;
        priorityThreshold?: NotificationPriority | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    timezone: string;
    globalEnabled: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
    filters?: {
        mutedUsers: string[];
        mutedProperties: string[];
        mutedKeywords: string[];
        priorityThreshold: NotificationPriority;
    } | undefined;
    typePreferences?: Partial<Record<NotificationType, {
        channels: NotificationChannel[];
        priority: NotificationPriority;
        frequency: "weekly" | "daily" | "immediate" | "hourly";
        soundEnabled: boolean;
        enabled: boolean;
    }>> | undefined;
    channelPreferences?: Partial<Record<NotificationChannel, {
        enabled: boolean;
        maxDailyLimit?: number | undefined;
        minIntervalMinutes?: number | undefined;
    }>> | undefined;
}, {
    userId: string;
    timezone: string;
    filters?: {
        mutedUsers?: string[] | undefined;
        mutedProperties?: string[] | undefined;
        mutedKeywords?: string[] | undefined;
        priorityThreshold?: NotificationPriority | undefined;
    } | undefined;
    globalEnabled?: boolean | undefined;
    quietHoursEnabled?: boolean | undefined;
    quietHoursStart?: string | undefined;
    quietHoursEnd?: string | undefined;
    typePreferences?: Partial<Record<NotificationType, {
        channels: NotificationChannel[];
        priority?: NotificationPriority | undefined;
        frequency?: "weekly" | "daily" | "immediate" | "hourly" | undefined;
        soundEnabled?: boolean | undefined;
        enabled?: boolean | undefined;
    }>> | undefined;
    channelPreferences?: Partial<Record<NotificationChannel, {
        enabled?: boolean | undefined;
        maxDailyLimit?: number | undefined;
        minIntervalMinutes?: number | undefined;
    }>> | undefined;
}>;
export declare const notificationTemplateSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof NotificationType>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    templates: z.ZodRecord<z.ZodString, z.ZodObject<{
        title: z.ZodString;
        message: z.ZodString;
        emailSubject: z.ZodOptional<z.ZodString>;
        emailBody: z.ZodOptional<z.ZodString>;
        smsText: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        message: string;
        emailSubject?: string | undefined;
        emailBody?: string | undefined;
        smsText?: string | undefined;
    }, {
        title: string;
        message: string;
        emailSubject?: string | undefined;
        emailBody?: string | undefined;
        smsText?: string | undefined;
    }>>;
    defaultChannel: z.ZodNativeEnum<typeof NotificationChannel>;
    defaultPriority: z.ZodDefault<z.ZodNativeEnum<typeof NotificationPriority>>;
    expirationHours: z.ZodOptional<z.ZodNumber>;
    maxRetries: z.ZodDefault<z.ZodNumber>;
    variables: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["string", "number", "date", "boolean"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        type: "string" | "number" | "boolean" | "date";
        name: string;
        required: boolean;
    }, {
        description: string;
        type: "string" | "number" | "boolean" | "date";
        name: string;
        required?: boolean | undefined;
    }>, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: NotificationType;
    isActive: boolean;
    name: string;
    maxRetries: number;
    templates: Record<string, {
        title: string;
        message: string;
        emailSubject?: string | undefined;
        emailBody?: string | undefined;
        smsText?: string | undefined;
    }>;
    defaultChannel: NotificationChannel;
    defaultPriority: NotificationPriority;
    variables: {
        description: string;
        type: "string" | "number" | "boolean" | "date";
        name: string;
        required: boolean;
    }[];
    description?: string | undefined;
    expirationHours?: number | undefined;
}, {
    type: NotificationType;
    name: string;
    templates: Record<string, {
        title: string;
        message: string;
        emailSubject?: string | undefined;
        emailBody?: string | undefined;
        smsText?: string | undefined;
    }>;
    defaultChannel: NotificationChannel;
    description?: string | undefined;
    isActive?: boolean | undefined;
    maxRetries?: number | undefined;
    defaultPriority?: NotificationPriority | undefined;
    expirationHours?: number | undefined;
    variables?: {
        description: string;
        type: "string" | "number" | "boolean" | "date";
        name: string;
        required?: boolean | undefined;
    }[] | undefined;
}>;
export declare const notificationSystemConfigSchema: z.ZodObject<{
    providers: z.ZodObject<{
        push: z.ZodObject<{
            firebase: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                serverKey: z.ZodOptional<z.ZodString>;
                senderId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            }>;
            apns: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                keyId: z.ZodOptional<z.ZodString>;
                teamId: z.ZodOptional<z.ZodString>;
                bundleId: z.ZodOptional<z.ZodString>;
                certPath: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            firebase: {
                enabled: boolean;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled: boolean;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        }, {
            firebase: {
                enabled?: boolean | undefined;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled?: boolean | undefined;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        }>;
        email: z.ZodObject<{
            smtp: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                host: z.ZodOptional<z.ZodString>;
                port: z.ZodOptional<z.ZodNumber>;
                secure: z.ZodDefault<z.ZodBoolean>;
                user: z.ZodOptional<z.ZodString>;
                password: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                secure: boolean;
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                port?: number | undefined;
            }, {
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                enabled?: boolean | undefined;
                port?: number | undefined;
                secure?: boolean | undefined;
            }>;
            sendgrid: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                apiKey: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                apiKey?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                apiKey?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            smtp: {
                enabled: boolean;
                secure: boolean;
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                port?: number | undefined;
            };
            sendgrid: {
                enabled: boolean;
                apiKey?: string | undefined;
            };
        }, {
            smtp: {
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                enabled?: boolean | undefined;
                port?: number | undefined;
                secure?: boolean | undefined;
            };
            sendgrid: {
                enabled?: boolean | undefined;
                apiKey?: string | undefined;
            };
        }>;
        sms: z.ZodObject<{
            twilio: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                accountSid: z.ZodOptional<z.ZodString>;
                authToken: z.ZodOptional<z.ZodString>;
                fromNumber: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        }, {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        }>;
        whatsapp: z.ZodObject<{
            twilio: z.ZodObject<{
                enabled: z.ZodDefault<z.ZodBoolean>;
                accountSid: z.ZodOptional<z.ZodString>;
                authToken: z.ZodOptional<z.ZodString>;
                fromNumber: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            }, {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        }, {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        email: {
            smtp: {
                enabled: boolean;
                secure: boolean;
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                port?: number | undefined;
            };
            sendgrid: {
                enabled: boolean;
                apiKey?: string | undefined;
            };
        };
        whatsapp: {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
        push: {
            firebase: {
                enabled: boolean;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled: boolean;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        };
        sms: {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
    }, {
        email: {
            smtp: {
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                enabled?: boolean | undefined;
                port?: number | undefined;
                secure?: boolean | undefined;
            };
            sendgrid: {
                enabled?: boolean | undefined;
                apiKey?: string | undefined;
            };
        };
        whatsapp: {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
        push: {
            firebase: {
                enabled?: boolean | undefined;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled?: boolean | undefined;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        };
        sms: {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
    }>;
    rateLimits: z.ZodObject<{
        perUser: z.ZodObject<{
            hourly: z.ZodDefault<z.ZodNumber>;
            daily: z.ZodDefault<z.ZodNumber>;
            monthly: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            monthly: number;
            daily: number;
            hourly: number;
        }, {
            monthly?: number | undefined;
            daily?: number | undefined;
            hourly?: number | undefined;
        }>;
        global: z.ZodObject<{
            perSecond: z.ZodDefault<z.ZodNumber>;
            perMinute: z.ZodDefault<z.ZodNumber>;
            perHour: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            perSecond: number;
            perMinute: number;
            perHour: number;
        }, {
            perSecond?: number | undefined;
            perMinute?: number | undefined;
            perHour?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        global: {
            perSecond: number;
            perMinute: number;
            perHour: number;
        };
        perUser: {
            monthly: number;
            daily: number;
            hourly: number;
        };
    }, {
        global: {
            perSecond?: number | undefined;
            perMinute?: number | undefined;
            perHour?: number | undefined;
        };
        perUser: {
            monthly?: number | undefined;
            daily?: number | undefined;
            hourly?: number | undefined;
        };
    }>;
    retryConfig: z.ZodObject<{
        maxRetries: z.ZodDefault<z.ZodNumber>;
        initialDelay: z.ZodDefault<z.ZodNumber>;
        backoffMultiplier: z.ZodDefault<z.ZodNumber>;
        maxDelay: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxRetries: number;
        initialDelay: number;
        backoffMultiplier: number;
        maxDelay: number;
    }, {
        maxRetries?: number | undefined;
        initialDelay?: number | undefined;
        backoffMultiplier?: number | undefined;
        maxDelay?: number | undefined;
    }>;
    cleanupConfig: z.ZodObject<{
        deleteReadAfterDays: z.ZodDefault<z.ZodNumber>;
        deleteUnreadAfterDays: z.ZodDefault<z.ZodNumber>;
        deleteFailedAfterDays: z.ZodDefault<z.ZodNumber>;
        archiveAfterDays: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        deleteReadAfterDays: number;
        deleteUnreadAfterDays: number;
        deleteFailedAfterDays: number;
        archiveAfterDays: number;
    }, {
        deleteReadAfterDays?: number | undefined;
        deleteUnreadAfterDays?: number | undefined;
        deleteFailedAfterDays?: number | undefined;
        archiveAfterDays?: number | undefined;
    }>;
    features: z.ZodObject<{
        batchingEnabled: z.ZodDefault<z.ZodBoolean>;
        schedulingEnabled: z.ZodDefault<z.ZodBoolean>;
        templatingEnabled: z.ZodDefault<z.ZodBoolean>;
        analyticsEnabled: z.ZodDefault<z.ZodBoolean>;
        a11yEnabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        batchingEnabled: boolean;
        schedulingEnabled: boolean;
        templatingEnabled: boolean;
        analyticsEnabled: boolean;
        a11yEnabled: boolean;
    }, {
        batchingEnabled?: boolean | undefined;
        schedulingEnabled?: boolean | undefined;
        templatingEnabled?: boolean | undefined;
        analyticsEnabled?: boolean | undefined;
        a11yEnabled?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    features: {
        batchingEnabled: boolean;
        schedulingEnabled: boolean;
        templatingEnabled: boolean;
        analyticsEnabled: boolean;
        a11yEnabled: boolean;
    };
    providers: {
        email: {
            smtp: {
                enabled: boolean;
                secure: boolean;
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                port?: number | undefined;
            };
            sendgrid: {
                enabled: boolean;
                apiKey?: string | undefined;
            };
        };
        whatsapp: {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
        push: {
            firebase: {
                enabled: boolean;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled: boolean;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        };
        sms: {
            twilio: {
                enabled: boolean;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
    };
    rateLimits: {
        global: {
            perSecond: number;
            perMinute: number;
            perHour: number;
        };
        perUser: {
            monthly: number;
            daily: number;
            hourly: number;
        };
    };
    retryConfig: {
        maxRetries: number;
        initialDelay: number;
        backoffMultiplier: number;
        maxDelay: number;
    };
    cleanupConfig: {
        deleteReadAfterDays: number;
        deleteUnreadAfterDays: number;
        deleteFailedAfterDays: number;
        archiveAfterDays: number;
    };
}, {
    features: {
        batchingEnabled?: boolean | undefined;
        schedulingEnabled?: boolean | undefined;
        templatingEnabled?: boolean | undefined;
        analyticsEnabled?: boolean | undefined;
        a11yEnabled?: boolean | undefined;
    };
    providers: {
        email: {
            smtp: {
                user?: string | undefined;
                password?: string | undefined;
                host?: string | undefined;
                enabled?: boolean | undefined;
                port?: number | undefined;
                secure?: boolean | undefined;
            };
            sendgrid: {
                enabled?: boolean | undefined;
                apiKey?: string | undefined;
            };
        };
        whatsapp: {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
        push: {
            firebase: {
                enabled?: boolean | undefined;
                serverKey?: string | undefined;
                senderId?: string | undefined;
            };
            apns: {
                enabled?: boolean | undefined;
                keyId?: string | undefined;
                teamId?: string | undefined;
                bundleId?: string | undefined;
                certPath?: string | undefined;
            };
        };
        sms: {
            twilio: {
                enabled?: boolean | undefined;
                accountSid?: string | undefined;
                authToken?: string | undefined;
                fromNumber?: string | undefined;
            };
        };
    };
    rateLimits: {
        global: {
            perSecond?: number | undefined;
            perMinute?: number | undefined;
            perHour?: number | undefined;
        };
        perUser: {
            monthly?: number | undefined;
            daily?: number | undefined;
            hourly?: number | undefined;
        };
    };
    retryConfig: {
        maxRetries?: number | undefined;
        initialDelay?: number | undefined;
        backoffMultiplier?: number | undefined;
        maxDelay?: number | undefined;
    };
    cleanupConfig: {
        deleteReadAfterDays?: number | undefined;
        deleteUnreadAfterDays?: number | undefined;
        deleteFailedAfterDays?: number | undefined;
        archiveAfterDays?: number | undefined;
    };
}>;
export type NotificationInput = z.infer<typeof notificationSchema>;
export type PushNotificationInput = z.infer<typeof pushNotificationSchema>;
export type UserDeviceInput = z.infer<typeof userDeviceSchema>;
export type UserNotificationPreferencesInput = z.infer<typeof userNotificationPreferencesSchema>;
export type NotificationTemplateInput = z.infer<typeof notificationTemplateSchema>;
export type NotificationSystemConfigInput = z.infer<typeof notificationSystemConfigSchema>;
export default rentalSchemas;
