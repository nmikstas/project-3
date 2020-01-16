const router = require("express").Router();
const bookRoutes = require("./books");
const searchRoutes = require("./search");
const userRoutes = require("./users");

//Books routes.
router.use("/books", bookRoutes);
router.use("/search", searchRoutes);
router.use("/users", userRoutes);

module.exports = router;
