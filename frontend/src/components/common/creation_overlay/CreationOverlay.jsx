import "./CreationOverlay.scss";

function CreationOverlay({ onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>

      {/* Content box (the actual form/content) */}
      <div className="content">
        <button>Create</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default CreationOverlay;
