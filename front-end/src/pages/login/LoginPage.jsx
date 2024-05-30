import React from "react";
import "./loginPage.css";
import LeftSection from "../../components/LeftSection/LeftSection";

function LoginPage() {
  return (
    <div className="App">
      <LeftSection />
      <div className="right-section">
        <h1>Entre em sua conta</h1>
        <form className="login-form">
          <input type="email" placeholder="Seu email :)" className="input-field" />
          <input type="password" placeholder="Sua senha" className="input-field" />
          <a href="#" className="forgot-password">Esqueceu a senha?</a>
          <button className="app-button primary">Entrar</button>
        </form>
        <p className="signup-text">Ainda não faz parte? <a href="#" className="signup-link">Cadastre-se Agora</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
