"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/rulebook", label: "📜 Rulebook" },
  { href: "/storylist", label: "📚 Storylist" },
  { href: "/draftlist", label: "📝 Draftlist" },
  { href: "/fragmentlist", label: "✂️ Fragmentlist" },
  { href: "/otherlist", label: "🗂️ Otherlist" },
  
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Bouton menu flottant (☰) quand la sidebar est fermée */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`h-screen fixed top-0 left-0 p-6 bg-black text-white transition-all duration-300
          ${open ? "w-64" : "w-0 overflow-hidden"}
        `}
        style={{
          borderRight: open ? "1px solid #444" : "none",
        }}
      >
        {open && (
          <>
            {/* Bouton de fermeture ✖ au-dessus du titre */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg p-1"
                aria-label="Close sidebar"
              >
                ✖
              </button>
            </div>

            {/* Titre avec favicon */}
            <div className="flex items-center gap-2 mb-6">
              <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
              <h2 className="text-2xl font-bold">SanSuBagier</h2>
            </div>

            {/* Menu de navigation */}
            <ul className="space-y-4">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                      pathname === href ? "bg-gray-700 font-semibold" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </>
  );
}
