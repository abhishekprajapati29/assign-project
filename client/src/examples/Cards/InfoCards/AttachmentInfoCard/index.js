// react-router-dom components
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { Button } from "@mui/material";

function AttachmentInfoCard({ index, image, label, title, description, handleIndex, authors }) {
  const navigate = useNavigate();
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent !important",
        boxShadow: "none",
        overflow: "visible",
        padding: "1rem",
        maxWidth: "250px",
        minWidth: "250px",
      }}
    >
      <MDBox>
        <CardMedia
          height="174"
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            minWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
          onClick={() => handleIndex(index)}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <MDTypography variant="button" fontWeight="medium">
            {title}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of AttachmentInfoCard
AttachmentInfoCard.defaultProps = {
  authors: [],
};

// Typechecking props for the AttachmentInfoCard
AttachmentInfoCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  handleIndex: PropTypes.func,
};

export default AttachmentInfoCard;
