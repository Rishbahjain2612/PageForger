const mongoose = require("mongoose");
const dataschema = mongoose.Schema({
  userId: String,
  data: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("data", dataschema);
