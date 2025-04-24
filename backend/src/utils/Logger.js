import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
);

// Create logger instance
const systLogs = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    // Console transport
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),

    // File transport for general logs
    new transports.File({ filename: path.join('/app/logs', 'app.log') }),

    // Daily rotating file transport for error logs
    new transports.DailyRotateFile({
      filename: path.join('/app/logs', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
});

export default systLogs;
