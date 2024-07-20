const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  blogpost: { type: Schema.Types.ObjectId, ref: "BlogPost" },
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
