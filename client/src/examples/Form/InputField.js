import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { forwardRef } from "react";

const FormInputField = forwardRef(
  ({ title, value, type, setFunction, multiline, ...rest }, ref) => {
    return (
      <MDBox mb={2} {...rest} ref={ref}>
        <MDTypography pr={2} variant="h6" fontWeight="medium">
          {title}
          <MDBox component="span" color="red">
            *
          </MDBox>
        </MDTypography>
        <MDInput
          value={value}
          multiline={multiline}
          maxRows={4}
          type={type}
          fullWidth
          onChange={(e) => setFunction(e.target.value)}
        />
      </MDBox>
    );
  }
);

FormInputField.defaultProps = {
  title: "",
  value: "",
  type: "string",
  multiline: false,
};

FormInputField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  setFunction: PropTypes.func, // assuming setFunction is a function
  multiline: PropTypes.bool,
  type: PropTypes.string,
};

export default FormInputField;
