const express = require('express');
const postController = require('../Controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.postPost);

postRouter.get('/page',postController.test);
postRouter.post('/post',postController.test2);

module.exports = postRouter;