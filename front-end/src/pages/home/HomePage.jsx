import React from "react";
import "./HomePage.css";
import LeftSection from "@components/ImageComponent/ImageComponent";
import HomeSection from "@components/HomeSection/HomeSection"
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <LeftSection />
      <HomeSection />
    </div>
  );
}

export default HomePage;
