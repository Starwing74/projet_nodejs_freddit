const express = require('express');
const userController = require('../Controllers/user.controller');
const sessiontesting = require("express-session");
const getSession = require("../Middleware/session");
const verifyToken = require("../Middleware/auth");

const userRouter = express.Router();

userRouter.get('/page', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.get('/connexion', userController.pageConnexion);
userRouter.get('/checkConnexion', getSession, userController.checkConnexion);
userRouter.put('/update', getSession, verifyToken, userController.updateUser);
userRouter.delete('/delete', getSession, verifyToken, userController.deleteUser);
userRouter.put('/joinCommunity', getSession, verifyToken, userController.userJoinCommunity);
userRouter.put('/leaveCommunity', getSession, verifyToken, userController.userLeaveCommunity);

userRouter.use(sessiontesting({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 60000  },
    resave: false
}));

userRouter.get("/testing", function(req, res) {
    sessiontesting.fullname = "testting testing";
    console.log(sessiontesting)
});

module.exports = userRouter;