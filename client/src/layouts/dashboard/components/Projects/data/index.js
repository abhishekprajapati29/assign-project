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
import { getProjectsList } from "layouts/Project/data/http";
import { useEffect, useState } from "react";
import { Button, Link, capitalize } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

export default function Data() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const avatars = (members) =>
    members.map(([image, name]) => (
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

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {capitalize(name)}
      </MDTypography>
    </MDBox>
  );

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
    // Invoke

    fetchProjects();
  }, []);

  const userExists = localStorage.getItem("token");
  return {
    columns: [
      { Header: "project", accessor: "project", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "center" },
      { Header: "type", accessor: "type", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: userExists
      ? projects?.map((pro) => ({
          project: (
            <Project
              image={`${process.env.REACT_APP_BACKEND_URL}${pro?.projectImage}`}
              name={pro?.projectName}
            />
          ),
          members: (
            <MDBox display="flex" py={1}>
              {avatars(
                pro?.members?.map((mem) => {
                  return [
                    `${process.env.REACT_APP_BACKEND_URL}${mem?.userId?.userProfileId?.userImage}`,
                    mem?.userId?.userProfileId?.username,
                  ];
                })
              )}
            </MDBox>
          ),
          type: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={pro?.type?.toUpperCase()}
                color="success"
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          action: (
            <MDBox width="8rem" textAlign="center">
              <MDButton
                onClick={() => {
                  localStorage.setItem("projectName", pro?.projectName);
                  localStorage.setItem("projectId", pro?._id);
                }}
                component={Link}
                href={`/project/${pro?.projectName}`}
                variant="outlined"
                size="small"
                color={"info"}
                disabled={pro?._id === localStorage.getItem("projectId")}
              >
                Switch
              </MDButton>
            </MDBox>
          ),
        }))
      : [
          {
            project: <Project image={logoXD} name="Material UI XD Version" />,
            members: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team1, "Ryan Tompson"],
                  [team2, "Romina Hadid"],
                  [team3, "Alexander Smith"],
                  [team4, "Jessica Doe"],
                ])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Public"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
          {
            project: (
              <Project image={logoAtlassian} name="Add Progress Track" />
            ),
            members: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team2, "Romina Hadid"],
                  [team4, "Jessica Doe"],
                ])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Public"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
          {
            project: <Project image={logoSlack} name="Fix Platform Errors" />,
            members: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team1, "Ryan Tompson"],
                  [team3, "Alexander Smith"],
                ])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Private"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
          {
            project: (
              <Project image={logoSpotify} name="Launch our Mobile App" />
            ),
            members: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team4, "Jessica Doe"],
                  [team3, "Alexander Smith"],
                  [team2, "Romina Hadid"],
                  [team1, "Ryan Tompson"],
                ])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Public"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
          {
            project: (
              <Project image={logoJira} name="Add the New Pricing Page" />
            ),
            members: (
              <MDBox display="flex" py={1}>
                {avatars([[team4, "Jessica Doe"]])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Private"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
          {
            project: (
              <Project image={logoInvesion} name="Redesign New Online Shop" />
            ),
            members: (
              <MDBox display="flex" py={1}>
                {avatars([
                  [team1, "Ryan Tompson"],
                  [team4, "Jessica Doe"],
                ])}
              </MDBox>
            ),
            type: (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent={"Public"}
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ),
            action: (
              <MDBox width="8rem" textAlign="center">
                <MDButton
                  onClick={() => {}}
                  component={Link}
                  href={"#"}
                  variant="outlined"
                  size="small"
                  color={"info"}
                  disabled
                >
                  Action
                </MDButton>
              </MDBox>
            ),
          },
        ],
  };
}
