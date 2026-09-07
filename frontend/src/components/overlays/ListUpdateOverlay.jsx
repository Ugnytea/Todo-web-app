import { getList, updateList, deleteList } from "../../api/apiLists";
import useFocus from "../../helper/useFocus";

import { useEffect, useState } from "react";

import "./Overlay.scss";

function ListUpdateOverlay({ listId, onClose, onListUpdated }) {
  const inputRef = useFocus();
  const [updatedList, setUpdatedList] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const loadList = async () => {
      try {
        const data = await getList(listId);
        setUpdatedList({
          id: data.id || "",
          name: data.name || "",
        });
      } catch (error) {
        console.error("Failed to load list:", error);
      }
    };

    loadList();
  }, []);

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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteList(listId);
      onListUpdated();
    } catch (error) {
      console.error("Failed to delete list.", error);
    }
  };

  return (
    <div className="overlay">
      <div className="backdrop" onClick={onClose}></div>

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
            ref={inputRef}
            required
          />
        </div>

        <section className="btn-area">
          <button id="confirm" onClick={handleSubmit}>
            Update
          </button>
          <button id="cancel" type="button" onClick={onClose}>
            Cancel
          </button>
          <button id="delete" type="button" onClick={handleDelete}>
            Delete
          </button>
        </section>
      </form>
    </div>
  );
}

export default ListUpdateOverlay;
