import axios from "axios";
import { useEffect, useState } from "react";

export default function Data() {
  const [countData, setCountData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const getCountInfo = async (id) => {
    const token = localStorage.getItem("token");
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}project/${id}/info/count`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      }
    );
  };
  const getChartInfo = async (id) => {
    const token = localStorage.getItem("token");
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}project/${id}/info/chart`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      }
    );
  };

  useEffect(() => {
    // Call the API function here
    const fetchCountData = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const projectsData = await getCountInfo(projectId);
        setCountData(projectsData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    const fetchChartData = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const projectsData = await getChartInfo(projectId);
        setChartData(projectsData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    // Invoke the fetchProjects function
    fetchCountData();
    fetchChartData();
  }, []);

  return {
    countData: countData,
    chartData,
  };
}
