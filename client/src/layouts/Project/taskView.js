import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TaskInfoCard from "examples/Cards/InfoCards/TaskInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// TaskView page components
import Header from "layouts/Project/components/taskView/index";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import data from "layouts/Project/data/taskViewData";
import taskListData from "layouts/Project/data/projectListData";
import { MenuItem } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDDropDown from "components/MDDropdown";
import pxToRem from "assets/theme/functions/pxToRem";
import { useEffect, useState } from "react";
import FormDropdown from "examples/Form/FormDropDown";
import BlockerImage from "assets/images/priority/blocker.png";
import CriticalImage from "assets/images/priority/critical.png";
import MajorImage from "assets/images/priority/high.png";
import MinorImage from "assets/images/priority/low.png";
import FormInputField from "examples/Form/InputField";
import { updateProject, updateTask } from "./data/http";
import MDSnackbar from "components/MDSnackbar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 12;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const customDropDown = (title, value, handleChange, dropDownList, image) => (
  <MDBox>
    <MDTypography variant="h6" fontWeight="medium">
      {title}
    </MDTypography>
    <MDDropDown
      value={value}
      // value={search}
      onChange={handleChange}
      fullWidth
      MenuProps={MenuProps}
      size="xs"
      sx={{ paddingY: pxToRem(10) }} // onChange={({ currentTarget }) => {
      //   setSearch(search);
      //   onSearchChange(currentTarget.value);
      // }}
      IconComponent={"ArrowDropDownIcon"}
    >
      {dropDownList.map((item) => (
        <MenuItem key={item} value={item}>
          <Grid container spacing={1} alignItems="center">
            {image ? (
              <Grid item>
                <MDAvatar
                  src={"https://flagcdn.com/w20/ca.png"}
                  alt="profile-image"
                  size="xs"
                  shadow="sm"
                />
              </Grid>
            ) : null}

            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography color="text" fontWeight="regular" fontSize="0.875rem">
                  {item}
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MenuItem>
      ))}
    </MDDropDown>
  </MDBox>
);

const taskActionList = <MDBox></MDBox>;

