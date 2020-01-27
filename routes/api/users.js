const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("../../config/passport");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/users/signup"
router.route("/signup").post(usersController.create);

//Matches with "/api/users/update"
router.route("/update").put(isAuthenticated, usersController.update);

//Matches with "/api/users/login"
router.route("/login").post(passport.authenticate("local"), usersController.login);

//Matches with "/api/users/verify"
router.route("/verify").post(isAuthenticated, usersController.verify);

//Matches with "/api/users/getuser"
router.route("/getuser/:username").get(isAuthenticated, usersController.getuser);

//Matches with "/api/users/logout"
router.route("/logout").get(isAuthenticated, usersController.logout);

//Matches with "/api/users/password"
router.route("/password").post(isAuthenticated, usersController.password);

//Matches with "/api/users/input"
router.route("/input").post(isAuthenticated, usersController.input);

//Matches with "/api/users/allusers"
router.route("/allusers").get(isAuthenticated, usersController.allusers);

//Matches with "/api/users/setforum"
router.route("/setforum").post(isAuthenticated, usersController.setforum);

//Matches with "/api/users/deletespectator"
router.route("/deletespectator").post(isAuthenticated, usersController.deletespectator);

//Matches with "/api/users/deleteowned"
router.route("/deleteowned").post(isAuthenticated, usersController.deleteowned);

//Matches with "/api/users/deleteplayer"
router.route("/deleteplayer").post(isAuthenticated, usersController.deleteplayer);

module.exports = router;