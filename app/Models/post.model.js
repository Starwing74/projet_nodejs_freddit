const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;