import axios from "axios";

const API_BASE_URL = "/api/todosLists";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all lists
export const getAllLists = async () => {
  const response = await api.get("");
  return response.data;
};

// Create list
export const createTask = async (list) => {
  const response = await api.get("/create", task);
  return response.data;
};

// Update list
export const updateTask = async (list) => {
  const response = await api.get("/update", task);
  return response.data;
};

// Delete specific list
export const deleteTask = async (id) => {
  const response = await api.get("/delete/${id}");
  return response.data;
};
