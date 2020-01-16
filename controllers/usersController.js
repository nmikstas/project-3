const db = require("../models");

const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

//Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");


// Defining methods for the usersController
module.exports =
{
    create: function(req, res)
    {
        let password = req.body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

        db.User.create({username: req.body.username, password: password})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
