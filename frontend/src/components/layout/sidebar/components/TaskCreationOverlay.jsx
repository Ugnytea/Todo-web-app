import { createTask } from "../../../../api/apiTasks";

import { useState } from "react";

import "./../../../shared/Overlay.scss";

function TaskCreationOverlay({ onClose, onTaskCreated }) {
  const baseTask = {
    title: "",
    createdAt: new Date().toISOString().split("T")[0],
    description: null,
    dueTill: null,
    groupId: null,
    important: false,
    completed: false,
  };

  const [task, setTask] = useState(baseTask);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [id]: value || null,
    }));
  };

  const handleSubmit = async () => {
    try {
      const createdTask = { ...baseTask, ...task };

      await createTask(createdTask);
      onTaskCreated();
    } catch (error) {
      console.error("Failed to create task.", error);
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      <div className="content task-card">
        <h2 className="tab-name">New task</h2>

        <div>
          <label htmlFor="title" className="creation-header">
            Title
          </label>
          <input type="text" id="title" onChange={handleChange} required />
        </div>
        {/* <Star /> */}
        <div>
          <label htmlFor="description" className="creation-header">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="desc-input"
            onChange={handleChange}
          />
        </div>

        <section className="compact">
          <section>
            <label htmlFor="groupName" className="creation-header">
              List
            </label>
            <input
              type="number"
              id="groupName"
              className="dropdown"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="dueTill" className="creation-header">
              Due date
            </label>
            <input type="date" id="dueTill" onChange={handleChange} />
          </section>
        </section>

        <section className="create-cancel">
          <button id="confirm" onClick={handleSubmit}>
            Create
          </button>
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default TaskCreationOverlay;
