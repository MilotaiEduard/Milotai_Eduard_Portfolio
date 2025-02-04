import { useState } from "react";
import {
  faGithub,
  faLinkedin,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLaptopCode,
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import styles from "./About.module.css";
import Navbar from "./Navbar";

const skills = [
  {
    logo: "/skills/HTML5.png",
    name: "HTML",
  },
  {
    logo: "/skills/CSS3.png",
    name: "CSS",
  },
  {
    logo: "/skills/JavaScript.png",
    name: "JavaScript",
  },
  {
    logo: "/skills/React.png",
    name: "React",
  },
  {
    logo: "/skills/Next.png",
    name: "Next.js",
  },
  {
    logo: "/skills/Tailwind.png",
    name: "Tailwind",
  },
  {
    logo: "/skills/Bootstrap.png",
    name: "Bootstrap",
  },
  {
    logo: "/skills/MaterialUI.png",
    name: "Material UI",
  },
  {
    logo: "/skills/PHP.png",
    name: "PHP",
  },
  {
    logo: "/skills/MySQL.png",
    name: "MySQL",
  },
  {
    logo: "/skills/MongoDB.png",
    name: "MongoDB",
  },
  {
    logo: "/skills/Firebase.png",
    name: "Firebase",
  },
  {
    logo: "/skills/Supabase.png",
    name: "Supabase",
  },
  {
    logo: "/skills/Vite.png",
    name: "Vite",
  },
  {
    logo: "/skills/Vercel.png",
    name: "Vercel",
  },
  {
    logo: "/skills/Git.png",
    name: "Git",
  },
];

function About() {
  const [selectedSection, setSelectedSection] = useState("Skills");

  const renderContent = () => {
    switch (selectedSection) {
      case "Skills":
        return (
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillCard}>
                <img src={skill.logo} alt={`${skill.name} Logo`} />
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        );
      case "Experience":
        return (
          <Timeline position="alternate-reverse">
            {/* Freelancer Experience */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3>Freelancer</h3>
                <h4 style={{ color: "#808080" }}>Self-Employed</h4>
                <p style={{ color: "#808080" }}>October 2024 - Present</p>
              </TimelineContent>
            </TimelineItem>

            {/* Frontend Developer Intern Experience */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
              </TimelineSeparator>
              <TimelineContent>
                <h3>Frontend Developer Intern</h3>
                <h4 style={{ color: "#808080" }}>TUD Group</h4>
                <p style={{ color: "#808080" }}>May 2023 - June 2023</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        );
      case "Education":
        return (
          <Timeline position="alternate-reverse">
            {/* Master's Degree */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3>Master’s Degree in Computer Science</h3>
                <h4 style={{ color: "#808080" }}>
                  Romanian-American University
                </h4>
                <p style={{ color: "#808080" }}>2024 - 2026</p>
              </TimelineContent>
            </TimelineItem>

            {/* Bachelor's Degree */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h3>Bachelor’s Degree in Computer Science</h3>
                <h4 style={{ color: "#808080" }}>
                  Romanian-American University
                </h4>
                <p style={{ color: "#808080" }}>2021 - 2024</p>
              </TimelineContent>
            </TimelineItem>

            {/* High School Diploma */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" />
              </TimelineSeparator>
              <TimelineContent>
                <h3>High School Diploma in Mathematics and Informatics</h3>
                <h4 style={{ color: "#808080" }}>C.A.Rosetti High School</h4>
                <p style={{ color: "#808080" }}>2017 - 2021</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        );
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
            <img src="/avatar.png" />
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
              {[
                { name: "Skills", icon: faLaptopCode },
                { name: "Experience", icon: faBriefcase },
                { name: "Education", icon: faGraduationCap },
              ].map((item) => (
                <button
                  key={item.name}
                  className={`${styles.menuButton} ${
                    selectedSection === item.name ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSection(item.name)}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={styles.menuIcon}
                    style={{
                      marginRight: "5px",
                      width: "24px",
                    }}
                  />
                  {"  "}
                  {item.name}
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
