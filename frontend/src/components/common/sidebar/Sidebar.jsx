import { useEffect, useState } from "react";

import "./Sidebar.scss";
import { getAllLists } from "../../../api/apiLists";

function Sidebar() {
  const [lists, setLists] = useState([]);

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
    <aside className="box">
      <h1>Todo app</h1>
      <section>
        <h2>Tasks</h2>
        <div className="card">
          <button>Today</button>
          <button>Upcoming</button>
          <button>Important</button>
        </div>
      </section>
      <section>
        <div className="title">
          <h2>Lists</h2>
          <h2>+</h2>
        </div>
        <div className="card">
          {lists.map((list) => (
            <button key={list.id}>{list.name}</button>
          ))}
          {/* <button>List one</button>
          <button>List two</button> */}
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
