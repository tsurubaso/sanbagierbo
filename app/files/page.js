"use client";
import { useState, useEffect } from "react";

export default function FilesList() {
  const [files, setFiles] = useState([]);

  async function loadFiles() {
    const res = await fetch("/api/github/list");
    const data = await res.json();
    setFiles(data);
  }

  async function deleteFile(name, sha) {
    const confirmDelete = window.confirm(`Voulez-vous vraiment effacer ${name} ?`);
    if (!confirmDelete) return;

    const res = await fetch("api/github/deleteFile", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, sha }),
    });

    const data = await res.json();
    if (data.success) {
      alert(`${name} supprimé ✅`);
      loadFiles(); // recharge la liste
    } else {
      alert("Erreur lors de la suppression");
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <h1>📂 Fichiers du repo</h1>
      <ul>
        {files.map((f) => (
          <li key={f.path} className="flex gap-2 items-center">
            <span>{f.name}</span>
            <button
              onClick={() => deleteFile(f.name, f.sha)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
