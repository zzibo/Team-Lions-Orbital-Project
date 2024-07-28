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
    // Check if options are changing on every render
    console.log("Options:", options);

    const adjustedOptions = options.map((option) => {
      if (option.startsWith("*")) {
        return option.slice(1); // Return the option without the *
      }
      return option;
    });

    // Avoid unnecessary state updates by checking if adjustedOptions actually changed
    setParsedOptions((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(adjustedOptions)) {
        return adjustedOptions;
      }
      return prev;
    });

    const correctAnswer = options.find((option) => option.startsWith("*"));
    if (correctAnswer) {
      setAnswer((prev) => {
        const newAnswer = correctAnswer.slice(1);
        if (prev !== newAnswer) {
          return newAnswer;
        }
        return prev;
      });
    }
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
