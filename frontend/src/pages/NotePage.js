// require("dotenv").config();
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import "../Styles/NotePage.css";

import Mcq from "../Components/Mcq";
import FlashCard from "../Components/FlashCard";
const apiUrl = process.env.REACT_APP_API_URL;

const NotePage = () => {
  const { noteId } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [flashcards, setFlashCards] = useState([]);
  const [showFlashCards, setShowFlashCards] = useState(false);

  const displayMCQS = () => {
    setShowFlashCards(false);
  };

  const displayFlashCards = () => {
    setShowFlashCards(true);
  };

  useEffect(() => {
    const fetchNote = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${apiUrl}/api/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        } else {
          setNote(json);
          setMcqs(json.mcqText);
          setFlashCards(json.flashCardText);
        }
      } catch (err) {
        setError("Failed to fetch note");
      }
    };

    fetchNote();
  }, [noteId, user]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  const pdfData = new Uint8Array(note.pdf.data.data);
  const pdfDataBlob = new Blob([pdfData], { type: note.pdf.contentType });
  const pdfDataUrl = URL.createObjectURL(pdfDataBlob);
  return (
    <div className="note-page">
      <h2>{note.title}</h2>
      <p>
        <strong>Subject:</strong> {note.subject}
      </p>
      {note.pdf && (
        <object
          data={pdfDataUrl}
          type={note.pdf.contentType}
          width="70%"
          height="800px"
        >
          <p>
            Your browser does not support PDFs. Please download the PDF to view
            it: <a href={pdfDataUrl}>Download PDF</a>.
          </p>
        </object>
      )}

      {/* Toggle button */}
      <div className="generated-content">
        <div className="displayButtons">
          <button
            className={`displayButton ${
              showFlashCards === false ? "active" : ""
            }`}
            onClick={displayMCQS}
          >
            MCQS
          </button>
          <button
            className={`displayButton ${
              showFlashCards === true ? "active" : ""
            }`}
            onClick={displayFlashCards}
          >
            Flash Cards
          </button>

          {/* display either flashcards or mcq */}
        </div>
        {showFlashCards ? (
          <div className="flashcards-container">
            <h3>Generated Flash Cards:</h3>

            {flashcards.length > 0 ? (
              flashcards.map((flashcard, index) => (
                <FlashCard
                  key={index}
                  flashcard={flashcard}
                  index={index}
                ></FlashCard>
              ))
            ) : (
              <p> Flash Cards generating...</p>
            )}
          </div>
        ) : (
          <div className="mcq-container">
            <h3>Generated MCQs:</h3>

            {mcqs.length > 0 ? (
              mcqs.map((mcq, index) => (
                <Mcq key={index} mcq={mcq} index={index} />
              ))
            ) : (
              <p>MCQs generating...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
