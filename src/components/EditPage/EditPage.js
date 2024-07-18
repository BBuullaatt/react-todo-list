import React from "react";
import './EditPage.css';

function EditPage({
  currentEditedItem,
  handleUpdateTitle,
  handleUpdateDescription,
  handleUpdateToDo,
  setCurrentEdit,
}) {
  return (
    <div className="edit__wrapper">
      <input
        placeholder="Updated Title"
        onChange={(e) => handleUpdateTitle(e.target.value)}
        value={currentEditedItem.title}
      />
      <textarea
        placeholder="Updated Title"
        rows={4}
        onChange={(e) => handleUpdateDescription(e.target.value)}
        value={currentEditedItem.description}
      />
      <div className="updateButtons">
        <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
          Update
        </button>
        <button
          type="button"
          onClick={() => setCurrentEdit("")}
          className="primaryBtn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPage;
