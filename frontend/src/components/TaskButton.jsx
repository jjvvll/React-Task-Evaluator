import { useState } from "react";
import api from "../api/axios";

export default function TaskButton({ task, onTaskUpdated }) {
  // Toggle isDone
  async function toggleIsDone() {
    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        isDone: !task.isDone,
      });
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Failed to update task:", err.response?.data || err);
    }
  }

  // Delete task
  async function deleteTask() {
    try {
      await api.delete(`/tasks/${task.id}`);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Failed to delete task:", err.response?.data || err);
    }
  }

  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  async function submitEdit() {
    try {
      await api.put(`/tasks/${task.id}`, {
        ...task,
        title: editTask,
      });
      if (onTaskUpdated) onTaskUpdated();
      setIsEditing(false);
      setEditTask("");
    } catch (err) {
      console.error("Failed to update task:", err.response?.data || err);
    }
  }

  let rowDisplay = (
    <span>
      {task.title} {task.isDone ? "✅" : "❌"}
    </span>
  );

  if (isEditing) {
    rowDisplay = (
      <div>
        <input
          type="text"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={submitEdit}>Submit</button>
      </div>
    );
  }

  return (
    <li style={{ marginBottom: "8px" }}>
      {rowDisplay}
      <button onClick={toggleIsDone} style={{ marginLeft: "8px" }}>
        Toggle
      </button>
      <button onClick={deleteTask} style={{ marginLeft: "4px", color: "red" }}>
        Delete
      </button>
      {!isEditing && (
        <button
          onClick={() => {
            setIsEditing(true);
            setEditTask(task.title);
          }}
          style={{ marginLeft: "4px", color: "blue" }}
        >
          Edit
        </button>
      )}
    </li>
  );
}
