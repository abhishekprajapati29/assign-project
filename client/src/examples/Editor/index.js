import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import MDEditor from "components/MDEditor";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: "snow" };
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <MDEditor
        theme={this.state.theme}
        onChange={this.props.setFunction}
        value={this.props?.editorHtml}
        modules={Editor?.modules}
        formats={Editor?.formats}
        placeholder={this.props?.placeholder}
      />
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

Editor.propTypes = {
  setFunction: PropTypes.func.isRequired,
  editorHtml: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
