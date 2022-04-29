const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#6b6b6b'
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const multimediaPost = mongoose.model('Post', multimediaPostSchema);
module.exports = multimediaPost;