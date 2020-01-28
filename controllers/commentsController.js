const db = require("../models");

// Defining methods for the commentController
module.exports =
{
    //Create a new forum.
    getComments: (req, res) =>
    {
        //Try to create the new forum in the database.
        db.Comment.find({forumId: req.params.forumId})
        .then(dbModel => 
        {
            res.json(dbModel);
        })
        .catch(err => res.status(422).json(err));
    },
}