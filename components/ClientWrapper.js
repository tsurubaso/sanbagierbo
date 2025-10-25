"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import TopBar from "./TopBar";
import Footer from "./Footer";

export default function ClientWrapper({
  children,
  navItemsTop = [], // Pas de boutons pour l'instant
  rightSidebarDescription = null,
  rightSidebarContent = null,
  showRightDefault = true, // 
}) {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(showRightDefault);
  const [showTop, setShowTop] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const navItems = [
    { href: "/", label: "🏠 Home" },
    { href: "/Rules", label: "📜 Les Règles" },
    { href: "/BILLY/storylist", label: "📚 Histoires" },
    { href: "/BILLY/draftlist", label: "📝 Brouillons" },
    { href: "/BILLY/fragmentlist", label: "✂️ Fragments" },
    { href: "/BILLY/otherlist", label: "🗂️ Autres" },
    { href: "/BILLY/illustrationlist", label: "🎨 Illustrations" },
  ];

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

        <div className="flex flex-1 min-h-0">
          {showLeft && <LeftSidebar navItems={navItems} />}
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          {showRight && (
            <RightSidebar
              description={rightSidebarDescription}
              content={rightSidebarContent}
            />
          )}
        </div>

        {showFooter && <Footer />}
      </div>
    </SessionProvider>
  );
}
