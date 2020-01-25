const router = require("express").Router();
const forumsController = require("../../controllers/forumsController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/forums/create"
router.route("/create")
    .post(isAuthenticated, forumsController.create);

module.exports = router;