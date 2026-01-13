module.exports = {
    serverInfo: {
        host: '127.0.0.1',
        port: '6100'
    },
    dbInfo: {
        uri: process.env.MONGODB_URI
    },
    jwt: {
        secret: 'csgoclubggjwttokenfetyuhgbcase45w368w3q',
        expire: '365d'
    },
    session: {
        time: 1000 * 60 * 30
    },
    admin: {
        id: (process.env.ADMIN_USERNAME || 'admin').trim(),
        name: (process.env.ADMIN_USERNAME || 'admin').trim(),
        pass: (process.env.ADMIN_PASSWORD || 'admin').trim(),
        authKey: (process.env.ADMIN_AUTH_KEY || 'PlayZelo-Admin').trim(),
        commission: 10.00
    },
    gameInfo: {
        host: '127.0.0.1',
        port: '7200',
    }
};