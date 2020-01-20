const db = require("../models");
const bcrypt = require("bcryptjs");

// Defining methods for the usersController
module.exports =
{
    //Create a new user.
    create: (req, res) =>
    {
        //Hash and salt the password.
        let password = req.body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

        //Try to create the new user in the database.
        db.User.create({username: req.body.username, password: password})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Login a user.
    login: (req, res) =>
    {
        res.json(req.user);
    },

    //Verify if a user is logged in.
    verify: (req, res) => {res.json(req.user);},

    //Logout a user.
    logout: (req, res) =>
    {
        console.log("Logging out user: " + req.user.username);
        req.logout();
        res.json(req.user);
    },

    //Change a user's password.
    password: (req, res) =>
    {
        //Hash and salt the password.
        let password = req.body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

        db.User.findOneAndUpdate({ username: req.body.username }, { password: password }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
