import { useEffect, useState } from "react";
import axios from "axios";

export default function Data() {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getNotification = async () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}notification/`, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    });
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const user = localStorage.getItem("currentUser");
        const notificationDate = await getNotification(user._id);
        setNotification(notificationDate.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

  return {
    notifications: notification,
    setNotifications: setNotification,
  };
}
