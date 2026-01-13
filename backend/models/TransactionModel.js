const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    txId: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    date: { type: Date, default: Date() },
    blockNumber: { type: String, default: '' },
    subscriptionType: { type: String, default: '' },
    currency: { type: Object },
    // New fields for Fiat/Payment Gateway
    status: { type: String, enum: ['pending', 'success', 'failed', 'refunded'], default: 'pending' },
    paymentGateway: { type: String, enum: ['Tatum', 'Cashfree', 'Manual'], default: 'Tatum' },
    orderId: { type: String, default: '' }, // Cashfree Order ID
    referenceId: { type: String, default: '' }, // Cashfree Reference ID
    paymentMode: { type: String, default: '' } // UPI, NetBanking, etc.
}, { autoIndex: true, timestamps: true });

ModelSchema.set('toObject', { virtuals: true });
ModelSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Transactions', ModelSchema);