const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');
const Message = require('../Models/messageModel');

// It is used to acess individual chats 
const accessChats = asyncHandler(async (req, res) => {
    const { userId } = req.body; // This is the Id of the user with whom , signed user want to chat
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
    const userId = req.id; // This is the id of the current user .
    console.log(userId);
    try {
        var allChats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .populate('users', '-password')
            .populate('latestMessage')
            .populate('groupAdmin')
            .sort({ updatedAt: -1 })
        allChats = await User.populate(allChats, {
            path: 'latestMessage.sender',
            select: 'name pic email '
        })

        if (allChats)
            return res.status(400).json(allChats);
        else
            return res.status(400).json({ message: "no Chats found" });
    }
    catch (err) {
        res.status(200);
        throw new Error(err.message);
    }
});

const createGroupChats = asyncHandler(async (req, res) => {
    const userId = req.id;
    const { users, name } = req.body;
    if (!users || !name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    var members = JSON.parse(users);
    if (members.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }
    members.push(userId);

    const newGroup = await Chat.create({
        chatName: "GroupChat",
        isGroupChat: true,
        groupAdmin: userId,
        users: members
    });
    const fullGroupChat = await Chat.findOne({ _id: newGroup._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
});

const renameGroup = asyncHandler(async (req, res) => {
    const { newName, chatId } = req.body;
    console.log(chatId);
    const chatElem = await Chat.findById(chatId)
    if (!chatElem) {
        return res.status(400).send({ message: "Chat not exists" })
    }
    const adminId = chatElem.groupAdmin;
    console.log(adminId);
    console.log(req.id);
    if (adminId != req.id) {
        return res.status(400).send({ message: "Only Admin can rename" })
    }

    const updatedChat = await Chat.findByIdAndUpdate({ _id: chatId }, { chatName: newName }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');
    if (!updatedChat)
        return res.status(400).send({ message: "Some error occured in rename group" })
    else {
        console.log(updatedChat);
        res.status(200).json(updatedChat);
    }
});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { removeId, chatId } = req.body;
    const chatElem = await Chat.findById(chatId)
    if (!chatElem) {
        return res.status(400).send({ message: "Chat not exists" })
    }
    const adminId = chatElem.groupAdmin;
    console.log(adminId);
    console.log(req.id);
    if (adminId != req.id) {
        return res.status(400).send({ message: "Only Admin can remove" })
    }

    const updatedChat = await Chat.findByIdAndUpdate({ _id: chatId }, { $pull: { users: { $in: [removeId] } } }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

    if (!updatedChat)
        return res.status(400).send({ message: "Some error occured in remove user" })
    else {
        console.log(updatedChat);
        res.status(200).json(updatedChat);
    }



});

const addToGroup = asyncHandler(async (req, res) => {
    const { addId, chatId } = req.body;
    const chatElem = await Chat.findById(chatId)
    if (!chatElem) {
        return res.status(400).send({ message: "Chat not exists" })
    }
    const adminId = chatElem.groupAdmin;
    console.log(adminId);
    console.log(req.id);
    if (adminId != req.id) {
        return res.status(400).send({ message: "Only Admin can add people" })
    }
    const updatedChat = await Chat.findByIdAndUpdate({ _id: chatId }, { $push: { users: addId }  }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

    if (!updatedChat)
        return res.status(400).send({ message: "Some error occured in add user" })
    else {
        console.log(updatedChat);
        res.status(200).json(updatedChat);
    }

});

module.exports = { accessChats, fetchChats, createGroupChats, renameGroup, removeFromGroup, addToGroup };