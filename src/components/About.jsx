import { useState } from "react";
import {
  faGithub,
  faLinkedin,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./About.module.css";
import Navbar from "./Navbar";

function About() {
  const [selectedSection, setSelectedSection] = useState("Skills");

  const renderContent = () => {
    switch (selectedSection) {
      case "Skills":
        return <p>My skills include React, JavaScript, CSS, and more.</p>;
      case "Experience":
        return <p>I have experience working on web development projects...</p>;
      case "Education":
        return <p>I completed my studies in Economic Informatics...</p>;
      case "Resume":
        return <p>Download my resume to learn more about my experience.</p>;
      default:
        return <p>Select a section to view its content.</p>;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Discover More About Me</h1>
        <div className={styles.grid}>
          <div className={styles.sectionLeft}>
            <h2>Eduard Milotai</h2>
            <h4>Frontend Developer</h4>
            <div className={styles.socialContainer}>
              <a
                href="https://github.com/MilotaiEduard"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/eduard-milotai-25b048296/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialButton}
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="mailto:eduard_milotai@yahoo.com"
                className={styles.socialButton}
              >
                <FontAwesomeIcon icon={faYahoo} />
              </a>
            </div>
            <hr />
            <div className={styles.menu}>
              {["Skills", "Experience", "Education", "Resume"].map((item) => (
                <button
                  key={item}
                  className={`${styles.menuButton} ${
                    selectedSection === item ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSection(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.sectionRight}>{renderContent()}</div>
        </div>
      </div>
    </>
  );
}

export default About;
