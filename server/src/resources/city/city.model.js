const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40
    },
},
{ timestamps: true });

const CityNative = mongoose.model('city',citySchema);

module.exports = {model_city: CityNative, schema_city: citySchema};