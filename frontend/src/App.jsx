import { useEffect, useState } from "react";
import { Sidebar } from "./components/index.js";
import { Tasks } from "./features/index.js";
import { getAllTasks, getGroupOfTasks } from "./api/apiTasks.js";
import {
  getTodaysTasks,
  getUpcomingTasks,
  getImportantTasks,
} from "./api/apiSpecificTasks.js";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState({
    type: "all",
    groupId: null,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getFetchFunction()();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setTasks([]);
      }
    };
    loadTasks();
  }, [refreshTrigger, currentView]);

  const getFetchFunction = () => {
    switch (currentView.type) {
      case "today":
        return () => getTodaysTasks();
      case "upcoming":
        return () => getUpcomingTasks();
      case "important":
        return () => getImportantTasks();
      case "group":
        return () => getGroupOfTasks(currentView.groupId);
      default:
        return () => getAllTasks();
    }
  };

  const handleTasksChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <Sidebar
        view={currentView}
        onTaskCreated={handleTasksChange}
        onViewChange={setCurrentView}
      />
      <Tasks tasks={tasks} onTasksChange={handleTasksChange} />
    </div>
  );
}

export default App;
