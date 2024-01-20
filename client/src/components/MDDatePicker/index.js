import { forwardRef } from "react";

import PropTypes from "prop-types";

// Custom styles for MDInput
import MDDatePickerRoot from "components/MDDatePicker/MDDatePickerRoot";

const MDDatePicker = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDDatePickerRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MDInput
MDDatePicker.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDDatePicker.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDDatePicker;
