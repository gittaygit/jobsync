import React, { useState, useEffect, useRef } from "react";
import { parser } from "../api/api";
import lottie from "lottie-web";
import "../styles/Parser.css";
import Skills from "../components/Skills";

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
      console.log(resp_resume);
      console.log(resp_job);
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
        <h1>Job Sync</h1>
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
            <Skills skillsList={resumeSkillsList} />
          </div>
          <div className="job-skills">
            <h2>Results from Requirements</h2>
            <Skills skillsList={jobSkillsList} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Parser;

/* <form
className="file-upload"
action="http://127.0.0.1:5000/api/parse/skills"
method="POST"
encType="multipart/form-data"
>
<input
  type="file"
  name="fileUpload"
  id="fileUpload"
  accept=".pdf"
  required
/>
<button id="upload" type="submit" className="btn btn-success mb-2">
  Submit
</button>
</form> */

// const file = document.getElementById("fileUpload").files[0];
//     if (file) {
//       let formData = new FormData();
//       formData.append("file", file);
//       console.log(formData);

//       const resp = await axios.post("/api/parse/skills", {
//         headers: { "Content-Type": "multipart/form-data" },
//         body: formData,
//       });
//       console.log(resp.data);
//     } else {
//       console.log("nothing there");
//       return;
//     }
