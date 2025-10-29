//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//old structure keep for info, will be destroyed
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


"use client";


import { useEffect, useState } from "react";
import InteractiveMerge from "@/components/DiffViewer";

export default function ComparePage({ book, versions }) {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  useEffect(() => {
    async function loadFiles() {
      if (versions.length < 2) return;

      // on prend les 2 branches
      const [branchA, branchB] = versions;

      // API qui fetch le contenu du fichier pour une branche donnée
      const resA = await fetch(`/api/github/get-file?book=${book}&branch=${branchA}`);
      const resB = await fetch(`/api/github/get-file?book=${book}&branch=${branchB}`);

      const textA = await resA.text();
      const textB = await resB.text();

      setOriginal(textA);
      setModified(textB);
    }
    loadFiles();
  }, [book, versions]);

  if (versions.length < 2) {
    return <p>Sélectionnez deux versions à comparer.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Fusion interactive</h1>
      {original && modified ? (
        <InteractiveMerge original={original} modified={modified} book={book} />
      ) : (
        <p>Chargement…</p>
      )}
    </div>
  );
}
