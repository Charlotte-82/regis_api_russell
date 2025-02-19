const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  catwayType: { type: String, enum: ["short", "long"], required: true },
  catwayState: { type: String, required: true },
});

module.exports = mongoose.model("Catway", catwaySchema);
