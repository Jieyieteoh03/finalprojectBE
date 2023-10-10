const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  talent: {
    type: Schema.Types.ObjectId,
    ref: "Talent",
  },
});

const Video = model("Video", videoSchema);
module.exports = Video;
