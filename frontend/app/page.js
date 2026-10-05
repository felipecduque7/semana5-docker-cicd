"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    fetch(`${url}/api/health/`)
      .then((res) => {
        if (!res.ok) throw new Error("resposta invalida");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui" }}>
      <h1>Status da API</h1>

      {carregando && <p>Carregando...</p>}

      {erro && (
        <div>
          <p><strong>Dados indisponiveis no momento.</strong></p>
          <p>
            O backend ainda nao esta publicado na nuvem. A aplicacao continua
            funcionando localmente via Docker.
          </p>
        </div>
      )}

      {data && (
        <>
          <p>Resposta do backend: <strong>{data.status}</strong></p>
          <ul>
            {data.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}