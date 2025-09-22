import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config, apiConfig, rateLimitConfig, securityConfig } from '@/config';
import swaggerSpecs from '@/config/swagger';
import routes from '@/routes';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import logger from '@/utils/logger';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors({
      origin: securityConfig.corsOrigin,
      credentials: true,
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: rateLimitConfig.windowMs,
      max: rateLimitConfig.maxRequests,
      message: {
        success: false,
        message: 'Too many requests, please try again later',
        code: 'RATE_LIMIT_EXCEEDED',
      },
    });
    this.app.use(limiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logging middleware
    this.app.use(morgan('combined', { stream: logger.stream }));

    // API documentation
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Dyxersoft Estates API Documentation',
    }));
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use(apiConfig.prefix, routes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Welcome to Dyxersoft Estates API',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
          health: `${apiConfig.prefix}/health`,
          auth: `${apiConfig.prefix}/auth`,
        },
      });
    });
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.app.listen(config.PORT, () => {
      logger.info(`🚀 Server is running on port ${config.PORT}`);
      logger.info(`📖 API Documentation: http://localhost:${config.PORT}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${config.PORT}${apiConfig.prefix}/health`);
      logger.info(`🌍 Environment: ${config.NODE_ENV}`);
    });
  }
}

export default App;