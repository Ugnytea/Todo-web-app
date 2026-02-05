import { useState } from "react";

import "./Star.scss";

function Star() {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`star ${active ? "active" : ""}`}
      onClick={() => setActive(!active)}
    />
  );
}

export default Star;
