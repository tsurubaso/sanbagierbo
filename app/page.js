// app/page.js
"use client";
import PackageInfo from "@/components/PackageInfo";
import GitHubAuth from "@/components/GitHubAuth";
import BooksSidebar from "@/components/BooksListAndVersionOnGit";

  const handleSelectVersions = (book, versions) => {
    console.log("Selected book:", book);
    console.log("Selected versions:", versions);
    // You can load the content here, update editor, etc.
  };

export default function Page() {
  return (
    <>
    <BooksSidebar onSelectVersions={handleSelectVersions} />
      <PackageInfo />

      

      <main className="flex flex-col items-center min-h-screen p-6 gap-6">
        <h1 className="text-3xl font-bold">Connection to GitHub</h1>
        <GitHubAuth />
      </main>
    </>
  );
}
