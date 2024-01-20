import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { forwardRef } from "react";
import MDTypography from "components/MDTypography";
import { Box, Chip, Grid, InputLabel, MenuItem, OutlinedInput } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDDropDown from "components/MDDropdown";
import pxToRem from "assets/theme/functions/pxToRem";
import MDInput from "components/MDInput";

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

const FormDropdown = forwardRef(
  (
    {
      title,
      value,
      dropDownList,
      multiple,
      addMore,
      handleKeyDown,
      addMoreFunc,
      setFunction,
      ...rest
    },
    ref
  ) => {
    return (
      <MDBox mb={2} {...rest} ref={ref}>
        <MDTypography variant="h6" fontWeight="medium">
          {title}
          <MDBox component={"span"} color="red">
            *
          </MDBox>
        </MDTypography>
        {multiple ? (
          <MDDropDown
            value={value}
            onChange={(e) => setFunction(e.target.value)}
            fullWidth
            multiple={multiple}
            MenuProps={MenuProps}
            size="sm"
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {typeof selected === "string"
                  ? selected
                  : selected.length > 0
                  ? selected.map((value) => <Chip key={value} label={value} />)
                  : []}
              </Box>
            )}
            sx={{ paddingY: pxToRem(10), display: "flex" }}
          >
            {addMore ? (
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDInput
                  sx={{ padding: `${pxToRem(4.8)} ${pxToRem(16)}`, width: "100%" }}
                  variant="standard"
                  size="small"
                  fullWidth
                  placeholder="Add more..."
                  inputProps={{ autoComplete: "off" }}
                  onChange={(e) => {
                    e.preventDefault();
                    addMoreFunc(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleKeyDown(e);
                  }}
                />
              </MDBox>
            ) : null}
            {dropDownList.map(([title, img]) => (
              <MenuItem key={title} value={title}>
                <Grid container spacing={1} alignItems="center" display="flex !important">
                  {img ? (
                    <Grid item>
                      <MDAvatar src={img} alt="profile-image" size="xs" shadow="sm" />
                    </Grid>
                  ) : null}
                  <Grid item sx={{ display: "flex !important" }}>
                    <MDTypography
                      color="text"
                      fontWeight="regular"
                      display="flex"
                      width="auto"
                      fontSize="0.875rem"
                    >
                      {title}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </MDDropDown>
        ) : (
          <MDDropDown
            value={value}
            onChange={(e) => setFunction(e.target.value)}
            fullWidth
            multiple={multiple}
            MenuProps={MenuProps}
            size="sm"
            sx={{ paddingY: pxToRem(10), display: "flex" }}
          >
            {addMore ? (
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDInput
                  sx={{ padding: `${pxToRem(4.8)} ${pxToRem(16)}`, width: "100%" }}
                  variant="standard"
                  size="small"
                  fullWidth
                  placeholder="Add more..."
                  inputProps={{ autoComplete: "off" }}
                  onChange={(e) => {
                    e.preventDefault();
                    addMoreFunc(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleKeyDown(e);
                  }}
                />
              </MDBox>
            ) : null}
            {dropDownList.map(([title, img]) => (
              <MenuItem key={title} value={title}>
                <Grid container spacing={1} alignItems="center" display="flex !important">
                  {img ? (
                    <Grid item>
                      <MDAvatar src={img} alt="profile-image" size="xs" shadow="sm" />
                    </Grid>
                  ) : null}
                  <Grid item sx={{ display: "flex !important" }}>
                    <MDTypography
                      color="text"
                      fontWeight="regular"
                      display="flex"
                      width="auto"
                      fontSize="0.875rem"
                    >
                      {title}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </MDDropDown>
        )}
      </MDBox>
    );
  }
);

FormDropdown.defaultProps = {
  title: "",
  value: "",
  dropDownList: [],
  multiple: false,
  addMore: false,
};

FormDropdown.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  dropDownList: PropTypes.any,
  setFunction: PropTypes.func, // assuming setFunction is a function
  addMore: PropTypes.bool,
  addMoreFunc: PropTypes.func,
  handleKeyDown: PropTypes.func,
  multiple: PropTypes.bool,
};

export default FormDropdown;
