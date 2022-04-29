const express = require('express');
const postController = require('../Controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.postPost);

module.exports = postRouter;