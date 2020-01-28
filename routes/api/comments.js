const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/comments/getcomments"
router.route("/getcomments/:forumId").get(isAuthenticated, commentsController.getComments);

module.exports = router;