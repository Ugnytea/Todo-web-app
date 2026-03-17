import { Completion, Star } from "../components/index.js";

import "./Tasks.scss";

function Tasks({ tasks, onTasksChange }) {
  return (
    <div className="task-container">
      <div className="header">
        <h2>Tasks</h2>
        <h3>Due date</h3>
        <h3>Lists</h3>
      </div>

      <div className="task-box">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <section
              key={task.id}
              className={task.completed ? "completed-task" : "task"}
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
  );
}

export default Tasks;
