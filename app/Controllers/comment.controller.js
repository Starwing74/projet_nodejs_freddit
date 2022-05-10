const Comment = require("../Models/comment.model");
const Post = require("../Models/post.model");
const Tags = require("../Models/tag.model");
const Communities = require("../Models/community.model");

function postComment(req, res){

    Post.findOne({"slug" : req.params.slug})
        .then((result) => {
            if(result){
                if(!req.body.content){
                    res.send("Content is mandatory");
                } else {
                    console.log("----------------------");
                    console.log(req.body.content);
                    console.log("req.user.userId: " + req.user.userId);
                    console.log("result: " + result._id);

                    if (!req.body.content) {
                        return res.status(400).send('Content is mandatory');
                    } else {
                        const comment = new Comment({
                            content: req.body.content,
                            author: req.user.userId,
                            post: result._id
                        });

                        comment.save()
                            .then((result) => {
                                res.send("comment add complete and finish");
                            }).catch((err) => {
                            res.status(500).send(err);
                        });
                    }
                }
            } else {
                res.send("this post doesnt exist");
            }
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function postCommentinComment(req, res){

    Post.findOne({"slug" : req.params.slug})
        .then((result) => {
            if(result){
                if(!req.body.content){
                    res.send("Content is mandatory");
                } else {
                    if (!req.body.content) {
                        return res.status(400).send('Content is mandatory');
                    } else {

                        Comment.findOne({"content" : req.params.content})
                            .then((result2) => {

                                if(result2){
                                    console.log("----------------------");
                                    console.log(req.body.content);
                                    console.log("req.user.userId: " + req.user.userId);
                                    console.log("result: " + result._id);
                                    console.log("result2: " + result2._id);

                                    const comment = new Comment({
                                        content: req.body.content,
                                        author: req.user.userId,
                                        post: result._id
                                    });

                                    comment.save()
                                        .then((result) => {
                                            res.send("comment add complete and finish");
                                        }).catch((err) => {
                                        res.send("error in result");
                                    })
                                } else {
                                    res.send("no comment exist");
                                }
                            }).catch((err) => {
                            res.send("error in result2");
                        });
                    }
                }
            } else {
                res.send("this post doesnt exist");
            }
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function listCommentsfromUser(req, res){
    Comment.find({"author" : req.user.userId})
        .then((result) => {
            const listComments = [];

            for(item of result) {
                console.log(item.content);
                listComments.push(item.content);
            }
            res.send(listComments);
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function listCommentsfromPost(req, res){
    Post.findOne({"slug" : req.params.slug})
        .then((result) => {
            Comment.find({"post" : result._id})
                .then((result) => {
                    const listComments = [];

                    for(item of result) {
                        console.log(item.content);
                        listComments.push(item.content);
                    }

                    res.send(listComments);
                }).catch((err) => {
                res.status(500).send(err);
            });
        }).catch((err) => {
        res.status(500).send(err);
    });
}

function deletebyUser(req, res){
    Comment.findOneAndDelete({"slug" : req.params.slug, "author" : req.user.userId, "content" : req.params.content})
        .then((result) => {
            if(result){
                res.send("delete complet");
            } else {
                res.send("this comment can not be delete");
            }
        }).catch((err) => {
        res.status(500).send(err);
    });
}

module.exports = {
    postComment, postCommentinComment, listCommentsfromPost, listCommentsfromUser, deletebyUser
}