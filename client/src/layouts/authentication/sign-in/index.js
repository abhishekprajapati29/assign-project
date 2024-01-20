import { useState } from "react";
import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { authLogin } from "store/actions/auth";

function Basic(props) {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [loading, setLoading] = React.useState(false);
  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleChange = (event, type) => {
    if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
    if (props.token) {
      handleLoading();
    }
    if (props.error !== null) {
      handleLoading();
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Log In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Unlock your Skills
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(event) => handleChange(event, "email")}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(event) => handleChange(event, "password")}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={(event) => handleSubmit(event)}
              >
                Log In
              </MDButton>
            </MDBox>
            <MDBox display="flex" justifyContent="center">
              <MDTypography variant="button" fontWeight="regular" color="error">
                {props.error}
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Register
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

Basic.propTypes = {
  onLogin: PropTypes.any,
  token: PropTypes.any,
  error: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(authLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
