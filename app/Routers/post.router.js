const express = require('express');
const postController = require('../Controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.postPost);
postRouter.post('/user_posts/:user_slug', postController.getUserPosts);
postRouter.post('/community_posts/:community_slug', postController.getCommunityPosts); // pourrait être l'index d'une communauté
postRouter.post('/post/:slug', postController.getOne);

module.exports = postRouter;