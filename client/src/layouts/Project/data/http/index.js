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

export const getTaskFormInfo = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/${id}/taskCreateInfo`, {
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

export const getMemebersList = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/member/${id}/all`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const addFiles = async (obj) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}project/file/create`, obj, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getOwnerInfo = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/${id}/owner`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const removeFile = async (id) => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}project/file/${id}`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getFiles = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/${id}/file/all`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const addPrivateFiles = async (obj) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}file/`, obj, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getPrivateFiles = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}file/${id}`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const removePrivateFile = async (id) => {
  return axios.delete(`${process.env.REACT_APP_BACKEND_URL}file/${id}`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const getRequestUsers = async (id) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/${id}/requestUsers`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const createTask = async (obj) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}project/task/create`, obj, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const updateTask = async (id, obj) => {
  return axios.patch(`${process.env.REACT_APP_BACKEND_URL}project/task/${id}`, obj, {
    headers: {
      "content-type": obj instanceof FormData ? "multipart/form-data" : "application/json",
      Authorization: "Token " + token,
    },
  });
};

export const updateProject = async (id, obj) => {
  return axios.patch(`${process.env.REACT_APP_BACKEND_URL}project/${id}`, obj, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const createComment = async (projectId, taskId, obj) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}project/comment/${projectId}/${taskId}`,
    obj,
    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    }
  );
};

export const getComments = async (projectId, taskId) => {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}project/comment/${projectId}/${taskId}`, {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
};

export const updateComment = async (projectId, taskId, commentId, obj) => {
  return axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}project/comment/${projectId}/${taskId}/${commentId}`,
    obj,
    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    }
  );
};
