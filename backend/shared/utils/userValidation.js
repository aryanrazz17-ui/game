/**
 * User Validation Utility
 * Standardized user fetching and validation across game services
 */

const mongoose = require('mongoose');

/**
 * Standard error messages
 */
const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User session not found',
    INVALID_ID: 'Invalid User ID format',
    DB_ERROR: 'Database query failed'
};

/**
 * Finds a user by ID safely, handling demo/guest users
 * @param {mongoose.Model} UserModel - The Mongoose User model
 * @param {string} userId - The ID of the user
 * @param {boolean} isDemo - Whether the user is in demo mode
 * @returns {Promise<Object>} - Object containing status, data/isDemo, and message if failure
 */
const findUserByIdSafely = async (UserModel, userId, isDemo = false) => {
    try {
        // Handle Demo/Guest Mode
        if (isDemo || !userId || userId.toString().startsWith('guest_')) {
            return {
                status: true,
                isDemo: true,
                data: {
                    _id: userId || 'guest_' + Date.now(),
                    userNickName: 'Guest',
                    balance: { data: [] }, // Mock balance
                    currency: { coinType: 'BTC', type: 'native' }
                }
            };
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: false, message: ERROR_MESSAGES.INVALID_ID };
        }

        // Database Query
        const userData = await UserModel.findOne({ _id: userId });
        if (!userData) {
            return { status: false, message: ERROR_MESSAGES.USER_NOT_FOUND };
        }

        return { status: true, isDemo: false, data: userData };
    } catch (err) {
        console.error('findUserByIdSafely Error:', err.message);
        return { status: false, message: ERROR_MESSAGES.DB_ERROR };
    }
};

module.exports = {
    findUserByIdSafely,
    ERROR_MESSAGES
};
