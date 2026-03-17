import { createList } from "../../../../api/apiLists";
import "./Overlay.scss";

function ListCreationOverlay({ onClose, onListCreated }) {
  const handleSubmit = async () => {
    try {
      await createList(document.getElementById("list-name").value);
      onListCreated();
    } catch (error) {
      console.error("Failed to create list.", error);
    }
  };

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      <div className="content list-card">
        <h2 className="tab-name">New list</h2>

        <div>
          <label htmlFor="list-name" className="creation-header">
            List name
          </label>
          <input type="text" id="list-name" required />
        </div>

        <section className="create-cancel">
          <button onClick={handleSubmit}>Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </section>
      </div>
    </>
  );
}

export default ListCreationOverlay;
