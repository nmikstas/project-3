const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let forumSchema = new Schema(
{  
    owner: { type: String, required: true }
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;