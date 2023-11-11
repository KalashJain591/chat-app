const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    content: { type: String, trim: true },
    chat: {
        type: mongoose.Schema.Types.ObjectId, ref: "chatModel"
    }
}, { timestamps: true });

const Message=mongoose.model("Message",messageSchema);
module.exports=Message;