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
} from "layouts/Project/data/http";
import { Link } from "react-router-dom";
import moment from "moment";
import MDButton from "components/MDButton";
import axios from "axios";
import { useMaterialUIController } from "context";

export default function Data() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [controller, dispatch] = useMaterialUIController();
  const { socket } = controller;
  socket.onmessage = (event) => {
    // Handle incoming messages from the server
    const data = event.data && JSON.parse(event.data);
    if (data.userId === JSON.parse(localStorage.getItem("currentUser"))._id) {
      setNotification([{ ...data, status: "pending" }, ...notification]);
    }
  };

  const token = localStorage.getItem("token");

  const getNotification = async () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}notification/`, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    });
  };

  const fetchNotification = async () => {
    try {
      const user = localStorage.getItem("currentUser");
      const notificationDate = await getNotification(user._id);
      setNotification(notificationDate.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const user = localStorage.getItem("currentUser");
        const notificationDate = await getNotification(user._id);
        setNotification(notificationDate.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

  const Message = ({ title, content }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption">{content}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const RenderAuthors = ({ li }) => (
    <Tooltip
      key={li?.requestedBy?._id}
      title={li?.requestedBy?.userProfileId?.username || ""}
      placement="bottom"
    >
      <MDAvatar
        src={`${process.env.REACT_APP_BACKEND_URL}${li?.requestedBy?.userProfileId?.userImage}`}
        alt={li?.requestedBy?.userProfileId?.username || ""}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  );

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {capitalize(name || "")}
      </MDTypography>
    </MDBox>
  );

  const handleAccept = async (projectId) => {
    const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
    const obj = {
      projectId: projectId,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}project/acceptUser`,
      obj,
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    fetchNotification();
  };

  const handleReject = async (projectId) => {
    const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
    const obj = {
      projectId: projectId,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}project/rejectUser`,
      obj,
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    fetchNotification();
  };

  return {
    notification,
    setNotification,
    setSearch,
    columns: [
      { Header: "Message", accessor: "message", width: "20%", align: "left" },
      { Header: "note", accessor: "note", align: "center", width: "30%" },
      { Header: "requested by", accessor: "requested by", align: "center" },
      { Header: "created At", accessor: "created At", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: notification
      ?.filter(
        (fi) =>
          fi?.content?.toLowerCase().startsWith(search?.toLowerCase() || "") ||
          fi?.title?.toLowerCase().startsWith(search?.toLowerCase() || "") ||
          fi?.userId?.userProfileId?.username
            ?.toLowerCase()
            .startsWith(search?.toLowerCase() || "")
      )
      ?.map((li) => {
        return {
          id: li._id,
          message: (
            <Project
              image={`${process.env.REACT_APP_BACKEND_URL}${li?.projectId?.projectImage}`}
              name={li?.projectId?.projectName}
            />
          ),
          note: <Message title={li.title || ""} content={li?.content || ""} />,
          "requested by": <RenderAuthors li={li} />,
          "created At": (
            <Tooltip
              title={moment(li?.createdAt).format("lll")}
              placeholder="bottom"
            >
              <MDBox textAlign="center">
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                >
                  {moment(li?.createdAt).fromNow()}
                </MDTypography>
              </MDBox>
            </Tooltip>
          ),
          action: (
            <MDBox display="flex" alignItems="center">
              {li.status === "pending" ? (
                <>
                  {" "}
                  <MDBox>
                    <Tooltip title={"Reject Request"} placeholder="bottom">
                      <MDButton
                        variant="text"
                        color="error"
                        onClick={() => handleReject(li.projectId._id)}
                      >
                        <Icon>close</Icon>
                      </MDButton>
                    </Tooltip>
                  </MDBox>
                  <Tooltip title={"Accept Request"} placeholder="bottom">
                    <MDButton
                      variant="text"
                      color={"success"}
                      onClick={() => handleAccept(li.projectId._id)}
                    >
                      <Icon>check</Icon>
                    </MDButton>
                  </Tooltip>
                </>
              ) : (
                <MDTypography
                  variant="button"
                  fontWeight="medium"
                  color={li?.status === "accepted" ? "success" : "error"}
                  ml={1}
                  lineHeight={1}
                >
                  {capitalize(li.status || "")}
                </MDTypography>
              )}
            </MDBox>
          ),
        };
      }),
  };
}
