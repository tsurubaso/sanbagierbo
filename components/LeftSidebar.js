import Link from "next/link";

export default function LeftSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r">
      <nav className="space-y-2">
        <Link href="/" className="block hover:underline">
          🏠 Home
        </Link>
        <Link href="/rulebook" className="block hover:underline">
          📜 Rulebook
        </Link>
        <Link href="/about" className="block hover:underline">
          ℹ️ About
        </Link>
      </nav>
    </aside>
  );
}
