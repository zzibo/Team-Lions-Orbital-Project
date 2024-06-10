function NotesStorage({ note/*, handleRemoveNote*/ }) {
  console.log("Notes array:", note);

  //<button className="delete-button" onClick={() => handleRemoveNote(note._id)}>delete</button> 

  return (
    <div>
      <div className="notes-container">
        <h4>{note.title}</h4>
        <p><strong>Subject: </strong>{note.subject}</p>
        <p><strong>pdf: </strong>{note.body}</p>
        <p>{note.createdAt}</p>
      </div>
    </div>
  );
}

export default NotesStorage;
