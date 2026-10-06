"use client";

import { useEffect, useState } from "react";
import { buscarDados } from "./dataSource";

export default function Home() {
  const [data, setData] = useState(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDados()
      .then((json) => setData(json))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui" }}>
      <h1>Status da API — Versão B</h1>

      {carregando && <p>Carregando...</p>}

      {erro && (
        <div>
          <p><strong>Dados indisponiveis no momento.</strong></p>
          <p>
            Nao foi possivel carregar os dados. A aplicacao continua
            funcionando localmente via Docker.
          </p>
        </div>
      )}

      {data && (
        <>
          <p>Resposta: <strong>{data.status}</strong></p>
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