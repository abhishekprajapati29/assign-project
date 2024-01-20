import { forwardRef } from "react";

import PropTypes from "prop-types";

// Custom styles for MDInput
import MDDropDownRoot from "components/MDDropdown/MDDropDownRoot";

const MDDropDown = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDDropDownRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MDInput
MDDropDown.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDDropDown.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDDropDown;
