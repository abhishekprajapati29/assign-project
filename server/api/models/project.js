const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectName: { type: String, required: true },
    projectImage: { type: String },
    startDate: { type: Date, default: Date.now() },
    dueDate: { type: Date },
    description: { type: String },
    type: { type: String },
    status: { type: String },
    selected: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    userRequestIds: { type: [mongoose.Schema.Types.ObjectId] },
    statusList: {
      type: [String],
      default: ["Todo", "Pending", "In Progress", "Testing", "Done"],
    },
    priorityList: {
      type: [String],
      default: ["Minor", "Major", "Critical", "Blocker"],
    },
    issueTypes: { type: [String], default: ["Task", "Bug"] },
    labelList: { type: [String] },
    sprintList: { type: [String], default: ["Sprint 1"] },
    tasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Task",
    },
    bugs: { type: [mongoose.Schema.Types.ObjectId], ref: "Bug" },
    files: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "File",
    },
    forums: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Forum",
    },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Report",
    },
    activitys: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Activity",
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

const taskSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: Object, required: true },
    summary: { type: String, required: true },
    status: { type: String, default: "Todo" },
    type: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    estimate: { type: Number, default: 0 },
    label: [String],
    files: [String],
    assignee: { type: String },
    sprint: { type: String, required: true },
    selected: { type: Boolean, default: true },
    startDate: { type: Date },
    dueDate: { type: Date },
    sequentialNumber: {
      type: Number,
    },
    taskHistory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "TaskHistory",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  if (this.isNew && !this.sequentialNumber) {
    const latestTicket = await Task.findOne({ projectId: this.projectId })
      .sort({ sequentialNumber: -1 })
      .exec();
    this.sequentialNumber =
      latestTicket && latestTicket.sequentialNumber
        ? latestTicket.sequentialNumber + 1
        : 1;
  }

  next();
});

const Task = mongoose.model("Task", taskSchema);

const taskHistorySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    files: [String],
    before: { type: String },
    now: { type: String, required: true },
    projectId: { type: Object, required: true },
    type: { type: String, required: true },
    deleted: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TaskHistory = mongoose.model("TaskHistory", taskHistorySchema);

const bugSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    project_id: { type: Object, required: true },
    bug: { type: String, required: true },
    status: { type: String, default: "Pending" },
    assigned_by: { type: String, required: true },
    assigned_to: { type: String, required: true },
    due_date: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

const fileSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: Object, required: true },
    file: { type: String, required: true },
    uploadedBy: { type: Object, required: true },
    title: { type: String, required: true },
    mimetype: { type: String, required: true },
    selected: { type: Boolean, default: true },
    size: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

const forumSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    project_id: { type: Object, required: true },
    file: { type: String },
    comment_by: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Forum = mongoose.model("Forum", forumSchema);

const reportSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    project_id: { type: Object, required: true },
    report_by: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

const activitySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    project_id: { type: Object, required: true },
    image_type: { type: String, required: true },
    activity: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

const memberSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: { type: String },
    selected: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: { type: String }, //comment, worklog, activity
    context: { type: String },
    files: [String],
    selected: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Project,
  Task,
  Bug,
  File,
  Forum,
  Report,
  Activity,
  Member,
  Comment,
  TaskHistory,
};
