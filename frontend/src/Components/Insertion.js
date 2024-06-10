import { useState } from "react";
import "./Insertion.css";
//import uploadlogo from "../Assets/UploadLogo.png"
//import UploadPopup from "./UploadPopup";

const NoteForm = () => {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const note = {title, subject, body}

    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    } 
    if (response.ok) {
      setError(null)
      setTitle('')
      setSubject('')
      setBody('')
      console.log('new note added: ', json)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Note</h3>

      <label>Note title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Subject: </label>
      <input 
        type="text" 
        onChange={(e) => setSubject(e.target.value)} 
        value={subject}
      />

      <label>Body: </label>
      <input 
        type="text" 
        onChange={(e) => setBody(e.target.value)} 
        value={body} 
      />

      <button>Add Note</button>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NoteForm

/*
function Insertion({ handleCreateNote }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    if (selectedFile) {
      setShowPopup(true);
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setError(false);
    document.getElementById("pdf-input").value = ""; // Reset the input value
  };

  const handleFileUpload = (file) => {
    setSelectedFile(file);
    setError(false);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedFile(null);
    document.getElementById("pdf-input").value = ""; // Reset the input value
  };

  return (
    <>
      <div className="insertion">
        <div className="input-container">
          <input
            type="file"
            accept=".pdf"
            className="pdf-input"
            id="pdf-input"
            placeholder="Upload your PDF here"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          ></input>
          <label htmlFor="pdf-input" className="input-label">
            {selectedFile ? selectedFile.name : "Upload your PDF here!"}
            {!selectedFile && (
              <img src={uploadlogo} alt="Upload" className="upload-logo" />
            )}
          </label>
        </div>
        <div className="error-container">
          {" "}
          {error && (
            <p className="no-pdf-error">Please insert a pdf</p>
          )}
        </div>
      </div>

      <div className="button-container">
        <button className="Button" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="Button" onClick={handleCancel}>
          Cancel
        </button>
      </div>

      {showPopup && (
        <UploadPopup
          onClose={handleClose}
          onCreate={handleCreateNote}
          file={selectedFile}
        ></UploadPopup>
      )}
    </>
  );
}
*/
//export default Insertion;
