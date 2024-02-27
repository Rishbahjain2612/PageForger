const mongoose = require("mongoose");
const dataschema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("data", dataschema);
