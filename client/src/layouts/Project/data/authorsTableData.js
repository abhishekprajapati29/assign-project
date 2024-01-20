/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import { getMemebersList } from "./http";
import moment from "moment";
import MDModal from "components/MDModal";
import RemoveActionCard from "examples/Cards/InfoCards/RemoveActionCard";
import axios from "axios";

export default function Data() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "transparent",
  };

  useEffect(() => {
    // Call the API function here
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

  const handleAccept = async (member) => {
    const obj = { projectId: member.projectId, memberId: member._id };
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}project/removeMember`,
      obj,
      {
        headers: {
          "content-type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
    setMembers(members.filter((li) => li._id != member._id));
    setOpenModal(!openModal);
  };

  return {
    columns: [
      { Header: "member", accessor: "member", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: members?.map((mem) => ({
      member: (
        <Author
          image={`${process.env.REACT_APP_BACKEND_URL}${mem?.userId?.userProfileId?.userImage}`}
          name={mem?.userId?.userProfileId?.username}
          email={mem?.userId?.userProfileId?.email}
        />
      ),
      function: <Job title={mem?.type} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent="online"
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      employed: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {moment(mem?.createdAt).format("lll")}
        </MDTypography>
      ),
      action: (
        <MDBox>
          <MDTypography
            onClick={() => setOpenModal(!openModal)}
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Remove
          </MDTypography>
          <MDModal
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <MDBox sx={style}>
              <RemoveActionCard
                icon="delete"
                color="error"
                title="Action"
                description="Are you sure you want to remove this member?"
                handleReject={() => setOpenModal(!openModal)}
                handleAccept={() => handleAccept(mem)}
              />
            </MDBox>
          </MDModal>
        </MDBox>
      ),
    })),
  };
}
