import React from "react";
import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
  
      <div className="header">
        <h1>Deal Detector</h1>

        <div>
          <span style={{ marginRight: "10px" }}>
            Olá, {user?.email || "Usuário"}
          </span>
          <button className="secondary" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      <div className="menu">
        <button className="primary">Buscar</button>
        <button className="secondary">Histórico</button>
        <button className="secondary">Sugestões</button>
      </div>

    
      <div className="dashboard-grid">
        

        <div className="card" style={{ flex: 1, minWidth: "300px" }}>
          <h2>Upload de Imagem</h2>

          <div className="upload-box">
            <p>📤</p>
            <p>Arraste uma imagem ou clique para enviar</p>
            <small>PNG, JPG até 10MB</small>
          </div>
        </div>

      
        <div className="card" style={{ flex: 1, minWidth: "300px" }}>
          <h2>Link do Produto</h2>

          <input
            type="text"
            placeholder="Cole o link aqui..."
          />

          <div style={{ marginTop: "10px" }}>
            <button className="primary">Buscar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;