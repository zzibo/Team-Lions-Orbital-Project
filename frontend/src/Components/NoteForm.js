import { useState } from "react";
import "./NoteForm.css";
import uploadlogo from "../Assets/UploadLogo.png";
import { useNotesContext } from "../Hooks/useNotesContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import Loader from "react-spinners/RingLoader";

const apiUrl = process.env.REACT_APP_API_URL;

const NoteForm = () => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const handleClear = (e) => {
    e.preventDefault();
    setTitle("");
    setSubject("");
    setPdf(null);
    setError(null);
    setIsLoading(false); // Ensure loading is false when clearing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any existing errors

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Validate all fields first
    if (!title || !subject || !pdf) {
      setError("Please fill in all fields and upload a PDF");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("pdf", pdf);

      const response = await fetch(`${apiUrl}/api/notes`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Failed to create note');
      }

      // Success case
      setTitle("");
      setSubject("");
      setPdf(null);
      setError(null);
      dispatch({ type: "CREATE_NOTE", payload: json });

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdf(file);
    } else {
      setPdf(null);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit} >
      <h3>Add a New Note</h3>

      <label>Note title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={isLoading}
      />

      <label>Subject: </label>
      <input
        type="text"
        onChange={(e) => setSubject(e.target.value)}
        value={subject}
        disabled={isLoading}
      />
      <label>PDF: </label>
      <input
        type="file"
        accept=".pdf"
        className="pdf-input"
        id="pdf-input"
        placeholder="Upload your PDF here"
        onChange={handleFileChange}
        disabled={isLoading}
      />

      <label htmlFor="pdf-input" className="input-label">
        {pdf ? pdf.name : "Upload your PDF here!"}
        {!pdf && <img src={uploadlogo} alt="Upload" className="upload-logo" />}
      </label>

      {isLoading ? (
        <div className="loader-container">
          <Loader
          className="loader"
            color={"#34D399"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={{ opacity: 0, animation: 'fadeIn 1s ease-in forwards' }}
          />
          <p style={{ opacity: 0, animation: 'fadeIn 1s ease-in forwards' }}>Processing your PDF... This may take a minute</p>
          <p className="processing-note" style={{ opacity: 0, animation: 'fadeIn 1s ease-in forwards' }}>We're analyzing your PDF and generating questions. Please don't close this window.</p>
        </div>
      ) : (
        <div className="button-group">
          <button type="submit" disabled={isLoading}>Add Note</button>
          <button type="clear" onClick={handleClear} disabled={isLoading}>Clear</button>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NoteForm;