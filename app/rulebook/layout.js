import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import GitHubIdentificationRIghtSideBar from "@/components/GitHubIdentificationRIghtSideBar";


const navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/rulebook", label: "📜 Les Règles" },
  { href: "/storylist", label: "📚 Histoires" },
  { href: "/draftlist", label: "📝 Brouillons" },
  { href: "/fragmentlist", label: "✂️ Fragments" },
  { href: "/otherlist", label: "🗂️ Autres" },
  { href: "/illustrationlist", label: "🎨 Illustrations" },
];
export default function SubLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <Sidebar navItems={navItems}/> <GitHubIdentificationRIghtSideBar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
