require('dotenv').config();

const express = require("express");
const path = require('path');
let bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");
const GridFsBucketConnection = require("./Singletons/gridFsBucketConnection.singleton");

const postRouter = require('./Routers/post.router');
const userRouter = require('./Routers/user.router');
const voteRouter = require('./Routers/vote.router');
const Grid = require("gridfs-stream");

const app = express();
const port = process.env.PORT;
const conn = mongoose.connection;

conn.once('open', GridFsBucketConnection.createNewBucket);

/**
 * password: FJbwSvBOP2gcfI1c
 */
mongoose.connect(process.env.DB_CONNECTION)
    .then((res) => {
        console.log('connected to database');
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .then(() => {
    })
    .catch((err) => {
    console.log(err);
})




app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/vote', voteRouter);
app.use('/users', userRouter);



