import { useEffect, useState } from "react";

import { getAllLists } from "../../../api/apiLists";
import { TaskCreationOverlay, ListCreationOverlay } from "../index";

import "./Sidebar.scss";

function Sidebar({ view, onTaskCreated, onViewChange }) {
  const [lists, setLists] = useState([]);
  const [showTaskOverlay, setShowTaskOverlay] = useState(false);
  const [showListOverlay, setShowListOverlay] = useState(false);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    try {
      const data = await getAllLists();
      setLists(data);
    } catch (error) {
      console.error("Failed to load lists");
    }
  };

  useEffect(() => {
    if (showTaskOverlay || showListOverlay) {
      document.body.classList.add("overlay-open");
    } else {
      document.body.classList.remove("overlay-open");
    }

    return () => {
      document.body.classList.remove("overlay-open");
    };
  }, [showTaskOverlay, showListOverlay]);

  const handleTaskCreated = () => {
    setShowTaskOverlay(false);
    onTaskCreated();
  };

  const handleListCreated = () => {
    setShowListOverlay(false);
    loadLists();
  };

  return (
    <>
      <aside className="box">
        <h1 onClick={() => onViewChange({ type: "" })}>Todo app</h1>
        <section>
          <div className="title">
            <h2>Tasks</h2>
            <button onClick={() => setShowTaskOverlay(true)}>+</button>
          </div>
          <div className="card">
            <button
              className={view.type === "today" ? "active" : ""}
              onClick={() => onViewChange({ type: "today" })}
            >
              Today
            </button>
            <button
              className={view.type === "upcoming" ? "active" : ""}
              onClick={() => onViewChange({ type: "upcoming" })}
            >
              Upcoming
            </button>
            <button
              className={view.type === "important" ? "active" : ""}
              onClick={() => onViewChange({ type: "important" })}
            >
              Important
            </button>
          </div>
        </section>
        <section>
          <div className="title">
            <h2>Lists</h2>
            <button onClick={() => setShowListOverlay(true)}>+</button>
          </div>
          <div className="card">
            {lists.map((list) => (
              <button
                key={list.id}
                className={view.groupId === list.id ? "active" : ""}
                onClick={() =>
                  onViewChange({ type: "group", groupId: list.id })
                }
              >
                {list.name}
              </button>
            ))}
          </div>
        </section>
      </aside>

      {showTaskOverlay && (
        <TaskCreationOverlay
          onClose={() => setShowTaskOverlay(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {showListOverlay && (
        <ListCreationOverlay
          onClose={() => setShowListOverlay(false)}
          onListCreated={handleListCreated}
        />
      )}
    </>
  );
}

export default Sidebar;
