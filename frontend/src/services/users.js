import api from "../api/axios";

// Fetch all users
export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
