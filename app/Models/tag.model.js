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
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

const tag = mongoose.model('Tag', tagSchema);
module.exports = tag;