const WebSocket = require("ws");
const Notification = require("../api/models/notification");
const { default: mongoose } = require("mongoose");
const { Project } = require("../api/models/project");

const userConnections = new Map();

const initWebSocketServer = async (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log("WebSocket connection established");

    socket.on("message", async (message) => {
      const data = JSON.parse(message);
      const {
        type,
        iconType,
        content,
        title,
        route,
        userId,
        projectId,
        requestedBy,
      } = data;

      const notificationCreate = await new Notification({
        _id: new mongoose.Types.ObjectId(),
        type,
        iconType,
        requestedBy,
        content,
        title,
        route,
        userId,
        projectId,
      }).save();

      if (projectId) {
        const projectUserRequestIds = await Project.findById(projectId).select(
          "userRequestIds"
        );
        const ids = projectUserRequestIds.userRequestIds;
        await Project.updateOne(
          { _id: projectId },
          { $set: { userRequestIds: [...ids, userId] } }
        );
      }
      const notificationInfo = await Notification.findById(
        notificationCreate._id
      ).populate([
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
      ]);
      wss.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(notificationInfo));
        }
      });
    });

    socket.on("close", () => {
      console.log("WebSocket disconnected");
    });
  });

  return wss;
};

const associateUserWithSocket = (userId, socket) => {
  userConnections.set(userId, socket);
};

module.exports = { initWebSocketServer, associateUserWithSocket };
