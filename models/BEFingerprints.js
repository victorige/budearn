const mongoose = require('mongoose');

const BEFingerprintsSchema = new mongoose.Schema({
    fingerprint: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    time: {
        type: Date
    },

    
})

module.exports = mongoose.models.BEFingerprints || mongoose.model('BEFingerprints', BEFingerprintsSchema);