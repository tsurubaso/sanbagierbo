"use client";
import { useState } from "react";

export default function DictionarySidebar() {
  const [open, setOpen] = useState(true);
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const LABELS_FR = {
    synonym: "Synonymes",
    antonym: "Antonymes",
    champlexical: "Champ lexical",
  };

  const fetchData = async (type) => {
    if (!word) return;

    const endpoint =
      type === "dictionary"
        ? `/api/dictionary?word=${encodeURIComponent(word)}`
        : `/api/synonyms?word=${encodeURIComponent(word)}&type=${type}`;

    const res = await fetch(endpoint);
    const data = await res.json();
    setResult({ type, data });
  };

  return (
    <>
      {/* Bouton flottant */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`h-screen fixed top-0 right-0 p-6 bg-black text-white transition-all duration-300 ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}
        style={{ borderRight: open ? "1px solid #444" : "none" }}
      >
        {open && (
          <>
            {/* Bouton fermer */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg p-1"
              >
                ✖
              </button>
            </div>

            {/* Titre */}
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold">Dico FR</h2>
            </div>

            {/* Input + boutons */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Tapez un mot"
                className="border p-2 w-full text-white bg-gray-800 rounded"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fetchData("dictionary")}
                  className="flex-1 bg-gray-800 p-2 rounded hover:bg-violet-600"
                >
                  Dictionnaire
                </button>
                <button
                  onClick={() => fetchData("synonym")}
                  className="flex-1 bg-gray-800 p-2 rounded hover:bg-red-600"
                >
                  Synonymes
                </button>
                <button
                  onClick={() => fetchData("antonym")}
                  className="flex-1 bg-gray-800 p-2 rounded hover:bg-green-600"
                >
                  Antonymes
                </button>
                <button
                  onClick={() => fetchData("champlexical")}
                  className="flex-1 bg-gray-800 p-2 rounded hover:bg-blue-600"
                >
                  Champ lexical
                </button>
              </div>
            </div>

            {/* Résultats */}
            <div className="mt-4 overflow-y-auto max-h-[70vh] pb-10">
              {result && result.type === "dictionary" && (
                <>
                  {Array.isArray(result.data) ? (
                    result.data.map((entry, idx) => (
                      <div key={idx} className="mb-4">
                        <h3 className="font-bold text-lg">{entry.mot}</h3>
                        <p className="text-sm">{entry.definition}</p>
                        <a
                          href={entry.dicolinkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-300 underline text-sm"
                        >
                          Source
                        </a>
                      </div>
                    ))
                  ) : (
                    <p>Aucun résultat trouvé</p>
                  )}
                </>
              )}

             {result && LABELS_FR[result.type] && (
                <>
                  {Array.isArray(result.data) && result.data.length > 0 ? (
                    <div>
                      <h3 className="font-bold mb-2 capitalize">
                        {LABELS_FR[result.type] || result.type}
                      </h3>
                      <ul className="list-disc pl-5">
                        {result.data.map((entry, idx) => (
                          <li key={idx}>
                            <a
                              href={entry.dicolinkUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-300 underline"
                            >
                              {entry.mot}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>Aucun {LABELS_FR[result.type] || result.type} trouvé</p>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
}
