import ReactQuill from "react-quill";
import { styled } from "@mui/material/styles";
import { useMaterialUIController } from "context";
export default styled(ReactQuill)(() => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return {
    "& .ql-toolbar": {
      borderRadius: "6px 6px 0 0",
      color: "white",
    },
    "& .ql-container": {
      borderRadius: "0 0 6px 6px",
    },
    "& .ql-editor": {
      color: darkMode ? "white" : "dark",
    },
  };
});
