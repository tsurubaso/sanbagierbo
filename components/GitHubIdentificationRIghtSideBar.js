"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GithubSidebar() {
  const [open, setOpen] = useState(true);
  const { data: session } = useSession();

  return (
    <>
      {/* Bouton flottant pour ouvrir */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`h-screen fixed top-0 right-0 p-6 bg-black text-white transition-all duration-300 ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}
        style={{ borderLeft: open ? "1px solid #444" : "none" }}
      >
        {open && (
          <>
            {/* Bouton fermer */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg p-1"
              >
                ✖
              </button>
            </div>

            {/* Contenu */}
            {!session ? (
              <div className="text-center space-y-4">
                <p className="text-gray-300 text-sm">
                  Vous n’êtes pas encore connecté.
                </p>
                <button
                  onClick={() => signIn("github")}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
                >
                  🔑 Se connecter avec GitHub
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="flex flex-col items-center gap-2">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border border-gray-700"
                    />
                  )}
                  <p className="text-sm text-gray-300">
                    Bonjour, <span className="font-semibold">{session.user.name}</span> 👋
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
                >
                  🚪 Se déconnecter
                </button>
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
}
