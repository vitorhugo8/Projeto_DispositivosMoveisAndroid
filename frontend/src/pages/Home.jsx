import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
const [url, setUrl] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

async function handleAnalyze() {
  if (!url) return;

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:8000/api/ai/analyze-link",
      {
        url: url,
      }
    );

    console.log(response.data);

    setResult(response.data.result);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#fffaf5",
      fontFamily: "Arial, sans-serif",
      color: "#1f2937",
    },

    hero: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "80px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "60px",
      flexWrap: "wrap",
    },

    heroLeft: {
      flex: 1,
      minWidth: "320px",
    },

    heroTag: {
      display: "inline-block",
      backgroundColor: "#fff1e6",
      color: "#ff7a00",
      padding: "10px 18px",
      borderRadius: "999px",
      fontWeight: "bold",
      fontSize: "14px",
      marginBottom: "24px",
    },

    heroTitle: {
      fontSize: "64px",
      lineHeight: "1.1",
      marginBottom: "24px",
      color: "#111827",
    },

    heroText: {
      fontSize: "20px",
      color: "#6b7280",
      lineHeight: "1.7",
      maxWidth: "650px",
    },

    buttonsContainer: {
      marginTop: "40px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },

    primaryButton: {
      backgroundColor: "#ff7a00",
      color: "white",
      border: "none",
      padding: "18px 28px",
      borderRadius: "18px",
      fontSize: "18px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    },

    secondaryButton: {
      backgroundColor: "white",
      border: "1px solid #d1d5db",
      padding: "18px 28px",
      borderRadius: "18px",
      fontSize: "18px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    },

    heroRight: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      minWidth: "320px",
    },

    analysisCard: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "32px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      border: "1px solid #f3f4f6",
    },

    cardTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "10px",
    },

    cardSubtitle: {
      color: "#9ca3af",
      marginBottom: "30px",
      fontSize: "16px",
    },

    analysisInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },

    infoBox: {
      backgroundColor: "#fff7ed",
      padding: "18px",
      borderRadius: "18px",
      border: "1px solid #fed7aa",
    },

    infoTitle: {
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#ea580c",
    },

    featuresSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "80px 24px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },

    featureCard: {
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      transition: "0.3s",
    },

    featureTitle: {
      fontSize: "24px",
      marginBottom: "16px",
      color: "#111827",
    },

    featureText: {
      color: "#6b7280",
      lineHeight: "1.6",
      fontSize: "17px",
    },
  };

  return (
  <div style={styles.page}>
    <Navbar />

  {/* ANALISADOR */}
  <div
    style={{
      marginTop: "40px",
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      border: "1px solid #f3f4f6",
  }}
  >

  <h3
    style={{
      fontSize: "22px",
      marginBottom: "18px",
      color: "#111827",
    }}
  >
    Analisar link de produto
  </h3>

  <div
    style={{
      display: "flex",
      gap: "14px",
      flexWrap: "wrap",
    }}
  >
    <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Cole aqui o link do produto..."
      style={{
        flex: 1,
        minWidth: "250px",
        padding: "18px",
        borderRadius: "14px",
        border: "1px solid #d1d5db",
        fontSize: "16px",
        outline: "none",
      }}
    />

    <button
      onClick={handleAnalyze}
      disabled={loading}
      style={{
        backgroundColor: "#ff7a00",
        color: "white",
        border: "none",
        padding: "18px 24px",
        borderRadius: "14px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {loading ? "Analisando..." : "Analisar"}
    </button>
    </div>
</div>


      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <span style={styles.heroTag}>
            Inteligência para compras online
          </span>

          <h1 style={styles.heroTitle}>
            Descubra se um produto vale a pena antes de comprar
          </h1>

          <p style={styles.heroText}>
            Nosso sistema analisa links, preços e produtos automaticamente
            para ajudar você a encontrar ofertas confiáveis e evitar golpes.
          </p>

          <div style={styles.buttonsContainer}>
            <button style={styles.primaryButton}>
              Começar agora
              </button>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.analysisCard}>
            <h2 style={styles.cardTitle}>
              {result ? "Resultado da análise" : "Aguardando análise"}
            </h2>

            <p style={styles.cardSubtitle}>
              Exemplo de análise automática do sistema
            </p>

            <div style={styles.analysisInfo}>
              <div style={styles.infoBox}>
                <div style={styles.infoTitle}>
                  Produto detectado
                </div>
                  <p>
                    {result?.title}
                  </p>
              </div>

              <div style={styles.infoBox}>
                <div style={styles.infoTitle}>
                  Nível de confiança
                </div>

                <p>
                {result?.confianca}
                </p>
              </div>

              <div style={styles.infoBox}>
                <div style={styles.infoTitle}>
                  Recomendação
                </div>

                <p>
                  Produto com preço compatível ao mercado e baixo risco.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>
        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>
            Análise de Produtos
          </h3>

          <p style={styles.featureText}>
            Detectamos padrões de preços e informações importantes
            automaticamente.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>
            Busca Inteligente
          </h3>

          <p style={styles.featureText}>
            Compare produtos rapidamente e descubra ofertas confiáveis.
          </p>
        </div>

        <div style={styles.featureCard}>
          <h3 style={styles.featureTitle}>
            Segurança nas Compras
          </h3>

          <p style={styles.featureText}>
            Identificamos possíveis riscos e ajudamos você a evitar golpes.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}