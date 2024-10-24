/* eslint-disable import/extensions */
import Product from '../model/Product.js';

const newProduct = async (req, res, next) => {
  const productCreated = await Product.create(req.body);
  res.status(201).json({ success: true, productCreated });
};

const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: products });
};
export { newProduct, getAllProducts };
