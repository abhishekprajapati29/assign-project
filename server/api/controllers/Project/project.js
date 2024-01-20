const mongoose = require("mongoose");
const moment = require("moment");

const { Project, Task, Bug, File, Member } = require("../../models/project");
const Notification = require("../../models/notification");

exports.project_create = async (req, res, next) => {
  const project = await Project.find({
    projectName: req.body.projectName,
  });

  if (project.length >= 1)
    return res.status(409).json({
      message: "Project with this name already exists!",
    });

  const newProject = new Project({
    _id: new mongoose.Types.ObjectId(),
    projectName: req.body.projectName,
    projectImage: req?.files?.projectImage[0]?.path?.replace(/\\/g, "/"),
    type: req.body.type,
    startDate: moment.utc(req.body.startDate),
    dueDate: moment.utc(req.body.dueDate),
    description: req.body.description,
    status: req.body.status,
    selected: req.body.selected,
    createdBy: req.userData.userId,
  });

  const newPro = await newProject.save();

  const project_member = new Member({
    _id: new mongoose.Types.ObjectId(),
    projectId: newPro._id,
    userId: req.userData.userId,
    type: "owner",
    selected: true,
  });

  const owner = await project_member.save();

  const projectUpdate = await Project.updateOne(
    { _id: newPro._id },
    { $set: { members: [owner._id] } }
  );

  if (!newPro)
    return res.status(409).json({
      message: "Error while create a new project!",
    });

  if (newPro) {
    const response = {
      message: "project created",
      project: { ...newPro, members: [owner._id] },
    };
    res.status(201).json(response);
  }
};

exports.projects = async (req, res, next) => {
  const projects = await Project.find({
    createdBy: req.userData.userId,
  }).populate({
    path: "members",
    populate: {
      path: "userId",
      model: "User",
      populate: {
        path: "userProfileId",
        model: "UserProfile",
      },
    },
  });
  if (!projects)
    res.status(404).json({
      message: "No entries found",
    });
  const response = {
    count: projects.length,
    project: projects.map((project) => {
      return {
        _id: project._id,
        projectName: project.projectName,
        projectImage: project.projectImage,
        type: project.type,
        startDate: project.startDate,
        dueDate: project.dueDate,
        description: project.description,
        status: project.status,
        selected: project.selected,
        project_chip: project.project_chip,
        userRequestIds: project.userRequestIds,
        tasks: project.tasks,
        bugs: project.bugs,
        files: project.files,
        forums: project.forums,
        reports: project.reports,
        activitys: project.activitys,
        members: project.members,
      };
    }),
  };
  res.status(200).json(response);
};

exports.project_info = async (req, res, next) => {
  const id = req.params.projectId;
  const projectInfo = await Project.findById(id).populate(
    "tasks bugs forums activitys reports members"
  );
  if (!projectInfo)
    return res.status(404).json({ message: "Project not exists!" });
  const response = {
    _id: project._id,
    projectName: project.projectName,
    projectImage: project.projectImage,
    startDate: project.startDate,
    dueDate: project.dueDate,
    projectDesc: project.projectDesc,
    shortDesc: project.shortDesc,
    status: project.status,
    selected: project.selected,
    project_chip: project.project_chip,
    tasks: project.tasks,
    bugs: project.bugs,
    files: project.files,
    forums: project.forums,
    reports: project.reports,
    activitys: project.activitys,
    members: project.members,
  };
  res.status(200).json(response);
};

