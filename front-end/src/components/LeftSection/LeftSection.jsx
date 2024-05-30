import React from "react";
import ballonImg from "../../img/ballon.png";
import "./LeftSection.css";

function LeftSection() {
  return (
    <div className="left-section">
      <img src={ballonImg} alt="Illustration" className="illustration" />
    </div>
  );
}

export default LeftSection;
