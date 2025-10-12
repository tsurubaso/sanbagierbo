import { use } from "react";
import SideNav from "@/components/Sidebar";
import MarkdownLoader from "@/components/MarkdownLoader";

export default function BookPage({ params }) {
  const { link } = use(params);

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-gray-100">
      <SideNav />
      <main className="flex-1 p-2 bg-[#2a2a2a]">
        <div className="p-8">
          <MarkdownLoader link={link} />
        </div>
      </main>
    </div>
  );
}
