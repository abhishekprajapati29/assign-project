// prop-types is library for typechecking of props
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function RemoveActionCard({ color, icon, title, description, handleReject, handleAccept }) {
  return (
    <Card>
      <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        {description && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        )}
        {description ? null : <Divider />}
        <MDBox display="flex" mt={2}>
          <MDButton onClick={handleReject} sx={{ mr: 1 }} color="dark" variant="gradient" fullWidth>
            Reject
          </MDButton>
          <MDButton onClick={handleAccept} sx={{ ml: 1 }} color="dark" variant="gradient" fullWidth>
            Accept
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of RemoveActionCard
RemoveActionCard.defaultProps = {
  color: "info",
  description: "",
};

// Typechecking props for the RemoveActionCard
RemoveActionCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleReject: PropTypes.func,
  handleAccept: PropTypes.func,
};

export default RemoveActionCard;
