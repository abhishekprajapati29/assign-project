import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import { useEffect, useState } from "react";
import axios from "axios";

function Overview() {
  const userProfile = JSON.parse(localStorage.getItem("currentProfile"))?.userProfileId;
  const [aboutMe, setAboutMe] = useState(userProfile?.aboutMe || "");
  const [fullName, setFullName] = useState(userProfile?.username || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [designation, setDesignation] = useState(userProfile?.designation || "");
  const [enableEdit, setEnableEdit] = useState(false);
  const [designationEdit, setDesignationEdit] = useState(false);

  const onSave = async () => {
    const obj = {
      username: fullName,
      email: email,
      aboutMe: aboutMe,
      designation: designation,
      userId: JSON.parse(localStorage.getItem("currentProfile"))._id,
    };
    const userProfileInfo = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}userProfile/${userProfile._id}`,
      obj,
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    localStorage.setItem("currentProfile", JSON.stringify(userProfileInfo.data));
    setDesignationEdit(false);
    setEnableEdit(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        designation={designation}
        onSave={onSave}
        setDesignation={setDesignation}
        designationEdit={designationEdit}
        setDesignationEdit={setDesignationEdit}
      >
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={6}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={aboutMe || "Write someting about yourself..."}
                info={{
                  fullName: fullName,
                  email: email,
                }}
                aboutMe={aboutMe}
                email={email}
                fullName={fullName}
                action={{
                  route: "",
                  tooltip: "Edit Profile",
                  aboutMe,
                  setAboutMe,
                  setFullName,
                  setEmail,
                  enableEdit,
                  setEnableEdit,
                  handleUpdate: () => console.log("update"),
                  onSave: onSave,
                }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
