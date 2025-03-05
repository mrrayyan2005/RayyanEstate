import React from "react";
import "./GetStarted.css";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with RayyanEstate</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your residence soon
          </span>
          <button className="button">
            <a href="mailto:0221ite218@niet.co.in">Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
