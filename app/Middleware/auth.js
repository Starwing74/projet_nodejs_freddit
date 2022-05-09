const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    console.log(req.session);
    const test = req.session.mytoken + "";
    const token = test;

    if(token){
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
        console.log(decoded);
        console.log("req.user.userId:" + req.user.userId);
    } else {
        res.send("You can't connect");
    }

    next()
};

module.exports = verifyToken;