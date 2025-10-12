"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getFile } from "@/lib/github";

/**
 * MarkdownLoader
 * Props:
 *   - link : nom du fichier markdown (sans extension)
 *   - editable (optionnel) : si true, montre un textarea au lieu du rendu
 *   - onChange (optionnel) : callback quand le texte change (utile si editable)
 *   - branch (optionnel) : branche GitHub
 */
export default function MarkdownLoader({ link, editable = false, onChange, branch = "master" }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMD = async () => {
      setLoading(true);
      setError(null);

      try {
        // récupère le fichier depuis GitHub
        const text = await getFile(`${link}.md`, branch);

        // optionnel : supprime front matter si nécessaire
        const cleanText = text.replace(/^---[\s\S]+?---\s*/, "");
        setContent(cleanText);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de l’histoire");
      } finally {
        setLoading(false);
      }
    };

    fetchMD();
  }, [link, branch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-12 text-gray-400">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4">Chargement de l’histoire…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-12">
        <h1 className="text-2xl font-bold mb-2">Histoire introuvable</h1>
        <p>{error}</p>
      </div>
    );
  }

  // mode édition
  if (editable) {
    return (
      <textarea
        className="w-full min-h-screen p-4 bg-gray-900 text-gray-100 font-mono"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    );
  }

  // mode lecture
  return (
    <div className="p-6 markdown-content">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
}
