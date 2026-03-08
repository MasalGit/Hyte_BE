import { validationResult } from 'express-validator';

// Not found handler - forwards a 404 error to the error handler
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// General error handler - returns JSON payloads for errors
const errorHandler = (err, req, res, next) => {
  // allow status to be number on error, default 500
  const status = err.status || 500;
  const payload = {
    error: {
      message: err.message || 'Internal Server Error',
      status,
    },
  };
  if (err.errors) payload.error.details = err.errors;
  res.status(status).json(payload);
};

// Validation error handler middleware to be used after express-validator checks
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req, { strictParams: ['body'] });
  if (!errors.isEmpty()) {
    const err = new Error('Bad Request');
    err.status = 400;
    err.errors = errors.array({ onlyFirstError: true }).map((e) => ({ field: e.path, message: e.msg }));
    return next(err);
  }
  next();
};

export { notFoundHandler, errorHandler, validationErrorHandler };
