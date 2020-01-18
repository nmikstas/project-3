const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameSchema = new Schema(
{  
    formName: { type: String, required: true, unique: true },
    player1: { type: String, required: true },
    player2: { type: String },
    player1score: { type: Number },
    player2score: { type: Number },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("Game", gameSchema);

module.exports = Game;
