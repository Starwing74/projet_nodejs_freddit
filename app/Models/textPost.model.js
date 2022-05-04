const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


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

textPostSchema.plugin(AutoIncrement, {inc_field: 'textPostId'});

const TextPost = mongoose.model('TextPost', textPostSchema);
module.exports = TextPost;