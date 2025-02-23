import { motion } from "framer-motion";
import Navbar from "./Navbar";
import styles from "./Contact.module.css";

function Contact() {
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
          Contact Me
        </motion.h1>
      </div>
    </div>
  );
}

export default Contact;
