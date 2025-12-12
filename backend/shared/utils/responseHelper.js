/**
 * Response Helper Utilities
 * Standardized API response formatting
 */

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
 * Send success response
 */
const sendSuccess = (res, data, message = 'Success', statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    status: true,
    message,
    data
  });
};

/**
 * Send error response
 */
const sendError = (res, message = 'An error occurred', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) => {
  const response = {
    status: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
const sendValidationError = (res, errors, message = 'Validation failed') => {
  return sendError(res, message, HTTP_STATUS.BAD_REQUEST, errors);
};

/**
 * Send unauthorized response
 */
const sendUnauthorized = (res, message = 'Unauthorized') => {
  return sendError(res, message, HTTP_STATUS.UNAUTHORIZED);
};

/**
 * Send not found response
 */
const sendNotFound = (res, message = 'Resource not found') => {
  return sendError(res, message, HTTP_STATUS.NOT_FOUND);
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendUnauthorized,
  sendNotFound
};

