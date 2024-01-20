/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import BugReportIcon from "@mui/icons-material/BugReport";
import BlockerImage from "assets/images/priority/blocker.png";
import CriticalImage from "assets/images/priority/critical.png";
import MajorImage from "assets/images/priority/high.png";
import MinorImage from "assets/images/priority/low.png";
import MDBadge from "components/MDBadge";
import { Icon, IconButton, capitalize } from "@mui/material";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useEffect, useState } from "react";
import { getTasksList } from "./http";
import { Link } from "react-router-dom";
import { useMaterialUIController } from "context";
import { useLocation } from "react-router-dom";

export default function Data() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const location = useLocation();
  const getPriorityIcons = (priority) => {
    if (priority === "blocker")
      return (
        <img
          src={BlockerImage}
          style={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
          alt="logo"
        />
      );
    else if (priority === "critical")
      return (
        <img
          src={CriticalImage}
          style={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
          alt="logo"
        />
      );
    else if (priority === "major")
      return (
        <img
          src={MajorImage}
          style={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
          alt="logo"
        />
      );
    else if (priority === "minor")
      return (
        <Tooltip key={"pointer"} title={"pointer"} placeholder="bottom">
          <img
            src={MinorImage}
            style={{
              border: ({ borders: { borderWidth }, palette: { white } }) =>
                `${borderWidth[2]} solid ${white.main}`,
              cursor: "pointer",
              position: "relative",

              "&:not(:first-of-type)": {
                ml: -1.25,
              },

              "&:hover, &:focus": {
                zIndex: "10",
              },
            }}
            alt="logo"
          />
        </Tooltip>
      );
    else return <img src={MinorImage} alt="logo" />;
  };

  const avatars = (epic) =>
    epic.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name, id, taskId }) => (
    <MDBox
      component={Link}
      to={location.pathname + "/TL-" + String(taskId || 0).padStart(4, "0")}
      display="flex"
      alignItems="center"
      lineHeight={1}
      onClick={() => localStorage.setItem("taskId", id)}
    >
      <BugReportIcon
        color={darkMode ? "white" : "dark"}
        sx={{ width: "24px", height: "24px" }}
      />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  useEffect(() => {
    // Call the API function here
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasksList();
        setBugs(tasksData.data.tasks.filter((li) => li.type === "Bug"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bugs:", error);
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchTasks();
  }, []);

  return {
    bugCompleted: bugs.filter(
      (li) =>
        li.status === "Done" &&
        new Date(li.createdAt).getMonth() === new Date().getMonth()
    ).length,
    columns: [
      { Header: "bugs", accessor: "accessor", width: "60%", align: "left" },
      { Header: "sprint", accessor: "sprint", align: "center" },
      { Header: "label", accessor: "label", align: "center" },
      { Header: "priority", accessor: "priority", align: "center" },
      { Header: "assignee", accessor: "assignee", align: "center" },
    ],

    rows: bugs?.map((bug) => {
      return {
        id: bug._id,
        accessor: (
          <Company
            image={logoXD}
            name={capitalize(bug.summary)}
            id={bug._id}
            taskId={bug.sequentialNumber}
          />
        ),
        label: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={bug.label[0]}
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        sprint: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {bug.sprint}
          </MDTypography>
        ),
        priority: (
          <MDBox width="1rem" textAlign="center">
            {getPriorityIcons(bug.priority)}
          </MDBox>
        ),
        assignee: (
          <MDBox width="2.2rem" textAlign="center">
            <Tooltip
              key={bug?.userProfile?.username}
              title={bug?.userProfile?.username}
              placeholder="bottom"
            >
              <MDAvatar
                src={`${process.env.REACT_APP_BACKEND_URL}${bug?.userProfile?.userImage}`}
                name={bug?.userProfile?.username}
                size="sm"
                sx={{
                  border: ({ borders: { borderWidth }, palette: { white } }) =>
                    `${borderWidth[2]} solid ${white.main}`,
                  cursor: "pointer",
                  position: "relative",

                  "&:not(:first-of-type)": {
                    ml: -1.25,
                  },

                  "&:hover, &:focus": {
                    zIndex: "10",
                  },
                }}
              />
            </Tooltip>
          </MDBox>
        ),
      };
    }),
  };
}
