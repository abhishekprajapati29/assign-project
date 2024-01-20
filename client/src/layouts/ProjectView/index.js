import Grid from "@mui/material/Grid";

//  React components
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import MDTypography from "components/MDTypography";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import { getProjectsList } from "./controllers/project";
import { Button, Icon, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { initWebSocket } from "socket";
import MDSnackbar from "components/MDNotificationCard";
import moment from "moment";
function ProjectView({ type }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const { sales, tasks } = reportsLineChartData;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = initWebSocket();

  useEffect(() => {
    // Call the API function here
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjectsList();
        setProjects(projectsData.data.project);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchProjects();
  }, []);

  const handleJoinRequest = (userId, projectId) => {
    if (socket && userId) {
      const data = {
        userId: userId,
        requestedBy: JSON.parse(localStorage.getItem("currentUser"))._id,
        content: "Requested to Join Public project",
        title: "Public Project joining request",
        type: "requestUser",
        route: "/invites",
        iconType: "info",
        projectId: projectId,
      };

      // Send a message to the server to request user data

      socket.send(JSON.stringify(data));
      // setRequestedUsers([...requestedUsers, userId]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Personal */}
      <MDBox lineHeight={1.25}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
        >
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            <MDTypography variant="h6" fontWeight="medium">
              Projects
            </MDTypography>
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                Achieve you Goals
              </MDTypography>
            </MDBox>
          </MDTypography>
          {type === "Private" || type === "Public" ? null : (
            <MDBox>
              <MDButton
                component={Button}
                onClick={() => {
                  navigate("/project/create");
                }}
                variant="outlined"
                size="small"
                color="info"
              >
                Create
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={6}>
          {projects
            ?.sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
            ?.filter((li) => (type === "none" ? li : li.type === type))
            .map((project, index) => (
              <Grid key={project._id} item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={
                    `${process.env.REACT_APP_BACKEND_URL}` +
                    project.projectImage.replace(/\\/g, "/")
                  }
                  label={project.type}
                  project={project}
                  title={project.projectName}
                  description={project.description}
                  action={{
                    type: "internal",
                    route: `/project/${project.projectName}`,
                    projectId: project._id,
                    color: "info",
                    label: type === "none" ? "view project" : "Join request",
                    projectType: type,
                    handleJoinRequest,
                  }}
                  authors={project?.members.map((mem) => {
                    return {
                      image: `${process.env.REACT_APP_BACKEND_URL}${mem?.userId?.userProfileId?.userImage}`,
                      name: mem?.userId?.userProfileId?.username,
                    };
                  })}
                />
              </Grid>
            ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

ProjectView.defaultProps = {
  type: "none",
};

ProjectView.propTypes = {
  type: PropTypes.string,
};

export default ProjectView;
