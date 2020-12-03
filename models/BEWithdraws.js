const mongoose = require('mongoose');

const BEWithdrawsSchema = new mongoose.Schema({
    user: {
        type: String
    },
    btcaddress: {
        type: String,
    },
    amount: {
        type: String
    },
    status: {
        type: Number
    },
    date: {
        type: Date, 
        default: Date.now 
    },

    
})

module.exports = mongoose.models.BEWithdraws || mongoose.model('BEWithdraws', BEWithdrawsSchema);