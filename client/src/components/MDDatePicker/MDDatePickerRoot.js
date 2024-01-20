import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";

export default styled(DatePicker)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;

  const { text } = palette;

  return {
    "& .MuiPickersDay-root": {
      backgroundColor: "#bbdefb",
    },

    // Additional styles for the selected day
    "& .Mui-selected": {
      backgroundColor: "white", // Example background color
      color: "white", // Example text color
    },
  };
});
