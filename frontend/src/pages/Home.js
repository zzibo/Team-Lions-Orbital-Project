import { useEffect, useState } from "react"

// components
import NotesStorage from "../Components/NotesStorage"
import Insertion from "../Components/Insertion"

const Home = () => {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('/api/notes')
      const json = await response.json()

      if (response.ok) {
        setNotes(json)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="home">
      <Insertion/>
      <h1 className="yournotes-header" style={{ marginLeft: "10px" }}>
        Your Notes
      </h1>
      <div className="notes">
        {notes && notes.map(note => (
          <NotesStorage note={note} key={note._id} />
        ))}
      </div>
    </div>
  )
}

export default Home