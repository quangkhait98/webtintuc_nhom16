const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: false,
    default: null
  },
  googleId: {
    type: String,
    required: false,
    default: null
  },
  avatar: {
    type: String,
    required: false,
    default: null
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  news: [{ type: Schema.Types.ObjectId, ref: "News" }]
});

module.exports = mongoose.model("User", userSchema);
