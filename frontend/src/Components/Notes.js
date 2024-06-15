import "./Notes.css";
import { useNotesContext } from "../Hooks/useNotesContext";

function Notes({ note }) {
  const { dispatch } = useNotesContext();
  console.log("Notes array:", note);

  const handleDelete = async () => {
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    } else {
    }
  };

  return (
    <div>
      <div className="notes-container">
        <h4>{note.title}</h4>
        <p>
          <strong>Subject: </strong>
          {note.subject}
        </p>
        <p>
          <strong>pdf: </strong>
          {note.body}
        </p>
        <p>{note.createdAt}</p>
        <span onClick={handleDelete}> Delete </span>
      </div>
    </div>
  );
}

export default Notes;
