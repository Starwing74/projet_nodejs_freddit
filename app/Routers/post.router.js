const express = require('express');
const postController = require('../Controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.post);
postRouter.post('/user/:user_slug', postController.getUserPosts);
postRouter.post('/community/:community_slug', postController.getCommunityPosts); // pourrait être l'index d'une communauté
postRouter.post('/:slug', postController.getOne);
postRouter.post('/update/:slug', postController.update);

module.exports = postRouter;