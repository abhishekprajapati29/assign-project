import { useEffect, useMemo, useState } from "react";

import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/Project/data/fileData";
import MDInput from "components/MDInput";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/MDAvatar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { Button, Link, TextField } from "@mui/material";
import { getMemebersList, addFiles, addPrivateFiles } from "layouts/Project/data/http";
import FormDND from "examples/Form/FormDND";
import SearchIcon from "@mui/icons-material/Search";

function File({ type }) {
  const { columns, rows, search, setSearch, fileList, setFileList } = data(type);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSearch = (val) => {
    setSearch(val);
  };

  useEffect(() => {
    const addFile = async () => {
      try {
        if (files.length > 0) {
          // Invoke the fetchProjects function
          const obj = new FormData();
          obj.append("projectId", localStorage.getItem("projectId"));
          obj.append("userId", JSON.parse(localStorage.getItem("currentUser"))._id);
          for (let li = 0; li < files.length; li++) {
            obj.append("file", files[li]);
          }
          let fileData;
          if (type === "none") {
            fileData = await addFiles(obj);
          } else {
            fileData = await addPrivateFiles(obj);
          }

          setFileList([...fileData.data.files, ...fileList]);
          setFiles([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding files:", error);
        setLoading(false);
      }
    };
    addFile();
  }, [files]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (type === "none") {
        try {
          const projectId = localStorage.getItem("projectId");
          const membersData = await getMemebersList(projectId);

          setMembers(membersData.data.members);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching members:", error);
          setLoading(false);
        }
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
    <MDBox>
      <FormDND title={"Upload Files"} files={files} setFunction={setFiles} />
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Files
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
                &nbsp;<strong>{fileList.length}</strong> files
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox display="flex" sx={{ alignItems: "center !important" }} px={2}>
            {type === "none"
              ? avatars(
                  members?.map((mem) => {
                    return [
                      `${process.env.REACT_APP_BACKEND_URL}${mem?.userId?.userProfileId?.userImage}`,
                      mem?.userId?.userProfileId?.username,
                    ];
                  })
                )
              : null}
            <MDBox ml={2}>
              <MDBox sx={{ display: "flex", alignItems: "flex-end" }}>
                <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  id="input-with-sx"
                  placeholder="search..."
                  variant="standard"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </MDBox>
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
    </MDBox>
  );
}

File.defaultProps = {
  type: "none",
};

File.propTypes = {
  type: PropTypes.string,
};

export default File;
