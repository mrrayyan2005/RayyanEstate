import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./image1.png" alt="" width={150} />
          <span id="sec">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
  <span className="primaryText">Information</span>
  <span id="sec1">
    📞 <a href="tel:+919897700760">+91 9897700760</a>
  </span>
  <span id="sec1">
    ✉️ <a href="mailto:mr.rayyan2005@gmail.com">mr.rayyan2005@gmail.com</a>
  </span>
  <div id="sec1" className="flexCenter f-menu">
    <NavLink to="/aboutus">About Us</NavLink>
  </div>
</div>
</div>
    </div>
  );
};

export default Footer;
