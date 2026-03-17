import { useState } from "react";

import { updateTask } from "../../../../api/apiTasks";

import "./Completion.scss";

function Completion({ task, onUpdate }) {
  const toggleComplete = async () => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };

      await updateTask(updatedTask);
      onUpdate();
    } catch (error) {
      console.error("Failed to toggle completion.", error);
    }
  };

  return (
    <span
      className={`circle ${task.completed ? "active" : ""}`}
      onClick={toggleComplete}
    />
  );
}

export default Completion;
