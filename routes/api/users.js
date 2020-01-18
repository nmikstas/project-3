const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/users/signup"
router.route("/signup")
    .post(usersController.create);

//Matches with "/api/users/login"
//Using the passport.authenticate middleware with our local strategy.
//If the user has valid login credentials, send them to the members page.
//Otherwise the user will be sent an error
router.route("/login")
    .post(passport.authenticate("local"), usersController.login);

//Matches with "/api/users/verify"
router.route("/verify")
    .post(isAuthenticated, usersController.verify);

//Matches with "/api/users/logout"
router.route("/logout")
    .get(isAuthenticated, usersController.logout);

module.exports = router;