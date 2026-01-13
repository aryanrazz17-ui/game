const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class MinesSocket extends BaseSocket {
    constructor(server) {
        super(server, 'MinesSocket');
        this.bind();
    }

    bind() {
        this.socket.on('connection', (client) => {
            console.log(`*** Socket ${client.id} connected! ***`);

            // Use authenticated user from middleware if available
            if (client.user && client.user._id) {
                dataManager.addUserSocket(client.user._id.toString(), client.id);
            }

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
                    dataManager.joinBet(payload, socketId);
                });
            });

            client.on('finish_bet', (data) => {
                socketHelper.processSecureEvent(client, data, 'finish_bet', 'roundResult', (payload, socketId) => {
                    dataManager.finishBet(payload, socketId);
                });
            });

            client.on('pick_cell', (data) => {
                socketHelper.processSecureEvent(client, data, 'pick_cell', 'pickCellResult', (payload, socketId) => {
                    dataManager.pickCell(payload, socketId);
                });
            });

            client.on('active_round', (data) => {
                if (!client.user) return;
                data.userId = client.user._id.toString();
                dataManager.getActiveRound(data, client.id);
            });
        });
    }
}
