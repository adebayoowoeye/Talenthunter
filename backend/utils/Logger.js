/* eslint-disable arrow-body-style */
import morgan from 'morgan';
import { createLogger, transports, format, addColors } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, label, prettyPrint, colorize } = format;
// define different colour for each log level
const colors = {
  http: 'white',
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
};

// Add colors to the logger format
addColors(colors);

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

export const systLogs = createLogger({
  level: 'http',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD-HH-mm-ss.SSS A' }),
    label({ label: 'system' }),
    colorize({ all: true }),
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/exceptions.log',
      level: 'error',
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: 'logs/rejections.log',
      level: 'error',
    }),
  ],
});

export const morganMiddleware = morgan(
  (req, res, tokens) => {
    // eslint-disable-next-line no-undef
    return json.stringify({
      timestamp: tokens.timestamp(),
      method: tokens.method(),
      url: tokens.url(),
      status: tokens.status(),
      res_length: tokens['response-length'](),
      user_agent: req.headers['user-agent'],
      ip: req.ip,
      referer: req.headers.referer,
      host: req.headers.host,
      body: req.body,
    });
  },
  {
    stream: {
      write: (message) => {
        // Log to system logs
        const data = JSON.parse(message);
        systLogs.http(`incomming-request`, data);
      },
    },
  }
);
// To log in console if not runing in the production environment
if (process.env.NODE_ENV !== 'PRODUCTION') {
  systLogs.add(new transports.Console({ format: format.simple() }));
}
