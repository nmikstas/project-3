const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/comments/getcomments"
router.route("/getcomments/:forumId").get(isAuthenticated, commentsController.getComments);

//Matches with "/api/comments/newcomment"

//Matches with "/api/comments/deletecomment"

//Matches with "/api/comments/undeletecomment"

module.exports = router;