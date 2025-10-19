"use client";

import { useEffect, useState } from "react";

export default function MergerPage({ params }) {
  const { status, slug } = params; // e.g., status = "draftlist", slug = "ArmeSecreteBD"
  const [mergedContent, setMergedContent] = useState(null);

  useEffect(() => {
    // Here you could later load both versions to compare/merge
    console.log("Merger loaded for:", { status, slug });
  }, [status, slug]);

  return (
    <main className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-6">🧩 Merger</h1>

      <p className="opacity-80 mb-6">
        Merge multiple versions of <strong>{slug}</strong> from <em>{status}</em>.
      </p>

      <div className="border p-6 rounded-xl shadow-lg bg-[var(--card-background)]">
        <p className="text-gray-400 italic">
          (Merger interface will go here — you can load two versions and merge
          text, diffs, or metadata.)
        </p>
      </div>
    </main>
  );
}
