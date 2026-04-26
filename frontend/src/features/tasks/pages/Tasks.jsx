import { useEffect, useState } from "react";
import { Completion, Star } from "../components/index.js";
import { TaskUpdateOverlay } from "../../../components/overlays/index.js";

import "./Tasks.scss";

function Tasks({ tasks, onTasksChange }) {
  const [showTaskOverlay, setShowTaskOverlay] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (showTaskOverlay) {
      document.body.classList.add("overlay-open");
    } else {
      document.body.classList.remove("overlay-open");
    }

    return () => {
      document.body.classList.remove("overlay-open");
    };
  }, [showTaskOverlay]);

  const handleTaskUpadated = () => {
    setShowTaskOverlay(false);
    setSelectedTask(null);
    onTasksChange();
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task.id);
    setShowTaskOverlay(true);
  };

  return (
    <>
      <div className="task">
        <div className="header">
          <h2>Tasks</h2>
          <h3>Due date</h3>
          <h3>Lists</h3>
        </div>

        <div className="box card">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <section
                key={task.id}
                className={`info card ${task.completed ? "completed" : ""}`}
                onClick={() => handleTaskClick(task)}
              >
                <Completion task={task} onUpdate={onTasksChange} />
                <h3>{task.title}</h3>
                <h3 className="tags">{task.dueTill}</h3>
                <h3 className="tags">{task.groupName}</h3>
                <Star task={task} onUpdate={onTasksChange} />
              </section>
            ))
          ) : (
            <h3>No tasks to display</h3>
          )}
        </div>
      </div>

      {showTaskOverlay && selectedTask && (
        <TaskUpdateOverlay
          taskId={selectedTask}
          onClose={() => {
            setShowTaskOverlay(false);
            setSelectedTask(null);
          }}
          onTaskUpdated={handleTaskUpadated}
        />
      )}
    </>
  );
}

export default Tasks;
