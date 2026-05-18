import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "22px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#ff7a00",
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          DealDetector
        </h1>
      </Link>

      {/* BOTÕES */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* LOGIN */}
        <Link to="/login">
          <button
            style={{
              padding: "12px 22px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#111827",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f9fafb";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ffffff";
            }}
          >
            Entrar
          </button>
        </Link>

        {/* REGISTER */}
        <Link to="/register">
          <button
            style={{
              padding: "12px 22px",
              borderRadius: "14px",
              border: "none",
              backgroundColor: "#ff7a00",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 6px 18px rgba(255,122,0,0.25)",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e96f00";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ff7a00";
              e.target.style.transform = "translateY(0px)";
            }}
          >
            Criar conta
          </button>
        </Link>
      </div>
    </nav>
  );
}