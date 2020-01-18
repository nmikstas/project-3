const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ntnt");

//Generate data for the test database here.

const userSeed = [
    {
        username: 'AlexeyPajitnov',
        password: 'June6,1984' 
    },
    {
        username: 'player',
        password: 'password'
    },
    {
        username: 'tetris',
        password: 'game'
    },
    {
        username: 'tetrisGod',
        password: 'lineClear'
    },
    {
        username: 'I-win',
        password: 'always'
    },
    {
        username: 'null', 
        password: 'blank'
    },
    {
        username: 'LetsPlay',
        password: 'okay'
    },
    {
        username: 'tetrominoes',
        password: 'polyomino'
    },
    {
        username: 'VadimGerasimov',
        password: '16yearOldIntern'
    },
    {
        username: 'boss',
        password: 'game'
    }
];

const controllerSeed = [
    {
        downBtn:   .14,
        downIndex: 9,
        downType:  NTInput.IT_GAMEPAD_DPAD,

        cwBtn:     1,
        cwIndex:   0,
        cwType:    NTInput.IT_GAMEPAD_DIGITAL,

        ccwBtn:     2,
        ccwIndex:   0,
        ccwType:    NTInput.IT_GAMEPAD_DIGITAL,

        pauseBtn:   9,
        pauseIndex: 0,
        pauseType:  NTInput.IT_GAMEPAD_DIGITAL,

        leftBtn:    .71,
        leftIndex:  9,
        leftType:   NTInput.IT_GAMEPAD_DPAD,

        rightBtn:   -.43,
        rightIndex: 9,
        rightType:  NTInput.IT_GAMEPAD_DPAD,
    }
];

const xboxoneSeed = [
    {
        downBtn:   13,
        downIndex: 9,
        downType:  NTInput.IT_GAMEPAD_DIGITAL,

        cwBtn:     1,
        cwIndex:   0,
        cwType:    NTInput.IT_GAMEPAD_DIGITAL,

        ccwBtn:     0,
        ccwIndex:   0,
        ccwType:    NTInput.IT_GAMEPAD_DIGITAL,

        pauseBtn:   9,
        pauseIndex: 0,
        pauseType:  NTInput.IT_GAMEPAD_DIGITAL,

        leftBtn:    14,
        leftIndex:  9,
        leftType:   NTInput.IT_GAMEPAD_DIGITAL,

        rightBtn:   15,
        rightIndex: 9,
        rightType:  NTInput.IT_GAMEPAD_DIGITAL,
    }
];

const gameDataSeed = [
    {
        formName: 'AlexeyPajitnov vs VadimGerasimov',
        player1: 'AlexeyPajitnov',
        player2: 'VadimGerasimov',
        player1score: 100000,
        player2score: 80000,
        date: '1984-06-06 10:56:32'
    },
    {
        formName: 'Game 1',
        player1: 'player',
        player1score: 2,
        date: '2020-01-06 10:56:32'
    },
    {
        formName: 'Game 2',
        player1: 'player',
        player1score: 10,
        date: '2020-01-06 11:03:32'
    },
    {
        formName: 'Game 3',
        player1: 'boss',
        player1score: 100,
        date: '2020-01-06 11:10:32'
    },
    {
        formName: 'tetris vs player',
        player1: 'tetris',
        player2: 'player',
        player1score: 250,
        player2score: 200,
        date: '2020-01-07 09:30:00'
    },
    {
        formName: 'Game 4',
        player1: 'tetris',
        player1score: 900,
        date: '2020-01-08 10:30:00'
    },
    {
        formName: 'Game 5',
        player1: 'tetris',
        player1score: 800,
        date: '2020-01-08 10:45:00'
    },
    {
        formName: 'Game 6',
        player1: 'player',
        player1score: 230,
        date: '2020-01-08 11:10:00'
    }
];

//I dont know how to seed chat history because of the objectID. These are selected at random.

db.project3
  .remove({})
  .then(() => db.project3.collection.insertMany(userSeed))
  .then(() => db.project3.collection.insertMany(controllerSeed))
  .then(() => db.project3.collection.insertMany(xboxoneSeed))
  .then(() => db.project3.collection.insertMany(gameDataSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

