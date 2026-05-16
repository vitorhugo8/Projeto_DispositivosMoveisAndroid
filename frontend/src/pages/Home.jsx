import { useEffect } from "react";
import API from "../services/api";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/");
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao conectar com backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Minha aplicação</h1>
      <p>Conectando com FastAPI...</p>
    </div>
  );
}