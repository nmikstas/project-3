const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
{  
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date:     { type: Date, default: Date.now },

    downBtn:   { type: Number, default: 40 },
    downIndex: { type: Number, default: 0 },
    downType:  { type: Number, default: 0 },

    leftBtn:   { type: Number, default: 37 },
    leftIndex: { type: Number, default: 0 },
    leftType:  { type: Number, default: 0 },

    rightBtn:   { type: Number, default: 39 },
    rightIndex: { type: Number, default: 0 },
    rightType:  { type: Number, default: 0 },

    flipCWBtn:   { type: Number, default: 76 },
    flipCWIndex: { type: Number, default: 0 },
    flipCWType:  { type: Number, default: 0 },

    flipCCWBtn:   { type: Number, default: 75 },
    flipCCWIndex: { type: Number, default: 0 },
    flipCCWType:  { type: Number, default: 0 },

    pauseBtn:   { type: Number, default: 80 },
    pauseIndex: { type: Number, default: 0 },
    pauseType:  { type: Number, default: 0 },

    highScore: { type: Number, default: 0 },
    level:     { type: Number, default: 0 },
    lines:     { type: Number, default: 0 },

    ownedForums: 
    [{
        type: Schema.Types.ObjectId,
        ref: "Forum",
        required: true
    }],

    playerForums:
    [{
        type: Schema.Types.ObjectId,
        ref: "Forum",
        required: true
    }],

    otherForums: 
    [{
        type: Schema.Types.ObjectId,
        ref: "Forum",
        required: true
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
