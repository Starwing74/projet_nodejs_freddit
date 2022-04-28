const mongoose = require('mongoose');

const multimediaPostSchema = mongoose.Schema({
    content: {
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const multimediaPost = mongoose.model('Post', multimediaPostSchema);
module.exports = multimediaPost;