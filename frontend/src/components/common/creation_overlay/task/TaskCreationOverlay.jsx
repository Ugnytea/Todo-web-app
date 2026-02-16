import "./TaskCreationOverlay.scss";

import { Star } from "../../index";
import { useEffect } from "react";

function TaskCreationOverlay({ onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      <div className="content">
        <h2 className="tab-name">New task</h2>

        <div>
          <label htmlFor="title" className="creation-header">
            Title
          </label>
          <input type="text" id="title" className="title-input" />
        </div>
        {/* <Star /> */}
        <div>
          <label htmlFor="description" className="creation-header">
            Description
          </label>
          <input type="text" id="description" className="desc-input" />
        </div>

        <section className="compact">
          <section>
            <label htmlFor="groupName" className="creation-header">
              List
            </label>
            <input type="text" id="groupName" className="dropdown" />
          </section>
          <section>
            <label htmlFor="dueTill" className="creation-header">
              Due date
            </label>
            <input type="text" id="dueTill" className="dropdown" />
          </section>
        </section>

        <section className="create-cancel">
          <button>Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default TaskCreationOverlay;
