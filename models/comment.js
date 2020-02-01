const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema(
{  
    username:  { type: String, required: true },
    comment:   { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    date:      { type: Date, default: Date.now },

    forumId: 
    {
        type: Schema.Types.ObjectId,
        ref: "Forum",
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;