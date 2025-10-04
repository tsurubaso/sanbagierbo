"use client";

import { useState, useEffect } from "react";

export default function BooksSidebar({ onSelectVersions }) {
  const [books, setBooks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedVersions, setSelectedVersions] = useState([]);

  useEffect(() => {
    fetch("/api/github/books").then((r) => r.json()).then(setBooks);
    fetch("/api/github/branches").then((r) => r.json()).then(setBranches);
  }, []);

  function toggleVersion(branch) {
    setSelectedVersions((prev) => {
      const newSelection = prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : prev.length < 2
        ? [...prev, branch]
        : prev;
      onSelectVersions?.(selectedBook, newSelection); // notify parent
      return newSelection;
    });
  }

  return (
    <nav className="w-64 bg-gray-900 text-white h-screen p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Books</h2>

      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.name}>
            <button
              onClick={() => {
                setSelectedBook(book.name);
                setSelectedVersions([]);
                onSelectVersions?.(book.name, []);
              }}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
                selectedBook === book.name ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {book.name}
            </button>

            {selectedBook === book.name && (
              <ul className="pl-4 mt-2 space-y-1">
                {branches.map((branch) => (
                  <li key={branch}>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedVersions.includes(branch)}
                        onChange={() => toggleVersion(branch)}
                        className="w-4 h-4 accent-blue-400"
                      />
                      {branch}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {selectedVersions.length > 0 && (
        <div className="mt-6 text-gray-300">
          <p className="font-semibold">Selected versions:</p>
          <ul className="pl-2">
            {selectedVersions.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
