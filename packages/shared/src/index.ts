// Types from ./types/
export type { AuthState } from './types/auth';
export type { User, UserRole, UserStatus } from './types/user';
export type { Permission, PermissionGroup } from './types/permissions';

// Property types
export type { 
  Property,
  PropertyType,
  PropertyStatus,
  ListingType,
  PropertyFeature,
  FeatureCategory,
  PropertyLocation,
  NearbyPlace,
  PlaceType,
  PropertyImage,
  ImageType,
  PropertyAgent,
  PropertyOwner,
  OwnerType,
  VirtualTour,
  VirtualTourType,
  PropertySearchFilters,
  PropertyAdvancedFilters,
  PropertySearchResult,
  PropertySearchParams,
  PropertySortOptions,
  CreatePropertyDTO,
  UpdatePropertyDTO,
  PropertyFavorite,
  PropertyView,
  PropertyShare,
  SharePlatform,
  PropertyInquiry,
  InquiryType,
  ContactMethod,
  InquiryStatus,
  PropertyStats
} from './types/property';

// Schemas and their types
export { loginSchema, registerSchema } from './schemas/auth';
export type { LoginInput as LoginRequest, RegisterInput as RegisterRequest } from './schemas/auth';

// Property schemas
export {
  propertySchema,
  createPropertySchema,
  updatePropertySchema,
  propertySearchParamsSchema,
  propertySearchFiltersSchema,
  propertyInquirySchema,
  propertyFavoriteSchema,
  createPropertyFavoriteSchema,
  propertyShareSchema,
  imageUploadSchema,
  virtualTourUploadSchema,
  validateProperty,
  validateCreateProperty,
  validateUpdateProperty,
  validatePropertySearch,
  validatePropertyInquiry
} from './schemas/property';

export type {
  PropertySchemaType,
  CreatePropertySchemaType,
  UpdatePropertySchemaType,
  PropertySearchParamsType,
  PropertyInquirySchemaType
} from './schemas/property';

// Constants
export { USER_ROLES, ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS } from './constants/validation';
export { RolePermissions, getPermissionsForRole, hasPermission, hasAnyPermission, hasAllPermissions } from './types/permissions';