const mongoose = require("mongoose");
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
  accessToken: {
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
});

module.exports = mongoose.model("User", userSchema);
