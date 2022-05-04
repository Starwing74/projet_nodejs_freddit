const Post = require("../Models/post.model");
const Vote = require("../Models/vote.model");
const User = require("../Models/user.model");

function upvotePost(req,res) {
    let post;
    Post.findOne({"slug": req.params.post_slug})
        .then((result) => {
            post = result;
            voteHelper(req, res, post, true);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

function downvotePost(req,res) {
    let post;
    Post.findOne({"slug": req.params.post_slug})
        .then((result) => {
            post = result;
            voteHelper(req, res, post, false);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

function upvoteComment(req,res) {
    let comment;
    Comment.findOne({"slug": req.params.comment_slug})
        .then((result) => {
            comment = result;
            voteHelper(req, res, comment, true);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

function downvoteComment(req,res) {
    let comment;
    Comment.findOne({"slug": req.params.comment_slug})
        .then((result) => {
            comment = result;
            voteHelper(req, res, comment, false);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

function voteHelper(req, res, subject, sign) {
    let existingVote;
    Vote.findOne({"post": subject, "user": "626b914dc55258d4e914ae55"/*req.user*/ })
        .then((resultVote) => {
            existingVote = resultVote;
        })
        .catch((err) => {
            res.status(500).send(err);
        })
        .then(() => {
            User.findOne(subject.user)
                .then((result) => {
                    const user = result;
                    if (existingVote === null){
                        let vote;
                        if (subject instanceof Post) {
                            vote = new Vote({
                                post: subject,
                                user: "626b914dc55258d4e914ae55"/*req.user*/,
                                sign: sign
                            });
                        } else {
                            vote = new Vote({
                                comment: subject,
                                user: "626b914dc55258d4e914ae55"/*req.user*/,
                                sign: sign
                            });
                        }
                        vote.save()
                            .then(() => {
                                if(sign === true){
                                    subject.score++;
                                    user.score++;
                                } else {
                                    subject.score--;
                                    user.score--;
                                }
                                subject.save();
                                user.save();
                                res.send(subject);
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    } else if (existingVote.sign === !sign) {
                        existingVote.sign = sign;
                        existingVote.save()
                            .then(() => {
                                if(sign === true){
                                    subject.score = subject.score+2;
                                    user.score = user.score+2;
                                } else {
                                    subject.score = subject.score-2;
                                    user.score = user.score-2;
                                }
                                subject.save();
                                user.save();
                                res.send(subject);
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    } else {
                        /*const voteSign = sign ? "upvote" : "downvote";
                        const subjectType = (subject instanceof Post) ? "post" : "comment";
                        res.status(403).send(`you cannot ${voteSign} the same ${subjectType} twice!`);*/

                        // deleting existing vote to make it neutral on second hit
                        Vote.findOneAndDelete(existingVote)
                            .then(() => {
                                if(sign === true) {
                                    subject.score = subject.score-1;
                                    user.score = user.score-1;
                                } else {
                                    subject.score = subject.score+1;
                                    user.score = user.score+1;
                                }
                                subject.save()
                                    .then(() => {
                                        user.save()
                                            .then(() => {
                                                res.send("vote neutralized");
                                            })
                                            .catch((err) => {
                                                res.status(500).send(err);
                                            });
                                    })
                                    .catch((err) => {
                                        res.status(500).send(err);
                                    });
                            })
                            .catch((err) => {
                                res.status(500).send(err);
                            });
                    }
                })
        })
}

module.exports = {
    upvotePost, downvotePost, upvoteComment, downvoteComment
}