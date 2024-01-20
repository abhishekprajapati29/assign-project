import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";

export default styled(FormControlLabel)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;

  const { text } = palette;

  return {
    "& .MuiFormControlLabel-label": {
      color: text.main,
    },
  };
});
