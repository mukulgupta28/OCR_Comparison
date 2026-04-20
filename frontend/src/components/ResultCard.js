import React from "react";

function ResultCard({ title, text }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default ResultCard;