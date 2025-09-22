import 'module-alias/register';
import { config } from '@/config';
import App from '@/app';
import logger from '@/utils/logger';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

// Handle SIGINT signal (Ctrl+C)
process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

// Initialize and start the application
async function bootstrap(): Promise<void> {
  try {
    logger.info('🏗️  Initializing Dyxersoft Estates Backend...');
    
    // Validate environment
    if (!config) {
      throw new Error('Failed to load configuration');
    }

    // Create and start the application
    const app = new App();
    app.listen();

    logger.info('✅ Application started successfully');
  } catch (error) {
    logger.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

// Start the application
bootstrap();