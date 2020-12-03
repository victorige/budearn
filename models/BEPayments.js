const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);

const BEPaymentsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hash: {
        type: String
    },
    addr: {
        type: String
    },
    value: {
        type: String
    },
    price: {
        type: Float
    },
    value: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now  
    },

    
})

module.exports = mongoose.models.BEPayments || mongoose.model('BEPayments', BEPaymentsSchema);