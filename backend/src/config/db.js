import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import { systLogs } from '../../utils/Logger.js';

// Connect to MongoDB
const connectDb = async () => {
  try {
    const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;
    const conn = await mongoose.connect(MONGO_URI, {});
    systLogs.info(`MongoDb database successfully connected with HOST:${conn.connection.host}`);
  } catch (error) {
    systLogs.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
