import { useState } from "react";

import "./Sidebar.scss";

function Sidebar() {
  return (
    <aside className="box">
      <h1>Todo app</h1>
      <section>
        <h2>Tasks</h2>
        <div className="card">
          <div>Today</div>
          <div>Upcoming</div>
          <div>Important</div>
        </div>
      </section>
      <section>
        <h2>Lists</h2>
        <div className="card">
          <div>List one</div>
          <div>List two</div>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
