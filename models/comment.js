const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = require("./post");
const userSchema = require("./user");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  comments: {
    type: String,
    required: true,
  },
});

const Comment = model("Comment", commentSchema, "comments");
module.exports = Comment;
