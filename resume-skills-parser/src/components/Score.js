import React from "react";

const Score = ({ score }) => {
  return (
    <div className="score-container">
      <pre>
        Similarity Percentage:{" "}
        <span style={{ color: "#97ffff" }}>{score}%</span>
      </pre>
    </div>
  );
};

export default Score;
