import axios from "axios";

const API_BASE_URL = "/api/todos";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch specific tasks by ID
export const getSpecificTask = async (id) => {
  const response = await api.get("/task/${id}");
  return response.data;
};

// Fetch all tasks
export const getAllTasks = async () => {
  const response = await api.get("");
  return response.data;
};

// Fetch group of tasks tasks
export const getGroupOfTasks = async (groupId) => {
  const response = await api.get("/groupOfTasks/${id}");
  return response.data;
};

// Create task
export const createTask = async (task) => {
  const response = await api.get("/create", task);
  return response.data;
};

// Update task
export const updateTask = async (task) => {
  const response = await api.get("/update", task);
  return response.data;
};

// Delete specific tasks
export const deleteTask = async (id) => {
  const response = await api.get("/delete/${id}");
  return response.data;
};
