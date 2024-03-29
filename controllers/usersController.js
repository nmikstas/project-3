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

    update: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username }, req.body, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Login a user.
    login: (req, res) =>
    {
        res.json(req.user);
    },

    //Verify if a user is logged in.
    verify: (req, res) =>
    {
        //Get most up to date user info.
        db.User.findOne({ username: req.user.username })
        .then(dbModel => res.json(dbModel))
        .catch(() => res.json({ notLoggedIn: true }));
    },

    //Get user data with expanded forum data.
    getuser: (req, res) =>
    {
        //Get most up to date user info.
        db.User.findOne({ username: req.params.username })
        .populate("otherForums")
        .populate("ownedForums")
        .populate("playerForums")
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Logout a user.
    logout: (req, res) =>
    {
        console.log("Logging out user: " + req.user.username);
        //req.logout();
        req.logout((err) =>
        {
            if (err) 
            {
                res.status(422).json(err);
            }
            res.redirect('/login');
        });
        //res.json(req.user);
    },

    //Change user's password.
    password: (req, res) =>
    {
        //Hash and salt the password.
        let password = req.body.password;
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

        db.User.findOneAndUpdate({ username: req.body.username }, { password: password }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Change user's game input.
    input: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username },
        {
            downBtn:      req.body.downBtn,
            downIndex:    req.body.downIndex,
            downType:     req.body.downType,
            leftBtn:      req.body.leftBtn,
            leftIndex:    req.body.leftIndex,
            leftType:     req.body.leftType,
            rightBtn:     req.body.rightBtn,
            rightIndex:   req.body.rightIndex,
            rightType:    req.body.rightType,
            flipCWBtn:    req.body.flipCWBtn,
            flipCWIndex:  req.body.flipCWIndex,
            flipCWType:   req.body.flipCWType,
            flipCCWBtn:   req.body.flipCCWBtn,
            flipCCWIndex: req.body.flipCCWIndex,
            flipCCWType:  req.body.flipCCWType,
            pauseBtn:     req.body.pauseBtn,
            pauseIndex:   req.body.pauseIndex,
            pauseType:    req.body.pauseType
        }, 
        { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    //Change user's render type.
    render: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username },
        {
            render: req.body.render
        },
        { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    allusers: (req, res) =>
    {
        db.User.find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    setforum: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username }, { targetForum: req.body.forumId }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    deletespectator: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username }, { $pullAll: { otherForums: [req.body.forumId] } }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    deleteowned: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username }, { $pullAll: { ownedForums: [req.body.forumId] } }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    deleteplayer: (req, res) =>
    {
        db.User.findOneAndUpdate({ username: req.body.username }, { $pullAll: { playerForums: [req.body.forumId] } }, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
