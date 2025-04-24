import ErrorHandler from '../errorHandler.js';

const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404).json({ message: error.message });
  next(error);
};

const errorMiddleware = (er, req, res, next) => {
  const err = er;
  err.statusCode = err.statusCode || 500;
  //   console.log(process.env.NODE_ENV);
  const environment = process.env.NODE_ENV;
  //   console.log(typeof(environment));
  //   console.log(process.env.NODE_ENV === environment);
  if (environment) {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  // if (process.env.NODE_ENV === 'PRODUCTION') {
  //   let error = { ...err };
  //   error.message = err.message;
  //   res.status(err.statusCode).json({
  //     success: false,
  //     message: error.message || 'internal Server Error',
  //   });
  // }
};
export { notFound, errorMiddleware };
