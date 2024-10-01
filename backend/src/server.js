import express from 'express';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import 'dotenv/config';
// eslint-disable-next-line import/extensions
import { systLogs, morganMiddleware } from '../utils/Logger.js';

// Create an Express app

const app = express();

// Logging middleware
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}
// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: { text: `API endpoint for testing` } });
});

const hostname = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 5000;
app.listen(port, () => {
  systLogs.info(
    `${chalk.green.bold(`✅`)} Server running in ${chalk.blue.bold(process.env.NODE_ENV)} mode on port ${chalk.blueBright.bold(port)} at http://${hostname}:${port}/`
  );
});
