const express = require('express');
const userController = require('../Controllers/user.controller');
const getSession = require("../Middleware/session");
const verifyToken = require("../Middleware/auth");
const session = require("express-session");
const path = require("path");

const userRouter = express.Router();

userRouter.get('/register', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.post('/connexion', userController.pageConnexion);
userRouter.post('/checkConnexion', userController.checkConnexion);
userRouter.get('/update', verifyToken,userController.updateUser);
userRouter.delete('/delete', verifyToken, userController.deleteUser);
userRouter.put('/joinCommunity', verifyToken, userController.userJoinCommunity);
userRouter.put('/leaveCommunity', verifyToken, userController.userLeaveCommunity);
userRouter.post('/deconnexion', userController.deconnexion);
userRouter.post('/info', verifyToken, userController.infoUser);

module.exports = userRouter;