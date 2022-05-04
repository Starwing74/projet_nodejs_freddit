const express = require('express');
const voteController = require('../Controllers/vote.controller');

const voteRouter = express.Router();

voteRouter.post('/up_post/:post_slug', voteController.upvotePost);
voteRouter.post('/down_post/:post_slug', voteController.downvotePost);
voteRouter.post('/up_comment/:comment_slug', voteController.upvoteComment);
voteRouter.post('/down_comment/:comment_slug', voteController.downvoteComment);

module.exports = voteRouter;