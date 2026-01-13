const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class SlotSocket extends BaseSocket {
    constructor(server) {
        super(server, 'SlotSocket');
        this.bind();
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

            client.on('joinBet', (data) => {
                socketHelper.processSecureEvent(client, data, 'joinBet', 'betResult', (payload, socketId) => {
                    dataManager.joinBet(payload, socketId);
                });
            });
        });
    }
}