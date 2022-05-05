const express = require('express');
const userController = require('../Controllers/user.controller');
const auth = require("../Middleware/auth");
const session = require("../Middleware/session");
var cookieParser = require('cookie-parser');
const sessiontesting = require("express-session");

const userRouter = express.Router();

userRouter.get('/page', userController.pageInscription);
userRouter.post('/post', userController.postUser);
userRouter.get('/connexion', userController.pageConnexion);
userRouter.get('/checkConnexion', userController.checkConnexion);
userRouter.get('/update', auth,userController.updateUser);

userRouter.use(cookieParser());

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