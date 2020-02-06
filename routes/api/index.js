const router =        require("express").Router();
const userRoutes =    require("./users");
const gameRoutes =    require("./games");
const forumRoutes =   require("./forums");
const commentRoutes = require("./comments");

router.use("/users",    userRoutes);
router.use("/games",    gameRoutes);
router.use("/forums",   forumRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
