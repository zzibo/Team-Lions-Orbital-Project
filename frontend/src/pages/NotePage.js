// require("dotenv").config();
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
import "./NotePage.css";
import { OpenAI } from "openai";

import Mcq from "../Components/Mcq";

const NotePage = () => {
  const { noteId } = useParams();
  const { user } = useAuthContext();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    const fetchNote = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        } else {
          setNote(json);
        }
      } catch (err) {
        setError("Failed to fetch note");
      }
    };

    fetchNote();
  }, [noteId, user]);

  useEffect(() => {
    const generateMCQs = async () => {
      if (!note || !apiKey) return;
      const openai = new OpenAI({ apiKey });

      try {
        //get response from chatgpt
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `Generate 10 single multiple-choice questions from this text extracted from its PDF: ${note.pdfText}. 
              The question generated should come from the text and serves as active recall questions to test me
              Make sure I can see each question clearly and demarkate the correct answer
              Please create all quiz questions using the following format. Label the correct answer with a symbol.
              What is 2+3?
              a) 6
              b) 1
              *c) 5
              d) 10
              Make sure no question sent is duplicated, there is no need for question number but seperate every question with |`,
            },
          ],
        });
        const qns = response.choices.map((choice) => choice.message.content);
        console.log(qns);
        //makes a list of all the qns
        const newMcqs = qns.map((q) => q.split("|"));
        console.log(newMcqs);
        setMcqs(newMcqs);
      } catch (error) {
        console.error("Error generating MCQs:", error);
        setMcqs(["Failed to generate MCQs"]);
      }
    };

    generateMCQs();
  }, [note, apiKey]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  const pdfData = new Uint8Array(note.pdf.data.data).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );

  const pdfDataUrl = `data:${note.pdf.contentType};base64,${btoa(pdfData)}`;

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
          width="100%"
          height="800px"
        >
          <p>
            Your browser does not support PDFs. Please download the PDF to view
            it: <a href={pdfDataUrl}>Download PDF</a>.
          </p>
        </object>
      )}
      <div className="mcq-container">
        <h3>Generated MCQs:</h3>
        {mcqs.length > 0 ? (
          mcqs[0].map((mcq, index) => (
            <Mcq key={index} mcq={mcq} index={index} />
          ))
        ) : (
          <p>MCQs generating...</p>
        )}
      </div>
    </div>
  );
};

export default NotePage;
