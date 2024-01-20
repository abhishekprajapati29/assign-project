import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";

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
import { useNavigate } from "react-router-dom";

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

function Header() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Private");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState(dayjs(moment().toDate()));
  const [endDate, setEndDate] = useState(dayjs(moment().toDate()));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = new Map();
    obj["projectName"] = projectName;
    obj["projectImage"] = files[0];
    obj["type"] = type;
    obj["startDate"] = startDate;
    obj["dueDate"] = endDate;
    obj["description"] = description;
    obj["status"] = status;
    obj["createdBy"] = JSON.parse(localStorage.getItem("currentUser"))._id;
    obj["selected"] = true;

    const token = localStorage.getItem("token");
    const result = axios.post(`${process.env.REACT_APP_BACKEND_URL}project`, obj, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    });

    if (!result) return "Error while creating a new project!";
    navigate("/project/");
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
          <FormInputField title={"Name"} value={projectName} setFunction={setProjectName} />
          <FormInputField title={"Description"} value={description} setFunction={setDescription} />
          <FormRadio
            title={"Type"}
            labels={["Private", "Public"]}
            defaultValue={type}
            setFunction={setType}
          />
          <FormDND title={"Upload Image"} files={files} setFunction={setFiles} />
          <Grid container spacing={1} alignItems="center" mb={2}>
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                title={"Status"}
                value={status}
                dropDownList={[
                  ["test", "https://flagcdn.com/w20/ca.png"],
                  ["test1", "https://flagcdn.com/w20/ca.png"],
                ]}
                setFunction={setStatus}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDropdown
                title={"Assignee"}
                value={assignee}
                dropDownList={[
                  ["test", "https://flagcdn.com/w20/ca.png"],
                  ["test1", "https://flagcdn.com/w20/ca.png"],
                ]}
                setFunction={setAssignee}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <FormDatePicker title="Start Date" value={startDate} setFunction={setStartDate} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormDatePicker title="End Date" value={endDate} setFunction={setEndDate} />
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
Header.defaultProps = {
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

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  color: PropTypes.any,
};

export default Header;
