const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT} = require('./config.js');
const db = require('./db');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/",async (req, res)=>{
    res.status(200).send({ send: "Hello! Welcome to the cities and buildings API!"});
});

const cityRouter = require('./resources/city/city.router');
app.use('/city', cityRouter);

const buildingRouter = require('./resources/building/building.router');
app.use('/building', buildingRouter);

const startServer = async () =>{
    await db.connect();
    app.listen(PORT,()=>{
        console.log(`Cities API listening on: ${PORT}`);
    });
}

startServer();
console.log()

