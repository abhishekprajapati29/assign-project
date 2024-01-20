const mongoose = require("mongoose");
const { Project, File } = require("../../models/project");

exports.add_files = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.body.projectId });
  if (!project) return res.status(404).json({ message: "Project not exists!" });
  const fileList = [];
  for (let i = 0; i < req.files.file.length; i++) {
    const data = new File({
      _id: new mongoose.Types.ObjectId(),
      file: req.files.file[i].path,
      projectId: req.body.projectId,
      uploadedBy: req.body.userId,
      selected: req.body.selected,
      title: req.files.file[i].originalname,
      size: req.files.file[i].size,
      mimetype: req.files.file[i].mimetype,
    });

    const file = await data.save();
    const fileInfo = await File.findById(file._id).populate({
      path: "uploadedBy",
      model: "User",
      populate: {
        path: "userProfileId",
        model: "UserProfile",
      },
    });
    fileList.push(fileInfo);
  }
  const updateOps = {};
  updateOps["files"] = [
    ...fileList?.map((fi) => fi._id).reverse(),
    ...project.files,
  ];
  const updatePro = await Project.updateOne(
    { _id: req.body.projectId },
    { $set: updateOps }
  );
  if (!updatePro)
    res.status(500).json({
      error: err,
    });
  return res.status(201).json({
    message: "File uploaded successfully",
    files: fileList,
  });
};

exports.files = async (req, res, next) => {
  const fileList = await File.find({
    projectId: req.params.projectId,
  }).populate({
    path: "uploadedBy",
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
  const file = await File.deleteOne({ _id: req.params.fileId });
  if (!file)
    res.status(500).json({
      error: err,
    });
  res.status(200).json({
    message: "file deleted",
  });
};
