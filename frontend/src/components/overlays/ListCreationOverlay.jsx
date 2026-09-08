import { createList } from "../../api/apiLists";
import useFocus from "../../helper/useFocus";
import "./Overlay.scss";

function ListCreationOverlay({ onClose, onListCreated }) {
  const inputRef = useFocus();

  const handleSubmit = async () => {
    try {
      await createList(document.getElementById("list-name").value);
      onListCreated();
    } catch (error) {
      console.error("Failed to create list.", error);
    }
  };

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>

      <div id="list" className="content card">
        <h2 className="tab-title">New list</h2>

        <div>
          <label htmlFor="list-name" className="input-header">
            List name
          </label>
          <textarea
            type="text"
            id="list-name"
            maxlength="255"
            ref={inputRef}
            required
          />
        </div>

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Create
          </button>
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default ListCreationOverlay;
