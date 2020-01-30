const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//https://stackoverflow.com/questions/26936645/mongoose-private-chat-message-model
let chatSchema = new Schema(
{  
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [
        {
            message: String,
            meta: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectID,
                        ref: 'User'
                    },
                    delivered: Boolean,
                    read: Boolean
                }
            ]
        }
    ],
    is_group_message: { type: Boolean, default: false },
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            delivered: Boolean,
            read: Boolean,
            last_seen: Date
        }
    ]
});

const User = mongoose.model("Chat", chatSchema);

module.exports = Chat;