import { useState } from "react";
import { updateTask, deleteTask as deleteTaskService } from "../services/tasks";
import "./TaskButton.css";

export default function TaskButton({ task, tasks, setTasks }) {
  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsDone = async () => {
    try {
      const updated = await updateTask(task.id, {
        ...task,
        isDone: !task.isDone,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const deleteTask = async () => {
    try {
      await deleteTaskService(task.id);
      setTasks(tasks.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const submitEdit = async () => {
    try {
      const updated = await updateTask(task.id, { ...task, title: editTask });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
      setIsEditing(false);
      setEditTask("");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div className="edit-container">
          <input
            className="edit-input"
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            placeholder="New task"
          />
          <button className="submit-btn" onClick={submitEdit}>
            Submit
          </button>
        </div>
      ) : (
        <span className={`task-title ${task.isDone ? "done" : ""}`}>
          {task.title} {task.isDone ? "✅" : "❌"}
        </span>
      )}

      {!isEditing && (
        <>
          <button className="task-button toggle-btn" onClick={toggleIsDone}>
            Toggle
          </button>
          <button className="task-button delete-btn" onClick={deleteTask}>
            Delete
          </button>
          <button
            className="task-button edit-btn"
            onClick={() => {
              setIsEditing(true);
              setEditTask(task.title);
            }}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
}
