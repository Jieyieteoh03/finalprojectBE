const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const talentSchema = require("./talent");
const commentSchema = require("./comment");

const postSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  talent: {
    type: Schema.Types.ObjectId,
    ref: "Talent",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = model("Post", postSchema, "posts");
module.exports = Post;
