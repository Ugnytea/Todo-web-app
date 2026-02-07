import { useEffect, useState } from "react";

import { Completion, Star } from "../../common/index.js";
import { getAllTasks } from "../../../api/apiTasks";

import "./Home.scss";

function Home() {
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
          <section key={task.id} className="task">
            <Completion />
            <h3>{task.title}</h3>
            <h3 className="tags">{task.dueTill}</h3>
            <h3 className="tags">{task.groupId}</h3>
            <Star />
          </section>
        ))}

        {/* <section className="task">
          <Completion />
          <h3>Task one</h3>
          <h3 className="tags">2026-02-10</h3>
          <h3 className="tags">List one</h3>
          <Star />
        </section>
        <section className="task">
          <Completion />
          <h3>Task one</h3>
          <h3 className="tags"></h3>
          <h3 className="tags">List two</h3>
          <Star />
        </section>
        <section className="task">
          <Completion />
          <h3>Task one</h3>
          <h3 className="tags">2026-02-10</h3>
          <h3 className="tags"></h3>
          <Star />
        </section> */}
      </div>
    </div>
  );
}

export default Home;
