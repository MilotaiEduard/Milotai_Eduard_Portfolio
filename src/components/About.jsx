import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import {
  faGithub,
  faLinkedin,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLaptopCode,
  faBriefcase,
  faGraduationCap,
  faCertificate,
  faExpand,
  faTimes,
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
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import styles from "./About.module.css";

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
  const [certificates, setCertificates] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      const querySnapshot = await getDocs(collection(db, "certificates"));
      const certs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        img: doc.data().Img,
      }));

      setCertificates(certs);
    };

    fetchCertificates();
  }, []);

  const openFullscreen = (imgSrc) => {
    setFullscreenImage(imgSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {selectedSection === "Skills" && (
            <div className={styles.skillsGrid}>
              {skills.map((skill) => (
                <div key={skill.name} className={styles.skillCard}>
                  <img src={skill.logo} alt={`${skill.name} Logo`} />
                  <h3>{skill.name}</h3>
                </div>
              ))}
            </div>
          )}
          {selectedSection === "Experience" && (
            <Timeline position="alternate-reverse">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>Freelancer</h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    Self-Employed
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    November 2024 - Present
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>ECHO Winter School</h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    ECHO School x Amber
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    February 18 - 20, 2025
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>
                    Frontend Developer Intern
                  </h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    TUD Group
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    May 2023 - June 2023
                  </p>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          )}
          {selectedSection === "Education" && (
            <Timeline position="alternate-reverse">
              {/* Master's Degree */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>
                    Master’s Degree in Computer Science
                  </h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    Romanian-American University
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    2024 - 2026
                  </p>
                </TimelineContent>
              </TimelineItem>

              {/* Bachelor's Degree */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>
                    Bachelor’s Degree in Computer Science
                  </h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    Romanian-American University
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    2021 - 2024
                  </p>
                </TimelineContent>
              </TimelineItem>

              {/* High School Diploma */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className={styles.timelineTitle}>
                    High School Diploma in Mathematics and Informatics
                  </h3>
                  <h4
                    className={styles.timelineCompany}
                    style={{ color: "#808080" }}
                  >
                    C.A. Rosetti High School
                  </h4>
                  <p
                    className={styles.timelineDate}
                    style={{ color: "#808080" }}
                  >
                    2017 - 2021
                  </p>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          )}

          {selectedSection === "Certificates" && (
            <div className={styles.certificatesGrid}>
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={styles.certificateCard}
                  onClick={() => openFullscreen(certificate.img)}
                >
                  <img src={certificate.img} alt="Certificate" />
                  <FontAwesomeIcon
                    icon={faExpand}
                    className={styles.fullscreenIcon}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Discover More About Me
        </motion.h1>
        <div className={styles.grid}>
          <motion.div
            className={styles.sectionLeft}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
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
                href="https://www.linkedin.com/in/eduardmilotai/"
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
                { name: "Certificates", icon: faCertificate },
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
          </motion.div>
          <motion.div
            className={styles.sectionRight}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </div>

        {fullscreenImage && (
          <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
            <img
              src={fullscreenImage}
              alt="Fullscreen"
              className={styles.fullscreenImage}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.fullscreenClose}
              onClick={closeFullscreen}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default About;
