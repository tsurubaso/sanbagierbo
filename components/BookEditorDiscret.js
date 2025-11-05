"use client";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import LanguageToolResult from "@/components/LanguageToolResult";

export default function BookEditorDiscret({ book, branch = "master", secretKeyCheck }) {
  const [authorized, setAuthorized] = useState(null); // null = en cours de vérification
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [ltResult, setLtResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState(branch);

  const editorRef = useRef(null);

  // ✅ Vérifie le secret dès le montage
  useEffect(() => {
    if (typeof secretKeyCheck === "function") {
      try {
        const result = secretKeyCheck();
        setAuthorized(!!result);
      } catch (err) {
        console.error("Erreur de vérification du secret:", err);
        setAuthorized(false);
      }
    } else {
      console.warn("Aucune fonction secretKeyCheck fournie");
      setAuthorized(false);
    }
  }, [secretKeyCheck]);

  // ✅ Charge la liste des branches
  useEffect(() => {
    async function fetchBranches() {
      try {
        const res = await fetch("/api/github/branches");
        const data = await res.json();
        setBranches(data);
      } catch (err) {
        console.error("Branch list error:", err);
      }
    }
    fetchBranches();
  }, []);

  // ✅ Charge le fichier du livre
  useEffect(() => {
    async function loadFile() {
      setLoading(true);
      try {
        const res = await fetch(`/api/github/get-file?book=${book}.md&branch=${currentBranch}`);
        if (!res.ok) throw new Error("Failed to fetch file");
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setStatus(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (authorized) loadFile(); // seulement après autorisation
  }, [book, currentBranch, authorized]);

  // ✅ Sauvegarde du fichier
  async function saveFile() {
    let targetBranch = currentBranch;
    if (currentBranch === "master") {
      if (!branches.includes("ver2")) {
        targetBranch = "ver2";
        setCurrentBranch("ver2");
        setStatus("⚠️ Master cannot be overwritten, saving on new branch 'ver2'...");
      } else if (!branches.includes("ver3")) {
        targetBranch = "ver3";
        setCurrentBranch("ver3");
        setStatus("⚠️ Master cannot be overwritten, saving on new branch 'ver3'...");
      } else {
        setStatus("❌ Cannot save on master; branches ver2 and ver3 already exist.");
        return;
      }
    } else {
      setStatus(`Saving on ${targetBranch}...`);
    }

    try {
      await fetch("/api/github/ensure-branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch: targetBranch }),
      });

      const res = await fetch("/api/github/save-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book, branch: targetBranch, content }),
      });

      if (!res.ok) throw new Error("Failed to save file");

      setStatus(`✅ File saved successfully on ${targetBranch}!`);

      if (!branches.includes(targetBranch)) {
        setBranches([...branches, targetBranch]);
      }
    } catch (err) {
      setStatus("❌ " + err.message);
    } finally {
      setTimeout(() => setStatus(""), 5000);
    }
  }

  // ✅ Correction grammaticale (LanguageTool)
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

  // 🧠 Gestion de la sélection de texte
  function handleEditorSelection() {
    if (!editorRef.current) return;
    const selection = editorRef.current
      .getModel()
      ?.getValueInRange(editorRef.current.getSelection());
    setSelectedText(selection || "");
  }

  // 🔒 Gestion des états de vérification
  if (authorized === null) {
    return <p style={{ padding: "2rem" }}>Vérification du secret...</p>;
  }

  if (!authorized) {
    return <p style={{ padding: "2rem", color: "red" }}>🚫 Unauthorized</p>;
  }

  if (loading) return <p>Chargement du fichier...</p>;

  // ✅ Éditeur principal
  return (
    <div className="flex flex-col min-h-screen bg-[#1e1e1e] text-gray-100">
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between p-4 bg-[#2a2a2a]">
        <h1 className="text-lg font-bold">
          ✏️ Editing: {book}.md ({currentBranch})
        </h1>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Save on:</label>
            <select
              className="bg-black text-white border border-gray-500 rounded p-1"
              value={currentBranch}
              onChange={(e) => setCurrentBranch(e.target.value)}
            >
              {branches.map((b) => (
                <option key={b}>{b}</option>
              ))}
              {!branches.includes("ver2") && <option value="ver2">ver2</option>}
              {!branches.includes("ver3") && <option value="ver3">ver3</option>}
            </select>
          </div>

          <button
            onClick={saveFile}
            disabled={currentBranch === "master"}
            className={`px-3 py-1 rounded ${
              currentBranch === "master"
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            💾 Save
          </button>
        </div>
      </header>

      {/* --- ÉDITEUR --- */}
      <div className="flex-1">
        <Editor
          height="80vh"
          defaultLanguage="markdown"
          value={content}
          onChange={(v) => setContent(v)}
          onMount={(editor) => {
            editorRef.current = editor;
            editor.onDidChangeCursorSelection(handleEditorSelection);
          }}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            fontSize: 15,
            automaticLayout: true,
          }}
        />
      </div>

      {/* --- FOOTER --- */}
      <footer className="p-4 space-y-4 bg-[#2a2a2a]">
        <button
          onClick={handleLTCorrection}
          disabled={!selectedText || ltResult === "loading"}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-white/10"
        >
          Corriger la sélection
        </button>

        {selectedText && (
          <blockquote className="text-gray-300 italic border-l-2 border-gray-500 pl-3">
            {selectedText}
          </blockquote>
        )}

        {ltResult === "loading" && <p>Correction en cours...</p>}
        {ltResult && ltResult !== "loading" && (
          <LanguageToolResult response={ltResult} />
        )}

        {status && (
          <p className="text-sm text-gray-400 mt-2 border-t border-gray-700 pt-2">
            {status}
          </p>
        )}

        {currentBranch === "master" && (
          <p className="text-xs text-red-400 italic">
            ⚠️ Saving is disabled on master. Your content will be saved on ver2 or ver3.
          </p>
        )}
      </footer>
    </div>
  );
}
