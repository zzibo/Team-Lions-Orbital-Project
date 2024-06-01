import Notes from "./Notes";
import "./Notes.css";
function NotesStorage({ notes, handleRemoveNote }) {
  console.log("Notes array:", notes);

  return (
    <div>
      <h1 className="yournotes-header" style={{ marginLeft: "10px" }}>
        Your Notes
      </h1>
      <div className="notes-container">
        {" "}
        {notes.map((note) => (
          <Notes
            key={note.id}
            id={note.id}
            title={note.Title}
            subject={note.Subject}
            handleRemoveNote={handleRemoveNote}
          ></Notes>
        ))}
      </div>
    </div>
  );
}

export default NotesStorage;
