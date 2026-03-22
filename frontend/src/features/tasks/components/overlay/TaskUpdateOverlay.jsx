import {
  getSpecificTask,
  updateTask,
  deleteTask,
} from "../../../../api/apiTasks";
import { getAllLists } from "../../../../api/apiLists";

import { Star } from "../../../../features/tasks/components/index.js";
import { useEffect, useState } from "react";

import "./../../../../components/shared/Overlay.scss";

function TaskUpdateOverlay({ taskId, onClose, onTaskUpdated }) {
  const [lists, setLists] = useState([]);
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
    const loadLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data);
      } catch (error) {
        console.error("Failed to load lists");
      }
    };
    loadTask();
    loadLists();
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

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await deleteTask(taskId);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to delete task.", error);
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      <form className="content task-card">
        <h2 className="tab-name">Update task</h2>

        {/* Title */}
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
        {/* Description */}
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
          {/* List */}
          <section>
            <label htmlFor="groupName" className="creation-header">
              List
            </label>
            <select
              id="groupId"
              value={updatedTask.groupId || ""}
              onChange={handleChange}
            >
              <option value=""></option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </section>
          {/* Due date */}
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
          <button id="confirm" onClick={handleSubmit}>
            Update
          </button>
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button id="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        </section>
      </form>
    </>
  );
}

export default TaskUpdateOverlay;
