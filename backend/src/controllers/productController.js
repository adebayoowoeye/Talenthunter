/* eslint-disable import/extensions */
import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';
import ErrorHandler from '../errorHandler.js';
import asyncErrorHandler from '../middlewares/asyncErrorHandler.js';

const newProduct = async (req, res, next) => {
  const productCreated = await Product.create(req.body);
  res.status(201).json({ success: true, productCreated });
};

const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ success: true, data: products, count: products.length });
};
// To get single product
const getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // return res.status(404).json({ success: false, message: 'Product not found' });
    return next(new ErrorHandler('product not found', 404));
  }
  return res.status(200).json({ success: true, data: product });
});

const updateProduct = async (req, res, next) => {
  let productToBeUpdated = await Product.findById(req.params.id);
  if (!productToBeUpdated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  productToBeUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({ success: true, data: productToBeUpdated });
};

const deleteProduct = async (req, res, next) => {
  const productToDelete = await Product.findById(req.params.id);
  if (!productToDelete) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  await Product.findByIdAndDelete(productToDelete);
  return res.status(200).json({ success: true, message: 'Product deleted successfully' });
};

export { newProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };
