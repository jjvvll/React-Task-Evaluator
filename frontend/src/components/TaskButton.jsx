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

  return (
    <li style={{ marginBottom: "8px" }}>
      {task.title} {task.isDone ? "✅" : "❌"}
      <button onClick={toggleIsDone} style={{ marginLeft: "8px" }}>
        Toggle
      </button>
      <button onClick={deleteTask} style={{ marginLeft: "4px", color: "red" }}>
        Delete
      </button>
    </li>
  );
}
