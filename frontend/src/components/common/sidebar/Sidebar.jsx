import { useEffect, useState } from "react";

import "./Sidebar.scss";
import { getAllLists } from "../../../api/apiLists";
import CreationOverlay from "../creation_overlay/CreationOverlay";

function Sidebar() {
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
        <CreationOverlay onClose={() => setShowTaskOverlay(false)} />
        // <>
        //   <div className="actions">
        //     <button onClick={() => setShowTaskOverlay(false)}>Cancel</button>
        //     <button>Create</button>
        //   </div>
        // </>
      )}
    </>
  );
}

export default Sidebar;
