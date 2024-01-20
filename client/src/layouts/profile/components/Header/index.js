import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

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
import { TextField, Tooltip } from "@mui/material";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import axios from "axios";

function Header({
  designation,
  onSave,
  designationEdit,
  setDesignationEdit,
  setDesignation,
  children,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [image, setImage] = useState(
    `${process.env.REACT_APP_BACKEND_URL}${
      JSON.parse(localStorage.getItem("currentProfile"))?.userProfileId.userImage
    }`
  );
  const [file, setFile] = useState([]);

  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const setUploadFiles = async (files) => {
    const formData = new FormData();
    formData.append("userImage", files[0]);
    formData.append("userId", JSON.parse(localStorage.getItem("currentUser"))._id);
    const userProfileInfo = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}userProfile/${
        JSON.parse(localStorage.getItem("currentProfile"))?.userProfileId._id
      }`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    localStorage.setItem("currentProfile", JSON.stringify(userProfileInfo.data));
    setImage(
      `${process.env.REACT_APP_BACKEND_URL}${userProfileInfo.data?.userProfileId.userImage}`
    );
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploadFiles(selectedFiles);
  };
  console.log(image);
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={image} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {JSON.parse(localStorage.getItem("currentProfile")).userProfileId.username}
              </MDTypography>
              <MDBox display="flex" mt={0.5}>
                {designationEdit ? (
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    variant="standard"
                  />
                ) : (
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {designation || ""}
                  </MDTypography>
                )}

                <MDTypography variant="body2" color="secondary" ml={1}>
                  {designationEdit ? (
                    <Tooltip title={"Save"} placement="top">
                      <Icon sx={{ textAlign: "center", cursor: "pointer" }} onClick={onSave}>
                        save
                      </Icon>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={"Edit Designation"}
                      placement="top"
                      onClick={() => setDesignationEdit(!designationEdit)}
                    >
                      <Icon sx={{ textAlign: "center", cursor: "pointer" }}>edit</Icon>
                    </Tooltip>
                  )}
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <div>
              <input
                type="file"
                onChange={handleFileSelect}
                multiple
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <MDTypography variant="body2" color="secondary" ml={1}>
                  <Tooltip title={"Change Profile Image"} placement="top">
                    <Icon sx={{ textAlign: "center", cursor: "pointer", marginRight: "1rem" }}>
                      edit
                    </Icon>
                  </Tooltip>
                </MDTypography>
              </label>
            </div>
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
  designation: PropTypes.string,
  designationEdit: PropTypes.bool,
  setDesignationEdit: PropTypes.func,
  setDesignation: PropTypes.func,
  onSave: PropTypes.func,
};

export default Header;
