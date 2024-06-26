import React from "react";
import LandingPageImage from "../Assets/LandingPageImage.jpg";
import logo from "../Assets/EchonotesLogo.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import mascot from "../Assets/mascot.jpg";

const LandingPage = () => {
  return (
    <div className="landingpage">
      <section className="hero">
        <img src={LandingPageImage} alt="Header" className="hero-image" />
        <div className="hero-text-container">
          <div className="hero-text">
            <h1>Study Smarter, Recall Better</h1>
            <img src={logo} alt="logo" className="logo"></img>
            <p>
              <strong>Struggling</strong> to acheive good grades? Use our
              one-stop productivity study app that will{" "}
              <strong>unlock your mind</strong> and{" "}
              <strong>free your time</strong>!
            </p>
          </div>
        </div>
      </section>
      <section className="mascot-section">
        <img src={mascot} alt="Mascot" className="mascot" />
        <div className="mascot-bubble">
          <h2 className="mascot-words">
            Welcome to EchoNotes! I am Echo, login to use our website 💙{" "}
          </h2>
          <div className="button-container">
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
