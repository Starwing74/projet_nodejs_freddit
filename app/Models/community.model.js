const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    icon: {

    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;