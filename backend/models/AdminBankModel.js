const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    bankName: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    upiId: { type: String, required: true },
    qrImageUrl: { type: String }, // URL to the QR code image
    isActive: { type: Boolean, default: true },
    dailyLimit: { type: Number, default: 100000 },
    currentCollection: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('AdminBank', ModelSchema);
