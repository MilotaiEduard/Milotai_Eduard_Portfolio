import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faUser,
  faEnvelope,
  faCommentDots,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: "Error",
        text: "All fields are required!",
        icon: "error",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#1e90ff",
      });
      return;
    }

    emailjs
      .send(
        "service_2q8x134",
        "template_lkqv4jt",
        formData,
        "ADOTUcWKAKCnz-I0F"
      )
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Message sent successfully!",
          icon: "success",
          background: "#060b18",
          color: "#fff",
          confirmButtonColor: "#1e90ff",
        });

        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() =>
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Try again later.",
          icon: "error",
          background: "#060b18",
          color: "#fff",
          confirmButtonColor: "#1e90ff",
        })
      );
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
          Let’s Build Something Great Together
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className={styles.form}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
            />
          </div>

          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
            />
          </div>

          <div className={styles.textareaWrapper}>
            <FontAwesomeIcon
              icon={faCommentDots}
              className={styles.textareaIcon}
            />
            <textarea
              name="message"
              placeholder="Message *"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
              autoComplete="off"
            ></textarea>
          </div>

          <button type="submit" className={styles.button}>
            <FontAwesomeIcon icon={faPaperPlane} className={styles.planeIcon} />
            Send Message
          </button>

          <hr className={styles.separator} />
          <h3 className={styles.contactInfo}>
            <span className={styles.line}></span>Let’s Connect
          </h3>

          <div className={styles.contactItem}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.contactIcon}
            />
            <span>Bucharest, Romania</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
            <span>0763386962</span>
          </div>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
            <a
              href="mailto:eduard_milotai@yahoo.com"
              className={styles.contactLink}
            >
              <span>eduard_milotai@yahoo.com</span>
            </a>
          </div>

          <div className={styles.socialItems}>
            <a
              href="https://github.com/MilotaiEduard"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/eduardmilotai/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default Contact;
