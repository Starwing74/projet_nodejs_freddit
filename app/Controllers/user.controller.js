const express = require("express");
const jwt = require('jsonwebtoken');

const User = require("../Models/user.model");
const Community = require("../Models/community.model");
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;
const TextPost = require("../Models/textPost.model");
const path = require("path");
const app = express();

function postUser(req, res) {
    console.log("let's post are name!");

    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');



    let name = req.param("name");
    console.log(name);

    let password = req.param("password");
    console.log(password);

    encryptedPassword = bcrypt.hashSync(password, 5);

    console.log(encryptedPassword);

    let email = req.param("email");
    console.log(email);

    if (!email && !encryptedPassword && !name) {
        return res.status(400).send('Parameters missing');
    }

    if (!email || !password || !name) {
        return res.send('Parameters missing');
    } else {
        User.findOne({"email" : email})
            .then((result) => {
                if(result){
                    res.send("this mail already exist");
                } else {
                    User.findOne({"slug" : slugify(name)})
                        .then((result) => {
                            if(result){
                                res.send("this name is already taken");
                            } else {
                                const user = new User({
                                    slug: slugify(name),
                                    name: name,
                                    password: encryptedPassword,
                                    email: email
                                });
                                user.save()
                                    .then((result) => {
                                        res.send(result);
                                    }).catch((err) => {
                                    res.send("error in post user");
                                })
                            }
                        }).catch((err) => {
                        res.send("error in slug");
                    });
                }
            }).catch((err) => {
            res.send("error in email");
        });
    }
};

function updateUser(req, res, next) {
    console.log("---res.user.userId: " + req.user.userId);

    req.body.email = "test";
    req.body.password = "test";
    req.body.name = "test";

    console.log(req.body.email + ", " + req.body.password + ", " + req.body.name);

    encryptedPassword = bcrypt.hashSync(req.body.password, 5);

    if(!req.body.email || !req.body.password || !req.body.name) {
        res.send("missing body");
    }
    else {
        User.findOneAndUpdate({"_id": req.user.userId}, {
            "name": req.body.name,
            "email": req.body.email,
            "password": encryptedPassword
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
    res.sendFile(path.join(__dirname, '..', 'Pages', 'page1.html'));
}

function pageConnexion(req, res){
    res.sendFile(path.join(__dirname, '..', 'Pages', 'pageConnexion.html'));
}

function checkConnexion(req, res, next){
    console.log("-----------------------------------");
    console.log(req.session);
    console.log("-----------------------------------");
    console.log("checking connexion")

    let tmpPassword = req.param("password");
    console.log(tmpPassword);

    let tmpEmail = req.param("email");
    console.log(tmpEmail);

    User.findOne({ "email" : tmpEmail })
        .then((result) => {
            if(result) {
                console.log("you are connected");
                console.log("result:" + result);

                bcrypt.compare(tmpPassword, result.password)
                    .then(doMatch=> {
                        if (doMatch) {
                            console.log("good password");

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
                                        req.session.mytoken = token;
                                        req.session.username = result.name;
                                        req.session.score = result.score;
                                        req.session.save(() => {
                                            req.session.mytoken = token;
                                            req.session.username = result.name;
                                            req.session.score = result.score;
                                            return next()
                                        });
                                    }
                                });
                            return res.status(200).json('auth_ok');
                        } else {
                            res.send("wrong password");
                        }
                    }).catch((err) => {
                    res.status(500).send(err);
                })
            } else {
                console.log("you are not connected")
                res.send("wrong email");
            }
        }).catch((err) => {
        res.status(500).send(err);
    })
}

function userJoinCommunity(req, res) {

    console.log("userJoinCommunity: ");
    console.log("--" + req.user.userId);
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

function deconnexion(req, res){
    req.session.destroy();
    res.redirect('/connexion');
}

function infoUser(req, res){

    console.log("session: " + req.session.username + " " + req.session.mytoken + " " + req.session.score )

    User.findOne({"_id" : req.user.userId})
        .then((result) => {
            res.send(result);
        }).catch((err) => {
        res.status(500).send(err);
    })
}


module.exports = {
    pageInscription, postUser, pageConnexion, checkConnexion, updateUser, deleteUser, userJoinCommunity,
    userLeaveCommunity, deconnexion, infoUser
}
