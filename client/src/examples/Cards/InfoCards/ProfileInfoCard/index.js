// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import MDInput from "components/MDInput";
import pxToRem from "assets/theme/functions/pxToRem";
import { TextField } from "@mui/material";

function ProfileInfoCard({ title, description, info, action, shadow, aboutMe, fullName, email }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => {
    return (
      <>
        {action.enableEdit ? (
          <>
            <MDBox key={label} py={1} pr={2}>
              <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                {label}: &nbsp;
              </MDTypography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                maxRows={4}
                value={label === "full name" ? fullName : email}
                placeholder="Write something..."
                inputProps={{ autoComplete: "off" }}
                onChange={(e) => {
                  e.preventDefault();
                  if (label === "full name") {
                    action.setFullName(e.target.value);
                  } else {
                    action.setEmail(e.target.value);
                  }
                }}
              />
            </MDBox>
          </>
        ) : (
          <>
            <MDBox key={label} display="flex" py={1} pr={2}>
              <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                {label}: &nbsp;
              </MDTypography>
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{values[key]}
              </MDTypography>
            </MDBox>
          </>
        )}
      </>
    );
  });

  return (
    <Card sx={{ height: "100%", width: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          {action.enableEdit ? (
            <Tooltip title={"Save"} placement="top" onClick={() => action.onSave()}>
              <Icon>save</Icon>
            </Tooltip>
          ) : (
            <Tooltip
              title={action.tooltip}
              placement="top"
              onClick={() => action.setEnableEdit(!action.enableEdit)}
            >
              <Icon>edit</Icon>
            </Tooltip>
          )}
        </MDTypography>
      </MDBox>
      <MDBox p={2} width={"100%"}>
        <MDBox mb={2} lineHeight={1}>
          {action.enableEdit ? (
            <TextField
              sx={{ width: "100%" }}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              maxRows={4}
              value={aboutMe}
              placeholder="Write something..."
              inputProps={{ autoComplete: "off" }}
              onChange={(e) => {
                e.preventDefault();
                action.setAboutMe(e.target.value);
              }}
            />
          ) : (
            <MDTypography variant="button" color="text" fontWeight="light">
              {description}
            </MDTypography>
          )}
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>{renderItems}</MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    edit: PropTypes.bool,
    setAboutMe: PropTypes.func,
    handleUpdate: PropTypes.func,
    enableEdit: PropTypes.bool,
    setEnableEdit: PropTypes.func,
    setFullName: PropTypes.func,
    setEmail: PropTypes.func,
    onSave: PropTypes.func,
  }).isRequired,
  shadow: PropTypes.bool,
  aboutMe: PropTypes.string,
  fullName: PropTypes.string,
  email: PropTypes.string,
};

export default ProfileInfoCard;
