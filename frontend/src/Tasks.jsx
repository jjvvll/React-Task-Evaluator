import { useEffect, useState } from "react";

import { fetchTasks, fetchTasksByUser } from "./services/tasks";
import { fetchUsers } from "./services/users";

import "./Tasks.css";
import AddTask from "./components/AddTask";
import TaskButton from "./components/TaskButton";
import UserButton from "./components/UserButton";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch tasks
  const loadTasks = async (userId = null) => {
    try {
      const data = userId ? await fetchTasksByUser(userId) : await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  useEffect(() => {
    loadTasks(selectedUserId);
  }, [selectedUserId]);

  return (
    <div className="tasks-container">
      <div>
        <div className="current-user">
          <h1>
            Current User:{" "}
            {selectedUserId
              ? users.find((u) => u.id === selectedUserId)?.email
              : "None"}
          </h1>
          {selectedUserId && (
            <button onClick={() => setSelectedUserId(null)}>
              Remove User Filter
            </button>
          )}
        </div>
        <ul className="users-list">
          {users &&
            users.map((user) => (
              <UserButton
                key={user.id}
                user={user}
                selectUser={setSelectedUserId}
              />
            ))}
        </ul>
      </div>

      <h2>Tasks</h2>
      <AddTask setTasks={setTasks} userId={selectedUserId} />
      <ul className="tasks-list">
        {tasks &&
          tasks.map((task) => (
            <TaskButton
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
      </ul>
    </div>
  );
}

export default Tasks;
