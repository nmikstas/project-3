const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

//Matches with "/api/comments/getcomments"
router.route("/getcomments/:forumId").get(isAuthenticated, commentsController.getComments);

//Matches with "/api/comments/newcomment"
router.route("/newcomment").post(isAuthenticated, commentsController.newComment);

//Matches with "/api/comments/deletecomment"
//router.route("/api/comments/deletecomment").put(isAuthenticated, commentsController.deleteComment);

//Matches with "/api/comments/undeletecomment"
//router.route("/api/comments/undeletecomment").put(isAuthenticated, commentsController.undeleteComment);

module.exports = router;