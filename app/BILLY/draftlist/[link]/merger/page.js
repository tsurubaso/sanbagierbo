"use client";

import { useState, useEffect } from "react";
import InteractiveMerge from "@/components/InteractiveMerge";

export default function MergerPage({ params }) {
  const unwrappedParams = use(params); // unwrap the params
  const { link } = unwrappedParams;

  const [branches, setBranches] = useState({});
  const [mergePairs, setMergePairs] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  // Exemple: récupérer toutes les branches pour un fichier
  async function fetchBranches(book) {
    // rename param to 'book' for clarity
    if (!book) return {};

    const res = await fetch(`/api/github/branches`);
    console.log("Fetching branches for book:", book);
    console.log("Response status:", res.status);
    const branchList = await res.json();

    console.log("Branches récupérées:", branchList);

    if (!Array.isArray(branchList)) {
      console.error("branchList is not an array", branchList);
      return {};
    }

    const branchContents = {};

    for (const branchObj of branchList) {
      const branchName = branchObj.name;
      console.log("Fetching file from branch:", branchName);
      try {
        const resFile = await fetch(
          `/api/github/get-file?book=${book}&branch=${branchName}`
        );
        if (!resFile.ok) {
          console.warn(`Fichier non trouvé sur ${branchName}`);
          continue;
        }
        branchContents[branchName] = await resFile.text();
      } catch (err) {
        console.error(`Erreur fetch fichier ${branchName}:`, err);
      }
    }

    return branchContents;
  }

  useEffect(() => {
    async function load() {
      const branchContents = await fetchBranches(link);
      // Liste des branches par ordre de priorité
      const DEFAULT_HIERARCHY = ["master", "ver2", "ver3"];

      // Trier les branches selon priorité + les autres
      const orderedBranches = [
        ...DEFAULT_HIERARCHY.filter((b) => branchContents[b]),
        ...Object.keys(branchContents).filter(
          (b) => !DEFAULT_HIERARCHY.includes(b)
        ),
      ];

      // Construire les paires pour fusion progressive
      const pairs = [];
      for (let i = orderedBranches.length - 1; i > 0; i--) {
        const high = orderedBranches[i];
        const low = orderedBranches[i - 1];
        pairs.push({ high, low });
      }

      setBranches(branchContents);
      setMergePairs(pairs);
    }

    load();
  }, [link]);

  if (!mergePairs.length) return <p>Chargement des branches…</p>;

  const { high, low } = mergePairs[currentPairIndex];

  function handleNextMerge(mergedText) {
    // Mettre à jour le résultat dans la branche inférieure
    setBranches((prev) => ({ ...prev, [low]: mergedText }));

    // Passer à la paire suivante
    if (currentPairIndex + 1 < mergePairs.length) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      console.log("✅ Toutes les fusions sont terminées", branches);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Fusion interactive</h1>
      <p>
        Fusion en cours : <strong>{high}</strong> → <strong>{low}</strong>
      </p>
      <InteractiveMerge
        original={branches[low]}
        modified={branches[high]}
        onMergeComplete={handleNextMerge}
      />
    </div>
  );
}
