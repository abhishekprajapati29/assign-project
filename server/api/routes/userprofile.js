const express = require("express");
const multer = require("multer");
const router = express.Router();

const UserProfileController = require("../controllers/userprofile");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/userprofile/");
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
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const multipleField = upload.fields([
  { name: "userImage" },
  { name: "coverImage" },
]);

router.get("/", checkAuth, UserProfileController.userprofiles);

router.get(
  "/:userprofileId",
  checkAuth,
  UserProfileController.userprofile_info
);

router.post(
  "/",
  checkAuth,
  multipleField,
  UserProfileController.userprofile_create
);

router.patch(
  "/:userprofileId",
  checkAuth,
  multipleField,
  UserProfileController.userprofile_update
);

router.delete(
  "/:profileId",
  checkAuth,
  UserProfileController.userprofile_delete
);

module.exports = router;
