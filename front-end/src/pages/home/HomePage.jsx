import React from "react";
import "./style.css";
import ballonImg from "../../img/ballon.png"; // Certifique-se de que o caminho está correto

function HomePage() {
  return (
    <div className="App">
      <div className="left-section">
        <img src={ballonImg} alt="Illustration" className="illustration" />
      </div>
      <div className="right-section">
        <h1>O banco de dados inteligente e ágil!</h1>
        <p>Conectando empresas & profissionais qualificados.</p>
        <div className="button-container">
          <button className="app-button primary">Entrar</button>
          <button className="app-button secondary">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
