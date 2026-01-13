module.exports = {
    serverInfo: {
        host: '127.0.0.1',
        port: '5600'
    },
    DB: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/PlayZelo'
}