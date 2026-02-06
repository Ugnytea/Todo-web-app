import { useState } from "react";

import "./Completion.scss";

function Completion() {
  const [active, setActive] = useState(false);

  return (
    <span
      className={`circle ${active ? "active" : ""}`}
      onClick={() => setActive(!active)}
    />
  );
}

export default Completion;
