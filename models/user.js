const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },  
  blogposts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  admin: { type: Boolean, required: true, default: false },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
