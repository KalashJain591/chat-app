const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');
const cookieSession=require("cookie-session");
const cookieParser = require("cookie-parser");
require('dotenv').config();
// router.use(cookieParser());
const   verifyUser = async (req, res, next) => {
    // console.log(req.cookies.token);
    const token = req.cookies.token;
    // console.log(token);
    // res.json(token);
    // console.log(process.env.JWT_SECRET);

    try {
        if (!token)
            return res.json("No Token Found");
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err)
                    return res.status(401).json({ message: "The Token is Wrong" });
                else {
                    req.id = decoded.id;
                    req.email = decoded.email;
                    console.log(req.id+" "+req.email);
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