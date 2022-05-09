// we ended up not using it, as express-session doesn't seem to work from a next() middleware

const session = require("express-session");

const getSession = (req, res, next) => {

    session({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized:true,
        cookie: { maxAge: 60000  },
        resave: true
    })

    next();
};

module.exports = getSession;