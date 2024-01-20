const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: Object,
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String, default: "folder" },
    file: { type: String },
    bookmark: { type: Boolean, default: false },
    trash: { type: Boolean, default: false },
    size: { type: Number, default: 0 },
    mimetype: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Storage = mongoose.model("Storage", fileSchema);

module.exports = { Storage };
