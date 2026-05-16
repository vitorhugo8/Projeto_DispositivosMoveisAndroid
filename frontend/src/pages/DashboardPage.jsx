import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [result, setResult] = useState("");

  const handleImageUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:8000/api/ai/analyze-image", 
        formData);

      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("Erro ao analisar imagem.");
    }
  };

  const handleLinkSearch = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/ai/analyze-link", 
        {link});

      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("Erro ao analisar link.");
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1 className="logo">🛒 Deal Detector</h1>

        <div className="user-area">
          <span>Olá, {user?.name || "Usuário"}</span>
          <button onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="content">

        <div className="card">
          <h2>Upload de Imagem</h2>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="primary" onClick={handleImageUpload}>
            Analisar Imagem
          </button>
        </div>

        <div className="card">
          <h2>Link do Produto</h2>

          <input
            type="text"
            placeholder="Cole o link aqui..."
            className="input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button className="primary" onClick={handleLinkSearch}>
            Buscar
          </button>
        </div>
      </div>

      {result && (
        <div className="result-box">
          <h3>Resultado</h3>
        <div>
          <p><strong>Produto:</strong> {result.produto}</p>
          <p><strong>Categoria:</strong> {result.categoria}</p>
          <p><strong>Preço:</strong> R$ {result.preco}</p>
          <p><strong>Recomendação:</strong> {result.recomendacao}</p>
          <p><strong>Risco:</strong> {result.risco}</p>
          <p><strong>Confiança:</strong> {result.confianca}%</p>
        </div>
        </div>
      )}
    </div>
  );
}