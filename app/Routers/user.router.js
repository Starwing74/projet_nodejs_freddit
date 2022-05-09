const express = require('express');
const userController = require('../Controllers/user.controller');
const verifyToken = require("../Middleware/auth");

const userRouter = express.Router();

userRouter.get('/register', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.get('/connexion', userController.pageConnexion);
userRouter.get('/checkConnexion', userController.checkConnexion);
userRouter.put('/update', verifyToken, userController.updateUser);
userRouter.delete('/delete', verifyToken, userController.deleteUser);
userRouter.put('/joinCommunity', verifyToken, userController.userJoinCommunity);
userRouter.put('/leaveCommunity', verifyToken, userController.userLeaveCommunity);

module.exports = userRouter;