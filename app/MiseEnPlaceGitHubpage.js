// app/page.js
"use client";
import BooksSidebar from "@/components/BooksListAndVersionOnGit";
import BookEditor from "@/components/BookEditor";
import { useState } from "react";

export default function Page() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedVersions, setSelectedVersions] = useState([]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-black text-white p-6 min-h-full w-72">
           <BooksSidebar
        onSelectVersions={(book, versions) => {
          setSelectedBook(book);
          setSelectedVersions(versions);
        }}
      />
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col p-6 gap-6">
         <div className="flex">
   

      <main className="flex-1 p-6">
        {selectedBook && selectedVersions[0] && (
          <BookEditor
            book={selectedBook}
            branch={selectedVersions[0]} // take first selected branch
            onSaved={(newBranch) => {
              // optionally: refresh sidebar after save
              alert(`Saved into ${newBranch}`);
            }}
          />
        )}
      </main>
    </div>
      </div>
    </div>
  );
}
