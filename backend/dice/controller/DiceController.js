const mongoose = require('mongoose');
const { generateSeed } = require('../../helper/mainHelper');
const models = require('../../models/index');
const { requestWargerAmountUpdate } = require('../socket/Manager');

/**
 * Helper to safely get user wallet for a specific currency
 */
const getWallet = (user, currency) => {
    if (!user || !user.balance || !user.balance.data) return null;
    return user.balance.data.find(item =>
        item.coinType === currency.coinType &&
        item.type === currency.type
    );
};

exports.saveDiceRound = async (data) => {
    try {
        const { userId, betAmount, isDemo } = data;

        // 1. Handle Demo Mode (Bypass DB balance checks)
        if (isDemo) {
            console.log(`[Dice] Demo Round: User ${userId || 'Guest'}`);
            return {
                status: true,
                data: { balance: { data: [] } }, // Return mock data for demo
                roundData: {
                    ...data,
                    roundDate: new Date(),
                    isDemo: true
                }
            };
        }

        // 2. Validate Request
        if (!userId || !betAmount) {
            return { status: false, message: 'Invalid betting request' };
        }

        // 3. Fetch User Data
        const userData = await models.userModel.findOne({ _id: userId });
        if (!userData) {
            console.error(`[Dice] User not found: ${userId}`);
            return { status: false, message: 'User session not found' };
        }

        // 4. Get Active Wallet
        const currentCurrency = userData.currency || { coinType: 'ZELO', type: '' };
        const wallet = getWallet(userData, currentCurrency);

        if (!wallet) {
            console.error(`[Dice] Wallet missing for ${JSON.stringify(currentCurrency)}`);
            return { status: false, message: 'Selected wallet not found' };
        }

        // 5. Balance Validation
        if (wallet.balance < Number(betAmount)) {
            return { status: false, message: 'Insufficient balance' };
        }

        // 6. Process Bet
        requestWargerAmountUpdate({ userId: userData._id, amount: betAmount, coinType: currentCurrency });

        const roundData = await new models.diceRoundModel({
            roundNumber: data.roundNumber,
            userId: userData._id,
            betAmount: betAmount,
            coinType: data.coinType,
            difficulty: data.difficulty,
            isOver: data.isOver,
            payout: data.payout,
            fairData: data.fairData,
            roundResult: data.roundResult,
            serverSeed: data.serverSeed,
            clientSeed: data.clientSeed,
            roundDate: new Date()
        }).save();

        // 7. Update Balance
        const multiplier = data.roundResult === 'win' ? (data.payout - 1) : -1;
        const balanceChange = Number(betAmount) * multiplier;

        // Find index again for atomic update if necessary, or just use findAndUpdate
        const currencyIndex = userData.balance.data.findIndex(item =>
            item.coinType === currentCurrency.coinType &&
            item.type === currentCurrency.type
        );

        userData.balance.data[currencyIndex].balance += balanceChange;

        await models.userModel.findOneAndUpdate(
            { _id: userData._id },
            { balance: userData.balance }
        );

        return { status: true, data: userData, roundData: roundData };
    }
    catch (err) {
        console.error({ title: 'diceController => saveDiceRound', message: err.message });
        return { status: false, message: 'Gaming service error. Please try again.' };
    }
}

exports.getHistory = async (data) => {
    try {
        const { userId } = data;
        const historyData = await models.diceRoundModel.find({ userId }).sort({ roundDate: '-1' }).limit(5);
        return historyData;
    }
    catch (err) {
        console.error({ title: 'diceController => getHistory', message: err.message });
        return { status: false, message: err.message };
    }
}

exports.getSeedData = async (userId) => {
    try {
        const isGuest = !userId || !mongoose.Types.ObjectId.isValid(userId);

        // Default seeds for guests
        if (isGuest) {
            return {
                serverSeedData: { seed: generateSeed() },
                clientSeedData: { seed: generateSeed() }
            };
        }

        let clientSeedData = await models.seedModel.findOne({ userId: userId, type: 'client' }).sort({ date: -1 });
        if (!clientSeedData) {
            clientSeedData = await new models.seedModel({
                userId: mongoose.Types.ObjectId(userId),
                type: 'client',
                seed: generateSeed(),
                date: new Date()
            }).save();
        }

        let serverSeedData = await models.seedModel.findOne({ type: 'server' }).sort({ date: -1 });
        if (!serverSeedData) {
            serverSeedData = await new models.seedModel({
                type: 'server',
                seed: generateSeed(),
                date: new Date()
            }).save();
        }

        return { serverSeedData, clientSeedData };
    }
    catch (err) {
        console.error({ title: 'diceController => getSeedData', message: err.message });
        return {
            serverSeedData: { seed: generateSeed() },
            clientSeedData: { seed: generateSeed() }
        };
    }
}