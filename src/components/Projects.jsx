import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faBootstrap,
  faPhp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faExternalLinkAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Projects.module.css";

const technologyIcons = {
  HTML: faHtml5,
  CSS: faCss3Alt,
  JavaScript: faJs,
  React: faReact,
  Bootstrap: faBootstrap,
  PHP: faPhp,
  MySQL: faDatabase,
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const techStackRefs = useRef([]);

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

  const handleMouseDown = (e, index) => {
    const container = techStackRefs.current[index];
    container.isDragging = true;
    container.startX = e.pageX - container.offsetLeft;
    container.initialScrollLeft = container.scrollLeft;
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e, index) => {
    const container = techStackRefs.current[index];
    if (!container.isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - container.startX;
    container.scrollLeft = container.initialScrollLeft - walk;
  };

  const handleMouseUp = (index) => {
    const container = techStackRefs.current[index];
    container.isDragging = false;
    container.style.cursor = "grab";
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
            >
              <div className={styles.imageWrapper}>
                <img
                  src={project.Img[0]}
                  alt={project.Title}
                  className={styles.projectImage}
                />
                {project.isRealClient && (
                  <span className={styles.realClientTag}>Client Project</span>
                )}
                {project.GameJam && (
                  <span className={styles.gameJamTag}>Game Jam</span>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.Title}</h3>
                <p className={styles.projectDescription}>
                  {project.Description.length > 100
                    ? project.Description.substring(0, 100) + "..."
                    : project.Description}
                </p>
                <div
                  className={styles.techStack}
                  ref={(el) => (techStackRefs.current[index] = el)}
                  onMouseDown={(e) => handleMouseDown(e, index)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseUp={() => handleMouseUp(index)}
                  onMouseLeave={() => handleMouseUp(index)}
                >
                  {project.Technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techItem}>
                      <FontAwesomeIcon
                        icon={technologyIcons[tech]}
                        className={styles.techIcon}
                      />
                      {tech}
                    </span>
                  ))}
                </div>
                <hr className={styles.separator} />
                <div className={styles.cardActions}>
                  <div className={styles.leftActions}>
                    {project.LiveDemo ? (
                      <a
                        href={project.LiveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButton}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    ) : (
                      <p className={styles.noDemo}>Live Demo Unavailable</p>
                    )}
                    {project.GitHub ? (
                      <a
                        href={project.GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButton}
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    ) : (
                      <p className={styles.noGitHub}>Private Repository</p>
                    )}
                  </div>
                  <button
                    className={styles.detailsButton}
                    onClick={() => handleOpenDialog(project)}
                  >
                    Details <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dialog */}
        {selectedProject && (
          <div className={styles.dialogOverlay} onClick={handleCloseDialog}>
            <div
              className={styles.dialogContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeDialogButton}
                onClick={handleCloseDialog}
              >
                &times;
              </button>

              {/* Container pentru imagine și butoane */}
              <div className={styles.dialogImageContainer}>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  modules={[Navigation]}
                >
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

                {/* Butoane de navigare poziționate corect */}
                <button className={`swiper-button-prev ${styles.swiperButton}`}>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className={styles.buttonPrevious}
                  />
                </button>
                <button className={`swiper-button-next ${styles.swiperButton}`}>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={styles.buttonNext}
                  />
                </button>
              </div>

              <div className={styles.dialogDetails}>
                <h3 className={styles.dialogTitle}>{selectedProject.Title}</h3>
                <p className={styles.dialogDescription}>
                  {selectedProject.Description}
                </p>
                <div className={styles.dialogTechStack}>
                  {selectedProject.Technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techItem}>
                      <FontAwesomeIcon
                        icon={technologyIcons[tech]}
                        className={styles.techIcon}
                      />
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.dialogActions}>
                  {selectedProject.LiveDemo ? (
                    <a
                      href={selectedProject.LiveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  ) : (
                    <p className={styles.noDemo}>Live Demo Unavailable</p>
                  )}
                  {selectedProject.GitHub ? (
                    <a
                      href={selectedProject.GitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  ) : (
                    <p className={styles.noGitHub}>Private Repository</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
