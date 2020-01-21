const db = require("../models");

// Defining methods for the gamesController
module.exports =
{
    //Create a new game.
    create: (req, res) =>
    {
      res.json({result: true});
    },

    //Update player 1 scores.
    update1: (req, res) =>
    {
        res.json({result: true});
    },

    //Update player 2 scores.
    update2: (req, res) =>
    {
        res.json({result: true});
    },

    //Get top 100 single player scores.
    single100: (req, res) =>
    {
        res.json({result: true});
    },

    //Get a user's single player game scores.
    singleUser: (req, res) =>
    {
        res.json({result: true});
    },

    //Get top 100 multiplayer scores.
    multi100: (req, res) =>
    {
        res.json({result: true});
    },

    //Get a user's multiplayer player game scores.
    multiUser: (req, res) =>
    {
        res.json({result: true});
    }
};
