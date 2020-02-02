const db = require("../models");

// Defining methods for the commentController
module.exports =
{
    //Get all comments for a given forum.
    getComments: (req, res) =>
    {
        db.Comment.find({forumId: req.params.forumId})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Create a new comment.
    newComment: (req, res) =>
    {
        db.Comment.create(req.body)
        .then(dbModel => 
        {
            return db.Forum.findOneAndUpdate({ _id: dbModel.forumId},
                { $push: { comments: dbModel._id} }, { new: true })    
        })
        .then(dbModel =>
        { 
            res.json(dbModel);
        });
    },

    //Delete a comment.
    deleteComment: (req, res) =>
    {
        db.Comment.findOneAndUpdate({ _id: req.body.id }, { isDeleted: true }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Undelete a comment.
    undeleteComment: (req, res) =>
    {
        db.Comment.findOneAndUpdate({ _id: req.body.id }, { isDeleted: false }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}