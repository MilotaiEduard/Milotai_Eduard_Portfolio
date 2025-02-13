import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectData = querySnapshot.docs.map((doc) => doc.data());
      setProjects(projectData);
    };

    fetchProjects();
  }, []);

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Crafting Ideas Into Reality
        </motion.h1>

        <div className={styles.cardsGrid}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={styles.projectCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => handleOpenDialog(project)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={project.Img[0]} // Prima imagine
                  alt={project.Title}
                  className={styles.projectImage}
                />
                {/* <span className={styles.imageCount}>
                  1 / {project.Img.length}
                </span> */}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.Title}</h3>
                <p className={styles.projectDescription}>
                  {project.Description.length > 100
                    ? project.Description.substring(0, 100) + "..."
                    : project.Description}
                </p>
                <div className={styles.techStack}>
                  {project.Technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techItem}>
                      {tech}
                    </span>
                  ))}
                </div>
                <hr className={styles.separator} />
                <div className={styles.cardActions}>
                  <div className={styles.leftActions}>
                    <a
                      href={project.LiveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
                    </a>
                    <a
                      href={project.GitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faGithub} />{" "}
                    </a>
                  </div>
                  <button className={styles.detailsButton}>
                    Details <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedProject && (
          <div className={styles.dialogOverlay} onClick={handleCloseDialog}>
            <div
              className={styles.dialogContent}
              onClick={(e) => e.stopPropagation()}
            >
              <Swiper spaceBetween={10} slidesPerView={1}>
                {selectedProject.Img.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Slide ${index}`}
                      className={styles.dialogImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={styles.dialogDetails}>
                <h3 className={styles.dialogTitle}>{selectedProject.Title}</h3>
                <p className={styles.dialogDescription}>
                  {selectedProject.Description}
                </p>
                <div className={styles.dialogTechStack}>
                  {selectedProject.Technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techItem}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.dialogActions}>
                  <a
                    href={selectedProject.LiveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.GitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                  >
                    GitHub
                  </a>
                </div>
                <button
                  className={styles.closeDialogButton}
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
