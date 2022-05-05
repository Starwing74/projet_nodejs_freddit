require('dotenv').config();

const express = require("express");
const path = require('path');
let bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");

const app = express();
const port = process.env.PORT;

const postRouter = require('./Routers/post.router');
const userRouter = require('./Routers/user.router');
const voteRouter = require('./Routers/vote.router');

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

let bucket;
mongoose.connection.on("connected", () => {
    let db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "newBucket"
    });
    console.log(bucket);
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/vote', voteRouter);
app.use('/users', userRouter);


