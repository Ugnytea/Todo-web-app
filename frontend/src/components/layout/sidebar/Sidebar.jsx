import { useEffect, useState } from "react";

import { getAllLists } from "../../../api/apiLists";
import {
  TaskCreationOverlay,
  ListUpdateOverlay,
  ListCreationOverlay,
} from "./components/index";

import "./Sidebar.scss";

function Sidebar({ view, onTaskCreated, onViewChange }) {
  const [lists, setLists] = useState([]);
  const [showTaskOverlay, setShowTaskOverlay] = useState(false);
  const [showListOverlay, setShowListOverlay] = useState(false);
  const [showListUpdateOverlay, setShowListUpdateOverlay] = useState(false);

  const [selectedList, setSelectedList] = useState(false);
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
  }, [showTaskOverlay, showListOverlay, showListUpdateOverlay]);

  const handleTaskCreated = () => {
    setShowTaskOverlay(false);
    onTaskCreated();
  };

  const handleListCreated = () => {
    setShowListOverlay(false);
    loadLists();
  };

  const handleListUpdate = () => {
    setShowListUpdateOverlay(false);
    loadLists();
  };

  const handleTaskClick = (list) => {
    setSelectedList(list.id);
    setShowListUpdateOverlay(true);
  };

  return (
    <div className="sidebar">
      <aside className="box">
        <h1 onClick={() => onViewChange({ type: "" })}>Todo app</h1>
        <section>
          <div className="title">
            <h2 onClick={() => onViewChange({ type: "" })}>Tasks</h2>
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
              <div
                key={list.id}
                className={
                  view.groupId === list.id ? "compact active" : "compact"
                }
              >
                <button
                  onClick={() =>
                    onViewChange({ type: "group", groupId: list.id })
                  }
                >
                  {list.name}
                </button>
                <img
                  src="./public/icons/pencil.png"
                  alt="list editing"
                  className="edit"
                  onClick={() => handleTaskClick(list)}
                />
              </div>
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

      {showListUpdateOverlay && (
        <ListUpdateOverlay
          listId={selectedList}
          onClose={() => setShowListUpdateOverlay(false)}
          onListUpdated={handleListUpdate}
        />
      )}
    </div>
  );
}

export default Sidebar;
