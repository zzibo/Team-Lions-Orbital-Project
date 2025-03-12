import React from "react";
import "../Styles/AboutUs.css";
import teamMember1Photo from "../Assets/teamMember1.jpg";
import teamMember2Photo from "../Assets/teamMember2.jpg";

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p className="intro-text">
        Welcome to our About Us page! Our team consists of dedicated
        professionals who are passionate about technology and design.
      </p>

      <div className="team-member">
        <img
          src={teamMember1Photo}
          alt="Team Member 1"
          className="team-photo-a"
        />
        <div className="member-info">
          <h2>Aayush</h2>
          <p className="info">
            Aayush is a Year 1 Business Analytics student at NUS.
          </p>
        </div>
      </div>

      <div className="team-member">
        <img
          src={teamMember2Photo}
          alt="Team Member 2"
          className="team-photo-z"
        />
        <div className="member-info">
          <h2>Zibo</h2>
          <p className="info">
            Zibo is a Year 1 Computer Science student at NUS
          </p>
        </div>
      </div>

      <div className="additional-info">
        <h2>Our Mission</h2>
        <p className="placeholder-text">
          Our mission is to revolutionize the way students learn by developing
          an app that allows students to easily produce their own study
          material. By leveraging techniques such as active recall and spaced
          repetition, we aim to enhance learning efficiency and engagement. We
          are committed to providing an enjoyable and gamified learning
          experience, complete with networking features and incentives, to
          encourage regular study and make learning more accessible and
          effective for all students.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
