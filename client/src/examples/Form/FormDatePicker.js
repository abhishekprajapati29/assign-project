import PropTypes from "prop-types";
import dayjs from "dayjs";
import MDBox from "components/MDBox";
import { forwardRef } from "react";
import MDTypography from "components/MDTypography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import MDDatePicker from "components/MDDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FormDatePicker = forwardRef(({ title, value, setFunction, ...rest }, ref) => {
  return (
    <MDBox mb={2} {...rest} ref={ref}>
      <MDTypography pr={2} variant="h6" fontWeight="medium">
        {title}
        <MDBox component={"span"} color="red">
          *
        </MDBox>
      </MDTypography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MDDatePicker
          value={value}
          onChange={(newValue) => setFunction(newValue)}
          sx={{
            width: "100%",
          }}
        />
      </LocalizationProvider>
    </MDBox>
  );
});

FormDatePicker.defaultProps = {
  title: "",
  value: "",
};

FormDatePicker.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  setFunction: PropTypes.func, // assuming setFunction is a function
};

export default FormDatePicker;
