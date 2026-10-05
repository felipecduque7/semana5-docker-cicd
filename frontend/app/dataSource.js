import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
} from "firebase/firestore";

let db = null;

function getDb() {
  if (db) return db;

  const config = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(config);
  db = getFirestore(app);

  if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true") {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }

  return db;
}

async function buscarDaApi() {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${url}/api/health/`);
  if (!res.ok) throw new Error("resposta invalida");
  return res.json();
}

async function buscarDoFirestore() {
  const snap = await getDocs(collection(getDb(), "items"));
  const items = snap.docs
    .map((d) => d.data())
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
    .map((d) => d.texto);

  return { status: "ok", items };
}

export async function buscarDados() {
  const fonte = process.env.NEXT_PUBLIC_DATA_SOURCE || "api";
  return fonte === "firestore" ? buscarDoFirestore() : buscarDaApi();
}