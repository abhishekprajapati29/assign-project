// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

import Card from "@mui/material/Card";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { Button, Icon, Input, TextField, Tooltip } from "@mui/material";
import MDInput from "components/MDInput";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

function UserRequestList({
  title,
  users,
  shadow,
  actionLabel,
  requestedUsers,
  actionCompletedLabel,
  handleJoinRequest,
}) {
  const [search, setSearch] = useState("");

  const handleSearch = (val) => {
    setSearch(val);
  };

  const renderUsers = users
    ?.filter((user) =>
      user.username.toLowerCase().startsWith(search.toLowerCase())
    )
    ?.map(({ userImage, username, role, userId }) => (
      <MDBox
        key={userId}
        component="li"
        display="flex"
        alignItems="center"
        py={1}
        mb={1}
      >
        <MDBox mr={2}>
          <MDAvatar
            src={`${process.env.REACT_APP_BACKEND_URL}${userImage}`}
            alt="something here"
            shadow="md"
          />
        </MDBox>
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <MDTypography variant="button" fontWeight="medium">
            {username}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {role}
          </MDTypography>
        </MDBox>
        <MDBox ml="auto">
          {requestedUsers.includes(userId) ? (
            <MDButton
              component={Button}
              disabled
              variant="text"
              color="success"
            >
              {requestedUsers.includes(userId)
                ? actionCompletedLabel
                : actionLabel}
            </MDButton>
          ) : (
            <MDButton
              component={Button}
              variant="text"
              color="info"
              onClick={() => handleJoinRequest(userId)}
            >
              {requestedUsers.includes(userId)
                ? actionCompletedLabel
                : actionLabel}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    ));

  return (
    <Card sx={{ height: "100%", width: "100%", boxShadow: !shadow && "none" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
        <MDBox sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            placeholder="search..."
            variant="standard"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderUsers}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the UserRequestList
UserRequestList.defaultProps = {
  shadow: true,
};

// Typechecking props for the UserRequestList
UserRequestList.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestedUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
  handleJoinRequest: PropTypes.any,
  actionLabel: PropTypes.string,
  actionCompletedLabel: PropTypes.string,
};

export default UserRequestList;
