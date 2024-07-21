import React, { useState, useEffect } from "react";
import "./Mcq.css";

const Mcq = ({ mcq, index }) => {
  const parts = mcq.split(";");
  const qns = parts[0];
  const options = parts.slice(1);
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [parsedOptions, setParsedOptions] = useState([]);

  useEffect(() => {
    const adjustedOptions = options.map((option) => {
      if (option.startsWith("*")) {
        setAnswer(option.slice(1)); // Remove the * from the correct answer
        return option.slice(1); // Return the option without the *
      }
      return option;
    });
    // Set the options without the * in the correct answer
    setParsedOptions(adjustedOptions);
  }, [options]);

  useEffect(() => {
    if (selected) {
      if (selected === answer) {
        setResult("Correct!");
      } else {
        setResult("Wrong!");
      }
    }
  }, [selected, answer]);

  const selectOption = (optionIdx) => {
    const chosen = parsedOptions[optionIdx];
    setSelected(chosen);
  };

  return (
    <section key={index} className="mcq-section">
      <div className="mcq-item">
        <p>
          {index + 1}. {qns}
        </p>
        <div className="answer-container">
          {parsedOptions.map((option, optionIdx) => (
            <button
              key={optionIdx}
              onClick={() => selectOption(optionIdx)}
              className={selected === option ? "selected" : ""}
            >
              {" "}
              {option}{" "}
            </button>
          ))}
        </div>
        {result && (
          <p
            className={
              result === "Correct!" ? "correct-result" : "incorrect-result"
            }
          >
            Your answer: {selected} is {result}
          </p>
        )}
      </div>
    </section>
  );
};

export default Mcq;
