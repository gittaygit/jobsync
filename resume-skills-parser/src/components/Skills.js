import React from "react";
import "../styles/Skills.css";

const Skills = ({ skillsList }) => {
  return (
    <div className="skills-container">
      <div className="skills-list">
        {skillsList.map((skill, index) => {
          return <strong key={index}>{skill}</strong>;
        })}
      </div>
    </div>
  );
};

export default Skills;
