import { useEffect, useState } from "react";

import { Completion, Star } from "../../common/index.js";
import { getAllTasks } from "../../../api/apiTasks.js";

import "./AllTasks.scss";

function AllTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks");
    }
  };

  return (
    <div className="task-container">
      <div className="header">
        <h2>Tasks</h2>
        <h3>Due date</h3>
        <h3>Lists</h3>
      </div>

      <div className="task-box">
        {tasks.map((task) => (
          <section
            key={task.id}
            className={task.completed ? "completed-task" : "task"}
          >
            <Completion task={task} onUpdate={loadTasks} />
            <h3>{task.title}</h3>
            <h3 className="tags">{task.dueTill}</h3>
            <h3 className="tags">{task.groupName}</h3>
            <Star task={task} onUpdate={loadTasks} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
