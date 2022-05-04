const mongoose = require('mongoose');

const textPostSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const textPost = mongoose.model('TextPost', textPostSchema);
module.exports = textPost;