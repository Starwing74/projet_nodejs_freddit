const session = require("express-session");

const getSession = (req, res, next) => {

    session({ resave: true, secret: 'mysecret', saveUninitialized: true})

    req.session.mytoken = "test"

    next();
};

module.exports = getSession;