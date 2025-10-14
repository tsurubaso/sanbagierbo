"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";

  /*const navItemsTop = [
  { href: "/reader", label: " Reader" },
  { href: "/writer", label: " Writer" },
  { href: "/merger", label: " Merger" },
];*/
const navItemsTop = []; // Pas de boutons pour l'instant

export default function ClientWrapper({ 
    children,
 navItemsTop , // Pas de boutons pour l'instant
 navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/page2Rulebook", label: "📜 Les Règles" },
  { href: "/storylist", label: "📚 Histoires" },
  { href: "/draftlist", label: "📝 Brouillons" },
  { href: "/fragmentlist", label: "✂️ Fragments" },
  { href: "/otherlist", label: "🗂️ Autres" },
  { href: "/illustrationlist", label: "🎨 Illustrations" },
]




 }) {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [showTop, setShowTop] = useState(true);
  const [showFooter, setShowFooter] = useState(true);


  return (
    <SessionProvider>
      <ThemeToggle />
      <div className="flex flex-col min-h-screen">
        {showTop && (
          <TopBar
            onToggleLeft={() => setShowLeft(!showLeft)}
            onToggleRight={() => setShowRight(!showRight)}
            navItems={navItemsTop} // tu peux aussi ne rien passer du tout
          />
        )}

        <div className="flex flex-1">
          {showLeft && <LeftSidebar navItems={navItems} />}
          <main className="flex-1 p-4">{children}</main>
          {showRight && <RightSidebar />}
        </div>

        {showFooter && <Footer />}
      </div>
    </SessionProvider>
  );
}
