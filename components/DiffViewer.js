"use client";

import { useEffect, useRef, useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { diffLines } from "diff";
function mergeText(original, modified) {
  const changes = diffLines(original, modified);
  let merged = "";
  changes.forEach(part => {
    if (part.added) {
      merged += part.value;       // take added lines from modified
    } else if (!part.removed) {
      merged += part.value;       // unchanged lines
    }
  });
  return merged;
}

export default function DiffViewer({ original, modified }) {
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // assure que le composant est monté côté client
    setMounted(true);
  }, []);

  if (!mounted) return <p>Loading editor…</p>;

  return (
    <div style={{ height: "70vh", border: "1px solid #ccc" }}>
<DiffEditor
  height="100%"
  original={original}
  modified={modified}
  language="markdown"
  options={{
    renderSideBySide: true,
    minimap: { enabled: false },
    wordWrap: "on", // "bounded" can be finicky; "on" is more reliable
    readOnly: true,
    automaticLayout: true,
  }}
/>

<Editor
  height="70vh"
  defaultLanguage="markdown"
  defaultValue={mergedText}
  options={{
    readOnly: false,
    wordWrap: "on",
    minimap: { enabled: false },
  }}
/>
    </div>




  );
}
