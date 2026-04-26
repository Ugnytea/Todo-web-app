import { useState } from "react";
import { createList } from "../../api/apiLists";
import { unsavedChanges } from "./confirmation/unsavedChanges";

import "./Overlay.scss";

function ListCreationOverlay({ onClose, onListCreated }) {
  const [listName, setListName] = useState("");

  const handleSubmit = async () => {
    if (!listName.trim()) return;
    try {
      await createList(listName);
      onListCreated();
    } catch (error) {
      console.error("Failed to create list.", error);
    }
  };

  // Confirm cancel if any changes where made, otherwise just close
  const isDirty = listName.trim() !== "";
  const handleSafeClose = unsavedChanges(isDirty, onClose);

  return (
    <div className="overlay">
      <div className="backdrop" onClick={handleSafeClose}></div>

      <div id="list" className="content card">
        <h2 className="tab-title">New list</h2>

        <div>
          <label htmlFor="list-name" className="input-header">
            List name
          </label>
          <input
            type="text"
            id="list-name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
          />
        </div>

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Create
          </button>
          <button id="cancel" type="button" onClick={handleSafeClose}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default ListCreationOverlay;
