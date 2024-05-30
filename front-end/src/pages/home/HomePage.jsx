import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import LeftSection from "../../components/LeftSection/LeftSection";

function HomePage() {
  return (
    <div className="App">
      <LeftSection />
      <div className="right-section">
        <h1>O banco de dados inteligente e ágil!</h1>
        <p>Conectando empresas & profissionais qualificados.</p>
        <div className="button-container">
          <Link to="/login" className="app-button primary">
            Entrar
          </Link>
          <Link to="/login" className="app-button secondary">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
