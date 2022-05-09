const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

class GridFsBucketConnectionSingleton {

    static #bucket;
    static #gfs;

    static createNewBucket() {
        GridFsBucketConnectionSingleton.#bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'multimedia_files' });
        GridFsBucketConnectionSingleton.#gfs = Grid(mongoose.connection.db, mongoose.mongo);
        GridFsBucketConnectionSingleton.#gfs.collection('multimedia_files');
    }

    static getBucket() {
        return GridFsBucketConnectionSingleton.#bucket
    }

    static getGfs() {
        return GridFsBucketConnectionSingleton.#gfs
    }
}

module.exports = GridFsBucketConnectionSingleton;