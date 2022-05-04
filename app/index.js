require('dotenv').config();
const postRouter = require('./Routers/post.router');
const userRouter = require('./Routers/user.router');
const express = require("express");
const path = require('path');
let bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postRouter);

app.use('/users', userRouter)


