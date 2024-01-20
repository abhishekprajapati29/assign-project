import axios from "axios";
import { useEffect, useState } from "react";

export default function Data() {
  const [countData, setCountData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const getCountInfo = async (id) => {
    const token = localStorage.getItem("token");

    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}dashboard/${id}/info/count`,
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
      `${process.env.REACT_APP_BACKEND_URL}dashboard/${id}/info/chart`,
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
        const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
        const info = await getCountInfo(userId);
        setCountData(info.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    const fetchChartData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("currentUser"))._id;
        const info = await getChartInfo(userId);
        setChartData(info.data);
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
