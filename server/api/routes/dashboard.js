const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard");
const checkAuth = require("../middleware/check-auth");

router.get(
  "/:userId/info/count",
  checkAuth,
  dashboardController.dashboard_info_count
);

router.get(
  "/:userId/info/chart",
  checkAuth,
  dashboardController.dashboard_info_chart
);

module.exports = router;
