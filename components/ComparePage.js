"use client";

import { useEffect, useState } from "react";
import InteractiveMerge from "@/components/InteractiveMerge";

export default function ComparePage({ book }) {
  const [branches, setBranches] = useState([]);
  const [filesContent, setFilesContent] = useState({});
  const [currentMerge, setCurrentMerge] = useState({ original: "", modified: "" });

  useEffect(() => {
    async function loadBranchesAndFiles() {
      // 1️⃣ Récupère toutes les branches
      const res = await fetch("/api/github/branches");
      const allBranches = await res.json();
      setBranches(allBranches);

      // 2️⃣ Récupère les fichiers dans master, ver2, ver3
      const branchesToFetch = ["master", "ver2", "ver3"].filter(b => allBranches.includes(b));
      const content = {};
      for (const b of branchesToFetch) {
        const r = await fetch(`/api/github/get-file?book=${book}&branch=${b}`);
        content[b] = await r.text();
      }
      setFilesContent(content);

      // 3️⃣ Initialise le merge ver3 -> ver2 si possible
      if (content.ver2 && content.ver3) {
        setCurrentMerge({ original: content.ver2, modified: content.ver3 });
      }
    }

    loadBranchesAndFiles();
  }, [book]);

  // Appliquer le merge dans la branche cible
  async function applyMerge(targetBranch, mergedText) {
    await fetch("/api/github/save-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book, branch: targetBranch, content: mergedText }),
    });
  }

  // Supprimer une branche
  async function deleteBranch(branch) {
    await fetch("/api/github/delete-branch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ branch }),
    });
  }

  // Quand l'utilisateur termine le merge interactif
  async function handleMergeDone(mergedText) {
    if (branches.includes("ver2") && branches.includes("ver3")) {
      // Merge ver3 -> ver2
      await applyMerge("ver2", mergedText);

      // Supprime ver3 si tout fusionné
      await deleteBranch("ver3");

      // Prépare merge ver2 -> master
      if (filesContent.master) {
        setCurrentMerge({ original: filesContent.master, modified: mergedText });
      } else {
        // master n'existe pas → on crée directement master
        await applyMerge("master", mergedText);
      }
    } else if (branches.includes("master") && branches.includes("ver2")) {
      // Merge ver2 -> master
      await applyMerge("master", mergedText);

      // Supprime ver2 si tout fusionné
      await deleteBranch("ver2");
    }
  }

  if (!currentMerge.original || !currentMerge.modified) {
    return <p>Sélectionnez deux versions à comparer.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Fusion interactive</h1>
      <InteractiveMerge
        original={currentMerge.original}
        modified={currentMerge.modified}
        onMerge={handleMergeDone}
      />
    </div>
  );
}
