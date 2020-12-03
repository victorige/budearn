const mongoose = require('mongoose');

const BEPicturesSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    pictures: {
        type: Array
    },

    
})

module.exports = mongoose.models.BEPictures || mongoose.model('BEPictures', BEPicturesSchema);