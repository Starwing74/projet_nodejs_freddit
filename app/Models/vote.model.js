const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    sign: {
        type: Boolean,
        required: true
    }
},{timestamps: true});

voteSchema.index({ post: 1, user: 1}, { unique: true });
voteSchema.index({ comment: 1, user: 1}, { unique: true });

const vote = mongoose.model('Vote', voteSchema);
module.exports = vote;