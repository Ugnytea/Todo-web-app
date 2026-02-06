import { useState } from "react";

import "./Sidebar.scss";

function Sidebar() {
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
          <button>List one</button>
          <button>List two</button>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
