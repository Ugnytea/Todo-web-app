import { getSpecificTask, updateTask, deleteTask } from "../../api/apiTasks";
import { getAllLists } from "../../api/apiLists";
import useFocus from "../../helper/useFocus";

import { Star } from "../../features/tasks/components/index.js";
import { useEffect, useState } from "react";

import "./Overlay.scss";

function TaskUpdateOverlay({ taskId, onClose, onTaskUpdated }) {
  const inputRef = useFocus();
  const [lists, setLists] = useState([]);
  const [updatedTask, setUpdatedTask] = useState({
    id: "",
    title: "",
    description: "",
    dueTill: "",
    important: "",
    completed: "",
    groupId: "",
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
          important: data.important || "false",
          completed: data.completed || "false",
          groupId: data.groupId || "",
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
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>

      <form id="task" className="content card">
        <h2 className="tab-title">Update task</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="input-header">
            Title
          </label>
          <textarea
            type="text"
            id="title"
            maxLength="255"
            value={updatedTask.title}
            onChange={handleChange}
            ref={inputRef}
            required
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="input-header">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            maxLength="500"
            value={updatedTask.description}
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
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button id="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        </section>
      </form>
    </div>
  );
}

export default TaskUpdateOverlay;
