import "./Notes.css";
import React from "react";

function Notes({ id, handleRemoveNote, title, subject }) {
  return (
    <>
      <div className="notes">
        <button className="delete-button" onClick={() => handleRemoveNote(id)}>
          {" "}
          delete
        </button>
        <h1 className="notes-title">{title}</h1>
        <h2 className="notes-subject">{subject}</h2>
      </div>
    </>
  );
}

export default Notes;
