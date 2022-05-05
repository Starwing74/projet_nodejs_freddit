var cookieParser = require('cookie-parser');
const sessiontesting = require("express-session");

const verifyToken = (req, res, next) => {

    sessiontesting({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized:true,
        cookie: { maxAge: 60000  },
        resave: false
    })

    req.sessiontest = sessiontesting;

    return next();
};

module.exports = verifyToken;