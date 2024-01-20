const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },
    iconType: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    route: { type: String, required: true },
    userId: { type: String, required: true },
    requestedBy: { type: String, required: true },
    projectId: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
