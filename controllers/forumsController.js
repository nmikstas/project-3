const db = require("../models");

// Defining methods for the forumsController
module.exports =
{
    //Create a new forum.
    create: (req, res) =>
    {
        //Try to create the new forum in the database.
        db.User.create({username: req.body.username, password: password})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}