function TaskView() {
  const { task, setTask, comments, setCommentList } = data();
  let { projectInfo, setProjectLists } = taskListData();
  const [assignee, setAssignee] = useState(task.assignee);
  const [status, setStatus] = useState(task.status);
  const [sprint, setSprint] = useState(task.sprint);
  const [estimate, setEstimate] = useState(task.estimate);
  const [priority, setPriority] = useState(task.priority);
  const [label, setLabel] = useState(task.label || []);
  const [summary, setSummary] = useState("");
  const [enableEditTitle, setEnableEditTitle] = useState(false);
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState(false);
  const [notification, setNotification] = useState(false);
  const [addStatus, setAddStatus] = useState("");
  const [addSprint, setAddSprint] = useState("");
  const [addLabel, setAddLabel] = useState("");

  useEffect(() => {
    setAssignee(task.assignee);
    setStatus(task.status);
    setSprint(task.sprint);
    setEstimate(task.estimate);
    setPriority(task.priority);
    setLabel(task.label || []);
  }, [task]);

  const setUploadFiles = async (files) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("userId", JSON.parse(localStorage.getItem("currentUser"))._id);
    const taskId = localStorage.getItem("taskId");
    const result = await updateTask(taskId, formData);
    if (!result) return "Error while updating the task!";

    task["files"] = [
      ...files.map((file) => {
        return `uploads/project/${file.name}`;
      }),
      ...task.files,
    ];

    task["taskHistory"] = [result.data.updatedHistory, ...task["taskHistory"]];
    setTask(task);
    setNotification(true);
  };

  const handleTitle = () => {
    setSummary(task.summary);
    setEnableEditTitle((prev) => !prev);
  };

  const handleDescription = () => {
    setDescription(task.description);
    setEditDescription((prev) => !prev);
  };

  const handleDescriptionChange = (html) => {
    setDescription(html);
  };

  const handleTitleEdit = () => {
    handleTriggerUpdate("summary", summary);
  };

  const handleDescriptionEdit = () => {
    handleTriggerUpdate("description", description);
  };

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title={"Update"}
      content={"Successfully updated"}
      route={""}
      note={""}
      type={""}
      dateTime={""}
      open={notification}
      onClose={() => setNotification(false)}
      close={() => setNotification(false)}
    />
  );

  const handleResponseUpdate = (data) => {
    if (typeof data === "object") {
      Object.keys(data).map((li) => {
        if (li === "summary") {
          task["summary"] = data[li];
          setSummary("");
          setEnableEditTitle((prev) => !prev);
          setNotification(true);
        }
        if (li === "assignee") {
          task["assignee"] = data[li];
          setAssignee("");
          setNotification(true);
        }
        if (li === "status") {
          task["status"] = data[li];
          setStatus("");
          setNotification(true);
        }
        if (li === "sprint") {
          task["sprint"] = data[li];
          setSprint("");
          setNotification(true);
        }
        if (li === "estimate") {
          task["estimate"] = data[li];
          setEstimate("");
          setNotification(true);
        }
        if (li === "priority") {
          task["priority"] = data[li];
          setPriority("");
          setNotification(true);
        }
        if (li === "label") {
          task["label"] = typeof data[li] === "string" ? [data[li]] : data[li];
          setLabel([]);
          setNotification(true);
        }
        if (li === "description") {
          task["description"] = data[li];
          setDescription("");
          setNotification(true);
          setEditDescription((prev) => !prev);
        }
        if (li === "files") {
          task["files"] = data[li];
          setNotification(true);
        }
      });
    }

    task["taskHistory"] = [data.updatedHistory, ...task["taskHistory"]];
    setTask(task);
  };

  const handleUpdate = async (formData = {}) => {
    if (!formData || Object.keys(formData)?.length <= 1) return;
    const taskId = localStorage.getItem("taskId");
    const result = await updateTask(taskId, formData);
    if (!result) return "Error while updating the task!";
    handleResponseUpdate(result.data);
  };

  const getPriorityIcons = (priority) => {
    if (priority === "Blocker") return BlockerImage;
    else if (priority === "Critical") return CriticalImage;
    else if (priority === "Major") return MajorImage;
    else if (priority === "Minor") return MinorImage;
    else return MinorImage;
  };

  // useEffect(() => {
  //
  //   handleUpdate();
  // }, [status, sprint, assignee, estimate, priority]);

  const updateInfoProject = async (key, value) => {
    const formData = new FormData();
    formData.append(key, value);
    const projectId = localStorage.getItem("projectId");
    const result = await updateProject(projectId, formData);
    if (!result) return "Error while updating the project!";
    return result.data;
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      if (addStatus.length > 0) {
        const result = await updateInfoProject("addStatus", addStatus);
        projectInfo["statusList"] = result.statusList;
        setProjectLists(projectInfo);
        setAddStatus("");
        await handleTriggerUpdate("status", addStatus);
        setStatus(addStatus);
      } else if (addSprint.length > 0) {
        const result = await updateInfoProject("addSprint", addSprint);
        projectInfo["sprintList"] = result.sprintList;
        setProjectLists(projectInfo);
        setAddSprint("");
        await handleTriggerUpdate("sprint", addSprint);
        setSprint(addSprint);
        task["label"] = [...task.label, addLabel];
        setTask(task);
      } else if (addLabel.length > 0) {
        const result = await updateInfoProject("addLabel", addLabel);
        projectInfo["labelList"] = result.labelList;
        setProjectLists(projectInfo);
        setAddLabel("");
        setLabel([]);
        await handleTriggerUpdate("label", [...task.label, addLabel]);
        task["label"] = [...task.label, addLabel];
        setLabel([]);
        setTask(task);
      }
    }
  };

  const handleTriggerUpdate = async (key, value, deleted = null) => {
    const obj = {};
    obj[key] = value;
    obj["userId"] = JSON.parse(localStorage.getItem("currentUser"))._id;
    if (deleted) {
      obj["deleted"] = deleted;
    }

    await handleUpdate(obj);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        data={task}
        taskListInfo={projectInfo}
        assignee={assignee || task.assignee}
        setAssignee={(value) => handleTriggerUpdate("assignee", value)}
        action={{
          tooltip: "Edit Title",
          route: "",
          handleFunction: handleTitle,
          enableEditTitle: enableEditTitle,
          setEnableEditTitle,
          summary: summary,
          setSummary: setSummary,
          handleTitleEdit,
        }}
      >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} xl={9}></Grid>
            <Grid item xs={12} xl={9} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <TaskInfoCard
                title="Description"
                description={task.description}
                comments={comments}
                historys={task?.taskHistory}
                setCommentList={setCommentList}
                data={task}
                action={{
                  route: "",
                  tooltip: "Edit Description",
                  handleFunction: handleDescription,
                  editDescription: editDescription,
                  setEditDescription,
                  description: description,
                  setDescription: setDescription,
                  handleDescriptionEdit,
                  setUploadFiles,
                  updateFileList: (files, deleted) => handleTriggerUpdate("files", files, deleted),
                }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={3}>
              <MDBox>
                <FormDropdown
                  key={status}
                  title={"Status"}
                  value={status || task.status}
                  dropDownList={projectInfo?.statusList?.map((li) => {
                    return [li];
                  })}
                  setFunction={(value) => handleTriggerUpdate("status", value)}
                  addMore={true}
                  addMoreFunc={setAddStatus}
                  handleKeyDown={handleEnter}
                />
                <FormDropdown
                  key={sprint}
                  title={"Sprint"}
                  value={sprint || task.sprint}
                  dropDownList={projectInfo?.sprintList?.map((li) => {
                    return [li];
                  })}
                  setFunction={(value) => handleTriggerUpdate("sprint", value)}
                  addMore={true}
                  addMoreFunc={setAddSprint}
                  handleKeyDown={handleEnter}
                />
                <FormInputField
                  type="number"
                  title={"Estimate"}
                  value={estimate || task.estimate}
                  setFunction={(value) => handleTriggerUpdate("estimate", value)}
                />
                <FormDropdown
                  title={"Priority"}
                  value={priority || task.priority}
                  dropDownList={projectInfo?.priorityList?.map((li) => {
                    return [li, getPriorityIcons(li)];
                  })}
                  setFunction={(value) => handleTriggerUpdate("priority", value)}
                />
                <FormDropdown
                  key={label}
                  title={"Label"}
                  value={task?.label || []}
                  dropDownList={projectInfo?.labelList?.map((li) => {
                    return [li];
                  })}
                  setFunction={(value) => handleTriggerUpdate("label", value)}
                  multiple={true}
                  addMore={true}
                  addMoreFunc={setAddLabel}
                  handleKeyDown={handleEnter}
                />
              </MDBox>
              {renderInfoSB}
              {/* {["Status", "Sprint", "Original Estimate", "Story Points", "Priority", "Label"].map((obj) => (
      <MDBox key={obj} mb={2}>
        {customDropDown(obj, value, handleChange, dropDownList)}
      </MDBox>
    ))} */}
              {/* <TaskActionList title="conversations" profiles={profilesListData} shadow={false} /> */}
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default TaskView;
