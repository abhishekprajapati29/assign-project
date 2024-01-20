const mongoose = require("mongoose");
const { Member } = require("../../models/project");

exports.members = async (req, res, next) => {
  const projectId = req.params.projectId;
  const members = await Member.find({ projectId }).populate({
    path: "userId",
    populate: {
      path: "userProfileId",
      model: "UserProfile",
    },
  });
  if (members.length < 1)
    return res.status(400).json({
      error: "No Members exists!",
    });
  const response = {
    count: members.length,
    members: members,
  };
  return res.status(200).json(response);
};
