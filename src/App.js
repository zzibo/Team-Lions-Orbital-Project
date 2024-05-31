import NavBar from "./Components/NavBar";
import "./App.css";
import Insertion from "./Components/Insertion";
import { useState } from "react";
import React from "react";
import NotesStorage from "./Components/NotesStorage";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notes, setNotes] = useState([]);

  const handleCreateNote = (Title, Subject) => {
    const newNote = { id: uuidv4(), Title, Subject };
    setNotes([...notes, newNote]);
  };

  const handleRemoveNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <NavBar></NavBar>
      <Insertion handleCreateNote={handleCreateNote}></Insertion>
      <NotesStorage
        notes={notes}
        handleRemoveNote={handleRemoveNote}
      ></NotesStorage>
    </div>
  );
}

export default App;
