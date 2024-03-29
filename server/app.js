const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
app.use(cors());

require("dotenv").config();

const userprofileRoutes = require("./api/routes/userprofile");
const userRoutes = require("./api/routes/user");
const fileRoutes = require("./api/routes/file");
const projectRoutes = require("./api/routes/project");
const notificationRoutes = require("./api/routes/notification");
const dashboardRoutes = require("./api/routes/dashboard");

mongoose.connect(
  "mongodb+srv://abhishek:" +
    process.env.MONGO_ATLAS_PW +
    "@assignit.bhsii8y.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/defaultImage", express.static("defaultImage"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests

app.use("/user", userRoutes);
app.use("/userprofile", userprofileRoutes);
app.use("/file", fileRoutes);
app.use("/project", projectRoutes);
app.use("/notification", notificationRoutes);
app.use("/dashboard", dashboardRoutes);

// Deployment

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client/build")));
  
  app.get("*", (req, res) => {
    console.log(req.get('host'));
    if (req.get('host') === "www.assign-project.onrender.com") {
      const fileDir = __dirname1.split("/").pop();
      console.log(fileDir);
      res.sendFile(path.resolve(fileDir, "client", "build", "index.html"))
    }
  });
} 

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
