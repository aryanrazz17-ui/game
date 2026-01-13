const random_name = require('node-random-name');
const crypto = require('crypto');
const Axios = require('axios');

exports.createRandomName = () => {
    const randomName = random_name();
    return randomName;
}

exports.randomNumber = (number) => {
    return Math.floor(Math.random() * number);
}

exports.generateScissorHash = (serverSeed, clientSeed, roundNumber) => {
    return crypto.createHash('sha256').update(serverSeed + clientSeed + roundNumber).digest('hex');
}

exports.generateTurtleHash = (serverSeed, roundNumber, totalBetAmount) => {
    return crypto.createHash('sha256').update(serverSeed + roundNumber + totalBetAmount).digest('hex');
}

exports.generateMinesHash = (serverSeed, clientSeed, roundNumber, minesCount) => {
    return crypto.createHash('sha256').update(serverSeed + clientSeed + roundNumber + minesCount).digest('hex');
}

exports.generateDiceHash = (serverSeed, clientSeed, roundNumber, diceNumber) => {
    return crypto.createHmac('sha512', `PlayZeloDice-${diceNumber}`).update(serverSeed + clientSeed + roundNumber + diceNumber).digest('hex');
}

exports.generatePlinkoHash = (serverSeed, clientSeed, roundNumber, rowsCount, risk) => {
    return crypto.createHmac('sha512', serverSeed).update(clientSeed + roundNumber + rowsCount + risk).digest('hex');
}

exports.generateSlotHash = (serverSeed, clientSeed, roundNumber, lines) => {
    return crypto.createHmac('sha512', serverSeed).update(clientSeed + roundNumber + lines).digest('hex');
}

exports.generateCrashHash = (serverSeed, clientSeeds) => {
    return crypto.createHmac('sha512', serverSeed).update(clientSeeds[0] + clientSeeds[1] + clientSeeds[2]).digest('hex');
}

exports.generateSeed = (length = 20) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.getHashedString = (value) => {
    return crypto.createHash('sha256').update(value).digest('hex');
}

exports.factorial = (n) => {
    if (n < 0)
        return NaN;

    if (n === 0 || n === 1)
        return 1;
    else
        return n * this.factorial(n - 1);
}

exports.authenticationCode = () => {
    const code = `${this.randomNumber(10)}${this.randomNumber(10)}${this.randomNumber(10)}${this.randomNumber(10)}${this.randomNumber(10)}${this.randomNumber(10)}`;
    return code;
}

exports.generateCampaignCode = (length = 12) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

exports.getExchangeRateFromBinanceApi = async (coinType) => {
    if (coinType === 'USDT' || coinType === 'ZELO') return { status: true, data: 1 };

    const fromUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${coinType}TRY`;
    const toUrl = `https://api.binance.com/api/v3/ticker/price?symbol=USDTTRY`;

    const fromResponse = await Axios.get(fromUrl);
    const toResponse = await Axios.get(toUrl);

    if (!fromResponse.data.hasOwnProperty('price') || !toResponse.data.hasOwnProperty('price')) return { status: false, message: 'API Error' };
    else {
        const rate = fromResponse.data.price / toResponse.data.price;
        return { status: true, data: rate };
    }
}

/**
 * Universal safe user lookup
 * Handles: ObjectId validation, Guest/Demo users, Consistent error messages
 */
exports.findUserByIdSafely = async (UserModel, userId, isDemo = false) => {
    try {
        const mongoose = require('mongoose');

        // Handle Demo/Guest Mode
        if (isDemo || !userId || userId.toString().startsWith('guest_')) {
            return {
                status: true,
                isDemo: true,
                data: {
                    _id: userId || 'guest_' + Date.now(),
                    userNickName: 'Guest',
                    balance: { data: [] }, // Mock balance
                    currency: { coinType: 'BTC', type: 'native' }
                }
            };
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: false, message: 'Invalid User ID format' };
        }

        // Database Query
        const userData = await UserModel.findOne({ _id: userId });
        if (!userData) {
            return { status: false, message: 'User session not found' };
        }

        return { status: true, isDemo: false, data: userData };
    } catch (err) {
        console.error('findUserByIdSafely Error:', err.message);
        return { status: false, message: 'Database query failed' };
    }
}