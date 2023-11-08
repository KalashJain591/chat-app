const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const userModel = require('../Models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const cookieSession=require("cookie-session");

require('dotenv').config();

const getAllUser = asyncHandler(async (req, res) => {
    const user =await userModel.findOne({email:req.email});
    // res.json(user._id)
    const keyword = {};
    if(req.query.name)
    keyword.name=req.query.name;
    if(req.query.email)
    keyword.email=req.query.email;
    
    //   console.log(req.query);
    console.log(keyword);
    console.log(req.user);
    const users = await userModel.find(keyword).find({_id:{$ne:user._id}});
    console.log(users);
    // const users = userModel.find(keyword)
    // console.log(keyword);
    res.status(200).send(users);

});

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const user = await userModel.findOne({  email });

    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name: name, email: email, password: hash });

    if (newUser) {
        const token = jwt.sign({ email: newUser.email, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json(newUser); // 201 indicates a resource was created
    } else {
        res.status(400);
        throw new Error("Failed to create a new user");
    }

   
    // res.status(500).json({ message: "Internal server error" });

});

const login = asyncHandler(async (req, res) => {

    console.log("reached zsss");
    const { email, password } = req.body;
    console.log(req.body);
    // console.log(password);
    const user = await userModel.findOne({ email: email })
    if (!user) {
        console.log("reached zsss asd");
        res.status(400);
        throw new Error("User does not exists ");

    }
    const pass = await bcrypt.compare(password, user.password);
    if (pass == true) {
        console.log("reached zsss");
        res.status(200).json("Password  match");
    }
    else {
        res.status(400)
        throw new Error("User does not exists");
    }


    // console.log("reached 123 ");

    // console.error("Error during Login:", error);
    // res.status(500).json({ message: "Internal server error" });


});




module.exports = { getAllUser, registerUser, login };