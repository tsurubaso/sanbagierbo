"use client";

import { useEffect, useRef, useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { diffLines } from "diff";

// fonction de merge simple
function mergeText(original, modified) {
  const changes = diffLines(original, modified);
  let merged = "";
  changes.forEach((part) => {
    if (part.added) {
      merged += part.value; // lignes ajoutées → on garde
    } else if (!part.removed) {
      merged += part.value; // lignes inchangées
    }
    // ⚠️ les parties supprimées ne sont pas reprises
  });
  return merged;
}

export default function DiffViewer({ original, modified }) {
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>Loading editor…</p>;

  // ✅ calcul du texte fusionné
  const mergedText = mergeText(original, modified);

  return (
    <div style={{ height: "70vh", border: "1px solid #ccc" }}>
      {/* éditeur de comparaison */}
      <DiffEditor
        height="50%"
        original={original}
        modified={modified}
        language="markdown"
        options={{
          renderSideBySide: true,
          minimap: { enabled: false },
          wordWrap: "on",
          readOnly: true,
          automaticLayout: true,
        }}
      />

      {/* éditeur final avec texte fusionné */}
      <Editor
        height="50%"
        defaultLanguage="markdown"
        value={mergedText} // 🔑 utiliser value et non defaultValue si tu veux garder le contrôle
        options={{
          readOnly: false,
          wordWrap: "on",
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}
