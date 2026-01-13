/**
 * Base Socket Class
 * Standardizes socket initialization and event binding for all game services
 */

const { Server } = require('socket.io');
const socketAuth = require('../middleware/socketAuth');
const logger = require('./logger');

class BaseSocket {
    constructor(server, gameName) {
        this.gameName = gameName;
        this.socket = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        // Apply shared authentication middleware
        this.socket.use(socketAuth);

        // Global error handling for the socket server
        this.socket.on('error', (err) => {
            logger.error(`[${this.gameName}] Server Error: ${err.message}`, { stack: err.stack });
        });

        // Standardized connection logging
        this.socket.on('connection', (client) => {
            const status = client.user ? `Authenticated (${client.user._id})` : 'Guest/Unauthorized';
            logger.info(`[${this.gameName}] New client connected: ${client.id} [${status}]`);

            client.on('disconnect', (reason) => {
                logger.info(`[${this.gameName}] Client disconnected: ${client.id}. Reason: ${reason}`);
            });

            // Prevent unauthenticated clients from staying connected if policy requires it
            // Uncomment the lines below if you want to force-disconnect malicious/unauthenticated clients after X seconds
            /*
            if (!client.user) {
                setTimeout(() => {
                    if (!client.user) {
                        logger.warn(`[${this.gameName}] Disconnecting unauthenticated client ${client.id} due to timeout.`);
                        client.disconnect(true);
                    }
                }, 60000); // 1 minute grace period for guests
            }
            */
        });

        logger.info(`[${this.gameName}] Socket initialized and middleware applied.`);
    }

    /**
     * Standard broadCast method
     */
    broadCast(packetName, packetData = null) {
        try {
            this.socket.emit(packetName, packetData);
        } catch (err) {
            logger.error(`[${this.gameName}] Broadcast failed: ${err.message}`);
        }
    }

    /**
     * Standard sendTo method
     */
    sendTo(socketId, packetName, packetData = null) {
        try {
            this.socket.to(socketId).emit(packetName, packetData);
        } catch (err) {
            logger.error(`[${this.gameName}] SendTo ${socketId} failed: ${err.message}`);
        }
    }
}

module.exports = BaseSocket;
