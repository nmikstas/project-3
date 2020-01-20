const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let gameSchema = new Schema(
{  
    player1: { type: String, required: true },
    score1:  { type: Number, default: 0 },
    level1:  { type: Number, default: 0 },
    rows1:   { type: Number, default: 0 },
    date1:   { type: Date, default: Date.now },

    player2: { type: String },
    score2:  { type: Number, default: 0 },
    level2:  { type: Number, default: 0 },
    rows2:   { type: Number, default: 0 },
    date2:   { type: Date, default: Date.now },

    singlePlayer: { type: Boolean, default: true },
    rngSeed:      { type: Number, required: true }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;