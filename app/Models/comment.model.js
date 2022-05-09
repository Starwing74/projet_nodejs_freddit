const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const  commentSchema = mongoose.Schema({
    score: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }

},{timestamps: true});

commentSchema.plugin(AutoIncrement, {inc_field: 'commentId'});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;