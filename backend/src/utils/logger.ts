import winston from 'winston';
import { config, logConfig } from '@/config';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    
    if (Object.keys(meta).length > 0) {
      log += ` | Meta: ${JSON.stringify(meta)}`;
    }
    
    if (stack) {
      log += `\nStack: ${stack}`;
    }
    
    return log;
  })
);

// Create Winston logger
const logger = winston.createLogger({
  level: logConfig.level,
  format: logFormat,
  defaultMeta: { service: 'dyxersoft-estates-backend' },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    
    // Write all logs to file
    new winston.transports.File({
      filename: logConfig.file,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Write only errors to error file
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// If we're not in production, log to console with simple format
if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message, stack }) => {
        let log = `${timestamp} [${level}]: ${message}`;
        if (stack) log += `\n${stack}`;
        return log;
      })
    )
  }));
}

// Create a stream object with a 'write' function for Morgan HTTP logger
logger.stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;