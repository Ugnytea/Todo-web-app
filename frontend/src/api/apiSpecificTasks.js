import axios from "axios";

const API_BASE_URL = "/api/specificTasks";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch today's tasks
export const getTodaysTasks = async () => {
  const response = await api.get("/todays");
  return response.data;
};

// Fetch upcoming tasks
export const getUpcomingTasks = async () => {
  const response = await api.get("/upcoming");
  return response.data;
};

// Fetch today's task
export const getImportantTasks = async () => {
  const response = await api.get("/important");
  return response.data;
};
