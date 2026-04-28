import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="header">
        <h1 className="logo">
          <span className="icon">🛒</span>
          Deal Detector
        </h1>

        <div className="user-area">
          <span>Olá, {user?.name || "Usuário"}</span>
          <button onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="tabs">
        <button className="active">Buscar</button>
        <button>Histórico</button>
        <button>Sugestões</button>
      </div>

      <div className="content">

        <div className="card">
          <h2>Upload de Imagem</h2>

          <div className="upload-box">
            <p>Arraste uma imagem ou clique para enviar</p>
            <span>PNG, JPG até 10MB</span>
          </div>
        </div>

        <div className="card">
          <h2>Link do Produto</h2>

          <input
            type="text"
            placeholder="Cole o link aqui..."
            className="input"
          />

          <button className="primary">Buscar</button>
        </div>

      </div>
    </div>
  );
}