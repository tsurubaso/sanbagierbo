import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/rulebook", label: "📜 Les Règles" },
  { href: "/storylist", label: "📚 Histoires" },
  { href: "/fragmentlist", label: "✂️ Fragments" },
  { href: "/otherlist", label: "🗂️ Autres" },
  { href: "/illustrationlist", label: "🎨 Illustrations" },
];
export default function SubLayout({ children }) {
  return (
    <div>
      <Sidebar navItems={navItems} />
      <div >
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
