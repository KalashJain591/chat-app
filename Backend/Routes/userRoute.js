const mongoose = require('mongoose');
const express = require("express");
const { verifyUser } = require('../Middleware/verifyUser');
const { registerUser,login,getAllUser } = require('../Controllers/userController');
const router = express.Router();


// console.log(process.env.JWT_SECRET);


router.post('/register', registerUser);
router.post('/login' ,login);
router.get('/',verifyUser ,getAllUser);
// router.get('/',verifyUser );

// Other app configurations and routes


module.exports = router;