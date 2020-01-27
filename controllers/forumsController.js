const db = require("../models");

module.exports.forumHelper = (state, index, dbModel) =>
{
    switch (state)
    {
        case "pushOwner":
            db.User.findOneAndUpdate({ username:  dbModel.owner},
                { $push: { ownedForums: dbModel._id } }, { new: true })
            .then(this.forumHelper("pushPlayer", 0, dbModel))
            break;
        case "pushPlayer":
            if (dbModel.player2 === "")
            {
                this.forumHelper("pushSpectators", 0, dbModel)
            }
            else
            {
                db.User.findOneAndUpdate({ username:  dbModel.player2},
                    { $push: { playerForums: dbModel._id } }, { new: true })
                .then(this.forumHelper("pushSpectators", 0, dbModel))
            }
            break;
        default:
            if (index < dbModel.spectators.length)
            {
                db.User.findOneAndUpdate({ username:  dbModel.spectators[index].username},
                    { $push: { otherForums: dbModel._id } }, { new: true })
                .then(this.forumHelper("pushSpectators", ++index, dbModel))
            }
            break;
    }
}

// Defining methods for the forumsController
module.exports =
{
    //Create a new forum.
    create: (req, res) =>
    {
        //Try to create the new forum in the database.
        db.Forum.create(req.body)
        .then(dbModel => 
        {
            res.json(dbModel);
            this.forumHelper("pushOwner", 0, dbModel)
        })
        .catch(err => res.status(422).json(err));
    },
}