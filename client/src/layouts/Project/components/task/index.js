import { useEffect, useMemo, useState } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/Project/data/taskData";
import MDInput from "components/MDInput";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/MDAvatar";
import { useNavigate } from "react-router-dom";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";
import { Button, Link } from "@mui/material";
import { getMemebersList } from "layouts/Project/data/http";

function Tasks() {
  const { columns, rows, taskCompleted } = data();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const membersData = await getMemebersList(projectId);

        setMembers(membersData.data.members);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchMembers();
  }, []);

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="sm"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Tasks
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{taskCompleted}</strong> completed this month
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox display="flex" sx={{ alignItems: "center !important" }} px={2}>
          {avatars(
            members?.map((mem) => {
              return [
                `${process.env.REACT_APP_BACKEND_URL}${mem?.userId?.userProfileId?.userImage}`,
                mem?.userId?.userProfileId?.username,
              ];
            })
          )}
          <MDBox ml={2}>
            <MDButton
              component={Link}
              onClick={() =>
                navigate(
                  `/project/${encodeURIComponent(localStorage.getItem("projectName"))}/tasks/create`
                )
              }
              variant="outlined"
              size="small"
              color="info"
            >
              Create
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Tasks;
