import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
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
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setError("Something went wrong. Try again later."));
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
          Have an Idea? Let’s Make It Real
        </motion.h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            autoComplete="off"
          />
          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            autoComplete="off"
          ></textarea>

          {error && <p className={styles.error}>{error}</p>}
          {isSent && (
            <p className={styles.success}>Message sent successfully!</p>
          )}

          <button type="submit" className={styles.button}>
            <FontAwesomeIcon icon={faPaperPlane} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
