import "./Notes.css";
import { useNotesContext } from "../Hooks/useNotesContext"
import { useAuthContext } from "../Hooks/useAuthContext"
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Notes({ note }) {
  const { dispatch } = useNotesContext()
  const { user } = useAuthContext()
  console.log("Notes array:", note)

  const handleDelete = async () => {
    if (!user) {
      return
    }
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
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
        <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
      </div>
    </div>
  );
}

export default Notes;
