import PropTypes, { string } from "prop-types";
import MDBox from "components/MDBox";
import { forwardRef } from "react";
import { Paper } from "@mui/material";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

const FormDND = forwardRef(({ title, files, setFunction, ...rest }, ref) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFunction(selectedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFunction(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <MDBox mb={2} {...rest} ref={ref}>
      <MDTypography pr={2} variant="h6" fontWeight="medium">
        {title}
        <MDBox component={"span"} color="red">
          *
        </MDBox>
      </MDTypography>

      <label htmlFor="fileInput">
        <input
          type="file"
          onChange={handleFileSelect}
          multiple
          style={{ display: "none" }}
          id="fileInput"
        />
        <div htmlFor="fileInput">
          <Paper
            sx={({
              functions: { pxToRem },
              palette: { white, dark, background },
              borders: { borderWidth },
            }) => ({
              height: "10rem",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              "&.MuiPaper-root": {
                backgroundColor: darkMode ? background.sidenav : white.main,
              },
            })}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <MDTypography pr={2} variant="h6" fontWeight="medium">
              Select or Drop files here
            </MDTypography>
            {files.length > 0 && (
              <>
                <MDTypography pr={2} variant="h6" fontWeight="medium">
                  Selected Files:
                </MDTypography>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </>
            )}
          </Paper>
        </div>
      </label>
    </MDBox>
  );
});

FormDND.defaultProps = {
  title: "",
  files: [],
};

FormDND.propTypes = {
  title: PropTypes.string,
  files: PropTypes.any,
  setFunction: PropTypes.func, // assuming setFunction is a function
};

export default FormDND;
