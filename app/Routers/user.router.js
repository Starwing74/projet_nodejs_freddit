const express = require('express');
const userController = require('../Controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/page', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.get('/connexion', userController.pageConnexion);
userRouter.get('/checkConnexion', userController.checkConnexion);

module.exports = userRouter;