import React from "react";

const Mcq = ({ mcq, index }) => (
  <section key={index} className="mcq-section">
    <div className="mcq-item">
      <p>{mcq}</p>
    </div>
  </section>
);

export default Mcq;
