import React from 'react';
import imagemTelaInicial from './img/img_group_115.png';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '430px', margin: 'auto', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <img src={imagemTelaInicial} alt="Balloon Illustration" style={{ width: '100%' }} />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#000' }}>O banco de dados inteligente e ágil!</h1>
        <p style={{ color: '#555', fontSize: '16px', marginTop: '10px' }}>Conectando empresas & profissionais qualificados.</p>
        <button style={{ backgroundColor: '#007BFF', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', margin: '10px 5px', cursor: 'pointer' }}>Entrar</button>
        <button style={{ backgroundColor: '#fff', color: '#007BFF', padding: '10px 20px', border: '1px solid #007BFF', borderRadius: '5px', margin: '10px 5px', cursor: 'pointer' }}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
