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
import data from "layouts/invites/data";
import MDInput from "components/MDInput";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/MDAvatar";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { Button, Link, TextField } from "@mui/material";
import { getMemebersList, addFiles, addPrivateFiles } from "layouts/Project/data/http";
import FormDND from "examples/Form/FormDND";
import SearchIcon from "@mui/icons-material/Search";

function Invite() {
  const { notification, setNotification, setSearch, columns, rows } = data();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (val) => {
    setSearch(val);
  };

  return (
    <MDBox>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Invites
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
                &nbsp;<strong>{notification.length}</strong> invites
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox display="flex" sx={{ alignItems: "center !important" }} px={2}>
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

export default Invite;
