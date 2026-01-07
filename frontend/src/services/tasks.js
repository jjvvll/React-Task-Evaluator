import api from "../api/axios";

// Fetch all tasks
export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// Fetch tasks by user
export const fetchTasksByUser = async (userId) => {
  const res = await api.get("/tasks");
  return res.data.filter((task) => task.userId === userId);
};

// Add a new task
export const addTask = async (taskData) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
};

// Update a task
export const updateTask = async (taskId, updatedData) => {
  const res = await api.put(`/tasks/${taskId}`, updatedData);
  return res.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`);
};
