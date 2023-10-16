const express = require("express");
const router = express.Router();

const Post = require("../models/post");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }

    res
      .status(200)
      .send(
        await Post.find(filter)
          .populate("talent")
          .populate("user")
          .sort({ _id: -1 })
      );
  } catch (error) {
    res.status(400).send("Post not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Post.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Post not found" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      talent: req.body.talent,
      user: req.user._id,
    });
    await newPost.save();

    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post_id = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(post_id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post_id = req.params.id;
    const deletePost = await Post.findByIdAndDelete(post_id);
    res.status(200).send(deletePost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
