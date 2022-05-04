const Post = require('../Models/post.model');
const Community = require('../Models/community.model');
const User = require('../Models/user.model');
const MultimediaPost = require('../Models/multimediaPost.model');
const TextPost = require('../Models/textPost.model');
const Vote = require('../Models/vote.model');

// get frontpage posts with highest rated & max 3 per community

function getUserPosts(req, res) {
    let user;
    User.findOne({"slug": req.params.user_slug})
        .then((result) => {
            user = result._id;
        })
        .catch((err) => {
            res.status(500).send(err);
        })
        .then(
            () => {
                Post.find({"user" : user})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            }
        )

}

function getCommunityPosts(req, res) {
    let community;
    Community.find({"slug": req.params.community_slug})
        .then((result) => {
            community = result;
        })
        .catch((err) => {
            res.status(500).send(err);
        })
        .then(
            () => {
                Post.find({"community": community})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            }
        )
}

function getOne(req, res) {
    Post.findOne({"slug": req.params.slug})
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function post(req, res) {
    if (
        !req.body.slug
        && !req.body.title
        && !req.body.community
        && !req.body.user
        && !req.body.type
        && !req.body.content
    ) {
        return res.status(400).send('Parameters missing');
    }
    const post = new Post({
        slug: req.body.slug,
        title: req.body.title,
        community: req.body.community,
        user: req.body.user,
        tags: req.body.tags
    });

    post.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })

    if (req.body.type === "multimedia") {
        const multimediaPost = new MultimediaPost({
            content: req.body.content,
            post: post
        });
        multimediaPost.save()
            .then((result) => {
                res.send(result);
            }).catch((err) => {
            res.status(500).send(err);
        });
    } else if (req.body.type === "text") {
        const textPost = new TextPost({
            content: req.body.content,
            post: post
        });
        textPost.save()
            .then((result) => {
                res.send(result);
            }).catch((err) => {
            res.status(500).send(err);
        });
    }
}

function update(req, res) {
    if(!req.body.content) {
        return res.status(400).send('Parameters missing');
    }
    let post;
    Post.findOne({"slug": req.params.slug})
        .then((result) => {
            post = result;
        }).catch((err) => {
            res.status(500).send(err);
        })
        .then(() => {
            if (post.type === "multimedia") {
                /*MultimediaPost.findOneAndUpdate({"post": post}, {
                })
                    .then((result) => {
                        res.send(result);
                    }).catch((err) => {
                    res.status(500).send(err);
                });*/
            } else if (post.type === "text") {
                TextPost.findOneAndUpdate({"post": post}, {
                    "content": req.body.content
                })
                    .then((result) => {
                        res.send(result);
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            }
        }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    post, getUserPosts, getCommunityPosts, getOne, update
}