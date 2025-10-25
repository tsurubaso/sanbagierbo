// app/BILLY/draftlist/[link]/page.js
import MarkdownLoader from "@/components/MarkdownLoader";

export default function BookPage({ params, searchParams }) {
    const link =  params.link; // ✅ just use it directly
  const branch = searchParams?.branch || "master"; // ✅ read branch from URL (optional)

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-gray-100">
      <main className="flex-1 p-2 bg-[#2a2a2a]">
        <div className="p-8">
          <div className="markdown-content prose prose-invert">
           <MarkdownLoader link={link} branch={branch} />
          </div>
        </div>
      </main>
    </div>
  );
}
