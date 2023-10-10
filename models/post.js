const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  talents: {
    type: Schema.Types.ObjectId,
    ref: "Talents",
  },
});

const Post = model("Post", postSchema);
module.exports = Post;
