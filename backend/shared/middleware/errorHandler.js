/**
 * Error Handler Middleware
 * Centralized error handling for Express applications
 */

const logger = require('../utils/logger');
const { sendError } = require('../utils/responseHelper');
const constants = require('../constants');
const HTTP_STATUS = constants.HTTP_STATUS || {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return sendError(res, 'Validation failed', HTTP_STATUS.BAD_REQUEST, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(res, `${field} already exists`, HTTP_STATUS.CONFLICT);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', HTTP_STATUS.UNAUTHORIZED);
  }

  // Default error
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return sendError(res, message, statusCode);
};

/**
 * 404 handler
 */
const notFoundHandler = (req, res, next) => {
  return sendError(res, `Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND);
};

module.exports = {
  errorHandler,
  notFoundHandler
};

