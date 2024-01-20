import { useEffect, useState } from "react";
import { getComments, getTaskInfo } from "./http";
import { useLocation } from "react-router-dom";

export default function Data() {
  const location = useLocation();
  const [task, setTask] = useState([]);
  const [comments, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the API function here
    const fetchTask = async () => {
      try {
        const taskId = localStorage.getItem("taskId");
        const taskData = await getTaskInfo(taskId);
        setTask(taskData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    const fetchComment = async () => {
      try {
        const projectId = localStorage.getItem("projectId");
        const taskId = localStorage.getItem("taskId");
        const comment = await getComments(projectId, taskId);

        setCommentList(comment.data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    // Invoke the fetchProjects function
    fetchTask();
    fetchComment();
  }, []);

  return {
    task: task,
    setTask,
    comments,
    setCommentList,
  };
}
