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
import { Icon, IconButton, capitalize } from "@mui/material";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useEffect, useState } from "react";
import {
  getFiles,
  removeFile,
  getPrivateFiles,
  removePrivateFile,
} from "./http";
import { Link } from "react-router-dom";
import moment from "moment";
import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import { useMaterialUIController } from "context";

export default function Data(type) {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const location = useLocation();

  const Title = ({ image, name, id, taskId }) => (
    <MDBox
      component={Link}
      to={location.pathname + "/TL-" + String(taskId || 0).padStart(4, "0")}
      display="flex"
      alignItems="center"
      lineHeight={1}
    >
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  useEffect(() => {
    // Call the API function here
    const fetchFiles = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
        let fileData;

        if (type === "none") {
          fileData = await getFiles(projectId);
        } else {
          fileData = await getPrivateFiles(userId);
        }
        setFiles(fileData.data.files);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchFiles();
  }, [type]);

  const deleteFile = async (id) => {
    try {
      if (type === "none") {
        await removeFile(id);
      } else {
        await removePrivateFile(id);
      }
      setFiles(files.filter((fi) => fi._id != id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setLoading(false);
    }
  };

  const handleDownload = async (fileURL, title) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${fileURL}`
      );
      const blob = await response.blob();

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return {
    fileList: files,
    setFileList: setFiles,
    search,
    setSearch,
    columns: [
      { Header: "files", accessor: "accessor", width: "30%", align: "left" },
      { Header: "UploadedBy", accessor: "uploadedBy", align: "center" },
      { Header: "type", accessor: "type", align: "center" },
      { Header: "uploadedAt", accessor: "uploadedAt", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: files
      ?.filter(
        (fi) =>
          fi?.title?.toLowerCase().startsWith(search?.toLowerCase() || "") ||
          fi?.name?.toLowerCase().startsWith(search?.toLowerCase() || "")
      )
      ?.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt))
      ?.map((file) => {
        return {
          id: file._id,
          accessor: (
            <Title
              image={logoXD}
              name={capitalize(
                (type === "none" ? file.title : file.name) || ""
              )}
              id={file._id}
            />
          ),
          uploadedBy: (
            <MDBox ml={-1}>
              <MDBox width="2.2rem" textAlign="center">
                <Tooltip
                  key={
                    type === "none"
                      ? file?.uploadedBy?.userProfileId?.username
                      : file?.userId?.userProfileId?.username
                  }
                  title={
                    type === "none"
                      ? file?.uploadedBy?.userProfileId?.username
                      : file?.userId?.userProfileId?.username
                  }
                  placeholder="bottom"
                >
                  <MDAvatar
                    src={`${process.env.REACT_APP_BACKEND_URL}${
                      type === "none"
                        ? file?.uploadedBy?.userProfileId?.userImage
                        : file?.userId?.userProfileId?.userImage
                    }`}
                    name={
                      type === "none"
                        ? file?.uploadedBy?.userProfileId?.username
                        : file?.userId?.userProfileId?.username
                    }
                    size="sm"
                    sx={{
                      border: ({
                        borders: { borderWidth },
                        palette: { white },
                      }) => `${borderWidth[2]} solid ${white.main}`,
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
            </MDBox>
          ),
          type: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <MDBadge
                badgeContent={file.mimetype.split("/").pop().toUpperCase()}
                color="success"
                variant="gradient"
                size="sm"
              />
            </MDTypography>
          ),
          uploadedAt: (
            <MDBox textAlign="center">
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
              >
                {moment(file.createdAt).fromNow()}
              </MDTypography>
            </MDBox>
          ),
          action: (
            <MDBox display="flex" alignItems="center">
              <MDBox>
                <Tooltip title={"Delete file"} placeholder="bottom">
                  <MDButton
                    variant="text"
                    color="error"
                    onClick={() => deleteFile(file._id)}
                  >
                    <Icon>delete</Icon>
                  </MDButton>
                </Tooltip>
              </MDBox>
              <Tooltip title={"Download file"} placeholder="bottom">
                <MDButton
                  variant="text"
                  color={"dark"}
                  onClick={() =>
                    handleDownload(
                      file.file,
                      type === "none" ? file.title : file.name
                    )
                  }
                >
                  <Icon sx={darkMode ? { color: "white" } : { color: "dark" }}>
                    download
                  </Icon>
                </MDButton>
              </Tooltip>
            </MDBox>
          ),
        };
      }),
  };
}
