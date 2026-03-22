import { useState } from "react";

import { updateTask } from "../../../../api/apiTasks";

import "./Star.scss";

function Star({ task, onUpdate }) {
  const toggleImportance = async (e) => {
    e.stopPropagation();
    try {
      const updatedTask = {
        ...task,
        important: !task.important,
      };

      await updateTask(updatedTask);
      onUpdate();
    } catch (error) {
      console.error("Failed to toggle importance.", error);
    }
  };
  return (
    <div
      className={`star ${task.important ? "active" : ""}`}
      onClick={toggleImportance}
    />
  );
}

export default Star;
