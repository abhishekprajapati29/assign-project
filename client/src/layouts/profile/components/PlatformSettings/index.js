import { useState } from "react";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";

function PlatformSettings() {
  const userProfile = JSON.parse(localStorage.getItem("currentProfile"))?.userProfileId;
  const [notifyRequest, setNotifyRequest] = useState(userProfile?.notifyRequest || false);
  const [blockRequest, setBlockRequest] = useState(userProfile?.blockRequest || false);
  const [answersPost, setAnswersPost] = useState(true);

  const onSave = async (value) => {
    const obj = {
      ...value,
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
  };

  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          account & project
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={notifyRequest}
              onChange={() => {
                setNotifyRequest(!notifyRequest);
                onSave({ notifyRequest: !notifyRequest });
              }}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Notify when someone send a project request
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={blockRequest}
              onChange={() => {
                setBlockRequest(!blockRequest);
                onSave({ blockRequest: !blockRequest });
              }}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Block everyone to send me the joining request
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
