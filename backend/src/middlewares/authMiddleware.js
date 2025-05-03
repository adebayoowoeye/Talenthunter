import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../model/User.js';

// check if a user is authenticated or not

const requireAuthentication = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new ErrorHandler('Please login first to access this resource', 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  req.user = await User.findById(decoded.id);
  next();
});
export default requireAuthentication;
