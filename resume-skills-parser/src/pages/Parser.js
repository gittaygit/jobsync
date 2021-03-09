import React, { useState, useEffect, useRef } from "react";
import { parser } from "../api/api";
import lottie from "lottie-web";
import "../styles/Parser.css";
import Skills from "../components/Skills";
import Score from "../components/Score";
import { findSimilarities } from "../utils/FindSimilarities";

const Parser = () => {
  const [resumeSkillsList, setResumeSkillsList] = useState([]);
  const [jobSkillsList, setJobSkillsList] = useState([]);
  const animate_loading = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }
    lottie.loadAnimation({
      container: animate_loading.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./animate_loading.json"),
    });
  }, [loading]);

  const parseText = async () => {
    const resumeSkills = document.getElementById("resumeInput").value;
    const jobSkills = document.getElementById("jobInput").value;
    if (resumeSkills && jobSkills) {
      setLoading(true);
      const resp_resume = await parser(resumeSkills);
      const resp_job = await parser(jobSkills);
      setLoading(false);
      setResumeSkillsList(resp_resume);
      setJobSkillsList(resp_job);
    } else {
      console.log("Please input resume skills and job requirements");
      return;
    }
  };

  return (
    <div className="parser-page-container">
      <div className="header-container">
        <h1>
          <i className="fas fa-search"></i> Job Sync
        </h1>
      </div>
      <div className="text-area-wrapper">
        <div className="text-area">
          <h2>Paste Resume</h2>
          <textarea
            className="userinput"
            name="userInput"
            id="resumeInput"
            type="text"
            rows="10"
            required
          />
        </div>
        <div className="text-area">
          <h2>Paste Job Requirements</h2>
          <textarea
            className="userinput"
            name="userInput"
            id="jobInput"
            type="text"
            rows="10"
            required
          />
        </div>
      </div>
      <div className="button-div">
        <button id="submit" className="btn" onClick={parseText}>
          Compare Skills
        </button>
      </div>
      <div className="loading-animation">
        <span>
          {loading && (
            <div className="animate-loading" ref={animate_loading}></div>
          )}
        </span>
      </div>
      {resumeSkillsList.length !== 0 || jobSkillsList.length !== 0 ? (
        <div className="skills-section-wrapper">
          <div className="resume-skills">
            <h2>Results from Resume</h2>
            {resumeSkillsList.length !== 0 ? (
              <Skills skillsList={resumeSkillsList} />
            ) : (
              <span className="nothing-found-text">Nothing found</span>
            )}
          </div>
          <div className="job-skills">
            <h2>Results from Requirements</h2>
            {jobSkillsList.length !== 0 ? (
              <Skills skillsList={jobSkillsList} />
            ) : (
              <span className="nothing-found-text">Nothing found</span>
            )}
          </div>
        </div>
      ) : null}
      <div className="final-score">
        <Score score={findSimilarities(resumeSkillsList, jobSkillsList)} />
      </div>
    </div>
  );
};

export default Parser;
