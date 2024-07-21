import { useContext, useState } from "react";
import "./NoteForm.css";
import uploadlogo from "../Assets/UploadLogo.png";
import { useNotesContext } from "../Hooks/useNotesContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

const NoteForm = () => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [pdf, setPdf] = useState(null);
  const [pdfFilename, setPdfFilename] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("pdf", pdf);

    const response = await fetch(`${apiUrl}/api/notes`, {
      method: "POST",
      body: formData,
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setSubject("");
      setPdf(null);
      setPdfFilename("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_NOTE", payload: json });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
      setPdfFilename(file.name);
    } else {
      setPdf(null);
      setPdfFilename("");
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
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
      <label>PDF: </label>
      <input
        type="file"
        accept=".pdf"
        className="pdf-input"
        id="pdf-input"
        placeholder="Upload your PDF here"
        onChange={handleFileChange}
      />

      <label htmlFor="pdf-input" className="input-label">
        {pdf ? pdf.name : "Upload your PDF here!"}
        {!pdf && <img src={uploadlogo} alt="Upload" className="upload-logo" />}
      </label>

      <button>Add Note</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NoteForm;

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
