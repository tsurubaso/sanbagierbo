"use client";
import LanguageToolResult from "@/components/LanguageToolResult";
import { useRef, useState, useEffect } from "react";

export default function SecretEditor({ link, secret }) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_EDITOR_SECRET;

  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const textareaRef = useRef();
  const [selectedText, setSelectedText] = useState("");
  const [ltResult, setLtResult] = useState(null);

  //selection pour correcteur
  function handleSelection() {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value.substring(start, end);
    setSelectedText(text);
    setLtResult(null);
  }

  //Envoie de la selected text a l'api
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

  // Charge le Markdown depuis public/books
  useEffect(() => {
    const fetchMD = async () => {
      try {
        const res = await fetch(`/books/${link}.md`);
        if (!res.ok) throw new Error("Failed to fetch the file");
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setStatus(err.message);
      }
    };
    fetchMD();
  }, [link]);

  // Envoi par mail
  const sendMail = async () => {
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (res.ok) setStatus("Mail sent ");
      else {
        const data = await res.json();
        setStatus("Error : " + (data.error || "unknown"));
      }
    } catch (err) {
      setStatus("Error : " + err.message);
    }
  };

  // Efface le status après 30 secondes
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 30_000);
    return () => clearTimeout(timer);
  }, [status]);

  // ✅ The conditional render goes *after* hooks
  if (secret !== SECRET_KEY) {
    return <p style={{ padding: "2rem", color: "red" }}>Unauthorized</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Editing: {link}</h1>
      <textarea
        ref={textareaRef}
        lang="fr"
        spellCheck={true}
        className="w-full h-[600px] font-mono p-2 border border-gray-300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
      />
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
              <h1 className="text-xl font-bold mb-4">Résultats de correction</h1>
              <LanguageToolResult response={ltResult} />
            </main>
          </div>
        )}
        {ltResult === "loading" && <div>Correction en cours...</div>}
      </div>
      <button
        onClick={sendMail}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent",
          color: "transparent",
          border: "none",
          cursor: "default",
        }}
      >
        .
      </button>
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
