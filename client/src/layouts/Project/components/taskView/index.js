import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDDropDown from "components/MDDropdown";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import pxToRem from "assets/theme/functions/pxToRem";
import { IconButton, Link, Tooltip, capitalize } from "@mui/material";
import FormDropdown from "examples/Form/FormDropDown";
import FormInputField from "examples/Form/InputField";

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

function Header({
  data,
  taskListInfo,
  assignee,
  setAssignee,
  action,
  children,
}) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <MDBox position="relative" mb={5}>
      <Card
        sx={{
          position: "relative",
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={6} lg={9}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pr={2}
                mb={1}
              >
                <MDTypography
                  variant="h6"
                  fontWeight="regular"
                  textTransform="capitalize"
                >
                  {`TL-${String(data?.sequentialNumber || 0).padStart(4, "0")}`}
                </MDTypography>
                <MDTypography
                  component={Link}
                  to={action.route}
                  variant="body2"
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                >
                  <Tooltip title={action.tooltip} placement="top">
                    <Icon onClick={() => action?.handleFunction()}>edit</Icon>
                  </Tooltip>
                </MDTypography>
              </MDBox>
              {action.enableEditTitle ? (
                <MDBox>
                  <FormInputField
                    title={"Summary"}
                    value={action.summary}
                    setFunction={action.setSummary}
                    marginBottom="0.3rem"
                  />
                  <MDBox display="flex">
                    <IconButton
                      size="small"
                      sx={{
                        marginLeft: "auto",
                        background: "aliceblue",
                        borderRadius: "5px",
                      }}
                      aria-label="close"
                      color="inherit"
                      onClick={() =>
                        action.setEnableEditTitle(!action.enableEditTitle)
                      }
                    >
                      <Icon fontSize="small">close</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        marginLeft: "4px",
                        background: "aliceblue",
                        borderRadius: "5px",
                      }}
                      aria-label="done"
                      color="inherit"
                      onClick={() => action.handleTitleEdit()}
                    >
                      <Icon fontSize="small">done</Icon>
                    </IconButton>
                  </MDBox>
                </MDBox>
              ) : (
                <MDTypography pr={2} variant="h4" fontWeight="medium">
                  {capitalize(data.summary || "")}
                </MDTypography>
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={2}>
              <FormDropdown
                title={"Assignee"}
                value={assignee}
                dropDownList={taskListInfo?.assignee?.map((li) => {
                  return [
                    li.userId.userProfileId?.username,
                    `${process.env.REACT_APP_BACKEND_URL}${li.userId.userProfileId?.userImage}`,
                  ];
                })}
                setFunction={setAssignee}
              />
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  data: PropTypes.any,
  taskListInfo: PropTypes.any,
  assignee: PropTypes.string,
  setAssignee: PropTypes.func,
  action: PropTypes.any,
};

export default Header;
