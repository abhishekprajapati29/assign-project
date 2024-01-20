/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import BlockerImage from "assets/images/priority/blocker.png";
import CriticalImage from "assets/images/priority/critical.png";
import MajorImage from "assets/images/priority/high.png";
import MinorImage from "assets/images/priority/low.png";
import MDBadge from "components/MDBadge";
import { Icon, IconButton } from "@mui/material";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useEffect, useState } from "react";
import { getTaskFormInfo, getTasksList } from "./http";
import { Link } from "react-router-dom";

export default function Data() {
  const [projectLists, setProjectLists] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the API function here
    const fetchProjectList = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const projectsData = await getTaskFormInfo(projectId);
        setProjectLists(projectsData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    // Invoke the fetchProjects function
    fetchProjectList();
  }, []);

  return {
    projectInfo: {
      ...projectLists,
      currentUser: projectLists?.assignee?.filter((mem) => {
        return (
          JSON.parse(localStorage.getItem("currentUser") || "{}")["_id"] ===
          mem.userId._id
        );
      })?.[0]?.userId.userProfileId.username,
    },
    setProjectLists,
  };
}
