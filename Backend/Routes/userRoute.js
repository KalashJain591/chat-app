const mongoose = require('mongoose');
const userModel = require('../Models/userModel');
const express = require("express");
require('dotenv').config();
// const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const mailer = require('../Routes/mail');
const app = express();
const router = express.Router();

app.use(express.json());
// app.use(cookieParser());
// console.log(process.env.JWT_SECRET);

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all the required fields" });
        }

        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({ name: name, email: email, password: hash });

        if (newUser) {
            const token = jwt.sign({ email: newUser.email, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            res.status(201).json(newUser); // 201 indicates a resource was created
        } else {
            return res.status(500).json({ message: "Failed to create a new user" });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({ message: "User does not exists " });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (pass == true) {
            return res.status(200).json({ message: "Password  match" });
        }
        else {
            return res.status().json({ message: "Password don't match" });
        }
    }
    catch (error) {
        console.error("Error during Login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.use('/auth', router); // Mount the router under the '/auth' path

// Other app configurations and routes


module.exports = router;