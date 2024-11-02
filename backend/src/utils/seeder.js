/* eslint-disable import/extensions */
import 'dotenv/config';
import connectDb from '../config/db.js';
import Product from '../model/Product.js';
// import products from '../data/products.json' assert {type:'json'};
import { systLogs } from './Logger.js';

// Connect to MongoDB

connectDb();

// Create a new product
const seedProduct = async () => {
  try {
    await Product.deleteMany();
    systLogs.info('Product deleted successfully');
    // await Product.insertMany(products);
    systLogs.info('Products inserted successfully');
    process.exit();
  } catch (error) {
    systLogs.error(`Error seeding products: ${error.message}`);
    process.exit(1);
  }
};

seedProduct();
