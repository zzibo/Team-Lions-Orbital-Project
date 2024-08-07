import "./Notes.css";
import { useNotesContext } from "../Hooks/useNotesContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const apiUrl = process.env.REACT_APP_API_URL;

function Notes({ note }) {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const nav = useNavigate();
  console.log("Notes array:", note);

  const clickNote = () => {
    nav("/" + note._id);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!user) {
      return;
    }
    const response = await fetch(`${apiUrl}/api/notes/` + note._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    } else {
    }
  };

  return (
    <div onClick={clickNote}>
      <div className="notes-container">
        <div>
          <div className="notes-details">
            <h4>{note.title}</h4>
            <p>
              <strong>Subject: </strong>
              {note.subject}
            </p>
            <p className="pdf-name">
              <strong>pdf: </strong>
              {note.pdfName}
            </p>
            <p>
              {formatDistanceToNow(new Date(note.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <span
            className="material-symbols-outlined"
            onClick={handleDelete}
            role="button"
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
}

export default Notes;
