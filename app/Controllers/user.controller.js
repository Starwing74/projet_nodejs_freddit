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

    encryptedPassword = bcrypt.hashSync(password, 5);

    console.log(encryptedPassword);

    let email = req.param("email");
    console.log(email);

    User.findOne({"email" : email})
        .then((result) => {
            if(result){
                res.send("this mail already exist");
            } else {
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
                    password: encryptedPassword,
                    email: email
                });
                user.save()
                    .then((result) => {
                        res.send(result);
                    }).catch((err) => {
                    res.status(500).send(err);
                })
            }
        }).catch((err) => {
        res.send("error");
    });
};

function updateUser(req, res) {


    console.log("mytoken: " + req.session.mytoken)
    res.send(req.session.mytoken);

    /*console.log(req.body.email + ", " + req.body.password + ", " + req.body.name);

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
    }*/
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

    console.log(req.param("password"));
    console.log(req.param("email"));

    const password = req.param("password");
    const email = req.param("email");

    User.findOne({"email":email})
        .then((result) => {
            console.log("result.password: " + result.password);
            console.log("password: " + password);
            if(result){
                bcrypt.compare(password, result.password)
                    .then(doMatch=>{
                        if(doMatch){
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
                                        console.log("______" + req.session.mytoken + "______")
                                    }
                                });

                            return res.status(200).json('auth_ok');
                        }else{
                            res.send("wrong password");
                        }
                    }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch((err) => {res.send("your email doesnt exist")})
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