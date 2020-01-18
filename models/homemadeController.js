const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let homemadeControllerSchema = new Schema(
{  
    //buttons used by the player. When they changes their settings then an update query needs to be ran to change these fields to the preset fields of their chosen game-controller.
    //decimal128 was the only datatype in mongoose that allowed a decimal. Unless we installed and required mongoose-double
    //down
    downBtn: { type: decimal128 },
    downIndex: { type: number },
    downType: { type: string },
    //clockwise
    cwBtn: { type: decimal128 },
    cwIndex: { type: number },
    cwType: { type: string },
    //couter clockwise
    ccwBtn: { type: decimal128 },
    ccwIndex: { type: number },
    ccwType: { type: string },
    //pause
    pauseBtn: { type: decimal128 },
    pauseIndex: { type: number },
    pauseType: { type: string },
    //left
    leftBtn: { type: decimal128 },
    leftIndex: { type: number },
    leftType: { type: string },
    //right
    rightBtn: { type: decimal128 },
    rightIndex: { type: number },
    rightType: { type: string },
});

const User = mongoose.model("homemadeController", homemadeControllerSchema);

module.exports = homemadeController;
