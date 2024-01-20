const express = require("express");
const router = express.Router();
const multer = require("multer");

const projectController = require("../controllers/Project/project");
const settingController = require("../controllers/Project/setting");
const taskController = require("../controllers/Project/task");
const memberController = require("../controllers/Project/member");
const commentController = require("../controllers/Project/comment");
const fileController = require("../controllers/Project/file");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/project/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === "") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  //fileFilter: fileFilter,
});

const multipleField = upload.fields([
  { name: "file", maxCount: 5 },
  { name: "projectImage" },
  { name: "files", maxCount: 5 },
]);

// project API

router.get("/", checkAuth, projectController.projects);

router.get("/:projectId", checkAuth, projectController.project_info);

router.get(
  "/:projectId/info/count",
  checkAuth,
  checkAuth,
  projectController.project_info_count
);

router.get(
  "/:projectId/info/chart",
  checkAuth,
  checkAuth,
  projectController.project_info_chart
);

router.post(
  "/",
  checkAuth,
  multipleField,
  checkAuth,
  projectController.project_create
);

router.patch(
  "/:projectId",
  checkAuth,
  multipleField,
  projectController.project_update
);

router.delete("/:projectId", checkAuth, projectController.project_delete);

// Task API

router.get("/task/all", checkAuth, checkAuth, taskController.tasks);

router.get("/task/info/:taskId", checkAuth, taskController.task_info);

router.post(
  "/task/create",
  checkAuth,
  multipleField,
  taskController.task_create
);

router.patch(
  "/task/:taskId",
  checkAuth,
  multipleField,
  taskController.task_update
);

// File API

router.get("/:projectId/file/all", checkAuth, fileController.files);

router.post("/file/create", checkAuth, multipleField, fileController.add_files);

router.delete("/file/:fileId", checkAuth, fileController.file_delete);

// Member API
router.get("/member/:projectId/all", checkAuth, memberController.members);

// comments
router.get(
  "/comment/:projectId/:taskId",
  checkAuth,
  commentController.comments
);

router.post(
  "/comment/:projectId/:taskId",
  checkAuth,
  multipleField,
  commentController.comment_create
);

router.patch(
  "/comment/:projectId/:taskId/:commentId",
  checkAuth,
  multipleField,
  commentController.comment_update
);

// setting
router.get("/:id/owner", checkAuth, settingController.project_owner);
router.get(
  "/:id/requestUsers",
  checkAuth,
  settingController.project_request_users
);
router.post("/acceptUser", checkAuth, projectController.project_user_accept);
router.post("/rejectUser", checkAuth, projectController.project_user_reject);
router.post(
  "/removeMember",
  checkAuth,
  projectController.project_member_remove
);
router.get(
  "/:id/taskCreateInfo",
  checkAuth,
  settingController.project_task_form_info
);

module.exports = router;
