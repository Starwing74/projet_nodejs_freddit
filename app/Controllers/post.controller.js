const Post = require('../Models/post.model');
const Community = require('../Models/community.model');
const User = require('../Models/user.model');

function postPost(req, res) {
    Community.find().then((result) => {
        res.send(result);
    });
    if (
        !req.body.slug
        && !req.body.title
        && !req.body.community
        && !req.body.user
    ) {
        return res.status(400).send('Parameters missing');
    }
    const post = new Post({
        slug: req.body.slug,
        title: req.body.title,
        community: req.body.community,
        user: req.body.user
    });
    post.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    postPost
}