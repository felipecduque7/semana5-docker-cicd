import { algoQueNaoExiste } from "./modulo-inexistente";

async function getHealth() {
  const res = await fetch("http://backend:8000/api/health/", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getHealth();

  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui" }}>
      <h1>Status da API</h1>
      <p>Resposta do backend: <strong>{data.status}</strong></p>
      <ul>
        {data.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
