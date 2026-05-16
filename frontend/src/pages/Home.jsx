{result && (
  <div className="resultado">
    <h2>{result.produto}</h2>

    <p>
      <strong>Categoria:</strong> {result.categoria}
    </p>

    <p>
      <strong>Preço:</strong> R$ {result.preco}
    </p>

    <p>
      <strong>Recomendação:</strong> {result.recomendacao}
    </p>

    <p>
      <strong>Risco:</strong> {result.risco}
    </p>

    <p>
      <strong>Confiança:</strong> {result.confianca}%
    </p>
  </div>
)}