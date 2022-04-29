const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags"
    }
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;