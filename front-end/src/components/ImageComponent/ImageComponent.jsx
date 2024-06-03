import React from "react";
import ballonImg from "@assets/images/ballon.png";
import './ImageComponent.css';

function ImageSection() {
  return (
    <div className="left-section">
      <img src={ballonImg} alt="Illustration" className="illustration" />
    </div>
  );
}

export default ImageSection;
