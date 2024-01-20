const Notification = require("../models/notification");

exports.getNotification = async (req, res, next) => {
  const notifications = await Notification.find({
    userId: req.userData.userId,
  })
    .populate([
      {
        path: "projectId",
        model: "Project",
      },
      {
        path: "requestedBy",
        model: "User",
        populate: {
          path: "userProfileId",
          model: "UserProfile",
        },
      },
    ])
    .sort({ createdAt: -1 });
  if (!notifications)
    return res.status(401).json({ message: "Notifications failed" });
  return res.status(201).json(notifications);
};
