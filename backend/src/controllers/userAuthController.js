import asyncHandler from 'express-async-handler';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../model/User.js';
import generateToken from '../utils/generateToken.js';
// @desc: Register a new user
// @route: /api/v1/auth/register
// @access: protected

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email, age, profile } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    // return res.status(400).json({ error: 'User already exist' });
    return next(new ErrorHandler('User already exist', 400));
  }
  const newUser = await User.create({ name, password, email, age, profile });
  // const token = newUser.getJwtToken();
  // return res.status(201).json({ message: ' Registarion successful', user: newUser, token });
  return generateToken(newUser, 201, res);
});
export default registerUser;
