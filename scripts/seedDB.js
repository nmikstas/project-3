const mongoose = require("mongoose");
const db = require("../models");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ntnt");

const users = ["chris", "nick", "tyler", "elijah", "bob", "mark", "sue", "julie", "frank", "jeff",
    "joeff", "mike", "thor", "rexor", "conan", "thulsa doom", "flippers", "max", "juan pelota", "phil mcgroin"];

const numGameRecords = 300;

/******************************************* User Data *******************************************/

const userSeed = [];

//Create the userSeed array.
for(let i = 0; i < users.length; i++)
{
    let user =
    {
        username: users[i],
        password: bcrypt.hashSync(users[i], bcrypt.genSaltSync(10), null),
        date: new Date(Date.now()),
        downBtn: 40, downIndex: 0, downType: 0, leftBtn: 37, leftIndex: 0,
        leftType: 0, rightBtn: 39, rightIndex: 0, rightType: 0, flipCWBtn: 76, 
        flipCWIndex: 0, flipCWType:  0, flipCCWBtn: 75,  flipCCWIndex: 0,
        flipCCWType: 0, pauseBtn: 80, pauseIndex: 0, pauseType: 0,
        highScore: 0, level: 0, lines: 0
    }

    userSeed.push(user);
}

/******************************************* Game Data *******************************************/

const gameSeed = [];

//Create the gameSeed array.
for(let i = 0; i < numGameRecords; i++)
{
    //Get player1 and player2 names.  Make sure they are unique.
    let player2;
    let player1 = users[Math.floor(Math.random() * users.length)];
    do
    {
        player2 = users[Math.floor(Math.random() * users.length)];
    } while(player2 === player1);

    //Determine if this is a single player game or not.
    let singlePlayer = Math.round(Math.random()) ? true : false;
    
    //Get the player levels.
    let level1 = Math.floor(Math.random() * 30);
    let level2 = Math.floor(Math.random() * 30);

    //Get the player lines.
    let lines1 = Math.floor(Math.random() * level1 * 10);
    let lines2 = Math.floor(Math.random() * level2 * 10);

    //Get the player scores.
    let score1 = Math.floor(Math.random() * lines1 * (250 * (level1 + 1)));
    let score2 = Math.floor(Math.random() * lines2 * (250 * (level2 + 1)));
    score1 -= (score1 % 10);
    score2 -= (score2 % 10);

    let game =
    {
        player1: player1,
        score1:  score1,
        level1:  level1,
        lines1:  lines1,
        date1:   new Date(Date.now() - (Math.floor(Math.random() * 1000000000))),
        player2: singlePlayer ? "" : player2,
        score2:  singlePlayer ? 0 : score2,
        level2:  singlePlayer ? 0 : level2,
        lines2:  singlePlayer ? 0 : lines2,
        date2:   new Date(Date.now() - (Math.floor(Math.random() * 1000000000))),
        singlePlayer: singlePlayer,
        rngSeed: Math.floor(Math.random() * 1000000000)
    }

    gameSeed.push(game);
}

/************************************** Database Functions ***************************************/

db.User.remove({})
.then(() => db.User.collection.insertMany(userSeed))
.then(data => console.log(data.result.n + " records inserted!"))
.then(() =>
db.Game.remove({}))
.then(() => db.Game.collection.insertMany(gameSeed))
.then(data => console.log(data.result.n + " records inserted!"))


.then(() => process.exit(0))
.catch(err =>
{
    console.error(err);
    process.exit(1);
});
