require('dotenv').config();
const express = require("express");
const path = require('path');
const app = express();

const mongoose = require('mongoose');

const port = process.env.PORT;
/**
 * password: FJbwSvBOP2gcfI1c
 */
mongoose.connect(
    process.env.DB_CONNECTION
).then((res) => {
    console.log('connected to database');
}).then((res) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}).catch((err) => {
    console.log(err);
})

app.use(express.json());

