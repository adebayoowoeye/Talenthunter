/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import connectDb from '../config/db.js';
import Product from '../model/Product.js';
// import products from '../data/products.json' assert {type:'json'};
import systLogs from './Logger.js';

// Connect to MongoDB

connectDb();
const _dirname = path.resolve();
const productFilePath = path.resolve(_dirname, 'backend/src/data/products.json');
let products = [];
try {
  const data = fs.readFileSync(productFilePath, 'utf8');
  products = JSON.parse(data);
  console.log(products);
} catch (error) {
  console.error('Error reading product.json:', error.message);
}

// Create a new product
const seedProduct = async () => {
  try {
    await Product.deleteMany();
    systLogs.info('Product deleted successfully');
    await Product.insertMany(products);
    systLogs.info('Products inserted successfully');
    process.exit();
  } catch (error) {
    systLogs.error(`Error seeding products: ${error.message}`);
    process.exit(1);
  }
};

seedProduct();
