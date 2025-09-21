// Rental Management Types for DY States
// Dominican Republic Real Estate Platform
export var RentalStatus;
(function (RentalStatus) {
    RentalStatus["DRAFT"] = "draft";
    RentalStatus["PUBLISHED"] = "published";
    RentalStatus["PAUSED"] = "paused";
    RentalStatus["ARCHIVED"] = "archived";
    RentalStatus["MAINTENANCE"] = "maintenance";
})(RentalStatus || (RentalStatus = {}));
export var RentalType;
(function (RentalType) {
    RentalType["SHORT_TERM"] = "short_term";
    RentalType["MEDIUM_TERM"] = "medium_term";
    RentalType["LONG_TERM"] = "long_term";
    RentalType["VACATION"] = "vacation";
    RentalType["CORPORATE"] = "corporate";
})(RentalType || (RentalType = {}));
export var PricingType;
(function (PricingType) {
    PricingType["PER_NIGHT"] = "per_night";
    PricingType["PER_WEEK"] = "per_week";
    PricingType["PER_MONTH"] = "per_month";
    PricingType["PER_YEAR"] = "per_year";
})(PricingType || (PricingType = {}));
export var DiscountType;
(function (DiscountType) {
    DiscountType["WEEKLY_DISCOUNT"] = "weekly_discount";
    DiscountType["MONTHLY_DISCOUNT"] = "monthly_discount";
    DiscountType["EARLY_BIRD"] = "early_bird";
    DiscountType["LAST_MINUTE"] = "last_minute";
    DiscountType["LONG_STAY"] = "long_stay";
    DiscountType["FIRST_TIME"] = "first_time";
    DiscountType["SEASONAL"] = "seasonal";
})(DiscountType || (DiscountType = {}));
export var FeeType;
(function (FeeType) {
    FeeType["CLEANING"] = "cleaning";
    FeeType["PET"] = "pet";
    FeeType["EXTRA_GUEST"] = "extra_guest";
    FeeType["PARKING"] = "parking";
    FeeType["WIFI"] = "wifi";
    FeeType["TOWELS_LINENS"] = "towels_linens";
    FeeType["OTHER"] = "other";
})(FeeType || (FeeType = {}));
export var AmenityCategory;
(function (AmenityCategory) {
    AmenityCategory["BASIC"] = "basic";
    AmenityCategory["KITCHEN"] = "kitchen";
    AmenityCategory["BATHROOM"] = "bathroom";
    AmenityCategory["BEDROOM"] = "bedroom";
    AmenityCategory["ENTERTAINMENT"] = "entertainment";
    AmenityCategory["OUTDOOR"] = "outdoor";
    AmenityCategory["SAFETY"] = "safety";
    AmenityCategory["ACCESSIBILITY"] = "accessibility";
})(AmenityCategory || (AmenityCategory = {}));
export var TransportationType;
(function (TransportationType) {
    TransportationType["METRO"] = "metro";
    TransportationType["BUS"] = "bus";
    TransportationType["TAXI"] = "taxi";
    TransportationType["AIRPORT"] = "airport";
    TransportationType["TRAIN"] = "train";
    TransportationType["FERRY"] = "ferry";
})(TransportationType || (TransportationType = {}));
export var AttractionType;
(function (AttractionType) {
    AttractionType["BEACH"] = "beach";
    AttractionType["RESTAURANT"] = "restaurant";
    AttractionType["SHOPPING"] = "shopping";
    AttractionType["MUSEUM"] = "museum";
    AttractionType["PARK"] = "park";
    AttractionType["NIGHTLIFE"] = "nightlife";
    AttractionType["HOSPITAL"] = "hospital";
    AttractionType["SCHOOL"] = "school";
    AttractionType["SUPERMARKET"] = "supermarket";
})(AttractionType || (AttractionType = {}));
export var CancellationPolicyType;
(function (CancellationPolicyType) {
    CancellationPolicyType["FLEXIBLE"] = "flexible";
    CancellationPolicyType["MODERATE"] = "moderate";
    CancellationPolicyType["STRICT"] = "strict";
    CancellationPolicyType["SUPER_STRICT"] = "super_strict";
    CancellationPolicyType["NON_REFUNDABLE"] = "non_refundable";
})(CancellationPolicyType || (CancellationPolicyType = {}));
export var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["CHECKED_IN"] = "checked_in";
    BookingStatus["CHECKED_OUT"] = "checked_out";
    BookingStatus["CANCELLED"] = "cancelled";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["DISPUTED"] = "disputed";
})(BookingStatus || (BookingStatus = {}));
export var TravelPurpose;
(function (TravelPurpose) {
    TravelPurpose["LEISURE"] = "leisure";
    TravelPurpose["BUSINESS"] = "business";
    TravelPurpose["FAMILY"] = "family";
    TravelPurpose["COUPLE"] = "couple";
    TravelPurpose["FRIENDS"] = "friends";
    TravelPurpose["SOLO"] = "solo";
    TravelPurpose["OTHER"] = "other";
})(TravelPurpose || (TravelPurpose = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["AUTHORIZED"] = "authorized";
    PaymentStatus["CAPTURED"] = "captured";
    PaymentStatus["PARTIALLY_PAID"] = "partially_paid";
    PaymentStatus["PAID"] = "paid";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["PARTIALLY_REFUNDED"] = "partially_refunded";
})(PaymentStatus || (PaymentStatus = {}));
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["STRIPE"] = "stripe";
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["OTHER"] = "other";
})(PaymentMethod || (PaymentMethod = {}));
export var TransactionType;
(function (TransactionType) {
    TransactionType["PAYMENT"] = "payment";
    TransactionType["REFUND"] = "refund";
    TransactionType["SECURITY_DEPOSIT"] = "security_deposit";
    TransactionType["SECURITY_DEPOSIT_REFUND"] = "security_deposit_refund";
    TransactionType["FEE"] = "fee";
})(TransactionType || (TransactionType = {}));
export var RefundReason;
(function (RefundReason) {
    RefundReason["GUEST_CANCELLATION"] = "guest_cancellation";
    RefundReason["HOST_CANCELLATION"] = "host_cancellation";
    RefundReason["DISPUTE_RESOLUTION"] = "dispute_resolution";
    RefundReason["SECURITY_DEPOSIT_RETURN"] = "security_deposit_return";
    RefundReason["SERVICE_ISSUE"] = "service_issue";
    RefundReason["OTHER"] = "other";
})(RefundReason || (RefundReason = {}));
export var DepositStatus;
(function (DepositStatus) {
    DepositStatus["PENDING"] = "pending";
    DepositStatus["AUTHORIZED"] = "authorized";
    DepositStatus["CAPTURED"] = "captured";
    DepositStatus["RELEASED"] = "released";
    DepositStatus["FORFEITED"] = "forfeited";
})(DepositStatus || (DepositStatus = {}));
export var ReviewType;
(function (ReviewType) {
    ReviewType["GUEST_TO_HOST"] = "guest_to_host";
    ReviewType["HOST_TO_GUEST"] = "host_to_guest";
})(ReviewType || (ReviewType = {}));
export var CancellationReason;
(function (CancellationReason) {
    CancellationReason["GUEST_REQUEST"] = "guest_request";
    CancellationReason["HOST_REQUEST"] = "host_request";
    CancellationReason["EMERGENCY"] = "emergency";
    CancellationReason["FORCE_MAJEURE"] = "force_majeure";
    CancellationReason["PROPERTY_ISSUE"] = "property_issue";
    CancellationReason["PAYMENT_FAILED"] = "payment_failed";
    CancellationReason["VIOLATION"] = "violation";
    CancellationReason["OTHER"] = "other";
})(CancellationReason || (CancellationReason = {}));
export var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["DOCUMENT"] = "document";
    MessageType["AUDIO"] = "audio";
    MessageType["SYSTEM"] = "system";
    MessageType["BOOKING_UPDATE"] = "booking_update";
    MessageType["PAYMENT_UPDATE"] = "payment_update";
    MessageType["CHECK_IN_INFO"] = "check_in_info";
})(MessageType || (MessageType = {}));
export var ParticipantRole;
(function (ParticipantRole) {
    ParticipantRole["HOST"] = "host";
    ParticipantRole["GUEST"] = "guest";
    ParticipantRole["ADMIN"] = "admin";
})(ParticipantRole || (ParticipantRole = {}));
export var ConversationStatus;
(function (ConversationStatus) {
    ConversationStatus["ACTIVE"] = "active";
    ConversationStatus["ARCHIVED"] = "archived";
    ConversationStatus["BLOCKED"] = "blocked";
})(ConversationStatus || (ConversationStatus = {}));
export var NotificationType;
(function (NotificationType) {
    // Reservas y bookings
    NotificationType["NEW_BOOKING"] = "new_booking";
    NotificationType["BOOKING_CONFIRMED"] = "booking_confirmed";
    NotificationType["BOOKING_CANCELLED"] = "booking_cancelled";
    NotificationType["BOOKING_MODIFIED"] = "booking_modified";
    NotificationType["BOOKING_REQUEST"] = "booking_request";
    NotificationType["BOOKING_REMINDER"] = "booking_reminder";
    NotificationType["CHECK_IN_REMINDER"] = "check_in_reminder";
    NotificationType["CHECK_OUT_REMINDER"] = "check_out_reminder";
    // Pagos y finanzas
    NotificationType["PAYMENT_RECEIVED"] = "payment_received";
    NotificationType["PAYMENT_FAILED"] = "payment_failed";
    NotificationType["PAYMENT_REMINDER"] = "payment_reminder";
    NotificationType["REFUND_PROCESSED"] = "refund_processed";
    // Mensajes y comunicación
    NotificationType["NEW_MESSAGE"] = "new_message";
    NotificationType["MESSAGE_REPLY"] = "message_reply";
    NotificationType["CHAT_MENTION"] = "chat_mention";
    // Propiedades
    NotificationType["PROPERTY_APPROVED"] = "property_approved";
    NotificationType["PROPERTY_REJECTED"] = "property_rejected";
    NotificationType["PROPERTY_UPDATED"] = "property_updated";
    NotificationType["PROPERTY_INQUIRY"] = "property_inquiry";
    NotificationType["PROPERTY_REVIEW"] = "property_review";
    NotificationType["NEW_REVIEW"] = "new_review";
    NotificationType["CALENDAR_UPDATED"] = "calendar_updated";
    NotificationType["PRICE_UPDATED"] = "price_updated";
    NotificationType["MAINTENANCE_SCHEDULED"] = "maintenance_scheduled";
    // Sistema y seguridad
    NotificationType["ACCOUNT_VERIFIED"] = "account_verified";
    NotificationType["PASSWORD_CHANGED"] = "password_changed";
    NotificationType["LOGIN_SUSPICIOUS"] = "login_suspicious";
    NotificationType["ACCOUNT_LOCKED"] = "account_locked";
    NotificationType["SYSTEM_ALERT"] = "system_alert";
    NotificationType["SYSTEM_MAINTENANCE"] = "system_maintenance";
    NotificationType["FEATURE_UPDATE"] = "feature_update";
    // Promociones y marketing
    NotificationType["PROMOTIONAL_OFFER"] = "promotional_offer";
    NotificationType["SEASONAL_DISCOUNT"] = "seasonal_discount";
    NotificationType["NEWSLETTER_UPDATE"] = "newsletter_update";
    NotificationType["GENERAL_ANNOUNCEMENT"] = "general_announcement";
})(NotificationType || (NotificationType = {}));
export var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["EMAIL"] = "email";
    NotificationChannel["SMS"] = "sms";
    NotificationChannel["PUSH"] = "push";
    NotificationChannel["IN_APP"] = "in_app";
    NotificationChannel["WEB"] = "web";
    NotificationChannel["WHATSAPP"] = "whatsapp";
})(NotificationChannel || (NotificationChannel = {}));
export var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "pending";
    NotificationStatus["SENT"] = "sent";
    NotificationStatus["DELIVERED"] = "delivered";
    NotificationStatus["READ"] = "read";
    NotificationStatus["FAILED"] = "failed";
    NotificationStatus["EXPIRED"] = "expired";
})(NotificationStatus || (NotificationStatus = {}));
export var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "low";
    NotificationPriority["NORMAL"] = "normal";
    NotificationPriority["HIGH"] = "high";
    NotificationPriority["URGENT"] = "urgent";
    NotificationPriority["CRITICAL"] = "critical";
})(NotificationPriority || (NotificationPriority = {}));
export var BookingSortBy;
(function (BookingSortBy) {
    BookingSortBy["PRICE_LOW_TO_HIGH"] = "price_low_to_high";
    BookingSortBy["PRICE_HIGH_TO_LOW"] = "price_high_to_low";
    BookingSortBy["DISTANCE"] = "distance";
    BookingSortBy["RATING"] = "rating";
    BookingSortBy["NEWEST"] = "newest";
    BookingSortBy["AVAILABILITY"] = "availability";
})(BookingSortBy || (BookingSortBy = {}));
export var PaymentProvider;
(function (PaymentProvider) {
    PaymentProvider["STRIPE"] = "stripe";
    PaymentProvider["PAYPAL"] = "paypal";
    PaymentProvider["MERCADO_PAGO"] = "mercado_pago";
    PaymentProvider["AZUL"] = "azul";
    PaymentProvider["BANRESERVAS"] = "banreservas";
})(PaymentProvider || (PaymentProvider = {}));
export var PaymentIntentStatus;
(function (PaymentIntentStatus) {
    PaymentIntentStatus["CREATED"] = "created";
    PaymentIntentStatus["PROCESSING"] = "processing";
    PaymentIntentStatus["SUCCEEDED"] = "succeeded";
    PaymentIntentStatus["FAILED"] = "failed";
    PaymentIntentStatus["CANCELLED"] = "cancelled";
    PaymentIntentStatus["EXPIRED"] = "expired";
})(PaymentIntentStatus || (PaymentIntentStatus = {}));
// =====================================================
// TIPOS PARA VALORACIÓN Y ANÁLISIS DE MERCADO
// =====================================================
// Enum para tipos de propiedad
export var PropertyType;
(function (PropertyType) {
    PropertyType["APARTMENT"] = "apartment";
    PropertyType["HOUSE"] = "house";
    PropertyType["VILLA"] = "villa";
    PropertyType["STUDIO"] = "studio";
    PropertyType["LOFT"] = "loft";
    PropertyType["TOWNHOUSE"] = "townhouse";
    PropertyType["BUNGALOW"] = "bungalow";
    PropertyType["CABIN"] = "cabin";
    PropertyType["COTTAGE"] = "cottage";
    PropertyType["PENTHOUSE"] = "penthouse";
    PropertyType["ROOM"] = "room";
    PropertyType["SHARED_ROOM"] = "shared_room";
    PropertyType["HOSTEL"] = "hostel";
    PropertyType["HOTEL"] = "hotel";
    PropertyType["RESORT"] = "resort";
    PropertyType["CAMPING"] = "camping";
})(PropertyType || (PropertyType = {}));
// =============================================================================
// TIPOS PARA PERFILES Y RESEÑAS
// =============================================================================
// Tipos de usuario
export var UserType;
(function (UserType) {
    UserType["AGENT"] = "agent";
    UserType["OWNER"] = "owner";
    UserType["CLIENT"] = "client";
    UserType["GUEST"] = "guest";
})(UserType || (UserType = {}));
// Estado de verificación del perfil
export var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "pending";
    VerificationStatus["VERIFIED"] = "verified";
    VerificationStatus["REJECTED"] = "rejected";
    VerificationStatus["SUSPENDED"] = "suspended";
})(VerificationStatus || (VerificationStatus = {}));
// Tipos de documentos de verificación
export var DocumentType;
(function (DocumentType) {
    DocumentType["ID_CARD"] = "id_card";
    DocumentType["PASSPORT"] = "passport";
    DocumentType["DRIVER_LICENSE"] = "driver_license";
    DocumentType["PROFESSIONAL_LICENSE"] = "professional_license";
    DocumentType["BUSINESS_REGISTRATION"] = "business_registration";
})(DocumentType || (DocumentType = {}));
// =============================================================================
// TIPOS PARA SISTEMA DE RESEÑAS
// =============================================================================
// Tipos de reseñas
(function (ReviewType) {
    ReviewType["PROPERTY"] = "property";
    ReviewType["AGENT"] = "agent";
    ReviewType["OWNER"] = "owner";
    ReviewType["GUEST"] = "guest";
    ReviewType["EXPERIENCE"] = "experience";
})(ReviewType || (ReviewType = {}));
// Estado de la reseña
export var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["PENDING"] = "pending";
    ReviewStatus["APPROVED"] = "approved";
    ReviewStatus["REJECTED"] = "rejected";
    ReviewStatus["FLAGGED"] = "flagged";
    ReviewStatus["HIDDEN"] = "hidden";
})(ReviewStatus || (ReviewStatus = {}));
// Motivos de reporte
export var ReportReason;
(function (ReportReason) {
    ReportReason["INAPPROPRIATE_LANGUAGE"] = "inappropriate_language";
    ReportReason["FALSE_INFORMATION"] = "false_information";
    ReportReason["SPAM"] = "spam";
    ReportReason["DISCRIMINATION"] = "discrimination";
    ReportReason["HARASSMENT"] = "harassment";
    ReportReason["OFF_TOPIC"] = "off_topic";
    ReportReason["OTHER"] = "other";
})(ReportReason || (ReportReason = {}));
// =============================================================================
// TIPOS PARA ADMINISTRACIÓN Y CMS
// =============================================================================
// Roles de administración
export var AdminRole;
(function (AdminRole) {
    AdminRole["SUPER_ADMIN"] = "super_admin";
    AdminRole["ADMIN"] = "admin";
    AdminRole["MODERATOR"] = "moderator";
    AdminRole["EDITOR"] = "editor";
    AdminRole["VIEWER"] = "viewer";
    AdminRole["PROPERTY_MANAGER"] = "property_manager";
    AdminRole["USER_MANAGER"] = "user_manager";
    AdminRole["CONTENT_MANAGER"] = "content_manager";
    AdminRole["REPORT_VIEWER"] = "report_viewer";
})(AdminRole || (AdminRole = {}));
// Estado de usuario administrativo
export var AdminUserStatus;
(function (AdminUserStatus) {
    AdminUserStatus["ACTIVE"] = "active";
    AdminUserStatus["INACTIVE"] = "inactive";
    AdminUserStatus["SUSPENDED"] = "suspended";
    AdminUserStatus["PENDING_ACTIVATION"] = "pending_activation";
})(AdminUserStatus || (AdminUserStatus = {}));
// Estados de propiedades en el CMS
export var PropertyPublicationStatus;
(function (PropertyPublicationStatus) {
    PropertyPublicationStatus["DRAFT"] = "draft";
    PropertyPublicationStatus["PENDING_REVIEW"] = "pending_review";
    PropertyPublicationStatus["APPROVED"] = "approved";
    PropertyPublicationStatus["PUBLISHED"] = "published";
    PropertyPublicationStatus["REJECTED"] = "rejected";
    PropertyPublicationStatus["SUSPENDED"] = "suspended";
    PropertyPublicationStatus["ARCHIVED"] = "archived";
})(PropertyPublicationStatus || (PropertyPublicationStatus = {}));
// Tipos de permisos del sistema
export var PermissionType;
(function (PermissionType) {
    // Gestión de usuarios
    PermissionType["USER_VIEW"] = "user_view";
    PermissionType["USER_CREATE"] = "user_create";
    PermissionType["USER_EDIT"] = "user_edit";
    PermissionType["USER_DELETE"] = "user_delete";
    PermissionType["USER_SUSPEND"] = "user_suspend";
    // Gestión de propiedades
    PermissionType["PROPERTY_VIEW"] = "property_view";
    PermissionType["PROPERTY_CREATE"] = "property_create";
    PermissionType["PROPERTY_EDIT"] = "property_edit";
    PermissionType["PROPERTY_DELETE"] = "property_delete";
    PermissionType["PROPERTY_APPROVE"] = "property_approve";
    PermissionType["PROPERTY_PUBLISH"] = "property_publish";
    PermissionType["PROPERTY_SUSPEND"] = "property_suspend";
    // Gestión de contenido
    PermissionType["CONTENT_VIEW"] = "content_view";
    PermissionType["CONTENT_CREATE"] = "content_create";
    PermissionType["CONTENT_EDIT"] = "content_edit";
    PermissionType["CONTENT_DELETE"] = "content_delete";
    PermissionType["CONTENT_PUBLISH"] = "content_publish";
    // Reportes y análisis
    PermissionType["REPORTS_VIEW"] = "reports_view";
    PermissionType["REPORTS_EXPORT"] = "reports_export";
    PermissionType["ANALYTICS_VIEW"] = "analytics_view";
    // Configuración del sistema
    PermissionType["SYSTEM_CONFIG"] = "system_config";
    PermissionType["ROLE_MANAGE"] = "role_manage";
    PermissionType["PERMISSION_MANAGE"] = "permission_manage";
    // Moderación
    PermissionType["MODERATION_VIEW"] = "moderation_view";
    PermissionType["MODERATION_ACTION"] = "moderation_action";
    // Logs y auditoría
    PermissionType["AUDIT_VIEW"] = "audit_view";
    PermissionType["LOGS_VIEW"] = "logs_view";
})(PermissionType || (PermissionType = {}));
// Tipos de actividad del sistema
export var ActivityType;
(function (ActivityType) {
    ActivityType["USER_LOGIN"] = "user_login";
    ActivityType["USER_LOGOUT"] = "user_logout";
    ActivityType["USER_CREATED"] = "user_created";
    ActivityType["USER_UPDATED"] = "user_updated";
    ActivityType["USER_DELETED"] = "user_deleted";
    ActivityType["USER_SUSPENDED"] = "user_suspended";
    ActivityType["PROPERTY_CREATED"] = "property_created";
    ActivityType["PROPERTY_UPDATED"] = "property_updated";
    ActivityType["PROPERTY_DELETED"] = "property_deleted";
    ActivityType["PROPERTY_APPROVED"] = "property_approved";
    ActivityType["PROPERTY_REJECTED"] = "property_rejected";
    ActivityType["PROPERTY_PUBLISHED"] = "property_published";
    ActivityType["PROPERTY_SUSPENDED"] = "property_suspended";
    ActivityType["REVIEW_CREATED"] = "review_created";
    ActivityType["REVIEW_MODERATED"] = "review_moderated";
    ActivityType["REVIEW_DELETED"] = "review_deleted";
    ActivityType["BOOKING_CREATED"] = "booking_created";
    ActivityType["BOOKING_CANCELLED"] = "booking_cancelled";
    ActivityType["BOOKING_CONFIRMED"] = "booking_confirmed";
    ActivityType["SYSTEM_CONFIG_CHANGED"] = "system_config_changed";
    ActivityType["ROLE_ASSIGNED"] = "role_assigned";
    ActivityType["PERMISSION_GRANTED"] = "permission_granted";
    ActivityType["DATA_EXPORTED"] = "data_exported";
    ActivityType["REPORT_GENERATED"] = "report_generated";
})(ActivityType || (ActivityType = {}));
// Niveles de severidad para logs
export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARNING"] = "warning";
    LogLevel["ERROR"] = "error";
    LogLevel["CRITICAL"] = "critical";
})(LogLevel || (LogLevel = {}));
// ============================================================================
// SISTEMA DE NOTIFICACIONES Y MÓVIL
// ============================================================================
// Plataformas de dispositivos
export var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["WEB"] = "web";
    DevicePlatform["IOS"] = "ios";
    DevicePlatform["ANDROID"] = "android";
    DevicePlatform["WINDOWS"] = "windows";
    DevicePlatform["MACOS"] = "macos";
})(DevicePlatform || (DevicePlatform = {}));
