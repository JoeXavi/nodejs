import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const externalServiceTransport = new transports.Http({
  host: process.env.LOG_HOST || 'localhost',
  port: process.env.LOG_PORT || 80,
  path: process.env.LOG_PATH || '/logs',
  level: 'warn', // Send warnings and errors to external service
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Log levels: error, warn, info, http, verbose, debug, silly
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
      )
    }),
    new transports.File({ filename: 'logs/app.log' }),
    dailyRotateFileTransport,
    // Note: Http transport will only be active if explicitly set or we assume defaults
    externalServiceTransport
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })]
});

export default logger;
