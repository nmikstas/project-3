const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/users/signup"
router.route("/signup")
    .post(usersController.create);

module.exports = router;