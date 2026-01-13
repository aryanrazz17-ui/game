/**
 * Socket Helper Utilities
 * Standardized socket operations and user validation
 */

const logger = require('./logger');

/**
 * Sanitizes payload for logging (masks sensitive data)
 */
const sanitizePayload = (payload) => {
    if (!payload) return {};
    const sanitized = { ...payload };
    const sensitiveKeys = ['token', 'password', 'jwt', 'auth', 'email'];
    sensitiveKeys.forEach(key => {
        if (sanitized[key]) sanitized[key] = '********';
    });
    return sanitized;
};

/**
 * Emits a standardized error message to the client
 * @param {Object} client - The socket client instance
 * @param {string} event - The event name to emit on
 * @param {string} message - The error message
 */
const emitError = (client, event, message = 'User session not found') => {
    logger.warn(`[Socket] Error on event ${event} for socket ${client.id}: ${message}`);
    return client.emit(event, { status: false, message });
};

/**
 * Validates if the user is authenticated on the socket
 * @param {Object} client - The socket client instance
 * @param {string} event - The event name (for logging)
 * @returns {boolean} - True if authenticated
 */
const isAuthenticated = (client, event) => {
    if (!client.user) {
        logger.error(`[Socket] Unauthorized ${event} attempt from socket ${client.id}`);
        return false;
    }
    return true;
};

/**
 * High-order wrapper for secure socket events
 * Handles authentication, logging, and userId overriding
 * @param {Object} client - The socket client instance
 * @param {Object} payload - The incoming event payload
 * @param {string} eventName - Name of the event being processed
 * @param {string} errorEvent - Event name to emit errors on
 * @param {Function} handler - The logic to execute if authorized
 */
const processSecureEvent = async (client, payload, eventName, errorEvent, handler) => {
    try {
        const sanitized = sanitizePayload(payload);
        logger.info(`[${eventName}] Received from ${client.id}. Payload: ${JSON.stringify(sanitized)}`);

        if (!isAuthenticated(client, eventName)) {
            return emitError(client, errorEvent, 'User session not found');
        }

        // Security Overrides: Always use verified user ID from socket object
        payload.userId = client.user._id.toString();
        payload.isDemo = client.user.isDemo || payload.isDemo;

        logger.info(`[${eventName}] Verified user ${payload.userId} for socket ${client.id}`);

        return await handler(payload, client.id);
    } catch (err) {
        logger.error(`[CRITICAL ERROR] ${eventName} fail for socket ${client.id}: ${err.message}`, { stack: err.stack });
        // Prevent backend crash by catching here
        return emitError(client, errorEvent, 'Internal service error');
    }
};

module.exports = {
    emitError,
    isAuthenticated,
    processSecureEvent,
    sanitizePayload
};
