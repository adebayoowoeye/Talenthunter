/* eslint-disable import/extensions */
import express from 'express';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import 'dotenv/config';
import { systLogs, morganMiddleware } from '../utils/Logger.js';
import connectDb from './config/db.js';
import productRoutes from './routes/api/product.js';

// Create an Express app

const app = express();

// Logging middleware
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

// Connect to MongoDB
connectDb();

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

// API routes middleware
app.use('/api/v1/', productRoutes);

app.get('/api/v1/test', (req, res) => {
  res.json({ message: `API endpoint for testing` });
});

const hostname = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || 5000;
app.listen(port, () => {
  systLogs.info(
    `${chalk.green.bold(`✅`)} Server running in ${chalk.blue.bold(process.env.NODE_ENV)} mode on port ${chalk.blueBright.bold(port)} at http://${hostname}:${port}/`
  );
});
