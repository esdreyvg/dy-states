import swaggerJSDoc from 'swagger-jsdoc';
import { config } from '@/config';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.SWAGGER_TITLE || 'Dyxersoft Estates API',
      version: config.SWAGGER_VERSION || '1.0.0',
      description: config.SWAGGER_DESCRIPTION || 'Real Estate Management System API',
      contact: {
        name: 'Dyxersoft',
        email: 'info@dyxersoft.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
            code: {
              type: 'string',
              example: 'ERROR_CODE',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              type: 'object',
            },
            meta: {
              type: 'object',
              properties: {
                total: {
                  type: 'number',
                },
                page: {
                  type: 'number',
                },
                limit: {
                  type: 'number',
                },
                totalPages: {
                  type: 'number',
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'AGENT', 'CLIENT', 'OWNER'],
            },
            emailVerified: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Property: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            currency: {
              type: 'string',
              default: 'DOP',
            },
            bedrooms: {
              type: 'number',
            },
            bathrooms: {
              type: 'number',
            },
            area: {
              type: 'number',
            },
            propertyType: {
              type: 'string',
              enum: ['HOUSE', 'APARTMENT', 'CONDO', 'TOWNHOUSE', 'VILLA', 'LAND', 'COMMERCIAL'],
            },
            status: {
              type: 'string',
              enum: ['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED', 'PENDING'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization',
      },
      {
        name: 'Properties',
        description: 'Property management',
      },
      {
        name: 'Users',
        description: 'User management',
      },
      {
        name: 'Transactions',
        description: 'Property transactions',
      },
    ],
  },
  apis: [
    './src/controllers/*.ts',
    './src/routes/*.ts',
  ],
};

const specs = swaggerJSDoc(options);

export default specs;