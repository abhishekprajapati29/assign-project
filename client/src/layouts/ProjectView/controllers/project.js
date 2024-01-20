import axios from "axios";
const token = localStorage.getItem("token");

export const getProjectsList = async () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getTasksList = async () => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/task/all`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getTaskInfo = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/task/info/${id}`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};