exports.project_info_count = async (req, res, next) => {
  const id = req.params.projectId;
  const projectInfo = await Project.findById(id).populate(
    "tasks bugs members files"
  );
  if (!projectInfo)
    return res.status(404).json({ message: "Project not exists!" });
  const pendingTaskCountCurrentWeek = await Task.countDocuments({
    projectId: id,
    status: { $ne: "Done" },
    type: "Task",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  const completedTaskCountCurrentWeek = await Task.countDocuments({
    projectId: id,
    status: "Done",
    type: "Task",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  const pendingBugCountCurrentWeek = await Bug.countDocuments({
    projectId: id,
    status: { $ne: "Done" },
    type: "Bug",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  const completedBugCountCurrentWeek = await Bug.countDocuments({
    projectId: id,
    type: "Bug",
    status: "Done",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  const fileList = await File.find({
    projectId: id,
  });
  let fileListSize = 0;
  for (let file = 0; file < fileList.length; file++) {
    fileListSize += fileList[file].size || 0;
  }
  const response = {
    taskCount: pendingTaskCountCurrentWeek || 0,
    taskInfo: completedTaskCountCurrentWeek || 0,
    bugsCount: pendingBugCountCurrentWeek || 0,
    bugInfo: completedBugCountCurrentWeek,
    fileCount: fileList.length || 0,
    fileSize: fileListSize || 0,
    memberCount: projectInfo.members.length || 0,
  };
  res.status(200).json(response);
};

function rotateList(arr, positions) {
  const len = arr.length;
  const rotatedArray = [];

  for (let i = 0; i < len; i++) {
    const newPosition = (i + positions) % len;
    rotatedArray[newPosition] = arr[i];
  }

  return rotatedArray;
}

exports.project_info_chart = async (req, res, next) => {
  const id = req.params.projectId;
  const projectInfo = await Project.findById(id).populate("tasks bugs");
  if (!projectInfo)
    return res.status(404).json({ message: "Project not exists!" });
  const isOwner = projectInfo.createdBy === req.userData.userId;
  // export default {
  //   labels: ["M", "T", "W", "T", "F", "S", "S"],
  //   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
  // };
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const count = [];
  const abbreviatedDay = moment().day();

  for (let i = 7; i >= 1; i--) {
    const taskCount = await Task.countDocuments({
      projectId: id,
      status: "Done",
      type: "Task",
      createdAt: {
        $gte: new Date(new Date() - i * 24 * 60 * 60 * 1000),
      },
    });

    const bugCount = await Bug.countDocuments({
      projectId: id,
      status: "Done",
      type: "Bug",
      createdAt: {
        $gte: new Date(new Date() - i * 24 * 60 * 60 * 1000),
      },
    });
    count.push(taskCount + bugCount);
  }

  const labelList = await rotateList(days, abbreviatedDay);
  const dataList = await rotateList(count, abbreviatedDay);
  const sum = dataList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / dataList.length;
  let percentage = "0";
  if (average < 1) {
    percentage = "100";
  } else {
    percentage = Math.ceil(
      ((dataList[dataList.length - 1] - average) / average) * 100
    ).toString();
  }

  // {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: {
  //     label: "Mobile apps",
  //     data: [10, 20, 30, 50, 40, 300, 320, 500, 350, 200, 230, 500],
  //   },
  // },

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const taskCountList = [];
  const bugCountList = [];
  const abbreviatedMonth = moment().month();
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() - i + 1,
      0
    );
    const taskCount = await Task.countDocuments({
      projectId: id,
      status: "Done",
      type: "Task",
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const bugCount = await Bug.countDocuments({
      projectId: id,
      status: "Done",
      type: "Bug",
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });
    bugCountList.push(bugCount);
    taskCountList.push(taskCount);
  }

  const tasklabelList = await rotateList(months, abbreviatedMonth);
  const taskdataList = await rotateList(taskCountList, abbreviatedMonth);
  const buglabelList = await rotateList(months, abbreviatedMonth);
  const bugdataList = await rotateList(bugCountList, abbreviatedMonth);
  const tasksum = taskdataList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const bugsum = bugdataList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const taskaverage = tasksum / taskdataList.length;
  const bugaverage = bugsum / bugdataList.length;
  let taskpercentage = "0";
  let bugpercentage = "0";
  if (average < 1) {
    taskpercentage = "100";
    bugpercentage = "100";
  } else {
    taskpercentage = Math.ceil(
      ((taskdataList[taskdataList.length - 1] - taskaverage) / taskaverage) *
        100
    ).toString();
    bugpercentage = Math.ceil(
      ((bugdataList[bugdataList.length - 1] - bugaverage) / bugaverage) * 100
    ).toString();
  }

  const response = {
    weeklyTask: {
      chart: {
        labels: labelList,
        datasets: { label: "Tasks & Bugs", data: dataList },
      },
      info: percentage,
    },
    task: {
      chart: {
        labels: tasklabelList,
        datasets: { label: "Tasks", data: taskdataList },
      },
      info: taskpercentage,
    },
    bug: {
      chart: {
        labels: buglabelList,
        datasets: { label: "Bugs", data: bugdataList },
      },
      info: bugpercentage,
    },
  };
  res.status(200).json(response);
};

exports.project_update = async (req, res, next) => {
  const projectId = req.params.projectId;
  const project = await Project.findById(projectId);
  if (!project)
    return res.status(409).json({
      message: "Project with this id not exists!",
    });

  const obj = req.body;
  const updateObj = {};
  Object.keys(obj).forEach((key) => {
    if (key === "addStatus") {
      updateObj["statusList"] = [...project.statusList, obj[key]];
    } else if (key === "addSprint") {
      updateObj["sprintList"] = [...project.sprintList, obj[key]];
    } else if (key === "addLabel") {
      updateObj["labelList"] = [...project.labelList, obj[key]];
    } else {
      updateObj[key] = obj[key];
    }
  });
  try {
    await Project.updateOne({ _id: projectId }, { $set: updateObj });
  } catch (err) {}

  return res.status(200).json({
    message: "Updated successfully",
    ...updateObj,
  });
};

exports.project_delete = (req, res, next) => {
  Project.remove({ _id: req.params.projectId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Project deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.project_user_accept = async (req, res, next) => {
  const notification = await Notification.findOne({
    userId: req.body.userId,
    projectId: req.body.projectId,
  });
  if (notification.status !== "pending")
    return res.status(200).json({ message: "Action already completed" });
  const project_member = new Member({
    _id: new mongoose.Types.ObjectId(),
    projectId: req.body.projectId,
    userId: req.body.userId,
    type: "member",
    selected: true,
  });
  const member = await project_member.save();
  const project = await Project.findById(req.body.projectId).select(
    "members userRequestIds"
  );
  await Project.updateOne(
    { _id: req.body.projectId },
    {
      $set: {
        members: [...project.members, member._id],
        userRequestIds: project.userRequestIds.filter(
          (li) => req.body.userId !== li.toString()
        ),
      },
    }
  );

  await Notification.updateOne(
    {
      userId: req.body.userId,
      projectId: req.body.projectId,
    },
    { $set: { status: "accepted" } }
  );
  return res.status(200).json({ message: "Request Accepted" });
};

exports.project_user_reject = async (req, res, next) => {
  const notification = await Notification.findOne({
    userId: req.body.userId,
    projectId: req.body.projectId,
  });
  if (notification.status !== "pending")
    return res.status(200).json({ message: "Action already completed" });

  await Project.updateOne(
    { _id: req.body.projectId },
    {
      $set: {
        userRequestIds: project.userRequestIds.filter(
          (li) => req.body.userId !== li.toString()
        ),
      },
    }
  );
  await Notification.updateOne(
    {
      userId: req.body.userId,
      projectId: req.body.projectId,
    },
    { $set: { status: "rejected" } }
  );
  return res.status(200).json({ message: "Request Rejected" });
};

exports.project_member_remove = async (req, res, next) => {
  const memberToRemove = req.body.memberId;
  const project = await Project.findById(req.body.projectId).select("members");
  await Project.updateOne(
    { _id: req.body.projectId },
    {
      $set: {
        members: project.members.filter((li) => li != memberToRemove),
      },
    }
  );
  await Member.deleteOne({ _id: memberToRemove });
  return res.status(200).json({ message: "Removed member" });
};
