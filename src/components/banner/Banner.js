import React from "react";
import "./banner.css";

const Banner = ({ titleTop, titleBottom, text, image, children }) => {
  return (
    <div className="ms-banner">
      <div>
        <div className="row">
          <div className="online-banner">
            <div className="ms_banner_img">
              <img src={image} alt="SoundCloud Logo" />
            </div>
            <div className="ms_banner_text">
              <h1>{titleTop} </h1>
              <h1>{titleBottom}</h1>
              <p>
                {text}
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Banner;
