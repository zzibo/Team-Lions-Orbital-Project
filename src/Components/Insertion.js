import React, { useState } from "react";
import "./Insertion.css";
import uploadlogo from "../Assets/UploadLogo.png";
import UploadPopup from "./UploadPopup";

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
            <p className="no-pdf-error">You must insert a PDF you dumbass!</p>
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
        ></UploadPopup>
      )}
    </>
  );
}

export default Insertion;
