/* eslint-disable arrow-body-style */
import morgan from 'morgan';
import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, label, prettyPrint } = format;
const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// eslint-disable-next-line import/prefer-default-export
export const systLogs = createLogger({
  level: 'http',
  format: combine(timestamp({ format: 'YYYY-MM-DD-HH-mm-ss.SSS A' }), label({ label: 'system' }), prettyPrint()),
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
