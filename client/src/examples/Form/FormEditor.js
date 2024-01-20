import PropTypes from "prop-types";
import dayjs from "dayjs";
import MDBox from "components/MDBox";
import { forwardRef } from "react";
import MDTypography from "components/MDTypography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import MDDatePicker from "components/MDDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Editor from "examples/Editor";
import MDEditor from "components/MDEditor";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

const FormEditor = forwardRef(
  ({ title, value, titleRequired, action, setFunction, actionRequired, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
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
        background: darkMode
          ? white.main
          : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,
      },
    });

    return (
      <MDBox mb={2} {...rest} ref={ref}>
        {titleRequired ? (
          <MDTypography pr={2} variant="h6" fontWeight="medium">
            {title}
            <MDBox component={"span"} color="red">
              *
            </MDBox>
          </MDTypography>
        ) : null}

        <MDEditor placeholder={"Write something..."} editorHtml={value} setFunction={setFunction} />
        {actionRequired && value.replace("<p><br></p>", "").length > 0 ? (
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              marginLeft: "auto",
            }}
          >
            <MDBox sx={{ display: "flex", mt: 1 }}>
              <MDButton
                color={"dark"}
                variant="gradient"
                fullWidth
                onClick={(e) => action?.onCancel(e)}
                sx={darkMode ? sidenavTypeButtonsStyles : sidenavTypeActiveButtonStyles}
              >
                Cancel
              </MDButton>
              <MDBox sx={{ mx: 1 }}></MDBox>
              <MDButton
                color={darkMode ? "dark" : "white"}
                variant="gradient"
                fullWidth
                onClick={(e) => action?.onAccept(e)}
                sx={darkMode ? sidenavTypeButtonsStyles : sidenavTypeActiveButtonStyles}
              >
                Create
              </MDButton>
            </MDBox>
          </Grid>
        ) : null}
      </MDBox>
    );
  }
);

FormEditor.defaultProps = {
  title: "",
  value: "",
  actionRequired: true,
  titleRequired: true,
};

FormEditor.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  setFunction: PropTypes.func, // assuming setFunction is a function
  titleRequired: PropTypes.bool,
  action: PropTypes.any,
  actionRequired: PropTypes.bool,
};

export default FormEditor;
