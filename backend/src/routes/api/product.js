/* eslint-disable import/extensions */
import express from 'express';
import {
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from '../../controllers/productController.js';

const router = express.Router();

// create new product

router.post('/admin/product/new', newProduct);

// Get all products
router.get('/products', getAllProducts);

// Get single product
router.get('/product/:id', getSingleProduct);

// Update product
router.put('/admin/product/:id', updateProduct);

// Delete product
router.delete('/admin/product/:id', deleteProduct);

// Export the router

export default router;
