const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsTypeSchema = new mongoose.Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  name: {
    type: String,
    required: true
  },
  nameUnsigned: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("NewsType", newsTypeSchema);
