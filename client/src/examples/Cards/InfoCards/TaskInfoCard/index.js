// react-routers components
import { Link } from "react-router-dom";
import React from "react";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import Download from "yet-another-react-lightbox/plugins/download";
import {
  Lightbox,
  IconButton as LightboxIconButton,
  createIcon,
  useLightboxState,
} from "yet-another-react-lightbox";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import EastIcon from "@mui/icons-material/East";

//  React components
import MDBox from "components/MDBox";
import DOMPurify from "dompurify";
import MDTypography from "components/MDTypography";

import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import {
  AppBar,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Tab,
  Tabs,
  capitalize,
} from "@mui/material";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import AttachmentInfoCard from "../AttachmentInfoCard";
import { useEffect, useState } from "react";
import "yet-another-react-lightbox/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import breakpoints from "assets/theme/base/breakpoints";
import FormEditor from "examples/Form/FormEditor";
import { createComment, updateComment } from "layouts/Project/data/http";
import MDAvatar from "components/MDAvatar";
import moment from "moment";

const HTMLDisplay = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

function TaskInfoCard({
  title,
  description,
  data,
  comments,
  setCommentList,
  historys,
  action,
  shadow,
}) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [slides, setSlides] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [editComment, setEditComment] = React.useState("");
  const [enableEdit, setEnableEdit] = React.useState(null);
  const [files, setFiles] = React.useState([]);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    action.setUploadFiles(selectedFiles);
  };

  const handleIndex = (index) => {
    setIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    setSlides(
      data?.files?.map((file) => {
        const imageUrl = `${process.env.REACT_APP_BACKEND_URL}${file}`;
        return {
          src: imageUrl?.replace(/\\/g, "/"),
          downloadUrl: imageUrl?.replace(/\\/g, "/"),
        };
      })
    );
  }, [data?.files]);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  const renderAttachment = (
    <MDBox key={"attachement"} py={1}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {"Attachment"}
        </MDTypography>
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            multiple
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Tooltip title={"Add Attachments"} placement="top">
              <Icon style={{ cursor: "pointer" }}>add</Icon>
            </Tooltip>
          </label>
        </div>
      </MDBox>
      <MDBox display="flex" flexDirection="row" overflow="auto">
        {data?.files?.map((file, index) => (
          <AttachmentInfoCard
            key={index}
            index={index}
            image={`${process.env.REACT_APP_BACKEND_URL}${file}`}
            description=""
            title={file?.split("/").pop()}
            handleIndex={handleIndex}
          />
        ))}
      </MDBox>
    </MDBox>
  );

  const renderSetting = (
    <AppBar position="static">
      <Tabs
        orientation={tabsOrientation}
        value={tabValue}
        onChange={handleSetTabValue}
      >
        <Tab
          label="All"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              home
            </Icon>
          }
        />
        <Tab
          label="Comment"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              email
            </Icon>
          }
        />
        <Tab
          label="History"
          icon={
            <Icon fontSize="small" sx={{ mt: -0.25 }}>
              settings
            </Icon>
          }
        />
      </Tabs>
    </AppBar>
  );

  const handleSaveComment = async (e) => {
    const formData = new FormData();
    formData.append("projectId", localStorage.getItem("projectId"));
    formData.append("taskId", localStorage.getItem("taskId"));
    formData.append(
      "userId",
      JSON.parse(localStorage.getItem("currentUser"))._id
    );
    formData.append("type", "comment");
    formData.append("context", comment);
    formData.append("selected", true);

    const projectId = localStorage.getItem("projectId");
    const taskId = localStorage.getItem("taskId");
    const result = await createComment(projectId, taskId, formData);
    if (!result) return "Error while updating the project!";
    setComment("");

    setCommentList([result.data.comment, ...comments]);
  };

  const handleEditComment = async (e, commentId) => {
    const formData = new FormData();
    formData.append("context", editComment);

    const projectId = localStorage.getItem("projectId");
    const taskId = localStorage.getItem("taskId");
    const result = await updateComment(projectId, taskId, commentId, formData);
    if (!result) return "Error while updating the comment!";
    setEditComment("");
    comments.forEach((com) =>
      com._id === commentId ? (com["context"] = editComment) : com
    );

    setCommentList(comments);
    setEnableEdit(null);
  };

  const renderComment = (comment) => (
    <MDBox key={comment._id} mt={2}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        lineHeight={1}
      >
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar
            src={`${process.env.REACT_APP_BACKEND_URL}${comment?.userId?.userProfileId?.userImage}`}
            name={comment?.userId?.userProfileId?.username}
            size="sm"
          />
          <MDBox ml={1} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {comment?.userId?.userProfileId?.username}{" "}
              <MDTypography variant="caption" ml={1}>
                {moment(comment?.updatedAt).fromNow()}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
        {comment?.userId?._id ===
        JSON.parse(localStorage.getItem("currentUser"))?._id ? (
          enableEdit && enableEdit === comment?._id ? null : (
            <MDTypography variant="body2" color="secondary">
              <Tooltip
                title={"Edit"}
                placement="top"
                onClick={(e) => {
                  setEditComment(comment.context);
                  setEnableEdit(comment?._id);
                }}
              >
                <Icon sx={{ cursor: "pointer" }}>edit</Icon>
              </Tooltip>
            </MDTypography>
          )
        ) : null}
      </MDBox>
      <MDBox px={5.5} py={1}>
        {enableEdit && enableEdit === comment?._id ? (
          <FormEditor
            title={"Comment"}
            titleRequired={false}
            value={editComment}
            setFunction={setEditComment}
            marginBottom="0.4rem"
            action={{
              onCancel: (e) => {
                setEditComment("");
                setEnableEdit(null);
              },
              onAccept: (e) => handleEditComment(e, comment?._id),
            }}
          />
        ) : (
          <MDTypography variant="button" color="text" fontWeight="light">
            <HTMLDisplay htmlContent={DOMPurify.sanitize(comment.context)} />
          </MDTypography>
        )}
      </MDBox>
    </MDBox>
  );

  const renderHistory = (history) => (
    <MDBox key={history?._id} mt={2}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        lineHeight={1}
      >
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar
            src={`${process.env.REACT_APP_BACKEND_URL}${history?.userId?.userProfileId?.userImage}`}
            name={history?.userId?.userProfileId?.username}
            size="sm"
          />
          <MDBox ml={1} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {history?.userId?.userProfileId?.username}{" "}
              <MDTypography variant="caption">
                {history?.type === "task_created"
                  ? `created the `
                  : history?.type === "task_file_deleted"
                  ? "deleted the "
                  : "updated the "}
              </MDTypography>
              <MDTypography variant="caption" fontWeight="medium">
                {history?.type === "task_created"
                  ? history?.now === "Task Created"
                    ? `Task `
                    : `Bug `
                  : capitalize(
                      Object.keys(JSON.parse(history?.before || "{}"))?.[0] ||
                        ""
                    )}{" "}
              </MDTypography>
              <MDTypography variant="caption" ml={1}>
                {moment(history?.updatedAt).fromNow()}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox px={5.5} py={1}>
        {history?.type === "task_created" ? (
          <MDTypography variant="button" color="text" fontWeight="regular">
            {history?.now}
          </MDTypography>
        ) : Object.keys(JSON.parse(history?.before || "{}"))?.[0] ===
          "files" ? (
          history?.type === "task_updated" ? (
            <CardMedia
              height="174"
              minWidth="174"
              maxWidth="174"
              src={`${process.env.REACT_APP_BACKEND_URL}${
                Object.values(JSON.parse(history?.now || "{}"))?.[0]?.[0] ||
                "None"
              }`}
              component="img"
              title={title}
              sx={{
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
                cursor: "pointer",
              }}
            />
          ) : (
            <CardMedia
              height="174"
              minWidth="174"
              maxWidth="174"
              src={`${process.env.REACT_APP_BACKEND_URL}${history?.deleted}`}
              component="img"
              title={title}
              sx={{
                margin: 0,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
                cursor: "pointer",
              }}
            />
          )
        ) : Object.keys(JSON.parse(history?.before || "{}"))?.[0] ===
          "label" ? (
          <MDTypography
            variant="button"
            color="text"
            fontWeight="regular"
            display="flex"
          >
            {Object.values(JSON.parse(history?.before || "{}"))?.[0]?.map(
              (value) => (
                <MDBox key={value} mr={0.5}>
                  <Chip key={value} label={value} />
                </MDBox>
              )
            )}
            <MDTypography
              variant="caption"
              fontWeight="medium"
              display="flex"
              alignItems="center"
              mx={2}
            >
              <EastIcon />
            </MDTypography>
            {Object.values(JSON.parse(history?.now || "{}"))?.[0]?.map(
              (value) => (
                <MDBox key={value} mr={0.5}>
                  <Chip key={value} label={value} />
                </MDBox>
              )
            )}
          </MDTypography>
        ) : (
          <MDTypography
            variant="button"
            color="text"
            fontWeight="regular"
            display="flex"
          >
            <HTMLDisplay
              htmlContent={DOMPurify.sanitize(
                Object.values(JSON.parse(history?.before || "{}"))?.[0] ||
                  "None"
              )}
            />
            <MDTypography
              variant="caption"
              fontWeight="medium"
              display="flex"
              alignItems="center"
              mx={2}
            >
              <EastIcon />
            </MDTypography>
            <HTMLDisplay
              htmlContent={DOMPurify.sanitize(
                Object.values(JSON.parse(history?.now || "{}"))?.[0] || "None"
              )}
            />
          </MDTypography>
        )}
      </MDBox>
    </MDBox>
  );

  const handleDeletefile = async (index) => {
    const fileURL = [];
    for (let ind = 0; ind < slides.length; ind++) {
      if (ind != index) fileURL.push(data?.files[ind]);
    }

    await action?.updateFileList(fileURL, data?.files[index]);
    setSlides(
      fileURL?.map((file) => {
        const imageUrl = `${process.env.REACT_APP_BACKEND_URL}${file}`;
        return {
          src: imageUrl?.replace(/\\/g, "/"),
          downloadUrl: imageUrl?.replace(/\\/g, "/"),
        };
      })
    );
    setIndex(0);
  };

  const MyIcon = createIcon("MyIcon", <DeleteIcon />);

  function MyButton() {
    const { currentSlide } = useLightboxState();

    return (
      <LightboxIconButton
        label="My button"
        icon={MyIcon}
        disabled={!currentSlide}
        onClick={() => handleDeletefile(index)}
      />
    );
  }

  return (
    <MDBox sx={{ height: "100%", width: "100%" }}>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Download]}
        toolbar={{
          buttons: [<MyButton key="my-button" />, "close"],
        }}
      />
      <Card
        sx={{ height: "100%", width: "100%", boxShadow: !shadow && "none" }}
      >
        {action.editDescription ? null : (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            px={1}
          >
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
            <MDTypography
              component={Link}
              to={action.route}
              variant="body2"
              color="secondary"
            >
              <Tooltip title={action.tooltip} placement="top">
                <Icon onClick={() => action.handleFunction()}>edit</Icon>
              </Tooltip>
            </MDTypography>
          </MDBox>
        )}

        <MDBox px={1}>
          <MDBox mb={2} lineHeight={1}>
            {action.editDescription ? (
              <MDBox>
                <FormEditor
                  title={"Description"}
                  value={action.description}
                  setFunction={action.setDescription}
                  marginBottom="0.4rem"
                  actionRequired={false}
                />
                <MDBox display="flex">
                  <IconButton
                    size="small"
                    sx={{
                      marginLeft: "auto",
                      background: "aliceblue",
                      borderRadius: "5px",
                    }}
                    aria-label="close"
                    color="inherit"
                    onClick={() =>
                      action.setEditDescription(!action.editDescription)
                    }
                  >
                    <Icon fontSize="small">close</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      marginLeft: "4px",
                      background: "aliceblue",
                      borderRadius: "5px",
                    }}
                    aria-label="done"
                    color="inherit"
                    onClick={() => action.handleDescriptionEdit()}
                  >
                    <Icon fontSize="small">done</Icon>
                  </IconButton>
                </MDBox>
              </MDBox>
            ) : (
              <MDTypography variant="button" color="text" fontWeight="light">
                <HTMLDisplay htmlContent={DOMPurify.sanitize(description)} />
              </MDTypography>
            )}
          </MDBox>
          <MDBox opacity={0.3}>
            <Divider />
          </MDBox>
          <MDBox mb={3}>{renderAttachment}</MDBox>
          <MDBox>{renderSetting}</MDBox>
          {tabValue === 0 ? (
            <MDBox>
              <MDBox mt={2}>
                {[...historys, ...comments]
                  ?.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt))
                  ?.map((data) =>
                    data?.context ? renderComment(data) : renderHistory(data)
                  )}
              </MDBox>
            </MDBox>
          ) : null}
          {tabValue === 1 ? (
            <MDBox>
              <MDBox mt={2}>
                <FormEditor
                  title={"Comment"}
                  titleRequired={false}
                  value={comment}
                  setFunction={setComment}
                  marginBottom="0.4rem"
                  action={{
                    onCancel: (e) => setComment(""),
                    onAccept: (e) => handleSaveComment(e),
                  }}
                />
                {comments
                  .sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt))
                  ?.map((comment) => renderComment(comment))}
              </MDBox>
            </MDBox>
          ) : null}
          {tabValue === 2 ? (
            <MDBox>
              <MDBox mt={2}>
                {historys
                  ?.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt))
                  ?.map((history) => renderHistory(history))}
              </MDBox>
            </MDBox>
          ) : null}
        </MDBox>
      </Card>
    </MDBox>
  );
}

// Setting default props for the TaskInfoCard
TaskInfoCard.defaultProps = {
  shadow: true,
  historys: [],
};

// Typechecking props for the TaskInfoCard
TaskInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.any,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    handleFunction: PropTypes.func,
    editDescription: PropTypes.bool,
    description: PropTypes.string,
    setDescription: PropTypes.func,
    handleDescriptionEdit: PropTypes.func,
    setEditDescription: PropTypes.func,
    setUploadFiles: PropTypes.func,
    updateFileList: PropTypes.func,
  }).isRequired,
  shadow: PropTypes.bool,
  comments: PropTypes.any,
  historys: PropTypes.any,
  setCommentList: PropTypes.func,
};

HTMLDisplay.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export default TaskInfoCard;
