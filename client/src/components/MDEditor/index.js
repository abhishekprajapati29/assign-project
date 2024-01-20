import { forwardRef } from "react";

import PropTypes from "prop-types";

// Custom styles for MDInput
import MDEditorRoot from "components/MDEditor/MDEditorRoot";

const MDEditor = forwardRef(
  ({ editorHtml, error, success, disabled, setFunction, ...rest }, ref) => {
    return (
      <MDEditorRoot
        onChange={(html) => setFunction(html)}
        value={editorHtml}
        {...rest}
        ref={ref}
        ownerState={{ error, success, disabled }}
      />
    );
  }
);

// Setting default values for the props of MDEditor
MDEditor.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDEditor
MDEditor.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  editorHtml: PropTypes.any,
  setFunction: PropTypes.func,
};

export default MDEditor;
