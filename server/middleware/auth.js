const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.header("access-token");
    if(!token) return res.status(401).send("Access denied. No token provided");

    try {
        // console.log(token);
        const decodedToken = jwt.verify(token, "SECRET_KEY");
        console.log(decodedToken);
        if(req.params.id && req.params.id !== decodedToken.username){
            throw "Invalid id";
        }
        else{
            next();
        }
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}

module.exports = auth;