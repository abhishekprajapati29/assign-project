// react-router-dom components
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { Button } from "@mui/material";
import { useMaterialUIController } from "context";

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  project,
  authors,
}) {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
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
  ));

  const handleButtonLabel = () => {
    const projectType = action.projectType;
    const members = project?.members?.map((mem) => mem?.userId?._id);
    const UserRequested = project?.userRequestIds;
    const currentUserId =
      JSON.parse(localStorage.getItem("currentUser"))?._id || "";

    let label = action.label;
    let disabled = false;

    // Browse project scenrio
    if (projectType != "none") {
      if (members?.includes(currentUserId)) {
        label = "JOINED";
        disabled = true;
      } else {
        if (UserRequested?.includes(currentUserId)) {
          label = "REQUESTED";
          disabled = true;
        }
      }
    }

    return {
      disabled,
      label,
    };
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent !important",
        boxShadow: "none",
        overflow: "visible",
      }}
      onMouseOver={() =>
        localStorage.setItem("projectName", action.route.split("/")?.[2])
      }
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          height="174"
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          textTransform="capitalize"
        >
          {label}
        </MDTypography>
        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDButton
            component={Button}
            onClick={() => {
              if (!!action) {
                if (action.projectType === "none") {
                  localStorage.setItem(
                    "projectName",
                    action.route.split("/")?.[2]
                  );
                  if (action?.projectId) {
                    localStorage.setItem("projectId", action.projectId);
                  }

                  navigate(action.route);
                } else {
                  if (project?.members) {
                    action?.handleJoinRequest(
                      project?.members?.filter(
                        (mem) => mem?.type === "owner"
                      )?.[0].userId._id,
                      action?.projectId
                    );
                  }
                }
              }
            }}
            variant="outlined"
            size="small"
            color={darkMode ? "white" : action.color}
            disabled={handleButtonLabel()?.disabled}
          >
            {handleButtonLabel()?.label}
          </MDButton>
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    projectId: PropTypes.any,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    handleJoinRequest: PropTypes.func,
    label: PropTypes.string.isRequired,
    projectType: PropTypes.string.isRequired,
  }).isRequired,

  project: PropTypes.any,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
