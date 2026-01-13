const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class PlinkoSocket extends BaseSocket {
    constructor(server) {
        super(server, 'PlinkoSocket');
        this.bind();
    }

    bind() {
        this.socket.on('connection', (client) => {
            console.log(`*** Socket ${client.id} connected! ***`);

            client.on('joinBet', (data) => {
                socketHelper.processSecureEvent(client, data, 'joinBet', 'betResult', (payload, socketId) => {
                    dataManager.joinBet(payload, socketId);
                });
            });

            client.on('getHistory', (data) => {
                socketHelper.processSecureEvent(client, data, 'getHistory', 'historyResult', (payload, socketId) => {
                    dataManager.getHistory(payload, socketId);
                });
            });
        });
    }
}
