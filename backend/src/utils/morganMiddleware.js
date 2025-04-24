import morgan from 'morgan';
import systLogs from './Logger.js';

// Create a stream object for morgan to write logs to winston
const stream = {
  write: (message) => systLogs.info(message.trim()), // Pass morgan logs to winston
};

// Skip logging for certain requests (e.g., health checks)
const skip = (req) => process.env.NODE_ENV === 'production' && req.url === '/health';

// Morgan middleware configuration
const morganMiddleware = morgan('combined', { stream, skip }); // 'combined' outputs Apache style logs

export default morganMiddleware;
