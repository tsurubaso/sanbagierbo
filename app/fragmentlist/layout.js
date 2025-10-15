import Sidebar from "@/archive/components/Sidebar";
import Footer from "@/components/Footer";

const navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/rulebook", label: "📜 Les Règles" },
  { href: "/storylist", label: "📚 Histoires" },
  { href: "/draftlist", label: "📝 Brouillons" },
  { href: "/otherlist", label: "🗂️ Autres" },
  { href: "/illustrationlist", label: "🎨 Illustrations" },
];
export default function SubLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar navItems={navItems} />
      <div className="ml-64 flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
