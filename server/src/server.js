const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get("/",async (req, res)=>{
    res.status(200).send({ send: "heilow!"});
});

app.listen(8082,()=>{
    console.log("Forums API listening on: 8082");
});