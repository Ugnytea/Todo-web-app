import { getSpecificTask, updateTask } from "../../../../api/apiTasks";

import { Star } from "../../../../features/tasks/components/index.js";
import { useEffect, useState } from "react";

import "./Overlay.scss";

function TaskUpdateOverlay({ taskId, onClose, onTaskUpdated }) {
  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    title: "",
    description: "",
    dueTill: "",
    groupName: "",
  });

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getSpecificTask(taskId);
        setUpdatedTask({
          id: data.id || "",
          title: data.title || "",
          description: data.description || "",
          dueTill: data.dueTill || "",
          groupName: data.groupName || "",
        });
      } catch (error) {
        console.error("Failed to load task:", error);
      }
    };
    loadTask();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUpdatedTask((prev) => ({
      ...prev,
      [id]: value || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTask(updatedTask);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to update task.", error);
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      <form className="content task-card">
        <h2 className="tab-name">New task</h2>

        <div>
          <label htmlFor="title" className="creation-header">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={updatedTask.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* <Star /> */}
        <div>
          <label htmlFor="description" className="creation-header">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={updatedTask.description}
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
              type="text"
              id="groupName"
              value={updatedTask.groupName}
              className="dropdown"
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="dueTill" className="creation-header">
              Due date
            </label>
            <input
              type="date"
              id="dueTill"
              value={updatedTask.dueTill}
              onChange={handleChange}
            />
          </section>
        </section>

        <section className="create-cancel">
          <button onClick={handleSubmit}>Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </form>
    </>
  );
}

export default TaskUpdateOverlay;
