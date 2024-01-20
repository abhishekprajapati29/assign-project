const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  userImage: {
    type: String,
    default: "defaultImage/userAvatar.png",
    required: true,
  },
  coverImage: {
    type: String,
    required: false,
  },
  mobileNo: {
    type: Number,
  },
  designation: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
  },
  skills: {
    type: String,
  },
  role: {
    type: String,
    default: "member",
  },
  notifyRequest: {
    type: Boolean,
    default: true,
  },
  blockRequest: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
