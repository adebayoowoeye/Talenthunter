import express from 'express';
import registerUser from '../../controllers/userAuthController.js';

const router = express.Router();

router.post('/register', registerUser);

export default router;
