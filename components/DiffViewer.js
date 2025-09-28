"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { diffLines } from "diff";

export default function InteractiveMerge({ original, modified }) {
  const [blocks, setBlocks] = useState([]);
  const [mergedText, setMergedText] = useState("");

  useEffect(() => {
    const diff = diffLines(original, modified);
    // Chaque élément du diff devient un bloc à choisir
    const initialBlocks = diff.map((part, idx) => ({
      id: idx,
      value: part.value,
      added: part.added || false,
      removed: part.removed || false,
      choice: !part.added && !part.removed ? "both" : null, // "both" = pas de choix nécessaire
    }));
    setBlocks(initialBlocks);
  }, [original, modified]);

  useEffect(() => {
    // Recalcule le texte fusionné selon les choix
    const merged = blocks
      .map((block) => {
        if (block.choice === "original" && block.removed) return block.value;
        if (block.choice === "modified" && block.added) return block.value;
        if (block.choice === "both" || (!block.added && !block.removed))
          return block.value;
        return "";
      })
      .join("");
    setMergedText(merged);
  }, [blocks]);

  function handleChoice(id, choice) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, choice } : b)));
  }

  async function saveFinal() {
    const res = await fetch("/api/save-merged", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mergedText,
        filePath: "docs/myfile.md",
        branchesToDelete: ["feature1", "feature2"], // ex.
      }),
    });

    const data = await res.json();
    console.log("✅ Sauvegarde terminée", data);
  }

  return (
    <div className="flex gap-4">
      {/* Liste des blocs avec boutons */}
      <div className="w-1/3 border-r pr-2 space-y-2 text-sm">
        <h2 className="font-bold mb-2">Résolution des conflits</h2>
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`p-2 rounded ${
              block.added
                ? "bg-green-100"
                : block.removed
                ? "bg-red-100"
                : "bg-gray-50"
            }`}
          >
            <pre className="whitespace-pre-wrap">{block.value}</pre>
            {(block.added || block.removed) && (
              <div className="mt-1 flex gap-2">
                <button
                  className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                  onClick={() => handleChoice(block.id, "original")}
                >
                  Garder Original
                </button>
                <button
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                  onClick={() => handleChoice(block.id, "modified")}
                >
                  Garder Modifié
                </button>
                <button
                  className="px-2 py-1 text-xs bg-gray-500 text-white rounded"
                  onClick={() => handleChoice(block.id, "both")}
                >
                  Garder les deux
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Editeur de prévisualisation */}
      <div className="w-2/3 space-y-4">
        {/* Bouton de sauvegarde */}
        <button
          onClick={saveFinal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sauvegarder la version finale
        </button>

        {/* Editeur de prévisualisation */}
        <Editor
          height="80vh"
          defaultLanguage="markdown"
          value={mergedText} // ou useState si tu veux éditer avant sauvegarde
          options={{
            readOnly: false,
            wordWrap: "on",
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
