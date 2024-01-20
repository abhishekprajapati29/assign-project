const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notification");

const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, notificationController.getNotification);

module.exports = router;
