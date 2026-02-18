import { useEffect, useState } from "react";

import { Sidebar, AllTasks } from "./components/index.js";
import { getAllTasks } from "./api/apiTasks.js";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, [refreshTrigger]);

  const handleTasksChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <Sidebar onTaskCreated={handleTasksChange} />
      <AllTasks tasks={tasks} onTasksChange={handleTasksChange} />
    </div>
  );
}

export default App;
