const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    console.log(req.session.mytoken + "_______________________________");
    const token = req.session.mytoken;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = verifyToken;