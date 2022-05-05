const sessiontesting = require("express-session");

const getSession = (req, res, next) => {

    sessiontesting({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized:true,
        cookie: { maxAge: 60000  },
        resave: false
    })

    next();
};

module.exports = getSession;