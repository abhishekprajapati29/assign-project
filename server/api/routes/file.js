const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileController = require("../controllers/files");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/storage/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1025 * 15,
  },
  // fileFilter: fileFilter,
});

const multipleField = upload.fields([{ name: "file", maxCount: 5 }]);

router.post("/", checkAuth, multipleField, fileController.file_create);

router.get("/:userId", checkAuth, fileController.files);

router.delete("/:fileId", checkAuth, fileController.file_delete);

module.exports = router;
