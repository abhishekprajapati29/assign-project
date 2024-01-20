const mongoose = require("mongoose");
const moment = require("moment");
const { Project } = require("../models/project");
const Notification = require("../models/notification");
const { Storage } = require("../models/file");

exports.dashboard_info_count = async (req, res, next) => {
  const id = req.params.userId;
  const privateProjectCount = await Project.countDocuments({
    createdBy: id,
    type: "Private",
  });

  const publicProjectCountTotal = await Project.countDocuments({
    createdBy: id,
    type: "Public",
  });

  const privateProjectCountCurrentWeek = await Project.countDocuments({
    createdBy: id,
    type: "Private",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  const publicProjectCountCurrentWeek = await Project.countDocuments({
    createdBy: id,
    type: "Public",
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  const fileList = await Storage.find({
    userId: id,
  });
  let fileListSize = 0;
  for (let file = 0; file < fileList.length; file++) {
    fileListSize += fileList[file].size || 0;
  }

  const notificationTotal = await Notification.countDocuments({
    userId: id,
  });
  const notificationCurrentWeek = await Notification.countDocuments({
    userId: id,
    createdAt: {
      $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  const response = {
    publicProjectCountCurrentWeek: publicProjectCountCurrentWeek || 0,
    privateProjectCountCurrentWeek: privateProjectCountCurrentWeek,
    publicProjectCountTotal: publicProjectCountTotal || 0,
    privateProjectCount: privateProjectCount,
    fileCount: fileList.length || 0,
    fileSize: fileListSize || 0,
    inviteCount: notificationTotal || 0,
    inviteCurrentWeek: notificationCurrentWeek || 0,
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

exports.dashboard_info_chart = async (req, res, next) => {
  const id = req.params.userId;

  // export default {
  //   labels: ["M", "T", "W", "T", "F", "S", "S"],
  //   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
  // };
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const privateCount = [];
  const publicCount = [];
  const abbreviatedDay = moment().day();

  for (let i = 7; i >= 1; i--) {
    const publicProject = await Project.countDocuments({
      createdBy: id,
      type: "Public",
      createdAt: {
        $gte: new Date(new Date() - i * 24 * 60 * 60 * 1000),
      },
    });

    const privateProject = await Project.countDocuments({
      createdBy: id,
      type: "Private",
      createdAt: {
        $gte: new Date(new Date() - i * 24 * 60 * 60 * 1000),
      },
    });
    privateCount.push(privateProject);
    publicCount.push(publicProject);
  }

  const labelList = await rotateList(days, abbreviatedDay);
  const dataPrivateList = await rotateList(privateCount, abbreviatedDay);
  const dataPublicList = await rotateList(publicCount, abbreviatedDay);
  const privatesum = dataPrivateList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const publicsum = dataPublicList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const privateaverage = privatesum / dataPrivateList.length;

  let privatepercentage = "0";
  if (privateaverage < 1) {
    privatepercentage = "100";
  } else {
    privatepercentage = Math.ceil(
      ((dataPrivateList[dataPrivateList.length - 1] - privateaverage) /
        privateaverage) *
        100
    ).toString();
  }

  const publicaverage = publicsum / dataPublicList.length;
  let publicpercentage = "0";
  if (publicaverage < 1) {
    publicpercentage = "100";
  } else {
    publicpercentage = Math.ceil(
      ((dataPublicList[dataPublicList.length - 1] - publicaverage) /
        publicaverage) *
        100
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
  const countList = [];
  const abbreviatedMonth = moment().month();
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() - i + 1,
      0
    );
    const publicCount = await Project.countDocuments({
      createdBy: id,
      type: "Public",
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const privateCount = await Project.countDocuments({
      createdBy: id,
      type: "Private",
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });
    countList.push(publicCount + privateCount);
  }

  const totalList = await rotateList(months, abbreviatedDay);
  const totalDataList = await rotateList(countList, abbreviatedDay);
  const totalsum = totalDataList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const totalaverage = totalsum / totalDataList.length;
  let totalpercentage = "0";
  if (totalaverage < 1) {
    totalpercentage = "100";
  } else {
    totalpercentage = Math.ceil(
      ((totalDataList[totalDataList.length - 1] - totalaverage) /
        totalaverage) *
        100
    ).toString();
  }

  const response = {
    weeklyPublic: {
      chart: {
        labels: labelList,
        datasets: { label: "Public", data: dataPublicList },
      },
      info: publicpercentage,
    },
    weeklyPrivate: {
      chart: {
        labels: labelList,
        datasets: { label: "Private", data: dataPrivateList },
      },
      info: privatepercentage,
    },
    totalCount: {
      chart: {
        labels: totalList,
        datasets: { label: "Public & Private", data: totalDataList },
      },
      info: totalpercentage,
    },
  };
  res.status(200).json(response);
};
