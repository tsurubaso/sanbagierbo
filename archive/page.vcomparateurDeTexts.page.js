//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//old structure keep for info, will be destroyed
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




"use client";

import { useEffect, useState } from "react";

import InteractiveMerge from "@/components/DiffViewer";

export default function ComparePage() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  useEffect(() => {
    async function loadFiles() {
      const v1 = await fetch("/books/BaseE.md").then((res) => res.text());
      const v2 = await fetch("/books/BaseE2.md").then((res) => res.text());
      setOriginal(v1);
      setModified(v2);
    }
    loadFiles();
  }, []);

  

  return (
    <div>
      <h1>Fusion interactive</h1>
      {original && modified ? (
        <InteractiveMerge original={original} modified={modified} />
      ) : (
        <p>Chargement…</p>
      )}
    </div>
  );
}
