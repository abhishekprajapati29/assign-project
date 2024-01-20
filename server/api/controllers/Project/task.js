const mongoose = require("mongoose");
const moment = require("moment");
const { Project, Task, TaskHistory } = require("../../models/project");
const UserProfile = require("../../models/userprofile");

exports.task_create = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.body.projectId }).populate(
    "tasks"
  );

  if (!project)
    res.status(409).json({
      message: "Project not exists!",
    });
  const taskObj = new Task({
    _id: new mongoose.Types.ObjectId(),
    projectId: req.body.projectId,
    summary: req.body.summary,
    status: req.body.status,
    type: req.body.type,
    description: req.body.description,
    priority: req.body.priority,
    label: req.body.label,
    files: req?.files?.files.map((file) => file.path.replace(/\\/g, "/")),
    assignee: req.body.assignee,
    sprint: req.body.sprint,
    selected: req.body.selected,
    estimate: req.body.estimate,
    startDate: moment.utc(req.body.startDate),
    dueDate: moment.utc(req.body.dueDate),
  });

  const task = await taskObj.save();
  if (!task)
    res.status(500).json({
      error: err,
    });

  // Save to history
  const taskHistoryInfo = await new TaskHistory({
    _id: new mongoose.Types.ObjectId(),
    projectId: req.body.projectId,
    now: req.body.type === "Task" ? "Task Created" : "Bug Created",
    type: "task_created",
    userId: req.body.userId,
  }).save();

  await Task.updateOne(
    { _id: task._id },
    { $set: { taskHistory: [taskHistoryInfo._id] } }
  );

  // update project tasks list
  const updateOps = {};
  updateOps["tasks"] = [...project.tasks, task._id];
  const updatePro = await Project.updateOne(
    { _id: req.body.projectId },
    { $set: updateOps }
  );
  if (!updatePro)
    res.status(500).json({
      error: err,
    });

  const taskLatestInfo = await Task.findById(task._id).populate({
    path: "taskHistory",
    populate: {
      path: "userId",
      populate: {
        path: "userProfileId",
        model: "UserProfile",
      },
    },
  });
  return res.status(201).json({
    message: "Task created",
    task: taskLatestInfo,
  });
};

exports.tasks = async (req, res, next) => {
  const tasks = await Task.find();
  if (!tasks)
    return res.status(404).json({
      message: "No entries found",
    });
  let taskList = [];
  for (let i = 0; i < tasks.length; i++) {
    const userProfile = await UserProfile.findOne({
      username: tasks[i].assignee,
    });
    taskList.push({
      _id: tasks[i]._id,
      projectId: tasks[i].projectId,
      summary: tasks[i].summary,
      status: tasks[i].status,
      type: tasks[i].type,
      description: tasks[i].description,
      priority: tasks[i].priority,
      label: tasks[i].label,
      files: tasks[i].files,
      assignee: tasks[i].assignee,
      storyPoints: tasks[i].storyPoints,
      epic: tasks[i].epic,
      sprint: tasks[i].sprint,
      selected: tasks[i].selected,
      estimate: tasks[i].estimate,
      sequentialNumber: tasks[i].sequentialNumber,
      startDate: moment.utc(tasks[i].startDate),
      dueDate: moment.utc(tasks[i].dueDate),
      userProfile: userProfile,
    });
  }
  const response = {
    count: tasks.length,
    tasks: taskList,
  };
  return res.status(200).json(response);
};

exports.task_info = async (req, res, next) => {
  const id = req.params.taskId;
  const taskInfo = await Task.findById(id).populate({
    path: "taskHistory",
    populate: {
      path: "userId",
      populate: {
        path: "userProfileId",
        model: "UserProfile",
      },
    },
  });
  if (!taskInfo)
    return res
      .status(404)
      .json({ message: "No valid entry found for provided ID" });
  return res.status(200).json(taskInfo);
};

exports.task_update = async (req, res, next) => {
  const id = req.params.taskId;
  const taskDetails = await Task.findById(id);
  let files = [];
  if (req?.files?.files?.length > 0) {
    files = [
      ...req?.files?.files.map((file) => file.path.replace(/\\/g, "/")),
      ...taskDetails.files,
    ];
  }
  const updateObj = { ...req.body };
  if (files.length > 0) {
    updateObj["files"] = files;
  }

  const task = await Task.updateOne({ _id: id }, { $set: updateObj });
  if (!task)
    res.status(500).json({
      error: "Error while updating",
    });

  const beforeObj = {};
  Object.keys(updateObj).forEach((key) => (beforeObj[key] = taskDetails[key]));

  delete updateObj.userId;
  // Save to history
  const taskHistoryInfo = await new TaskHistory({
    _id: new mongoose.Types.ObjectId(),
    before: JSON.stringify(beforeObj),
    projectId: taskDetails.projectId,
    now: JSON.stringify(updateObj),
    deleted: req.body?.deleted || "",
    userId: req.body?.userId,
    type: Object.keys(req.body).includes("files")
      ? "task_file_deleted"
      : "task_updated",
  }).save();

  await Task.updateOne(
    { _id: id },
    { $set: { taskHistory: [taskHistoryInfo._id, ...taskDetails.taskHistory] } }
  );
  let result = req.body;
  const taskInfo = await Task.findById(id);
  if (Object.keys(req.body).includes("label")) {
    result["label"] = taskInfo.label;
  }
  const newTaskHistory = await TaskHistory.findById(
    taskHistoryInfo._id
  ).populate({
    path: "userId",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });

  return res.status(200).json({ ...req.body, updatedHistory: newTaskHistory });
};
