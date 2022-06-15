const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
},
{ timestamps: true });

const CityNative = mongoose.model('city',citySchema);

module.exports = CityNative;