const User = require("../Models/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;

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
    console.log("function updateUser: ");
    var data = sessionStorage.getItem('token');
    console.log(data);
    req.user = data;
}

function deleteUser(req, res) {

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

    User.findOne({password: tmpPassword})
        .then((result) => {
            if(result) {
                console.log("you are connected");
                console.log("result:" + result);

                const expireIn = 24 * 60 * 60;
                const token    = jwt.sign({
                        userId: result._id,
                        userEmail: result.email
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                console.log("result: --------");
                console.log(token);

                sessionStorage.getItem("autosave");

                res.header('Authorization', 'Bearer ' + token);

                return res.status(200).json('auth_ok');
            } else {
                console.log("you are not connected");
            }
        })
        .catch((err) => res.status(500).send(err));
}

module.exports = {
    pageInscription, postUser, pageConnexion, checkConnexion, updateUser
}