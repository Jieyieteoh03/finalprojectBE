const express = require("express");
const router = express.Router();

const Talent = require("../models/talent");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    res.status(200).send(await Talent.find(filter).sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send("Talent not found");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Talent.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Talent not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newTalent = new Talent({
      name: req.body.name,
      birthday: req.body.birthday,
      debut: req.body.debut,
      height: req.body.height,
      category: req.body.category,
      illustrator: req.body.illustrator,
      dream: req.body.dream,
      fanName: req.body.fanName,
      image: req.body.image,
      post: req.body.post,
      video: req.body.video,
    });
    await newTalent.save();

    res.status(200).send(newTalent);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const talent_id = req.params.id;
    const updatedTalent = await Talent.findByIdAndUpdate(talent_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedTalent);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const talent_id = req.params.id;
    const deleteTalent = await Talent.findByIdAndDelete(talent_id);
    res.status(200).send(deleteTalent);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
