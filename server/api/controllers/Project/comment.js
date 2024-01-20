const mongoose = require("mongoose");
const { Project, Task, Comment } = require("../../models/project");

exports.comment_create = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.body.projectId });

  if (!project)
    res.status(409).json({
      message: "Project not exists!",
    });
  const task = await Task.findOne({ _id: req.body.taskId });
  if (!task)
    res.status(409).json({
      message: "Task not exists!",
    });

  const commentObj = new Comment({
    _id: new mongoose.Types.ObjectId(),
    projectId: req.body.projectId,
    taskId: req.body.taskId,
    userId: req.body.userId,
    type: req.body.type,
    files: req?.files?.files?.map((file) => file.path.replace(/\\/g, "/")),
    context: req.body.context,
    selected: req.body.selected,
  });

  const comment = await commentObj.save();
  if (!comment)
    res.status(500).json({
      error: err,
    });
  const commentInfo = await Comment.findById(comment._id).populate({
    path: "userId",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });
  // update project tasks list
  return res.status(201).json({
    message: "comment created",
    comment: commentInfo,
  });
};

exports.comments = async (req, res, next) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  const comments = await Comment.find({
    projectId: projectId,
    taskId: taskId,
  }).populate({
    path: "userId",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });
  if (!comments)
    return res.status(404).json({
      message: "No entries found",
    });
  const response = {
    count: comments.length,
    comments,
  };
  return res.status(200).json(response);
};

exports.comment_update = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.projectId });
  if (!project)
    res.status(409).json({
      message: "Project not exists!",
    });
  const task = await Task.findOne({ _id: req.params.taskId });
  if (!task)
    res.status(409).json({
      message: "Task not exists!",
    });

  const id = req.params.commentId;
  const commentUpdate = await Comment.updateOne(
    { _id: id },
    { $set: req.body }
  );
  if (!commentUpdate)
    res.status(500).json({
      error: "Error while updating",
    });

  return res.status(200).json({
    message: "comment updated",
    comment: req.body,
  });
};
