const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const talentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  debut: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  illustrator: {
    type: String,
    required: true,
  },
  dream: {
    type: String,
    required: true,
  },
  fanName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Talent = model("Talent", talentSchema);
module.exports = Talent;
