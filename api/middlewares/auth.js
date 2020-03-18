'use strict'
const jwt = require("jsonwebtoken");

module.exports = {
    ensureLoggedIn(req, res, next) {
        try {
            const authHeaderValue = req.headers.authorization;
            const token = jwt.verify(authHeaderValue, process.env.SECRET); //token contains user id token.id .. so you can use it in controller
            req.user_id = token.id;
            return next();
        } catch (e) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}