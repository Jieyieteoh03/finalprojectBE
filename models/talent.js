const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const talentSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
});

const Talent = model("Talent", talentSchema);
module.exports = Talent;
