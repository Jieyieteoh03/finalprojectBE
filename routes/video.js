const express = require("express");
const router = express.Router();

const Video = require("../models/video");

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
      .send(await Video.find(filter).populate("talent").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send("Video not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Video.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Video not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newVideo = new Video({
      name: req.body.name,
      link: req.body.link,
      category: req.body.category,
      image: req.body.image,
      talent: req.body.talent,
    });
    await newVideo.save();

    res.status(200).send(newVideo);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const video_id = req.params.id;
    const updatedVideo = await Video.findByIdAndUpdate(video_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedVideo);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const video_id = req.params.id;
    const deleteVideo = await Video.findByIdAndDelete(video_id);
    res.status(200).send(deleteVideo);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
