import { useEffect, useState } from "react";
import { getList, updateList, deleteList } from "../../api/apiLists";
import { unsavedChanges } from "./confirmation/unsavedChanges.jsx";
import { deletionConfirmation } from "./confirmation/deletionConfirmation.jsx";

import "./Overlay.scss";

function ListUpdateOverlay({ listId, onClose, onListUpdated }) {
  const [lists, setLists] = useState([]);
  const [originalList, setOriginalList] = useState(null);
  const [updatedList, setUpdatedList] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const loadList = async () => {
      try {
        const data = await getList(listId);
        const formattedData = {
          id: data.id || "",
          name: data.name || "",
        };

        setUpdatedList(formattedData);
        setOriginalList(formattedData);
      } catch (error) {
        console.error("Failed to load list:", error);
      }
    };

    loadList();
  }, [listId]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUpdatedList((prev) => ({
      ...prev,
      [id]: value || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateList(updatedList);
      onListUpdated();
    } catch (error) {
      console.error("Failed to update list.", error);
    }
  };

  // Confirm cancel if any changes where made, otherwise just close
  const isDirty =
    originalList &&
    JSON.stringify(updatedList) !== JSON.stringify(originalList);
  const handleSafeClose = unsavedChanges(isDirty, onClose);

  const handleDelete = async () => {
    try {
      await deleteList(listId);
      onListUpdated();
    } catch (error) {
      console.error("Failed to delete list.", error);
    }
  };

  const handleSafeDelete = deletionConfirmation(handleDelete);

  return (
    <div className="overlay">
      <div className="backdrop" onClick={handleSafeClose}></div>

      <form id="task" className="content card">
        <h2 className="tab-title">Update list</h2>

        {/* Title */}
        <div>
          <label htmlFor="name" className="input-header">
            List name
          </label>
          <input
            type="text"
            id="name"
            value={updatedList.name}
            onChange={handleChange}
            required
          />
        </div>

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Update
          </button>
          <button id="cancel" type="button" onClick={handleSafeClose}>
            Cancel
          </button>
          <button id="delete" type="button" onClick={handleSafeDelete}>
            Delete
          </button>
        </section>
      </form>
    </div>
  );
}

export default ListUpdateOverlay;
