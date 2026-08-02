import { useCallback } from "react";

export const deletionConfirmation = (onConfirm) => {
  const verifyAndClose = useCallback(() => {
    const confirmLeave = window.confirm(
      "Are you sure you want to delete this?",
    );
    if (confirmLeave) {
      onConfirm();
    }
  }, [onConfirm]);

  return verifyAndClose;
};

// function deletionConfirmation({ onClose }) {
//   return (
//     <div className="overlay">
//       <div className="backdrop" onClick={onClose} />

//       <form id="task" className="content card">
//         <h2 className="tab-title">Delete the list?</h2>

//         {/* if statement for if there is or there isn't tasks */}
//         <div>
//           <p>This list contains some tasks. What should happen to the tasks?</p>
//           <label className="delete-check">
//             <input type="radio" id="deleteAllTasks" />
//             Delete all tasks
//           </label>
//           <label className="delete-check">
//             <input type="radio" id="keepSelectedTasks" />
//             Keep selected tasks
//           </label>
//           (document.getElementById("keepSelectedTasks").checked &&{" "}
//           {
//             // List of all tasks
//           }
//           )
//         </div>

//         <section className="btn-area">
//           <button id="delete" type="button" onClick={handleSafeDelete}>
//             Delete list
//           </button>
//           <button id="cancel" type="button" onClick={handleSafeClose}>
//             Cancel
//           </button>
//         </section>
//       </form>
//     </div>
//   );
// }
