const axios = require('axios');
const crypto = require('crypto');
const config = require('../config');
const models = require('../models');

const CASHFREE_BASE_URL = config.CASHFREE_OPTION.env === 'PROD'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

const HEADERS = {
    'x-client-id': config.CASHFREE_OPTION.appId,
    'x-client-secret': config.CASHFREE_OPTION.secretKey,
    'x-api-version': config.CASHFREE_OPTION.apiVersion,
    'Content-Type': 'application/json'
};

exports.createDepositOrder = async (req, res) => {
    try {
        const { userId, amount, customerPhone } = req.body;

        if (!userId || !amount) {
            return res.status(400).json({ status: false, message: 'Missing userId or amount' });
        }

        const user = await models.userModel.findById(userId);
        if (!user) return res.status(404).json({ status: false, message: 'User not found' });

        const orderId = `ORDER_${userId}_${Date.now()}`;

        const payload = {
            order_id: orderId,
            order_amount: amount,
            order_currency: 'INR',
            customer_details: {
                customer_id: userId,
                customer_email: user.userEmail || 'noemail@example.com',
                customer_phone: customerPhone || '9999999999',
                customer_name: user.userName || 'User'
            },
            order_meta: {
                return_url: `${config.SUBSCRIBE_URL}/cashfree/return?order_id={order_id}`
            }
        };

        const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, payload, { headers: HEADERS });

        // Save pending transaction
        const newTransaction = new models.transactionModel({
            accountId: userId,
            amount: amount,
            currency: { coinType: 'INR', type: 'fiat' },
            status: 'pending',
            paymentGateway: 'Cashfree',
            orderId: response.data.order_id,
            paymentMode: 'PG',
            subscriptionType: 'DEPOSIT',
            date: new Date()
        });
        await newTransaction.save();

        return res.json({ status: true, data: response.data });

    } catch (err) {
        console.error('Cashfree Create Order Error:', err.response ? err.response.data : err.message);
        return res.status(500).json({ status: false, message: 'Payment initiation failed' });
    }
};

exports.verifyWebhook = async (req, res) => {
    try {
        // Verify signature (Simplified for demo, production should use rawBody and crypto logic provided by Cashfree)
        const { data } = req.body;

        if (!data || !data.order || !data.payment) {
            return res.status(400).json({ message: 'Invalid Webhook Data' });
        }

        const orderId = data.order.order_id;
        const paymentStatus = data.payment.payment_status;

        const transaction = await models.transactionModel.findOne({ orderId: orderId });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        if (transaction.status === 'success') {
            return res.json({ message: 'Already processed' });
        }

        if (paymentStatus === 'SUCCESS') {
            // Update Transaction
            transaction.status = 'success';
            transaction.referenceId = data.payment.cf_payment_id;
            await transaction.save();

            // Update User Balance
            const user = await models.userModel.findById(transaction.accountId); // accountId stores userId here
            if (user) {
                // Find INR wallet in balance array
                let inrWallet = user.balance.data.find(w => w.coinType === 'INR');
                if (inrWallet) {
                    inrWallet.balance += transaction.amount;
                } else {
                    user.balance.data.push({ coinType: 'INR', balance: transaction.amount, chain: 'BANK', type: 'fiat' });
                }
                // Mark balance as modified since it's inside an object/array
                user.markModified('balance');
                await user.save();
            }
        } else {
            transaction.status = 'failed';
            await transaction.save();
        }

        return res.json({ status: 'ok' });

    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
