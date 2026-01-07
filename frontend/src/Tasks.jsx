import { useEffect, useState } from "react";
import api from "./api/axios";

import AddTask from "./components/AddTask";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  // Make a reusable function to fetch tasks
  const fetchTasks = () => {
    api
      .get("/tasks")
      .then((res) => {
        console.log("Tasks fetched:", res.data); // keep your log
        setTasks(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Call it when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <AddTask onTaskAdded={fetchTasks} />
      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id}>
              {task.title} {task.isDone ? "✅" : "❌"}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tasks;
