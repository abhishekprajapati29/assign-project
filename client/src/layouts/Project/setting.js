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
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import UserRequestList from "examples/Lists/UserRequestList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/Project/components/setting/components/Header";
import PlatformSettings from "layouts/Project/components/setting/components/PlatformSettings";

// Data
import settingData from "layouts/Project/data/settingData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useState } from "react";
import { initWebSocket } from "socket";
import { useLocation } from "react-router-dom";
import { useMaterialUIController } from "context";

function SettingOverview() {
  const { owner, requestUsers, requestedUsers, setRequestedUsers } = settingData();
  const [controller, dispatch] = useMaterialUIController();
  const { socket } = controller;
  const location = useLocation();

  const handleJoinRequest = (userId) => {
    if (socket && userId) {
      const data = {
        userId: userId,
        requestedBy: JSON.parse(localStorage.getItem("currentUser"))._id,
        content: `Request user for joining the ${localStorage.getItem("projectName")} project`,
        title: "Project joining request",
        type: "requestUser",
        route: "/invites",
        iconType: "info",
        projectId: localStorage.getItem("projectId"),
      };

      // Send a message to the server to request user data

      socket.send(JSON.stringify(data));
      setRequestedUsers([...requestedUsers, userId]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header ownerInfo={owner}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} width={"100%"} sx={{ display: "flex", width: "100%" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <UserRequestList
                title="Member Lists"
                users={requestUsers}
                requestedUsers={requestedUsers}
                width="100%"
                shadow={false}
                actionLabel={"Request"}
                actionCompletedLabel={"Requested"}
                handleJoinRequest={handleJoinRequest}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default SettingOverview;
