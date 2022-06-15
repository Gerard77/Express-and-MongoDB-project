const mongoose = require('mongoose');
const {MONGO_URL} = require('./config.js');

const connect = async () =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("connection to MongoDB achieved");
    } catch (error) {
        console.log("connection to MongoDB failed:");
        console.log(error);
    }
}

module.exports = {
    connect
}