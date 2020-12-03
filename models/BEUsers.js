const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);

const BEUsersSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    ip: {
        type: String
    },
    joindate: { 
        type: Date, 
        default: Date.now 
    },
    referral: {
        type: String
    },
    token: {
        type: String
    },
    setup: {
        type: Number
    },
    name: {
        type: String
    },
    gender: {
        type: Number
    },
    country: {
        type: String
    },
    balance: {
        type: Float,
        default: 0.00
    },
    daily: {
        type: Number
    },
    adnum: {
        type: Number
    },
    adclick: {
        type: Number
    },
    page: {
        type: Number
    },
    adclicktime: { 
        type: Date, 
        default: Date.now 
    },
    status: {
        type: Number
    },
    share: {
        type: Number,
        default: null
    },
    shareday: {
        type: Number
    },



})

module.exports = mongoose.models.BEUsers || mongoose.model('BEUsers', BEUsersSchema);