const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/games/create"
router.route("/create")
    .post(isAuthenticated, gamesController.create);

//Matches with "/api/games/update"
router.route("/update")
    .put(isAuthenticated, gamesController.update);

//Matches with "/api/games/single100"
router.route("/single100")
    .get(isAuthenticated, gamesController.single100);

//Matches with "/api/games/singleuser"
router.route("/singleuser/:username")
    .get(isAuthenticated, gamesController.singleUser);

//Matches with "/api/games/multi100"
router.route("/multi100")
    .get(isAuthenticated, gamesController.multi100);

//Matches with "/api/games/multiuser"
router.route("/multiuser/:username")
    .get(isAuthenticated, gamesController.multiUser);

module.exports = router;