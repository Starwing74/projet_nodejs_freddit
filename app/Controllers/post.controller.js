const Post = require('../Models/post.model'),
    Community = require('../Models/community.model'),
    User = require('../Models/user.model'),
    MultimediaPost = require('../Models/multimediaPost.model'),
    TextPost = require('../Models/textPost.model'),
    Vote = require('../Models/vote.model'),
    GFS = require("../Models/gridFS.model");

const {now} = require("mongoose");
const GridFsBucketConnection = require  ("../Singletons/gridFsBucketConnection.singleton");

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
            if (req.body.type === "multimedia") {
                if(!req.file) {
                    return res.status(400).send('Parameters missing 2');
                }
                const multimediaPost = new MultimediaPost({
                    multimedia_file: req.file.id,
                    post: post
                });

                multimediaPost.save()
                    .then((result) => {
                        console.log("post :" + post);
                        post.updateOne({"multimediaPost": multimediaPost})
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    }).catch((err) => {
                        res.status(500).send(err);
                    });
            } else if (req.body.type === "text") {
                if(!req.body.content) {
                    return res.status(400).send('Parameters missing');
                }
                const textPost = new TextPost({
                    content: req.body.content,
                    post: post
                });
                textPost.save()
                    .then((result) => {
                        post.updateOne({"textPost": textPost})
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            }
        }).catch((err) => {
        res.status(500).send(err);
    })
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

function show(req, res) {
    let postData;
    Post.findOne({"slug": req.params.slug})
        .then((result) => {
            postData = result;
            if (result.multimediaPost !== undefined) {
                MultimediaPost.findOne({"_id" : result.multimediaPost})
                    .then((result) => {
                        GFS.findOne({"_id" : result.multimedia_file})
                            .then((result) => {
                                GridFsBucketConnection.getGfs().files.findOne({"filename": result.filename}, (err, file) => {
                                    if (!file || file.length === 0) {
                                        return res.status(404).json({err: 'No File Exists'});
                                    } else {
                                        // Check if is image or video
                                        if (
                                            file.contentType === "image/jpeg"
                                            || file.contentType === "image/png"
                                            || file.contentType === "video/mp4"
                                            || file.contentType === "video/mov"
                                        ) {
                                            const readstream = GridFsBucketConnection.getBucket().openDownloadStreamByName(file.filename);
                                            readstream.post_data = postData; // get post data
                                            readstream.pipe(res);
                                        } else {
                                            res.status(404).json({err: 'Not an image'});
                                        }
                                    }
                                });
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            } else if (result.textPost !== undefined) {
                TextPost.findOne({"_id": result.textPost})
                    .then((result) => {
                        postData.content = result.content;
                        res.send(postData);
                    })
            }
        });
}

module.exports = {
    post, getUserPosts, getCommunityPosts, getOne, update, show
}