import { createTask } from "../../../../api/apiTasks";
import { getAllLists } from "../../../../api/apiLists";

import { useEffect, useState } from "react";

import "./../../../shared/Overlay.scss";

function TaskCreationOverlay({ onClose, onTaskCreated }) {
  const [lists, setLists] = useState([]);

  const [task, setTask] = useState({
    title: "",
    createdAt: new Date().toISOString().split("T")[0],
    description: null,
    dueTill: null,
    groupId: null,
    important: false,
    completed: false,
  });

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data);
      } catch (error) {
        console.error("Failed to load lists");
      }
    };
    loadLists();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [id]: value || null,
    }));
  };

  const handleSubmit = async () => {
    try {
      const createdTask = { ...task };

      await createTask(createdTask);
      onTaskCreated();
    } catch (error) {
      console.error("Failed to create task.", error);
    }
  };

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>

      <div id="task" className="content card">
        <h2 className="tab-title">New task</h2>

        <div>
          <label htmlFor="title" className="input-header">
            Title
          </label>
          <input type="text" id="title" onChange={handleChange} required />
        </div>
        {/* <Star /> */}
        <div>
          <label htmlFor="description" className="input-header">
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
            <label htmlFor="groupName" className="input-header">
              List
            </label>
            <select
              id="groupName"
              value={task.groupId || ""}
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
          <section>
            <label htmlFor="dueTill" className="input-header">
              Due date
            </label>
            <input type="date" id="dueTill" onChange={handleChange} />
          </section>
        </section>

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Create
          </button>
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default TaskCreationOverlay;
