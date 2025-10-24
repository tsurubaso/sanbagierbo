"use client";

import { useState, useEffect } from "react";

export default function MarkdownEditor() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    // texte par défaut
    setContent(`
#La géante

Du temps que la Nature en sa verve puissante
Concevait chaque jour des enfants monstrueux,
J'eusse aimé vivre auprès d'une jeune géante,
Comme aux pieds d'une reine un chat voluptueux.

J'eusse aimé voir son corps fleurir avec son âme
Et grandit librement dans ses terribles jeux ;
Deviner si son cœur couve une sombre flamme
Aux humides brouillards qui nagent dans ses yeux ;

Parcourir à loisir ses magnifiques formes ;
Ramper sur le versant de ses genoux énormes,
Et parfois en été, quand les soleils malsains,

Lasse, la font s'étendre à travers la campagne,
Dormir nonchalamment à l'ombre de ses seins,
Comme un hameau paisible au pied d'une montagne.

Charles Baudelaire`);
  }, []);

  const sendMail = async () => {
    setStatus("⏳ Posting...");

    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) setStatus("Mail envoyé");
    else {
      const data = await res.json();
      setStatus("Erreur : " + (data.error || "inconnue"));
    }
  };

  const handlePostThreats = async () => {
    setStatus("⏳ Posting...");

    try {
      const res = await fetch("/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("Post successful!");
      } else {
        setStatus(" Error: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      setStatus(" Network error: " + err.message);
    }
  };

  const handlePostVK = async () => {
    setStatus("⏳ Posting...");

    try {
      const res = await fetch("/api/vk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("Post successful!");
      } else {
        setStatus(" Error: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      setStatus(" Network error: " + err.message);
    }
  };

  // Efface le status après 30 secondes
  useEffect(() => {
    if (!status) return; // rien à faire si vide
    const timer = setTimeout(() => setStatus(null), 30_000); // 30s
    return () => clearTimeout(timer); // cleanup si status change avant la fin
  }, [status]);

  return (
    <div style={{ padding: "1rem" }}>
      <textarea
        spellCheck={false}
        style={{
          width: "100%",
          height: "800px",
          padding: "0.5rem",
          fontFamily: "monospace",
          border: "1px solid #ccc",
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={sendMail}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent", // transparent
          color: "transparent", // texte invisible
          border: "none",
          cursor: "default",
        }}
      >
        M
      </button>
      <button
        onClick={handlePostThreats}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent", // transparent
          color: "transparent", // texte invisible
          border: "none",
          cursor: "default",
        }}
      >
        T
      </button>
      <button
        onClick={handlePostVK}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent", // transparent
          color: "transparent", // texte invisible
          border: "none",
          cursor: "default",
        }}
      >
        V
      </button>
      <p
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "transparent", // invisible
          color: "transparent", // text hidden
          border: "none",
          cursor: "default",
        }}
      >
        {status}
      </p>
    </div>
  );
}
