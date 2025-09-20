export var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    HttpStatus[HttpStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatus[HttpStatus["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(HttpStatus || (HttpStatus = {}));
export var ApiErrorCode;
(function (ApiErrorCode) {
    // Authentication
    ApiErrorCode["INVALID_CREDENTIALS"] = "INVALID_CREDENTIALS";
    ApiErrorCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    ApiErrorCode["TOKEN_INVALID"] = "TOKEN_INVALID";
    ApiErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ApiErrorCode["FORBIDDEN"] = "FORBIDDEN";
    // Validation
    ApiErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ApiErrorCode["REQUIRED_FIELD"] = "REQUIRED_FIELD";
    ApiErrorCode["INVALID_FORMAT"] = "INVALID_FORMAT";
    // Resources
    ApiErrorCode["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
    ApiErrorCode["RESOURCE_ALREADY_EXISTS"] = "RESOURCE_ALREADY_EXISTS";
    ApiErrorCode["RESOURCE_CONFLICT"] = "RESOURCE_CONFLICT";
    // Server
    ApiErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    ApiErrorCode["SERVICE_UNAVAILABLE"] = "SERVICE_UNAVAILABLE";
    ApiErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    // Business Logic
    ApiErrorCode["PROPERTY_NOT_AVAILABLE"] = "PROPERTY_NOT_AVAILABLE";
    ApiErrorCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    ApiErrorCode["OPERATION_NOT_ALLOWED"] = "OPERATION_NOT_ALLOWED";
})(ApiErrorCode || (ApiErrorCode = {}));
