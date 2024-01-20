import { useEffect, useState } from "react";
import { getOwnerInfo, getRequestUsers } from "./http";

export default function Data() {
  const [owner, setOwner] = useState({});
  const [users, setUsers] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the API function here
    const fetchOwner = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const ownerData = await getOwnerInfo(projectId);
        setOwner(ownerData.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const usersData = await getRequestUsers(projectId);
        setUsers(usersData.data.users);
        setRequestedUsers(usersData.data.requestedUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchOwner();
    fetchUsers();
  }, []);

  return {
    owner: owner?.userProfileId || {},
    requestUsers: users
      .map((li) => {
        if (li?.userProfileId) return { ...li.userProfileId, userId: li._id };
        else return undefined;
      })
      .filter((item) => item),
    requestedUsers,
    setRequestedUsers,
  };
}
