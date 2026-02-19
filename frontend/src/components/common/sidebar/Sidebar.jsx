import { useEffect, useState } from "react";

import { getAllLists } from "../../../api/apiLists";
import { TaskCreationOverlay, ListCreationOverlay } from "../index";

import "./Sidebar.scss";

function Sidebar({ onTaskCreated }) {
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
        <h1>Todo app</h1>
        <section>
          <div className="title">
            <h2>Tasks</h2>
            <button onClick={() => setShowTaskOverlay(true)}>+</button>
          </div>
          <div className="card">
            <button>Today</button>
            <button>Upcoming</button>
            <button>Important</button>
          </div>
        </section>
        <section>
          <div className="title">
            <h2>Lists</h2>
            <button onClick={() => setShowListOverlay(true)}>+</button>
          </div>
          <div className="card">
            {lists.map((list) => (
              <button key={list.id}>{list.name}</button>
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
