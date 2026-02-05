import { useState } from "react";

import { Star } from "../../common/index.js";

import "./Home.scss";

function Home() {
  return (
    <div className="task-container">
      <div className="header">
        <h2>Tasks</h2>
        <h3>Due date</h3>
        <h3>Lists</h3>
      </div>

      <div className="task-box">
        <section className="task">
          <span className="dot"></span>
          <h3>Task one</h3>
          <h3 className="tags">2026-02-10</h3>
          <h3 className="tags">List one</h3>
          <Star />
        </section>
        <section className="task">
          <span className="dot"></span>
          <h3>Task one</h3>
          <h3 className="tags"></h3>
          <h3 className="tags">List two</h3>
          <Star />
        </section>
        <section className="task">
          <span className="dot"></span>
          <h3>Task one</h3>
          <h3 className="tags">2026-02-10</h3>
          <h3 className="tags"></h3>
          {/* <img src="/public/icons/star-not-filled.png" /> */}
          <Star />
        </section>
      </div>
    </div>
  );
}

export default Home;
