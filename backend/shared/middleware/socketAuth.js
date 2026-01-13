const mongoose = require('mongoose');
const models = require('../../models/index');

/**
 * Reusable Socket.IO Middleware for User Validation
 */
module.exports = async (socket, next) => {
    try {
        const auth = socket.handshake.auth || {};
        const query = socket.handshake.query || {};

        // Priority: Auth Object > Query Params > Custom Header
        const token = auth.token || query.token;
        const userId = auth.userId || query.userId;
        const isDemo = auth.isDemo === 'true' || query.isDemo === 'true' || auth.isDemo === true;

        if (isDemo || userId?.toString().startsWith('guest_')) {
            socket.user = { _id: userId || 'guest_' + socket.id, isDemo: true, demo: true };
            return next();
        }

        if (token) {
            const user = await models.userModel.findOne({ userToken: token });
            if (user) {
                socket.user = user;
                return next();
            }
        }

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            const user = await models.userModel.findOne({ _id: userId });
            if (user) {
                socket.user = user;
                return next();
            }
        }

        // If no user found and not demo, we still allow connection but mark as unauthorized
        // Alternatively, call next(new Error('User not found')) to reject connection
        socket.user = null;
        console.log(`Socket ${socket.id} connected without authenticated user.`);
        return next();
    } catch (err) {
        console.error('Socket Auth Middleware Error:', err.message);
        return next(); // Still allow connection but without user object
    }
};
