/* eslint-disable import/extensions */
import express from 'express';
import { newProduct, getSingleProduct } from '../../controllers/productController.js';

const router = express.Router();

// create new product

router.post('/admin/product/new', newProduct);

// Get single product
router.get('/product/:id', getSingleProduct);

export default router;
