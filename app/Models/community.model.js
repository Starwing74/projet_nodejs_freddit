const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    slug: {
        type: String,
        required: true
    },
    icon: {

    }
},{timestamps: true});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;