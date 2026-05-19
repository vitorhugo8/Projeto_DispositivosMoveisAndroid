import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 48px",
        backgroundColor: "white",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          color: "#ff7a00",
          fontWeight: "bold",
        }}
      >
        DealDetector
      </h1>

      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Olá, {user.name}
          </span>

          <button
            onClick={logout}
            style={{
              backgroundColor: "#ff7a00",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sair
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding: "12px 22px",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Entrar
            </button>
          </Link>

          <Link to="/register">
            <button
              style={{
                padding: "12px 22px",
                borderRadius: "14px",
                border: "none",
                backgroundColor: "#ff7a00",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow:
                  "0 10px 25px rgba(255,122,0,0.25)",
              }}
            >
              Criar conta
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}