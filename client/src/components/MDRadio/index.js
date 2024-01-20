import { forwardRef } from "react";

import PropTypes from "prop-types";

//  React components
import MDTypography from "components/MDTypography";

// Custom styles for MDRadio
import MDRadioRoot from "./MDRadioRoot";
import { Radio } from "@mui/material";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

function MyFormControlLabel(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return (
    <MDRadioRoot
      {...props}
      checked={checked}
      control={
        <Radio
          sx={({ palette: { white, dark } }) => ({
            color: darkMode ? white.main : dark.main,
            "&.Mui-checked": {
              color: darkMode ? white.main : dark.main,
              "& .MuiSvgIcon-root": {
                borderColor: darkMode ? white.main : dark.main,
              },
            },
            "&:after": {
              backgroundImage: darkMode
                ? `linear-gradient(195deg, ${white.main}, ${white.main})`
                : `linear-gradient(195deg, ${dark.main}, ${dark.main})`,
            },
          })}
        />
      }
      onChange={props.handleChange(radioGroup.value)}
      ownerState={{ color: props.color, value: props.value, variant: props.variant }}
    />
  );
}

const MDRadio = forwardRef(({ variant, color, title, labels, defaultValue, ...rest }, ref) => (
  <>
    {title && (
      <MDTypography pr={2} variant="h6" fontWeight="medium">
        {title}
      </MDTypography>
    )}
    <RadioGroup row name="use-radio-group" defaultValue={defaultValue}>
      {labels?.map((li) => (
        <MyFormControlLabel key={li} value={li} label={li} color variant ref={ref} {...rest} />
      ))}
    </RadioGroup>
  </>
));

// Setting default values for the props of MDRadio
MDRadio.defaultProps = {
  variant: "contained",
  color: "info",
  title: "",
  labels: [],
  defaultValue: "",
};

// Typechecking props for the MDRadio
MDRadio.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  label: PropTypes.bool,
  title: PropTypes.string,
  labels: PropTypes.any,
  defaultValue: PropTypes.string,
};

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  label: PropTypes.bool,
  control: PropTypes.any,
  value: PropTypes.any,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  theme: PropTypes.any,
  variant: PropTypes.oneOf(["contained", "gradient"]),
  handleChange: PropTypes.any,
};

export default MDRadio;
