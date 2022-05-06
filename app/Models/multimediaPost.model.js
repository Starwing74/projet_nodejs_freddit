const mongoose = require('mongoose');

const multimediaPostSchema = mongoose.Schema({
    multimedia_file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GFS'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const multimediaPost = mongoose.model('MultimediaPost', multimediaPostSchema);
module.exports = multimediaPost;