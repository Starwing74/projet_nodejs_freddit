const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
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