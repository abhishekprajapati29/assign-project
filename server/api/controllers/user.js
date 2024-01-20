const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { createUserProfile } = require("./userprofile");

exports.getToken = async (email, userId, res) => {
  const token = await jwt.sign(
    { email: email, userId: userId },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

  if (!token) return res.status(401).json({ message: "Authentication failed" });
  return token;
};

exports.getHash = async (value, res) => {
  const hash = await bcrypt.hash(value, 10);
  if (!hash) return res.status(500).send({ message: "Error while hashing" });
  return hash;
};

exports.createUser = async (email, passwordHash, res) => {
  const user = await new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: passwordHash,
  }).save();
  if (!user) res.status(400).json({ message: "Error while registation." });
  return user;
};

exports.user_signup = async (req, res, next) => {
  const userExist = await User.find({ email: req.body.email });
  if (userExist.length > 0)
    return res.status(400).send({ message: "Email already exists" });

  const passwordHash = await this.getHash(req.body.password, res);
  const user = await this.createUser(req.body.email, passwordHash, res);
  const token = await this.getToken(user.email, user._id, res);

  const userProfile = await createUserProfile(
    { ...req.body, _id: user._id },
    res
  );
  return res.status(201).json({
    message: "Registration completed successfully",
    token,
    user: user,
    userProfile,
  });
};

exports.user_login = async (req, res, next) => {
  const user = await User.find({ email: req.body.email });
  if (user.length < 1)
    return res.status(401).json({
      message: "Email and Password is incorrect!",
    });
  const result = await bcrypt.compare(req.body.password, user[0].password);
  if (!result)
    return res.status(401).json({
      message: "Password is incorrect!",
    });
  if (result) {
    const token = jwt.sign(
      {
        email: user[0].email,
        userId: user[0]._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    const userProfile = await User.findById(user[0]._id)
      .select("userProfileId")
      .populate("userProfileId");
    return res.status(200).json({
      message: "Auth successful",
      token,
      user: user[0],
      userProfile,
    });
  }
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
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
