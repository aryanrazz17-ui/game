const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class ChatSocket extends BaseSocket {
    constructor(server) {
        super(server, 'ChatSocket');
        this.bind();
    }

    bind() {
        this.socket.on('connection', (client) => {
            console.log(`*** Chat Socket ${client.id} connected! ***`);

            if (client.user) {
                dataManager.addUserSocket(client.user._id.toString(), client.id);
            }

            client.on('reconnect', (request) => {
                const userId = client.user?._id?.toString() || request.userId;
                if (userId) {
                    dataManager.addUserSocket(userId, client.id);
                }
            });

            client.on('disconnect', () => {
                console.log(`### Chat Socket ${client.id} disconnected ###`);
                dataManager.removeUserSocket(client.id);
            });

            client.on('getChatData', (callback) => {
                dataManager.getChatData(callback);
            });

            client.on('sendNewChat', (data) => {
                // errorEvent is null because chat usually doesn't emit error back on failure, 
                // but we could use 'chatError' if desired.
                socketHelper.processSecureEvent(client, data, 'sendNewChat', null, (payload, socketId) => {
                    dataManager.newChat(payload, socketId);
                });
            });
        });
    }
}
