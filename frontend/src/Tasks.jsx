import { useEffect, useState } from "react";
import api from "./api/axios";

import "./Tasks.css";
import AddTask from "./components/AddTask";
import TaskButton from "./components/TaskButton";
import UserButton from "./components/UserButton";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Make a reusable function to fetch tasks
  const fetchTasks = (userId = null) => {
    api
      .get("/tasks")
      .then((res) => {
        // If a user is selected, filter by UserId
        if (userId) {
          setTasks(res.data.filter((task) => task.userId === userId));
        } else {
          setTasks(res.data); // all tasks if no user selected
        }
      })
      .catch((err) => console.error(err));
  };

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // When a user is selected
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  // When selectedUser changes, refetch tasks
  useEffect(() => {
    if (selectedUserId) {
      fetchTasks(selectedUserId);
    } else {
      fetchTasks(); // all tasks if no user selected
    }
  }, [selectedUserId]);

  const fetchUsers = () => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                selectUser={handleUserSelect}
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
