import { useState } from "react";
import api from "../api/axios";

export default function AddTask({ onTaskAdded }) {
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (!newTask.trim()) return;

    const payload = {
      Title: newTask,
      IsDone: false,
      UserId: 1,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await api.post("/tasks", payload);
      console.log("Success:", response.data);
      setNewTask("");

      //notify parent component
      onTaskAdded();
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask}>Add</button>
    </div>
  );
}
