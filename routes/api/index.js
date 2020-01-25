const router = require("express").Router();
const userRoutes = require("./users");
const gameRoutes = require("./games");
const forumRoutes = require("./forums");

router.use("/users", userRoutes);
router.use("/games", gameRoutes);
router.use("/forums", forumRoutes);

module.exports = router;
