// FlashCard.js
import React, { useState, useEffect } from "react";
import "./FlashCard.css";

const FlashCard = ({ flashcard, index }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const content = flashcard.split(";");
    setQuestion(content[0]);
    setAnswer(content[1]);
  }, [flashcard]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`flashcard-item ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard-content">
        <div className="flashcard-front">
          <h4>Flashcard {index + 1} </h4>
          <p className="question"> Q: {question}</p>
        </div>
        <div className="flashcard-back">
          <h4>Flashcard {index + 1} </h4>
          <p className="answer">A: {answer}</p>
        </div>
      </div>
    </div>
  );
};
export default FlashCard;
