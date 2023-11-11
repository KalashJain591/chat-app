const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');
const Message = require('../Models/messageModel');

// It is used to acess individual chats 
const accessChats = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log(req.body);
    console.log(req.id);
    console.log(req.email);
    if (!userId) {
        console.log("User Id not found in params");
        return res.status(400).json({ message: "No User ID found in params" });
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        users: { $all: [req.id, userId] }, // it is used to check the existance of both user and client in the chat 
    })
        .populate('users', '-password')
        .populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email '
    })

    if (isChat.length > 0) {
        console.log("chat is present already ");
        return res.send(isChat[0]);
    }
    else {
        try {

            const newChat = await Chat.create({
                chatName: "new chat",
                users: [userId, req.id],
                isGroupChat: false,
            });
            const FullChat = await Chat.findOne({ _id: newChat._id }).populate(
                "users",
                "-password"
            );
            console.log("new chat created ");
            res.status(200).json(FullChat);
        }
        catch (err) {
            console.log("error in access Chat ");
            res.status(400);
            throw new Error(err.message);
        }

    }
});

const fetchChats = asyncHandler(async (req, res) => {

});

module.exports = { accessChats ,fetchChats };