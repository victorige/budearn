const mongoose = require('mongoose');

const BEInfosSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    daily: {
        type: Number
    },
    nextdate: {
        type: Date
    },

    
})

module.exports = mongoose.models.BEInfos || mongoose.model('BEInfos', BEInfosSchema);