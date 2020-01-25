const db = require("../models");

// Defining methods for the forumsController
module.exports =
{
    //Create a new forum.
    create: (req, res) =>
    {
        //Try to create the new forum in the database.
        db.Forum.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}