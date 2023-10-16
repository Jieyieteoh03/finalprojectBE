const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Post = require("../models/post");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

// get comment route by post id
router.get("/", async (req, res) => {
  try {
    if (req.user && req.user.role === "user") {
      filter.user = req.user._id;
    }
    res.status(200).send(await Comment.find().populate("user"));
  } catch (error) {
    res.status(400).send("Post not found");
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newComment = new Comment({
      comments: req.body.comments,
      post: req.body.post,
      user: req.user._id,
    });
    const addComment = await newComment.save();
    res.status(200).send(addComment);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let filter = {};
    const comment_id = req.params.id;
    const deleteComment = await Comment.findByIdAndDelete(comment_id);
    if (req.user) {
      filter.user = req.user._id;
    }
    res.status(200).send(deleteComment);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
