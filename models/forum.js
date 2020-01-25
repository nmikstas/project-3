const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let forumSchema = new Schema(
{  
    owner:        { type: String, required: true },
    forumName:    { type: String, default: "" },
    startLevel:   { type: Number, default: 0 },
    interference: { type: Number, default: 0 },
    player2:      { type: String },
    date:         { type: Date, default: Date.now },

    spectators:
    [{
        username:    { type: String, required: true },
        isModerator: { type: Boolean, required: true }
    }],

    comments:
    [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;