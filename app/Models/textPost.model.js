const mongoose = require('mongoose');

const textPostSchema = mongoose.Schema({
    content: {
        type: Text,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const textPost = mongoose.model('Post', textPostSchema);
module.exports = textPost;