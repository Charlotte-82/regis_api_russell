const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
