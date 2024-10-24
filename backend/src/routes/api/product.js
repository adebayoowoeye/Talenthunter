/* eslint-disable import/extensions */
import express from 'express';
import { newProduct } from '../../controllers/productController.js';

const router = express.Router();

// create new product

router.post('/product/new', newProduct);

export default router;
