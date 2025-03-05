import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import {HiChatBubbleBottomCenter} from 'react-icons/hi2'
const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We are always ready to help by providing the best services for you. We
            believe a good place to live can make your life better.
          </span>

          <div className="flexColCenter contactSingle">
            <div className="flexStart" style={{ gap: '1.5rem' }}>
              <div className="flexCenter icon">
                <MdCall size={25} />
              </div>
              <div className="flexColStart detail" style={{ gap: '0.5rem' }}>
                <span className="primaryText" style={{ fontSize: '1.2rem' }}>Call Us</span>
                <span className="secondaryText">+91 9897700760</span>
              </div>
            </div >
            <a href="tel:+919897700760" className="flexCenter button" style={{ 
    textDecoration: 'none', 
    color: 'white', 
    backgroundColor: '#181818',  // Dark Grey
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    fontWeight: '600'
  }}>
              Call now
            </a>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="Contact" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;