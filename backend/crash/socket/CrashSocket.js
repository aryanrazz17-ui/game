const BaseSocket = require('../../shared/utils/BaseSocket');
const socketHelper = require('../../shared/utils/socketHelper');
const dataManager = require('../manager/DataManager');

module.exports = class CrashSocket extends BaseSocket {
    constructor(server) {
        super(server, 'CrashSocket');
        this.bind();
        dataManager.createRound([]);
    }

    bind() {
        this.socket.on('connection', (client) => {
            console.log(`*** Socket ${client.id} connected! ***`);

            client.on('disconnect', () => {
                console.log(`### Socket ${client.id} disconnected ###`);
            });

            client.on('joinBet', (data) => {
                socketHelper.processSecureEvent(client, data, 'joinBet', 'joinBetResult', (payload, socketId) => {
                    dataManager.addBetUser(payload, socketId);
                });
            });

            client.on('cancelBet', (data) => {
                socketHelper.processSecureEvent(client, data, 'cancelBet', 'cancelBetResult', (payload, socketId) => {
                    dataManager.removeBetUser(payload, socketId);
                });
            });

            client.on('cashoutBet', (data) => {
                socketHelper.processSecureEvent(client, data, 'cashoutBet', 'cashoutBetResult', (payload, socketId) => {
                    dataManager.cashoutBet(payload, socketId);
                });
            });

            client.on('getInitData', (data) => {
                // getInitData is often allowed for guests too, but we want verified userId if possible
                if (client.user) {
                    data.userId = client.user._id.toString();
                }
                dataManager.getInitData(data, client.id);
            });
        });
    }
}
