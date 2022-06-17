const mongoose = require('mongoose');
const { Schema } = mongoose;
const CityStructures = require('../city/city.model');
const citySchema = CityStructures.schema_city;

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
    text: {
        type: String,
        required: true,
        maxlength: 250
    },
    city: citySchema
},
{ timestamps: true });

const BuildingNative = mongoose.model('building',buildingSchema);

module.exports = BuildingNative;