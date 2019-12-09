const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleUnsigned: {
    type: String,
    required: false,
    default: null
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  Highlights: {
    type: Number,
    required: false,
    default: 1,
    max: 10,
    min: 1
  },
  viewsNumber: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  newsType: { type: Schema.Types.ObjectId, ref: "NewsType" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  user: { type: Schema.Types.ObjectId, ref: "User", default: null }
});

module.exports = mongoose.model("News", newsSchema);
