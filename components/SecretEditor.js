"use client";
import LanguageToolResult from "@/components/LanguageToolResult";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { getFile, saveFile } from "@/lib/github";

export default function SecretEditor({ link, secret }) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_EDITOR_SECRET;

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [selectedText, setSelectedText] = useState(""); //
  const [ltResult, setLtResult] = useState(null); //

  // Fetch markdown file
useEffect(() => {
  if (secret !== SECRET_KEY) return;

  const fetchMD = async () => {
    try {
      const res =  await fetch(`/api/github/get-file?book=${link}.md`);
      const data = await res.json();
         if (data.content) {
        setContent(data.content);
      } else {
        setStatus(data.error || "Failed to load file");
      }
      
    } catch (err) {
      setStatus(err.message);
    }
  };

  fetchMD();
}, [link, secret]);

  // Reset status after 30s
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 30_000);
    return () => clearTimeout(timer);
  }, [status]);

  // If secret is wrong, render unauthorized
  if (secret !== SECRET_KEY) {
    return <p style={{ padding: "2rem", color: "red" }}>Unauthorized</p>;
  }

  // LanguageTool correction
  async function handleLTCorrection() {
    if (!selectedText) return;
    setLtResult("loading");
    const res = await fetch("/api/languagetool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText, language: "fr" }),
    });
    const data = await res.json();
    setLtResult(data);
  }

  // Send mail


  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h1>Editing: {link}</h1>

      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          onChange={(value) => setContent(value)}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleLTCorrection}
          disabled={!selectedText || ltResult === "loading"}
          className="flex-1 bg-transparent text-white border border-white p-2 rounded hover:bg-white/10 transition-colors"
        >
          Corriger la sélection
        </button>
        {selectedText && (
          <div className="mt-4 text-white">
            <strong>Texte sélectionné :</strong>
            <blockquote>{selectedText}</blockquote>
          </div>
        )}
        {ltResult && ltResult !== "loading" && (
          <div style={{ marginTop: 12 }}>
            <main className="w-11/12 mx-auto mt-10">
              <h1 className="text-xl font-bold mb-4">
                Résultats de correction
              </h1>
              <LanguageToolResult response={ltResult} />
            </main>
          </div>
        )}
        {ltResult === "loading" && <div>Correction en cours...</div>}
      </div>


      <p
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent",
          color: "transparent",
          border: "none",
          cursor: "default",
        }}
      >
        {status}
      </p>
    </div>
  );
}
