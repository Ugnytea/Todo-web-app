import { useEffect, useState } from "react";
import { getSpecificTask, updateTask, deleteTask } from "../../api/apiTasks";
import { getAllLists } from "../../api/apiLists";

import { Star } from "../../features/tasks/components/index.js";
import { unsavedChanges } from "./confirmation/unsavedChanges.jsx";
import { deletionConfirmation } from "./confirmation/deletionConfirmation.jsx";

import "./Overlay.scss";

function TaskUpdateOverlay({ taskId, onClose, onTaskUpdated }) {
  const [lists, setLists] = useState([]);
  const [originalTask, setOriginalTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    title: "",
    description: "",
    dueTill: "",
    important: "",
    completed: "",
    groupName: "",
  });

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getSpecificTask(taskId);
        const formattedData = {
          id: data.id || "",
          title: data.title || "",
          description: data.description || "",
          dueTill: data.dueTill || "",
          important: data.important || "false",
          completed: data.completed || "false",
          groupName: data.groupName || "",
        };

        setUpdatedTask(formattedData);
        setOriginalTask(formattedData);
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
  }, [taskId]);

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

  // Confirm cancel if any changes where made, otherwise just close
  const isDirty =
    originalTask &&
    JSON.stringify(updatedTask) !== JSON.stringify(originalTask);
  const handleSafeClose = unsavedChanges(isDirty, onClose);

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onTaskUpdated();
    } catch (error) {
      console.error("Failed to delete task.", error);
    }
  };

  const handleSafeDelete = deletionConfirmation(handleDelete);

  return (
    <div className="overlay">
      <div className="backdrop" onClick={handleSafeClose}></div>

      <form id="task" className="content card">
        <h2 className="tab-title">Update task</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="input-header">
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
          <label htmlFor="description" className="input-header">
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
            <label htmlFor="groupId" className="input-header">
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
            <label htmlFor="dueTill" className="input-header">
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

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Update
          </button>
          <button id="cancel" type="button" onClick={handleSafeClose}>
            Cancel
          </button>
          <button id="delete" type="button" onClick={handleSafeDelete}>
            Delete
          </button>
        </section>
      </form>
    </div>
  );
}

export default TaskUpdateOverlay;
