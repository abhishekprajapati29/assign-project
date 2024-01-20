import { useState, useEffect, useMemo } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

//  React components
import MDBox from "components/MDBox";

//  React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

//  React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

//  React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

//  React routes
import routes from "routes";

//  React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import MDSnackbar from "components/MDSnackbar";
// import data from "examples/Configurator/data/notification";
function App(props) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    socket,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [notification, setNotification] = useState(null);
  const { pathname } = useLocation();
  socket.onmessage = (event) => {
    // Handle incoming messages from the server
    const requestAllowed =
      JSON.parse(localStorage.getItem("currentProfile")).userProfileId
        .notifyRequest || false;
    const data = event.data && JSON.parse(event.data);
    if (
      requestAllowed &&
      data.userId === JSON.parse(localStorage.getItem("currentUser"))._id
    ) {
      setNotification(data);
    }
  };
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes, isAuth) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.isAuth === isAuth) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title={
        notification?.type === "requestUser" ? "Request Project Join" : "" || ""
      }
      content={notification?.content}
      route={notification?.route}
      note={notification?.note}
      type={notification?.type}
      dateTime={""}
      open={!!notification}
      onClose={() => setNotification("")}
      close={() => setNotification("")}
    />
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" &&
        (props?.token || localStorage.getItem("token")) && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandDark
                  : brandWhite
              }
              brandName="Assign Project"
              routes={
                pathname?.split("/")?.length > 2 &&
                pathname?.split("/")?.[1] === "project"
                  ? routes.filter((li) => li.isAuth)
                  : routes.filter((li) => li.isAuth && !li.isProject)
              }
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
      <Routes>
        {props?.token || localStorage.getItem("token")
          ? getRoutes(routes, true)
          : getRoutes(routes, false)}
        {props?.token || localStorage.getItem("token") ? (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      {renderInfoSB}
    </ThemeProvider>
  );
}

App.propTypes = {
  token: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
