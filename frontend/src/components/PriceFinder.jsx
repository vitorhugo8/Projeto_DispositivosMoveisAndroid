import { useState } from "react";

export default function PriceFinder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    // Simulação de IA
    setResult({
      name: "Produto encontrado",
      price: "R$ 199,90",
      link: "https://example.com"
    });
  };

  return (
    <div className="container">
      <h2>Buscar melhor preço</h2>

      <input
        placeholder="Cole um link ou descreva o produto"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input type="file" />

      <button onClick={handleSearch}>Buscar</button>

      {result && (
        <div className="result">
          <h3>{result.name}</h3>
          <p>{result.price}</p>
          <a href={result.link} target="_blank" rel="noreferrer">
            Ver oferta
          </a>
        </div>
      )}
    </div>
  );
}