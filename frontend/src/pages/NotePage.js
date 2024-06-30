import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'
import './NotePage.css'

const NotePage = () => {
    const { noteId } = useParams()
    const { user } = useAuthContext()
    const [note, setNote] = useState(null)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchNote = async () => {
        if (!user) return;
  
        try {
          const response = await fetch(`/api/notes/${noteId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          const json = await response.json();
  
          if (!response.ok) {
            setError(json.error);
          } else {
            setNote(json);
          }
        } catch (err) {
          setError('Failed to fetch note');
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
  
    const pdfData = new Uint8Array(note.pdf.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
  
    const pdfDataUrl = `data:${note.pdf.contentType};base64,${btoa(pdfData)}`;
  
    return (
      <div className="note-page">
        <h2>{note.title}</h2>
        <p><strong>Subject:</strong> {note.subject}</p>
        {note.pdf && (
          <object data={pdfDataUrl} type={note.pdf.contentType} width="100%" height="800px">
            <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={pdfDataUrl}>Download PDF</a>.</p>
          </object>
        )}
      </div>
    );
  };
  
  export default NotePage