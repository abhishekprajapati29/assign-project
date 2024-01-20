import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import "react-quill/dist/quill.snow.css";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDDropDown from "components/MDDropdown";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import pxToRem from "assets/theme/functions/pxToRem";
import { Button, FormControlLabel, Link, Paper, Radio, Tooltip } from "@mui/material";
import MDInput from "components/MDInput";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import MDRadio from "components/MDRadio";
import MDButton from "components/MDButton";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MDDatePicker from "components/MDDatePicker";
import FormInputField from "examples/Form/InputField";
import FormRadio from "examples/Form/Radio";
import FormDND from "examples/Form/FormDND";
import FormDropdown from "examples/Form/FormDropDown";
import FormDatePicker from "examples/Form/FormDatePicker";
import moment from "moment";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "examples/Editor";
import FormEditor from "examples/Form/FormEditor";
import data from "layouts/Project/data/projectListData";
import BlockerImage from "assets/images/priority/blocker.png";
import CriticalImage from "assets/images/priority/critical.png";
import MajorImage from "assets/images/priority/high.png";
import MinorImage from "assets/images/priority/low.png";
import { createTask } from "layouts/Project/data/http";
import { updateProject } from "layouts/Project/data/http";

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

function TaskForm() {
  const { projectInfo, setProjectLists } = data();
  const location = useLocation();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [label, setLabel] = useState([]);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Task");
  const [sprint, setSprint] = useState("");
  const [estimate, setEstimate] = useState(0);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("Todo");
  const [assignee, setAssignee] = useState(projectInfo.currentUser);
  const [startDate, setStartDate] = useState(dayjs(moment().toDate()));
  const [dueDate, setDueDate] = useState(dayjs(moment().toDate()));
  const [addStatus, setAddStatus] = useState("");
  const [addSprint, setAddSprint] = useState("");
  const [addLabel, setAddLabel] = useState("");

  useEffect(() => {
    const typeData = location.pathname.split("/")[location.pathname.split("/").length - 2];
    setType(typeData === "bugs" ? "Bug" : "Task");
  }, []);

  const [priority, setPriority] = useState("Minor");
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectId", localStorage.getItem("projectId"));
    formData.append("userId", JSON.parse(localStorage.getItem("currentUser"))._id);
    formData.append("type", type);
    formData.append("summary", summary);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("priority", priority);
    for (let i = 0; i < label.length; i++) {
      formData.append("label", label[i]);
    }
    formData.append("assignee", assignee);
    formData.append("sprint", sprint);
    formData.append("selected", true);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const result = await createTask(formData);
    if (!result) return "Error while creating a new task!";
    navigate(`/project/${localStorage.getItem("projectId")}/tasks`);
  };

  const handleEditor = (html) => {
    setDescription(html);
  };

  const getPriorityIcons = (priority) => {
    if (priority === "Blocker") return BlockerImage;
    else if (priority === "Critical") return CriticalImage;
    else if (priority === "Major") return MajorImage;
    else if (priority === "Minor") return MinorImage;
    else return MinorImage;
  };

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
        setStatus(addStatus);
      } else if (addSprint.length > 0) {
        const result = await updateInfoProject("addSprint", addSprint);
        projectInfo["sprintList"] = result.sprintList;
        setProjectLists(projectInfo);
        setAddSprint("");
        setSprint(addSprint);
      } else if (addLabel.length > 0) {
        const result = await updateInfoProject("addLabel", addLabel);

        projectInfo["labelList"] = result.labelList;
        setProjectLists(projectInfo);
        setAddLabel("");
        setLabel((prev) => [...prev, e.target.value]);
      }
    }
  };

  return (
    <MDBox position="relative" mb={5}>
      <Card
        sx={{
          position: "relative",
          py: 2,
          px: 2,
        }}
      >
        <MDBox height="100%" mt={0.5} lineHeight={1}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                title={"Issue Type"}
                value={type}
                dropDownList={projectInfo?.issueTypes?.map((li) => {
                  return [li];
                })}
                setFunction={setType}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                key={sprint}
                title={"Sprint"}
                value={sprint}
                dropDownList={projectInfo?.sprintList?.map((li) => {
                  return [li];
                })}
                setFunction={setSprint}
                addMore={true}
                addMoreFunc={setAddSprint}
                handleKeyDown={handleEnter}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                key={status}
                title={"Status"}
                value={status}
                dropDownList={projectInfo?.statusList?.map((li) => {
                  return [li];
                })}
                setFunction={setStatus}
                addMore={true}
                addMoreFunc={setAddStatus}
                handleKeyDown={handleEnter}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                title={"Priority"}
                value={priority}
                dropDownList={projectInfo?.priorityList?.map((li) => {
                  return [li, getPriorityIcons(li)];
                })}
                setFunction={setPriority}
              />
            </Grid>
          </Grid>

          <FormInputField title={"Summary"} value={summary} setFunction={setSummary} />
          <FormEditor
            title={"Description"}
            value={description}
            setFunction={handleEditor}
            actionRequired={false}
          />
          <FormDropdown
            key={label}
            title={"Labels"}
            value={label}
            dropDownList={projectInfo?.labelList?.map((li) => {
              return [li];
            })}
            setFunction={setLabel}
            multiple={true}
            addMore={true}
            addMoreFunc={setAddLabel}
            handleKeyDown={handleEnter}
          />
          <FormDND title={"Upload Image"} files={files} setFunction={setFiles} />
          <Grid container spacing={1} alignItems="center" mb={2}>
            <Grid item xs={12} md={6} lg={6}>
              <FormInputField
                type="number"
                title={"Estimate"}
                value={estimate}
                setFunction={setEstimate}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                title={"Assignee"}
                value={assignee}
                dropDownList={projectInfo?.assignee?.map((li) => {
                  return [
                    li.userId.userProfileId?.username,
                    `${process.env.REACT_APP_BACKEND_URL}${li.userId.userProfileId?.userImage}`,
                  ];
                })}
                setFunction={setAssignee}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <FormDatePicker title="Start Date" value={startDate} setFunction={setStartDate} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDatePicker title="End Date" value={dueDate} setFunction={setDueDate} />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <MDTypography variant="h6" fontWeight="regular">
                <MDBox component={"span"} color="red">
                  *
                </MDBox>
                Require field which have asterisk
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox
                sx={{
                  display: "flex",
                  mt: 2,
                }}
              >
                <MDButton
                  color={"dark"}
                  variant="gradient"
                  fullWidth
                  sx={darkMode ? sidenavTypeButtonsStyles : sidenavTypeActiveButtonStyles}
                >
                  Cancel
                </MDButton>
                <MDBox sx={{ mx: 1 }}></MDBox>
                <MDButton
                  color={darkMode ? "dark" : "white"}
                  variant="gradient"
                  fullWidth
                  onClick={(e) => handleSubmit(e)}
                  sx={darkMode ? sidenavTypeButtonsStyles : sidenavTypeActiveButtonStyles}
                >
                  Create
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
TaskForm.defaultProps = {
  children: "",
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "default",
  ]),
};

// Typechecking props for the TaskForm
TaskForm.propTypes = {
  children: PropTypes.node,
  color: PropTypes.any,
};

export default TaskForm;
