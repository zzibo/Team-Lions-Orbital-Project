import { useState } from "react";
import "./UploadPopup.css";

function UploadPopup({ onClose, onCreate }) {
  const [Title, setTitle] = useState("");
  const [Subject, setSubject] = useState("");

  return (
    <div class="uploadpopup-container">
      <div className="popup-content">
        <button className="exit-button" onClick={() => onClose()}>
          {" "}
          X{" "}
        </button>
        <h3 className="popup-text">You dont tell me the name how I upload!</h3>
        <div className="textarea">
          <p className="popup-text">Title</p>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p className="popup-text">Subject </p>
          <input
            type="text"
            value={Subject}
            onChange={(e) => setSubject(e.target.value)}
          ></input>
          <button
            className="create-button"
            onClick={() => {
              //disallow blank inputs
              if (Title.trim() === "" || Subject.trim() === "") {
                return;
              } else {
                onCreate(Title, Subject);
                onClose();
              }
            }}
          >
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPopup;
