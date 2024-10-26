/* eslint-disable import/extensions */
import Product from '../model/Product.js';

const newProduct = async (req, res, next) => {
  const productCreated = await Product.create(req.body);
  res.status(201).json({ success: true, productCreated });
};

const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: products, count: products.length });
};
// To get single product
const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  return res.status(200).json({ success: true, data: product });
};

export { newProduct, getAllProducts, getSingleProduct };
