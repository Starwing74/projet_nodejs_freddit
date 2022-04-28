const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const  userSchema = mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    karma: {
        type: Number,
        default: 0
    },
    icon: {
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    communities: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }/*,
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    */
},{timestamps: true});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

const User = mongoose.model('User', userSchema);
module.exports = User;