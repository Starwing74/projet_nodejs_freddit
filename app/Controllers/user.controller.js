const express = require("express");
const jwt = require('jsonwebtoken');

const User = require("../Models/user.model");
const Community = require("../Models/community.model");
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;
const cookieParser = require('cookie-parser');
const getSession = require('../Middleware/session');
const verifyToken = require('../Middleware/auth');
const TextPost = require("../Models/textPost.model");
const app = express();

app.use(cookieParser());

function postUser(req, res) {
    console.log("let's post are name!");

    let name = req.param("name");
    console.log(name);

    let password = req.param("password");
    console.log(password);

    let email = req.param("email");
    console.log(email);

    if (
        !email
        && !password
        && !name
    ) {
        return res.status(400).send('Parameters missing');
    }
    const user = new User({
        slug: "1",
        name: name,
        password: password,
        email: email
    });
    user.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })

};

function updateUser(req, res) {
    console.log(req.user);

    console.log(req.body.email + ", " + req.body.password + ", " + req.body.name);

    if(!req.body.email || !req.body.password || !req.body.name) {
        res.send("missing body");
    }
    else {
        User.findOneAndUpdate({"_id": req.user.userId}, {
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        })
            .then((result) => {
                res.send("update complet");
            }).catch((err) => {
            res.status(500).send(err);
        });
    }
}

function deleteUser(req, res) {
    console.log(req.user);

    User.findByIdAndDelete({"_id": req.user.userId})
        .then((result) => {
            res.send("delete complet");
        }).catch((err) => {
        res.status(500).send(err);
    });
};

function pageInscription(req, res){
    console.log('Welcome to my web server');
    res.sendFile('C:\\LP_SMIN\\M12_node_js\\Projet_Node_js\\freddit\\app\\Pages\\page1.html');
}

function pageConnexion(req, res){
    res.sendFile('C:\\LP_SMIN\\M12_node_js\\Projet_Node_js\\freddit\\app\\Pages\\pageConnexion.html');
}

function checkConnexion(req, res){
    console.log("-----------------------------------");
    console.log(req.session);
    console.log("-----------------------------------");
    console.log("checking connexion")

    let tmpPassword = req.param("password");
    console.log(tmpPassword);

    const encryptedPassword = bcrypt.hash(tmpPassword, 10);

    let tmpEmail = req.param("email");
    console.log(tmpEmail);

    User.findOne({ "password" : tmpPassword , "email" : tmpEmail })
        .then((result) => {
            if(result) {
                console.log("you are connected");
                console.log("result:" + result);

                const expireIn = "24hr";
                const token = jwt.sign({
                        userId: result._id,
                        userEmail: result.email
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    },
                    function(err, token) {
                        if (err) {
                            console.log("result: --------");
                            console.log(err);
                        } else {
                            console.log("result: --------");
                            console.log(token);
                        }
                    });

                return res.status(200).json('auth_ok');
            } else {
                console.log("you are not connected")
            }
        })
        .catch((err) => res.status(500).send(err));
}

function userJoinCommunity(req, res) {

    console.log("userJoinCommunity: ");
    console.log("--" + req.user.userId)
    console.log("--" + req.body.slug);

    Community.findOne({"users" : { $in : [req.user.userId]  }, "slug" : req.body.slug })
        .then((result) => {
            if(result) {
                console.log("this user is already in the community");
                res.send("you already joined the community")
            }
            else {
                console.log("this user is not in the community");
                Community.findOneAndUpdate({ "slug" : req.body.slug}, {$push: {users : req.user.userId}})
                    .then((result) => {
                        console.log(result)
                        res.send(result);
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            }

        }).catch((err) => {
        res.status(500).send(err);
    })
}

function userLeaveCommunity(req, res) {
    console.log("userLeaveCommunity: ");
    console.log("--" + req.user.userId)
    console.log("--" + req.body.slug);

    Community.findOne({"users" : { $in : [req.user.userId]  }, "slug" : req.body.slug })
        .then((result) => {
            if(result) {
                console.log("this user is already in the community");
                Community.findOneAndUpdate({ "slug" : req.body.slug}, {$pull: {users : req.user.userId}})
                    .then((result) => {
                        console.log(result)
                        res.send(result);
                    }).catch((err) => {
                    res.status(500).send(err);
                });
            }
            else {
                res.send("you are not in this community!")
            }

        }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    pageInscription, postUser, pageConnexion, checkConnexion, updateUser, deleteUser, userJoinCommunity, userLeaveCommunity
}