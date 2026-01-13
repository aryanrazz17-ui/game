const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class TurtleraceSocket extends BaseSocket {
    constructor(server) {
        super(server, 'TurtleraceSocket');
        this.bind();
        dataManager.createRound();
    }

    bind() {
        this.socket.on('connection', (client) => {
            console.log(`*** Socket ${client.id} connected! ***`);

            client.on('reconnect', (request) => {
                const userId = client.user?._id?.toString() || request.userId;
                if (userId) {
                    dataManager.addUserSocket(userId, client.id);
                }
            });

            client.on('disconnect', () => {
                console.log(`### Socket ${client.id} disconnected ###`);
                dataManager.removeUserSocket(client.id);
            });

            client.on('join_bet', (data) => {
                socketHelper.processSecureEvent(client, data, 'join_bet', 'joinBetResult', (payload, socketId) => {
                    dataManager.addBetUser(payload, socketId);
                });
            });

            client.on('cancel_bet', (data) => {
                socketHelper.processSecureEvent(client, data, 'cancel_bet', 'cancelBetResult', (payload, socketId) => {
                    dataManager.removeBetUser(payload, socketId);
                });
            });

            client.on('current_round', () => {
                dataManager.currentRound(client.id);
            });
        });
    }
}
