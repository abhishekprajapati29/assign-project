const mongoose = require("mongoose");
const moment = require("moment");
const { Project, Member } = require("../../models/project");
const User = require("../../models/user");

exports.project_request_users = async (req, res, next) => {
  const projectId = req.params.id;
  const memberLists = await Member.find({ projectId }).populate({
    path: "userId",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });

  if (memberLists.length < 1)
    return res.status(404).json({
      message: "No entries found",
    });

  const excludeUserIds = memberLists.map((li) => li.userId._id);

  const requestUserLists = await User.find({
    _id: { $nin: excludeUserIds },
  }).populate("userProfileId");

  const filteredData = requestUserLists?.filter(
    (fil) => fil.userProfileId.blockRequest === false
  );

  const requestedUsers = await Project.findById(projectId).select(
    "userRequestIds"
  );
  const response = {
    count: filteredData.length,
    users: filteredData || [],
    requestedUsers: requestedUsers.userRequestIds || [],
  };
  return res.status(200).json(response);
};

exports.project_owner = async (req, res, next) => {
  const id = req.params.id;

  const projectOwner = await Project.findById(id).select("createdBy");
  if (!projectOwner)
    return res.status(404).json({ message: "Project owner not exists!" });
  const owner = await User.findById(projectOwner.createdBy).populate(
    "userProfileId"
  );

  const response = owner;
  return res.status(200).json(response);
};

exports.project_request_send_user = async (req, res, next) => {
  const { body } = req;
  return res.status(200).json(body);
};

exports.project_task_form_info = async (req, res, next) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId)
    .select("statusList priorityList issueTypes labelList sprintList members")
    .populate({
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

  const response = {
    assignee: project.members,
    statusList: project.statusList,
    priorityList: project.priorityList,
    issueTypes: project.issueTypes,
    labelList: project.labelList,
    sprintList: project.sprintList,
  };
  return res.status(200).json(response);
};
