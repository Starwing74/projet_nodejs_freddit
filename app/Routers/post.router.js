const express = require('express'),
    postController = require('../Controllers/post.controller'),
    multer = require('multer'),
    mongoose = require("mongoose"),
    {GridFsStorage} = require("multer-gridfs-storage"),
    path = require("path"),
    conn = mongoose.connection,
    Grid = require('gridfs-stream'),
    crypto = require('crypto');

const GFS = require("../Models/gridFS.model");

const mongoURI = process.env.DB_CONNECTION;

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'multimedia_files' //collection name
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

const postRouter = express.Router();

postRouter.post('/create', upload.single('file'), postController.post);
postRouter.post('/user/:user_slug', postController.getUserPosts);
postRouter.get('/community/:community_slug', postController.getCommunityPosts); // pourrait être l'index d'une communauté
postRouter.post('/get', postController.getOne);
postRouter.post('/update/:slug', postController.update);
postRouter.get('/show/:slug', postController.show);

module.exports = postRouter;