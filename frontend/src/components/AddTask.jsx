import { useState } from "react";
import { addTask as addTaskService } from "../services/tasks";
import "./AddTask.css";

export default function AddTask({ userId, setTasks }) {
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (!newTask.trim() || !userId) return; // prevent adding empty tasks or without user

    const payload = {
      Title: newTask,
      IsDone: false,
      UserId: userId,
    };

    try {
      const createdTask = await addTaskService(payload);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="add-task-container">
      <input
        className="add-task-input"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />

      <button onClick={addTask} disabled={!userId}>
        Add
      </button>
    </div>
  );
}
