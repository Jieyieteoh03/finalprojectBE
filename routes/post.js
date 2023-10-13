const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    res
      .status(200)
      .send(await Post.find(filter).populate("talent").sort({ _id: -1 }));
  } catch (error) {
    console.log(error);
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

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = new Post({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      talent: req.body.talent,
    });
    await newPost.save();

    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post_id = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(post_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post_id = req.params.id;
    const deletePost = await Post.findByIdAndDelete(post_id);
    res.status(200).send(deletePost);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
