const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const multimediaPostSchema = mongoose.Schema({
    content: {
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
},{timestamps: true});

multimediaPostSchema.plugin(AutoIncrement, {inc_field: 'multimediaPostId'});

const MultimediaPost = mongoose.model('MultimediaPost', multimediaPostSchema);
module.exports = MultimediaPost;