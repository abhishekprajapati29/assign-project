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

// ProjectCreateForm page components
import Header from "layouts/Project/components/projectForm/index";

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
import { MenuItem } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDDropDown from "components/MDDropdown";
import pxToRem from "assets/theme/functions/pxToRem";
import TaskForm from "./components/taskForm";

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

const taskActionList = (title, value, handleChange, dropDownList) => (
  <MDBox>
    {["Status", "Sprint", "Original Estimate", "Story Points", "Priority", "Label"].map((obj) => (
      <MDBox key={obj} mb={2}>
        {customDropDown(obj, value, handleChange, dropDownList)}
      </MDBox>
    ))}
  </MDBox>
);

function TaskCreateForm() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <TaskForm />
    </DashboardLayout>
  );
}

export default TaskCreateForm;
