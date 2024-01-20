import { forwardRef } from "react";

import PropTypes from "prop-types";

// Custom styles for MDModal
import MDModalRoot from "components/MDModal/MDModalRoot";

const MDModal = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDModalRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MDModal
MDModal.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDModal
MDModal.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDModal;
