import { getList, updateList, deleteList } from "../../../../api/apiLists";

import { useEffect, useState } from "react";

import "./../../../shared/Overlay.scss";

function ListUpdateOverlay({ listId, onClose, onListUpdated }) {
  const [lists, setLists] = useState([]);
  const [updatedList, setUpdatedList] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    const loadList = async () => {
      try {
        const data = await getList(ListId);
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
      await updateList(updateList);
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

      <form className="content task-card">
        <h2 className="tab-name">Update list</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="creation-header">
            List name
          </label>
          <input
            type="text"
            id="title"
            value={updatedList.name}
            onChange={handleChange}
            required
          />
        </div>

        <section className="create-cancel">
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
