import React from "react";
import { Link } from "react-router-dom";
import "./HomeSection.css";

function HomeSection() {
  return (
    <div className="home-section">
      <h1>O banco de dados inteligente e ágil!</h1>
      <p>Conectando empresas & profissionais qualificados.</p>
      <div className="button-container-home">
        <Link to="/login" className="app-button primary">
          Entrar
        </Link>
        <Link to="/login" className="app-button secondary">
          Cadastrar
        </Link>
      </div>
    </div>
  );
}

export default HomeSection;
