const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
{  
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //buttons used by the player. When they changes their settings then an update query needs to be ran to change these fields to the preset fields of their chosen game-controller.
    //decimal128 was the only datatype in mongoose that allowed a decimal. Unless we installed and required mongoose-double
    //down
    downBtn: { type: decimal128, default: .14 },
    downIndex: { type: number, default: 9 },
    downType: { type: string, default: 'NTInput.IT_GAMEPAD_DPAD' },
    //clockwise
    cwBtn: { type: decimal128, default: 1 },
    cwIndex: { type: number, default: 0 },
    cwType: { type: string, default: 'NTInput.IT_GAMEPAD_DIGITAL' },
    //couter clockwise
    ccwBtn: { type: decimal128, default: 2 },
    ccwIndex: { type: number, default: 0 },
    ccwType: { type: string, default: 'NTInput.IT_GAMEPAD_DIGITAL' },
    //pause
    pauseBtn: { type: decimal128, default: 9 },
    pauseIndex: { type: number, default: 0 },
    pauseType: { type: string, default: 'NTInput.IT_GAMEPAD_DIGITAL' },
    //left
    leftBtn: { type: decimal128, default: .71 },
    leftIndex: { type: number, default: 9 },
    leftType: { type: string, default: 'NTInput.IT_GAMEPAD_DPAD' },
    //right
    rightBtn: { type: decimal128, default: -0.43 },
    rightIndex: { type: number, default: 9 },
    rightType: { type: string, default: 'NTInput.IT_GAMEPAD_DPAD' },
    //timestamp
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
