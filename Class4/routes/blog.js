const express = require("express");
const router = express.Router();
const { createComment } = require("../controllers/CommentController");
const { createPost, getAllPosts } = require("../controllers/PostController");
const { likePost, unlikePost } = require("../controllers/LikeController");



router.post("/comments/create", createComment);
router.post("/post/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

module.exports = router;