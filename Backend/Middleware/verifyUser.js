const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');
const cookieParser = require("cookie-parser")
require('dotenv').config();

const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token)
            return res.json("No Token Found");
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    return res.status(401).json({ message: "The Token is Wrong" });
                else {
                    req.email = decoded.email;
                    req.name = decoded.name;
                    next();
                }
            });
        }
    }
    catch (err) {
        res.status(401);
        console.log("Error in Verify User " + err);
        throw new Error("Not authorized , Token Failed");
    }
}

module.exports={verifyUser};