import { useEffect } from "react";
import { useNotesContext } from "../Hooks/useNotesContext";
import "./Home.css";
import { useAuthContext } from "../Hooks/useAuthContext";

// components
import Notes from "../Components/Notes";
import NoteForm from "../Components/NoteForm";
//const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const { notes, dispatch } = useNotesContext();
  const { user } = useAuthContext();
  const apiUrl = process.env.REACT_APP_API_URL;

  //activates when notesProvider is rendered for the first time
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`${apiUrl}/api/notes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <NoteForm />
      <h1 className="yournotes-header" style={{ marginLeft: "10px" }}>
        Your Notes
      </h1>
      <div className="notes">
        {notes && notes.map((note) => <Notes note={note} key={note._id} />)}
      </div>
    </div>
  );
};

export default Home;
