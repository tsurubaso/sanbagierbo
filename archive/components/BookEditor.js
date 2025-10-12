// BookEditor.jsx
"use client";
import { useState, useEffect } from "react";

export default function BookEditor({ book, branch, onSaved }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFile() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/github/get-file?book=${book}&branch=${branch}`
        );
        if (!res.ok) throw new Error("Failed to fetch file");
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (book && branch) loadFile();
  }, [book, branch]);

  async function saveFile() {
    const res = await fetch("/api/github/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book, branch: "ver2", content }),
    });
    const data = await res.json();
    onSaved?.("ver2");
  }
  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full h-64 p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={saveFile}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save as ver2
      </button>
    </div>
  );
}
