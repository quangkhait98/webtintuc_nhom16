const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  news: {
    type: Schema.Types.ObjectId,
    ref: "News",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Comment", commentSchema);
