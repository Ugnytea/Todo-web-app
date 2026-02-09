import { useState } from "react";

import { Sidebar, AllTasks } from "./components/index.js";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <AllTasks />
    </div>
  );
}

export default App;
