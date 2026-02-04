import { useState } from "react";
import Sidebar from "../../common/sidebar";
import "./Home.scss";

function Home() {
  return (
    <div className="task-container">
      <div className="heading">
        <h2>Tasks</h2>
        <div className="tags">
          <h3>Due date</h3>
          <h3>Lists</h3>
        </div>
      </div>

      <div className="task-box">
        {/* <h3>Task one</h3> */}
        <section className="task">
          <span className="dot"></span>
          <h3>Task one</h3>
        </section>
      </div>
    </div>
  );
}

export default Home;
