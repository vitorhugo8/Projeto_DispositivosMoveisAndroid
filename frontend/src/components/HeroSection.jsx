import "./styles/HeroSection.css"

export default function HeroSection() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          Plataforma inteligente
        </span>

        <h1>
          Descubra se uma oferta realmente vale a pena.
        </h1>

        <p>
          Analise links e produtos automaticamente.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Começar agora
          </button>

          <button className="secondary-btn">
            Ver demo
          </button>

        </div>

      </div>

      <div className="hero-right">

        <div className="analysis-card">

          <p className="card-subtitle">
            Produto analisado
          </p>

          <h3>
            Controle PS4 Bluetooth
          </h3>

          <div className="analysis-info">

            <div>
              <span>Preço</span>
              <strong>R$ 129</strong>
            </div>

            <div>
              <span>Risco</span>
              <strong>Baixo</strong>
            </div>

            <div>
              <span>Confiança</span>
              <strong>92%</strong>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}