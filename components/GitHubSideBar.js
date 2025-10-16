"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GithubSidebar() {
  const { data: session } = useSession();

  return (
    <div className="text-center space-y-4">
      {!session ? (
        <>
          <p className="text-gray-300 text-sm">
            Vous n’êtes pas encore connecté.
          </p>
          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
          >
            🔑 Se connecter avec GitHub
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            {session.user.image && (
              <div className="relative w-12 h-12">
                <Image
                  src={session.user.image}
                  alt="Avatar"
                  fill
                  sizes="48px"
                  className="rounded-full border border-gray-700 object-cover"
                  priority
                />
              </div>
            )}
            <p className="text-sm text-gray-300">
              Bonjour,{" "}
              <span className="font-semibold">{session.user.name}</span> 👋
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
          >
            🚪 Se déconnecter
          </button>
        </>
      )}
    </div>
  );
}
