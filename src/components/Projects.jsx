import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className={styles.projectCard}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.Img[0]} // Prima imagine
                  alt={project.Title}
                />
                <CardContent>
                  <Typography variant="h5">{project.Title}</Typography>
                  <Typography variant="body2" className={styles.description}>
                    {project.Description.length > 100
                      ? project.Description.substring(0, 100) + "..."
                      : project.Description}
                  </Typography>
                  <div className={styles.techStack}>
                    {project.Technologies.map((tech, idx) => (
                      <span key={idx} className={styles.techItem}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    <Button
                      size="small"
                      href={project.LiveDemo}
                      target="_blank"
                      className={styles.liveDemo}
                    >
                      Live Demo
                    </Button>
                    <Button
                      size="small"
                      href={project.GitHub}
                      target="_blank"
                      className={styles.github}
                    >
                      GitHub
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleOpenDialog(project)}
                      className={styles.details}
                    >
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="md"
          >
            <div className={styles.dialogContent}>
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
                <Typography variant="h4">{selectedProject.Title}</Typography>
                <Typography variant="body1">
                  {selectedProject.Description}
                </Typography>
                <div className={styles.dialogTechStack}>
                  {selectedProject.Technologies.map((tech, idx) => (
                    <span key={idx} className={styles.techItem}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.dialogActions}>
                  <Button
                    size="small"
                    href={selectedProject.LiveDemo}
                    target="_blank"
                    className={styles.liveDemo}
                  >
                    Live Demo
                  </Button>
                  <Button
                    size="small"
                    href={selectedProject.GitHub}
                    target="_blank"
                    className={styles.github}
                  >
                    GitHub
                  </Button>
                </div>
                <Button
                  size="small"
                  onClick={handleCloseDialog}
                  className={styles.closeDialog}
                >
                  Close
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Projects;
