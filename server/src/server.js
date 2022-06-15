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
    res.status(200).send({ send: "heilow!"});
});

const cityRouter = require('./resources/city/city.router');
app.use('/city', cityRouter);

const startServer = async () =>{
    await db.connect();
    app.listen(8082,()=>{
        console.log("Forums API listening on: 8082");
    });
}

startServer();
console.log()

