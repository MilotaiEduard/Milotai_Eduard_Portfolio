import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFilePdf, faCode } from "@fortawesome/free-solid-svg-icons";
import Typewriter from "typewriter-effect";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const particlesInit = async (main) => {
    try {
      console.log("Particles initialization started.");
      await loadFull(main);
      console.log("Particles successfully initialized.");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  };

  const particlesLoaded = (container) => {
    console.log("Particles loaded:", container);
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            particles: {
              number: {
                value: 125,
                density: {
                  enable: true,
                  area: 800,
                },
              },
              color: {
                value: "#ffffff",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.8,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                },
              },
              size: {
                value: 3,
                random: true,
              },
              move: {
                enable: true,
                speed: 0.2,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
            },
            detectRetina: true,
          }}
        />
        <div className={styles.content}>
          <div className={styles.left}>
            <h1 className={styles.title}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                My name is Eduard Milotai and I&apos;m a
              </motion.div>
              <motion.span
                className={styles.highlight}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    deleteSpeed: 50,
                    delay: 100,
                    strings: [
                      `<span class="${styles.gradientText}">Frontend Developer</span>`,
                      `<span class="${styles.gradientText}">Web Developer</span>`,
                      `<span class="${styles.gradientText}">Freelancer</span>`,
                    ],
                  }}
                />
              </motion.span>
            </h1>

            <motion.div
              className={styles.homeButtons}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              <a href="/Milotai_Eduard_CV.pdf" download>
                <button className={styles.cvButton}>
                  <FontAwesomeIcon icon={faFilePdf} /> <b>Download CV</b>
                </button>
              </a>
              <a>
                <button
                  className={styles.projectsButton}
                  onClick={() => navigate("/projects")}
                >
                  <FontAwesomeIcon icon={faCode} /> <b>View Projects</b>
                </button>
              </a>
            </motion.div>
          </div>
          <motion.div
            className={styles.right}
            whileHover={{ scale: 1.1 }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <DotLottieReact src="/Animation.lottie" loop autoplay />
          </motion.div>
        </div>

        <div className={styles.socials}>
          <motion.a
            href="https://github.com/MilotaiEduard"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialButton}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <FontAwesomeIcon icon={faGithub} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/eduardmilotai/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialButton}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </motion.a>
        </div>
      </div>
    </>
  );
}

export default Home;
