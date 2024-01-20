const mongoose = require("mongoose");

const { Storage } = require("../models/file");

exports.file_create = async (req, res, next) => {
  const fileList = [];
  for (let i = 0; i < req.files.file.length; i++) {
    const data = new Storage({
      _id: new mongoose.Types.ObjectId(),
      userId: req.body.userId,
      type: "file",
      file: req.files.file[i].path,
      name: req.files.file[i].originalname,
      size: req.files.file[i].size,
      mimetype: req.files.file[i].mimetype,
    });
    const file = await data.save();
    const fileInfo = await Storage.findById(file._id).populate({
      path: "userId",
      model: "User",
      populate: {
        path: "userProfileId",
        model: "UserProfile",
      },
    });
    fileList.push(fileInfo);
  }
  return res.status(201).json({
    message: "File uploaded successfully",
    files: fileList,
  });
};

exports.files = async (req, res, next) => {
  const fileList = await Storage.find({
    userId: req.params.userId,
  }).populate({
    path: "userId",
    model: "User",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });
  if (!fileList)
    res.status(404).json({
      message: "No entries found",
    });
  res.status(200).json({
    message: "Files",
    files: fileList,
  });
};

exports.file_delete = async (req, res, next) => {
  const file = await Storage.deleteOne({ _id: req.params.fileId });
  if (!file)
    res.status(500).json({
      error: err,
    });
  res.status(200).json({
    message: "file deleted",
  });
};
