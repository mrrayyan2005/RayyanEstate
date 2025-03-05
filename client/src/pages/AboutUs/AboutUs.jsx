// AboutUs.jsx
import "./AboutUs.css";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="about-us-wrapper">
      <div className="paddings innerWidth flexCenter about-us-container">
        <div className="about-us-left">
          <motion.h1 
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
          >
            About Us
          </motion.h1>
          <p className="secondaryText">
            Welcome to <span>RayyanEstate</span>, your trusted partner in real estate. We specialize in
            helping individuals and families find their dream homes and schedule
            hassle-free property visits. Our mission is to make home searching effortless
            and enjoyable.
          </p>
          <p className="contact-details">
            📞 <a href="tel:9897799760">Contact: 9897799760</a> <br /><br />
            ✉️ <a href="mailto:mr.rayyan2005@gmail.com">Email: mr.rayyan2005@gmail.com</a>
          </p>
        </div>
        <motion.div 
          initial={{ x: "7rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "ease-in" }}
          className="about-us-right"
        >
          <img src="./rayyan1.jpg" alt="Rayyan" className="profile-pic" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
