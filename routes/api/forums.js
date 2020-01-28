const router = require("express").Router();
const forumsController = require("../../controllers/forumsController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/forums/create"
router.route("/create").post(isAuthenticated, forumsController.create);

//Matches with "/api/forums/getforum"
router.route("/getforum/:id").get(isAuthenticated, forumsController.getForum);

module.exports = router;