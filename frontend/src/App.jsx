import { useState } from "react";

import { Sidebar, Home } from "./components/index.js";

import "./App.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Home />
      {/* <div>Hello</div> */}
    </div>
  );
}

export default App;
