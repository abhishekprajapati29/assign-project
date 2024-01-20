const mongoose = require("mongoose");

const UserProfile = require("../models/userprofile");
const User = require("../models/user");

exports.userprofileSerialize = (user) => {
  const profile = new Map();
  profile["email"] = user.email;
  profile["username"] = user.username;
  return profile;
};

exports.createUserProfile = async (user, res) => {
  const userProfileObj = this.userprofileSerialize(user);
  const userprofile = await UserProfile.find({
    $or: [{ email: userProfileObj.email }],
  });
  if (userprofile.length > 0) {
    return res.status(409).json({
      message: "User Profile already exists!",
    });
  } else {
    userProfileObj["_id"] = new mongoose.Types.ObjectId();
    const newUserProfile = await new UserProfile(userProfileObj).save();
    if (!newUserProfile)
      res.status(500).json({
        error: err,
      });
    await User.updateOne(
      { _id: user._id },
      { $set: { userProfileId: newUserProfile._id } }
    );
    return newUserProfile;
  }
};

exports.userprofile_create = (req, res, next) => {
  UserProfile.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .exec()
    .then((userprofile) => {
      if (userprofile.length >= 1) {
        return res.status(409).json({
          message: "User Profile already exists!",
        });
      } else {
        const userpro = new UserProfile({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          location: req.body.location,
          userImage: req.files.userImage[0].path,
          coverImage: req.files.coverImage[0].path,
          email: req.body.email,
          mobileNo: req.body.mobileNo,
          designation: req.body.designation,
          aboutMe: req.body.aboutMe,
          gender: req.body.gender,
          address: req.body.address,
          occupation: req.body.occupation,
          skills: req.body.skills,
          selected: req.body.selected,
        });
        userpro
          .save()
          .then((result) => {
            res.status(201).json({
              message: "User Profile created",
              userprofile: {
                username: result.username,
                location: result.location,
                userImage: result.userImage,
                coverImage: result.coverImage,
                email: result.email,
                mobileNo: result.mobileNo,
                designation: result.designation,
                aboutMe: result.aboutMe,
                gender: result.gender,
                address: result.address,
                occupation: result.occupation,
                skills: result.skills,
                selected: result.selected,
              },
              request: {
                type: "GET",
                userImage: process.env.host + result.userImage,
                coverImage: process.env.host + result.coverImage,
              },
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.userprofiles = (req, res, next) => {
  UserProfile.find()
    .select("username location email")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        userprofile: docs.map((doc) => {
          return {
            username: doc.username,
            location: doc.location,
            userImage: doc.userImage,
            coverImage: doc.coverImage,
            email: doc.email,
            mobileNo: doc.mobileNo,
            designation: doc.designation,
            aboutMe: doc.aboutMe,
            gender: doc.gender,
            address: doc.address,
            occupation: doc.occupation,
            skills: doc.skills,
            selected: doc.selected,
            request: {
              type: "GET",
              url: process.env.host + "userprofile/" + doc._id,
            },
          };
        }),
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.userprofile_info = (req, res, next) => {
  const id = req.params.userprofileId;
  UserProfile.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          userprofile: doc,
          request: {
            type: "GET",
            url: process.env.host + "userprofile",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.userprofile_update = async (req, res, next) => {
  const id = req.params.userprofileId;
  const userId = req.body.userId;
  delete req.body.userId;
  let updateObj = req.body;
  if (req.files.userImage[0].path) {
    updateObj["userImage"] = req.files.userImage[0].path.replace(/\\/g, "/");
  }
  const userProfileInfo = await UserProfile.updateOne(
    { _id: id },
    { $set: req.body }
  );
  const newInfo = await UserProfile.findById(id);
  return res.status(200).json({
    userProfileId: newInfo,
    _id: userId,
  });
};

exports.userprofile_delete = (req, res, next) => {
  UserProfile.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
