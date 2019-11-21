const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameUnsigned: {
    type: String,
    required: true
  },
  newsType: [{ type: Schema.Types.ObjectId, ref: "NewsType" }],
  news: [{ type: Schema.Types.ObjectId, ref: "News" }]
});

module.exports = mongoose.model("Category", categorySchema);
