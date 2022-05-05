const express = require('express');
const userController = require('../Controllers/user.controller');
const sessiontesting = require("express-session");
const getSession = require("../Middleware/session");
const verifyToken = require("../Middleware/auth");

const userRouter = express.Router();

userRouter.get('/page', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.get('/connexion', userController.pageConnexion);
userRouter.post('/checkConnexion', getSession, userController.checkConnexion);
userRouter.post('/update', getSession, verifyToken, userController.updateUser);


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