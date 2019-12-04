import React from "react";
import "./message.css";
import Button from "./../button/Button";

const Message = ({ heading, subheading, icon, buttonText, buttonAction }) => {
  return (
    <div className="ms_upload_wrapper">
      <div className="ms_upload_box">
        <h2>{heading}</h2>
        <div className="upload-icon">
        {icon}
        </div>
        <p className="muted-text">{subheading}</p>
        {buttonText ? <div className="ms_upload_btn">
          <Button>add music</Button>
        </div> : null}
      </div>
    </div>
  );
};

export default Message;
