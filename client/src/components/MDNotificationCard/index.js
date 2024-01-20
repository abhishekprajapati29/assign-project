import PropTypes from "prop-types";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Custom styles for the MDSnackbar
import MDSnackbarIconRoot from "components/MDSnackbar/MDSnackbarIconRoot";

//  React context
import { useMaterialUIController } from "context";
import { Link, capitalize } from "@mui/material";
import MDButton from "components/MDButton";
import axios from "axios";

function MDSnackbar({
  color,
  icon,
  title,
  dateTime,
  content,
  route,
  projectId,
  userId,
  status,
  close,
  bgWhite,
  notifications,
  setNotifications,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = darkMode ? "inherit" : "dark";
    dateTimeColor = darkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  const acceptUser = () => {};

  const handleAccept = async (e) => {
    e.preventDefault();
    const obj = { projectId, userId };
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}project/acceptUser`, obj, {
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    let newData = notifications.filter(
      (li) => li.projectId === projectId && li.userId === userId
    )[0];
    newData["status"] = "accepted";
    setNotifications([
      newData,
      ...notifications.filter((li) => li.projectId !== projectId && li.userId !== userId),
    ]);
  };

  return (
    <MDBox
      variant={bgWhite ? "contained" : "gradient"}
      bgColor={bgWhite ? "white" : color}
      maxWidth="100%"
      shadow="md"
      borderRadius="md"
      sx={{
        backgroundColor: ({ palette }) =>
          darkMode ? palette.background.card : palette[color] || palette.white.main,
      }}
    >
      <MDBox alignItems="center" color="dark" p={1.5}>
        <MDBox display="flex" alignItems="center" lineHeight={0}>
          <MDSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
            {icon}
          </MDSnackbarIconRoot>
          <MDTypography
            variant="button"
            fontWeight="medium"
            color={titleColor}
            textGradient={bgWhite}
          >
            {title}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider sx={{ margin: 0 }} light={dividerColor} />
      <MDBox
        p={1.5}
        sx={{
          fontSize: ({ typography: { size } }) => size.sm,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: ({ palette: { white, text } }) => {
            let colorValue = bgWhite || color === "light" ? text.main : white.main;

            if (darkMode) {
              colorValue = color === "light" ? "inherit" : white.main;
            }

            return colorValue;
          },
        }}
      >
        {content}
      </MDBox>
      <MDBox
        p={1.5}
        sx={{
          fontSize: ({ typography: { size } }) => size.sm,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: ({ palette: { white, text } }) => {
            let colorValue = bgWhite || color === "light" ? text.main : white.main;

            if (darkMode) {
              colorValue = color === "light" ? "inherit" : white.main;
            }

            return colorValue;
          },
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            mr: 1,
          }}
        >
          {status !== "pending" ? (
            <MDButton sx={{ ml: 1 }} color="dark" variant="gradient" fullWidth disabled>
              {capitalize(status || "")}
            </MDButton>
          ) : (
            <>
              <MDButton sx={{ mr: 1 }} color="dark" variant="gradient" fullWidth>
                Reject
              </MDButton>
              <MDButton
                sx={{ ml: 1 }}
                color="dark"
                variant="gradient"
                fullWidth
                onClick={handleAccept}
              >
                Accept
              </MDButton>
            </>
          )}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of MDSnackbar
MDSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for MDSnackbar
MDSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
  route: PropTypes.string,
  projectId: PropTypes.string,
  userId: PropTypes.string,
  status: PropTypes.string,
  notifications: PropTypes.any,
  setNotifications: PropTypes.func,
};

export default MDSnackbar;
