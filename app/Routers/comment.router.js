const express = require('express');
const commentController = require('../Controllers/comment.controller');
const getSession = require("../Middleware/session");
const verifyToken = require("../Middleware/auth");
const session = require("express-session");
const path = require("path");

const commentRouter = express.Router();

commentRouter.post('/newComment/:slug', verifyToken, commentController.postComment);
commentRouter.post('/newComment/:slug/:content', verifyToken, commentController.postCommentinComment);
commentRouter.get('/listCommentsbyUser', verifyToken, commentController.listCommentsfromUser);
commentRouter.get('/listCommentsbyPost/:slug', verifyToken, commentController.listCommentsfromPost);

module.exports = commentRouter;