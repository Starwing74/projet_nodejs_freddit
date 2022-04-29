const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
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

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;